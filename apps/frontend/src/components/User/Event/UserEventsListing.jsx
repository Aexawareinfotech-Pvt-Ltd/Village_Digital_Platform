import { Calendar, MapPin, Users, UserPlus } from "lucide-react";

const categoryColors = {
  festival: "bg-purple-100 text-purple-700 border-purple-200",
  health: "bg-green-100 text-green-700 border-green-200",
  agriculture: "bg-amber-100 text-amber-700 border-amber-200",
  cultural: "bg-blue-100 text-blue-700 border-blue-200",
  sports: "bg-red-100 text-red-700 border-red-200",
  community: "bg-gray-100 text-gray-700 border-gray-200",
  education: "bg-cyan-100 text-cyan-700 border-cyan-200",
  other: "bg-slate-100 text-slate-700 border-slate-200",
};
export function UserEventsListing({
  events,
  onRegister,
  onSwitchToCalendar,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isFull = (event) => {
    return (
      event.maxAttendees &&
      event.currentAttendees &&
      event.currentAttendees >= event.maxAttendees
    );
  };
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-6 mt-5">
        <div className="flex items-center justify-between mb-6">
          <div />
          {onSwitchToCalendar && (
            <button
              onClick={onSwitchToCalendar}
              className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Event Calendar
            </button>
          )}
        </div>
        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">
              No Events Available
            </h3>
            <p className="text-gray-600">
              Check back later for upcoming community events
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg hover:border-orange-200 transition-all"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base text-gray-900 flex-1 text-left pr-2">
                      {event.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        categoryColors[event.category]
                      }`}
                    >
                      {event.category}
                    </span>
                  </div>

                  {event.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 text-left">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>
                      {formatDate(event.date)} at {event.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="truncate">{event.venue}</span>
                  </div>

                </div>
                {event.registrationRequired && (
                  <button
                    onClick={() => onRegister(event)}
                    disabled={isFull(event)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-2xl ${
                      isFull(event)
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-[#fe640b] text-white"
                    }`}
                  >
                    {isFull(event) ? (
                      "Event Full"
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Register Now
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
