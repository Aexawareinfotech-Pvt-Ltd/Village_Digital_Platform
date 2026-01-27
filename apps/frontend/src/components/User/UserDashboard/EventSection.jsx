import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'http://localhost:3000/api';

export function EventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH EVENTS FROM BACKEND ================= */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/event-registrations/list`);
        const data = await res.json();

        if (res.ok) {
          const transformedEvents = (data.data || []).map((event) => {
            const startDate = new Date(event.startDate);
            return {
              id: event._id,
              title: event.eventName,
              startDate: event.startDate, // ✅ keep original date for sorting
              date: startDate.toDateString(),
              time: startDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              location: event.venue,
              category: event.category,
              attendees: event.maxAttendees
                ? `${event.maxAttendees} seats`
                : 'Open to all',
              color: 'bg-orange-500',
            };
          });

          setEvents(transformedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewAllEvents = () => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/events");
  } else {
    navigate("/VillageLogin");
  }
};

  return (
    <section className="py-16 bg-gray-50" id="events">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with village festivals, community meetings, health camps, and government programs
          </p>
        </div>

        {/* EVENTS GRID */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">
            Loading events...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...events]
              .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)) // ✅ latest first
              .slice(0, 3) // ✅ only 3 events
              .map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className={`h-2 ${event.color}`}></div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                        {event.category}
                      </span>
                      <div className={`w-10 h-10 ${event.color} rounded-2xl flex items-center justify-center`}>
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        {event.attendees}
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 border border-[#ff6b35] text-[#ff6b35] rounded-2xl hover:bg-[#fff3e0] transition-colors flex items-center justify-center gap-2">
                      Register / Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="text-center mt-6">
                <button 
                onClick={handleViewAllEvents}
                className="px-6 py-2 border border-[#ff6b35] text-[#ff6b35] rounded-2xl hover:bg-[#fff3e0] transition-colors">
                  View All Events
                </button>
              </div>
    </section>
  );
}
