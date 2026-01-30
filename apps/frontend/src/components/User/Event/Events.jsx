import { useState, useEffect } from 'react';
import { CommunityCalendar } from './CommunityCalendar';
import { UserEventsListing } from './UserEventsListing';
import { EventDetailsPage } from './EventDetailsPage';
import { RegistrationFormModal } from './RegistrationFormModal ';

export default function Events({ onSwitchToAdmin }) {
  const [currentPage, setCurrentPage] = useState('user-events');
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [viewingEventDetails, setViewingEventDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:3000/api'; // Change to your backend URL

  useEffect(() => {
    fetchAllEvents();
  }, []);

  // Fetch all events
  const fetchAllEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/event-registrations/list`, {
        method: 'GET',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch events');

      // Transform backend data to match frontend format
      const transformedEvents = (data.data || []).map(event => {
        const startDate = new Date(event.startDate);
        return {
          id: event._id,
          name: event.eventName,
          date: event.startDate?.split('T')[0],
          time: startDate.toTimeString().substring(0, 5),
          venue: event.venue,
          category: event.category,
          description: event.description,
          registrationRequired: event.isRegistrationRequired,
          maxAttendees: event.maxAttendees,
          currentAttendees: 0, // Will be updated when we have registration count
        };
      });

      setEvents(transformedEvents);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setViewingEventDetails(null);
  };

  const handleRegister = async (registrationData) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE_URL}/event-registrations/${registrationData.eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: registrationData.name,
          email: registrationData.email,
          phone: registrationData.phone,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to register for event');

      // Update local state
      const newRegistration = {
        id: data.ticket?.ticketId || `reg-${Date.now()}`,
        ...registrationData,
        registeredAt: new Date().toISOString()
      };
      
      setRegistrations([...registrations, newRegistration]);
      
      // Update event attendee count
      setEvents(events.map(e => 
        e.id === registrationData.eventId 
          ? { ...e, currentAttendees: (e.currentAttendees || 0) + 1 }
          : e
      ));

      alert('Registration successful! Check your email for the ticket.');
    } catch (err) {
      setError(err.message);
      console.error('Error registering for event:', err);
      alert('Failed to register: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (event) => {
    setSelectedEventForRegistration(event);
    setIsRegistrationModalOpen(true);
  };

  const handleViewEventDetails = (event) => {
    setViewingEventDetails(event);
    setCurrentPage('user-event-details');
  };

  if (loading && events.length === 0) {
    return (
      <div className="size-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12">
      {/* HEADER */}
      <div className=" text-left">
        <h1 className="text-latte-peach mb-2 text-4xl">Events</h1>
        <p className="text-gray-600">Explore upcoming events, programs, and community activities</p>
      </div>
      {currentPage === 'user-calendar' ? (
        <CommunityCalendar 
          events={events}
          onRegister={handleRegisterClick}
          onBackToEvents={() => setCurrentPage('user-events')}
        />
      ) : currentPage === 'user-event-details' && viewingEventDetails ? (
        <EventDetailsPage 
          event={viewingEventDetails}
          onBack={() => setCurrentPage('user-events')}
          onRegister={handleRegisterClick}
        />
      ) : (
        <UserEventsListing 
          events={events}
          onRegister={handleRegisterClick}
          onViewDetails={handleViewEventDetails}
          onSwitchToCalendar={() => setCurrentPage('user-calendar')}
        />
      )}

      <RegistrationFormModal 
        event={selectedEventForRegistration}
        isOpen={isRegistrationModalOpen}
        onClose={() => {
          setIsRegistrationModalOpen(false);
          setSelectedEventForRegistration(null);
        }}
        onRegister={handleRegister}
        loading={loading}
      />
    </div>
  );
}