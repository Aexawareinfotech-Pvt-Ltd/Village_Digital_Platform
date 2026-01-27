import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, UserPlus, ArrowLeft } from 'lucide-react';

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

export function CommunityCalendar({ events, onRegister, onBackToEvents }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const getEventsForDate = (day) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const hasEvents = (day) => {
    return getEventsForDate(day).length > 0;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate?.getDate() === day && 
                        selectedDate?.getMonth() === currentDate.getMonth() &&
                        selectedDate?.getFullYear() === currentDate.getFullYear();
      const dayEvents = getEventsForDate(day);
      const hasEvent = dayEvents.length > 0;
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`aspect-square p-1 rounded-2xl text-sm relative transition-all ${
            isSelected 
              ? 'bg-[#fe640b] text-white shadow-md' 
              : hasEvent
              ? 'bg-orange-50 text-orange-900 hover:bg-orange-100 border border-orange-200'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          <span className="flex items-center justify-center h-full">{day}</span>
          {hasEvent && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
              {dayEvents.slice(0, 3).map((_, i) => (
                <span 
                  key={i}
                  className={`w-1 h-1 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-orange-500'
                  }`} 
                />
              ))}
            </div>
          )}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl text-[#fe640b] font-bold mb-2 text-left ">Community Calendar</h1>
          <p className="text-gray-600 text-left">View and register for upcoming village events</p>
        </div>

        {onBackToEvents && (
          <div className="mt-8 mb-2">
            <button
              onClick={onBackToEvents}
              className="flex items-center justify-center bg-[#fe640b] gap-2 px-3 py-3 text-white rounded-2xl "
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </button>
          </div>
        )}

        {/* Calendar Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-colors border border-gray-300"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-100 rounded-2xl transition-colors border border-gray-300"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2 ">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Events List */}
        {selectedDate && (
          <div>
            <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-orange-500" />
              Events on {selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h2>
            
            {getSelectedDateEvents().length > 0 ? (
              <div className="space-y-3">
                {getSelectedDateEvents().map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-1">
                            <h3 className="text-base text-gray-900 mb-2 text-left">{event.name}</h3>
                            <span className={`inline-block text-xs text-left px-2 py-1 rounded-full border ${categoryColors[event.category]}`}>
                              {event.category}
                            </span>
                          </div>
                        </div>
                        
                        {event.description && (
                          <p className="text-sm text-gray-600 mb-3 text-left">{event.description}</p>
                        )}
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span>{event.venue}</span>
                          </div>
                        </div>
                      </div>
                      
                      {event.registrationRequired && (
                        <button
                          onClick={() => onRegister(event)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl transition-colors  "
                        >
                          <UserPlus className="w-4 h-4" />
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No events scheduled for this date</p>
              </div>
            )}
          </div>
        )}

        {!selectedDate && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Select a date to view events</p>
          </div>
        )}
      </div>
    </div>
  );
}
