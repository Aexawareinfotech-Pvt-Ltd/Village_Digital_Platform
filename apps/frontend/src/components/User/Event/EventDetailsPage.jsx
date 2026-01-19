import { ArrowLeft, Calendar, MapPin, Clock, Users, UserPlus } from 'lucide-react';

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

export function EventDetailsPage({ event, onBack, onRegister }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const isFull = event.maxAttendees && event.currentAttendees && event.currentAttendees >= event.maxAttendees;
  const spotsLeft = event.maxAttendees && event.currentAttendees 
    ? event.maxAttendees - event.currentAttendees 
    : null;

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </button>

        {/* Event Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl text-gray-900 mb-3">{event.name}</h1>
              <span className={`inline-block text-sm px-3 py-1.5 rounded-full border ${categoryColors[event.category]}`}>
                {event.category}
              </span>
            </div>
          </div>

          {event.description && (
            <p className="text-gray-700 mt-4 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="text-gray-900">{formatDate(event.date)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Time</p>
                <p className="text-gray-900">{event.time}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Venue</p>
                <p className="text-gray-900">{event.venue}</p>
              </div>
            </div>
          </div>

          {event.registrationRequired && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Registration</p>
                  {event.maxAttendees ? (
                    <p className="text-gray-900">
                      {event.currentAttendees || 0} / {event.maxAttendees} registered
                      {spotsLeft !== null && spotsLeft > 0 && (
                        <span className="text-sm text-green-600 block">
                          {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="text-gray-900">
                      {event.currentAttendees || 0} registered
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Registration Section */}
        {event.registrationRequired && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl text-gray-900 mb-4">Register for this Event</h2>
            <p className="text-gray-600 mb-6">
              {isFull 
                ? 'This event is currently full. Please check back later for cancellations.'
                : 'Secure your spot by registering for this event. Fill out the registration form to confirm your attendance.'}
            </p>
            <button
              onClick={() => onRegister(event)}
              disabled={!!isFull}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors shadow-sm ${
                isFull
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              {isFull ? 'Event Full' : 'Register Now'}
            </button>
          </div>
        )}

        {!event.registrationRequired && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl text-blue-900 mb-2">No Registration Required</h2>
            <p className="text-blue-700">
              This is an open event. You can attend without prior registration. Just show up at the venue on the scheduled date and time!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
