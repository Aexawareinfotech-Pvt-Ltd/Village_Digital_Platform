import { Calendar, MapPin, Users, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

const categoryColors = {
  festival: 'bg-purple-100 text-purple-700 border-purple-200',
  health: 'bg-green-100 text-green-700 border-green-200',
  agriculture: 'bg-amber-100 text-amber-700 border-amber-200',
  cultural: 'bg-blue-100 text-blue-700 border-blue-200',
  sports: 'bg-red-100 text-red-700 border-red-200',
  community: 'bg-gray-100 text-gray-700 border-gray-200',
  education: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  other: 'bg-slate-100 text-slate-700 border-slate-200'
};

export function AdminEventsManagement({ events, onCreateNew, onViewRegistrations, onEditEvent, onDeleteEvent }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-[#fe640b] font-bold text-left mb-2">Manage Events</h1>
            <p className="text-gray-600">View and manage all community events</p>
          </div>
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-[#fe640b]  text-white rounded-2xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">No Events Yet</h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first community event
              </p>
              <button
                onClick={onCreateNew}
                className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl transition-colors mx-auto"
              >
                <Plus className="w-4 h-4" />
                Create First Event
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 hover:border-orange-200"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base text-gray-900 pr-2 text-left flex-1">{event.name}</h3>
                    <span className={`shrink-0 text-xs px-2 py-1 rounded-full border ${categoryColors[event.category]}`}>
                      {event.category}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 text-left">{event.description}</p>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-[#fe640b]" />
                    <span>{formatDate(event.date)} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#fe640b]" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  {event.registrationRequired && event.maxAttendees && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-[#fe640b]" />
                      <span>
                        {event.currentAttendees || 0} / {event.maxAttendees} registered
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  {event.registrationRequired && (
                    <button
                      onClick={() => onViewRegistrations(event.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#fe640b] text-[#fe640b] hover:bg-[#fffbf7] hover:bg-opacity-10 rounded-2xl transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  )}
                  <button
                    onClick={() => onEditEvent(event)}
                    className="p-2 text-[#fe640b] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="p-2 text-[#d20f39] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
