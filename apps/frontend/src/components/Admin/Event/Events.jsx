import { useState } from 'react';
import { AdminEventsManagement } from './AdminEventsManagement';
import { AdminEventCreate } from './AdminEventCreate';
import { RegistrationDetailsModal } from './RegistrationDetailsModal';
// import { Toaster } from 'sonner';
// import { toast } from 'sonner';

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

export default function Events({ onSwitchToUser }) {
  const [currentPage, setCurrentPage] = useState('admin-events');
  const [events, setEvents] = useState(initialEvents);
  const [registrations, setRegistrations] = useState(mockRegistrations);
  const [viewingRegistrationsEventId, setViewingRegistrationsEventId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setEditingEvent(null);
  };

  const handleEventCreated = (eventData) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(e => 
        e.id === editingEvent.id 
          ? { ...e, ...eventData } 
          : e
      ));
      setEditingEvent(null);
    } else {
      // Create new event
      const newEvent = {
        id: `event-${Date.now()}`,
        ...eventData,
        currentAttendees: 0
      };
      setEvents([...events, newEvent]);
    }
    setCurrentPage('admin-events');
  };

  const handleDeleteEvent = (eventId) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== eventId));
      setRegistrations(registrations.filter(r => r.eventId !== eventId));
      toast.success('Event deleted successfully');
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleViewRegistrations = (eventId) => {
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
        />
      ) : (
        <AdminEventCreate 
          onEventCreated={handleEventCreated}
          onCancel={() => setCurrentPage('admin-events')}
        />
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <AdminEventCreate 
          editingEvent={editingEvent}
          isModal={true}
          onEventCreated={handleEventCreated}
          onCancel={() => setEditingEvent(null)}
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
