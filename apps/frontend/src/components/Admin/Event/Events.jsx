import { useState, useEffect } from 'react';
import { AdminEventsManagement } from './AdminEventsManagement';
import { AdminEventCreate } from './AdminEventCreate';
import  RegistrationDetailsModal  from './RegistrationDetailsModal';

export default function Events({ onSwitchToUser }) {
  const [currentPage, setCurrentPage] = useState('admin-events');
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [viewingRegistrationsEventId, setViewingRegistrationsEventId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/events/list`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
          currentAttendees: 0, // Will be updated when fetching registrations
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

  // Fetch registrations for a specific event
  const fetchEventRegistrations = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/attendees`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch registrations');

      // Transform backend data to match frontend format
      const transformedRegistrations = (data.attendees || []).map(attendee => ({
        id: attendee.ticketId || attendee._id,
        eventId: eventId,
        name: attendee.name,
        email: attendee.email,
        phone: attendee.phone,
        additionalDetails: attendee.additionalDetails || '',
        registeredAt: attendee.registeredAt,
      }));

      return transformedRegistrations;
    } catch (err) {
      console.error('Error fetching registrations:', err);
      return [];
    }
  };
  

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setEditingEvent(null);
  };

  const handleEventCreated = async (eventData) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      let response;

      // Prepare payload matching database schema
      const payload = {
        eventName: eventData.name,
        category: eventData.category,
        description: eventData.description,
        venue: eventData.venue,
        startDate: new Date(eventData.startDate).toISOString(),
        endDate: new Date(eventData.endDate).toISOString(),
        isRegistrationRequired: eventData.registrationRequired,
        maxAttendees: eventData.maxAttendees || null,
      };

      if (editingEvent) {
        // Update existing event
        response = await fetch(`${API_BASE_URL}/events/${editingEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new event
        response = await fetch(`${API_BASE_URL}/events/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save event');

      // Refresh events list
      await fetchAllEvents();
      setEditingEvent(null);
      setCurrentPage('admin-events');

      // Show success message
      alert(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error saving event:', err);
      alert('Failed to save event: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteEvent = async (eventId) => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete event');

      // Refresh events list
      await fetchAllEvents();
      alert('Event deleted successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error deleting event:', err);
      alert('Failed to delete event: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleViewRegistrations = async (eventId) => {
    // Fetch registrations for this event
    const eventRegistrations = await fetchEventRegistrations(eventId);
    setRegistrations(eventRegistrations);
    setViewingRegistrationsEventId(eventId);
  };

  const getEventRegistrations = (eventId) => {
    return registrations.filter(r => r.eventId === eventId);
  };

  const viewingEvent = events.find(e => e.id === viewingRegistrationsEventId);

  return (
    <div className="size-full flex bg-gray-50">
      {currentPage === 'admin-events' ? (
        <AdminEventsManagement 
          events={events}
          onCreateNew={() => setCurrentPage('admin-create')}
          onViewRegistrations={handleViewRegistrations}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          loading={loading}
        />
      ) : (
        <AdminEventCreate 
          onEventCreated={handleEventCreated}
          onCancel={() => setCurrentPage('admin-events')}
          loading={loading}
        />
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <AdminEventCreate 
          editingEvent={editingEvent}
          isModal={true}
          onEventCreated={handleEventCreated}
          onCancel={() => setEditingEvent(null)}
          loading={loading}
        />
      )}

      {viewingEvent && (
        <RegistrationDetailsModal 
          eventName={viewingEvent.name}
          registrations={getEventRegistrations(viewingEvent.id)}
          isOpen={!!viewingRegistrationsEventId}
          onClose={() => setViewingRegistrationsEventId(null)}
        />
      )}
    </div>
  );
}

