import { useState } from 'react';
import { CommunityCalendar } from './CommunityCalendar';
import { RegistrationFormModal } from './RegistrationFormModal ';
import { UserEventsListing } from './UserEventsListing';
import { EventDetailsPage } from './EventDetailsPage';
// Mock data
const initialEvents = [
  {
    id: '1',
    name: 'Diwali Festival Celebration',
    date: '2026-02-15',
    time: '18:00',
    venue: 'Village Community Hall',
    category: 'festival',
    description: 'Join us for a grand Diwali celebration with traditional performances, games, and feast.',
    registrationRequired: true,
    maxAttendees: 150,
    currentAttendees: 45
  },
  {
    id: '2',
    name: 'Free Health Checkup Camp',
    date: '2026-02-20',
    time: '09:00',
    venue: 'Primary Health Center',
    category: 'health',
    description: 'Free health screening and consultation by visiting doctors.',
    registrationRequired: true,
    maxAttendees: 100,
    currentAttendees: 67
  },
  {
    id: '3',
    name: 'Agricultural Training Workshop',
    date: '2026-02-25',
    time: '10:00',
    venue: 'Farmer Training Center',
    category: 'agriculture',
    description: 'Learn about modern farming techniques and sustainable agriculture practices.',
    registrationRequired: true,
    maxAttendees: 50,
    currentAttendees: 28
  },
  {
    id: '4',
    name: 'Village Cricket Tournament',
    date: '2026-02-28',
    time: '14:00',
    venue: 'Village Sports Ground',
    category: 'sports',
    description: 'Annual inter-village cricket tournament. All teams welcome!',
    registrationRequired: false
  }
];

const mockRegistrations = [
  {
    id: 'r1',
    eventId: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    additionalDetails: 'Vegetarian meal preference',
    registeredAt: '2026-02-01T10:30:00'
  },
  {
    id: 'r2',
    eventId: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43211',
    registeredAt: '2026-02-02T14:20:00'
  },
  {
    id: 'r3',
    eventId: '2',
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91 98765 43212',
    additionalDetails: 'Bringing elderly parents',
    registeredAt: '2026-02-03T09:15:00'
  }
];

export default function Events({ onSwitchToAdmin }) {
  const [currentPage, setCurrentPage] = useState('user-events');
  const [events, setEvents] = useState(initialEvents);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [viewingEventDetails, setViewingEventDetails] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setViewingEventDetails(null);
  };

  const handleRegister = (registrationData) => {
    const newRegistration = {
      id: `reg-${Date.now()}`,
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
  };

  const handleRegisterClick = (event) => {
    setSelectedEventForRegistration(event);
    setIsRegistrationModalOpen(true);
  };

  const handleViewEventDetails = (event) => {
    setViewingEventDetails(event);
    setCurrentPage('user-event-details');
  };

  return (
    <div className="size-full flex bg-gray-50">

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
      />
    </div>
  );
}
