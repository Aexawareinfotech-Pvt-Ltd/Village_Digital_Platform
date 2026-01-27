import { useState, useEffect } from 'react';
import { CalendarIcon, MapPin, Users, Save, X, Loader2 } from 'lucide-react';

export function AdminEventCreate({ editingEvent, isModal = false, onEventCreated, onCancel, loading }) {
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venue, setVenue] = useState('');
  const [registrationRequired, setRegistrationRequired] = useState(false);
  const [maxAttendees, setMaxAttendees] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setEventName(editingEvent.name || '');
      setCategory(editingEvent.category || '');
      setDescription(editingEvent.description || '');
      
      // Combine date and time for datetime-local input
      if (editingEvent.date && editingEvent.time) {
        const dateTimeStr = `${editingEvent.date}T${editingEvent.time}`;
        setStartDate(dateTimeStr);
        setEndDate(dateTimeStr);
      }
      
      setVenue(editingEvent.venue || '');
      setRegistrationRequired(editingEvent.registrationRequired || false);
      setMaxAttendees(editingEvent.maxAttendees ? String(editingEvent.maxAttendees) : '');
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eventData = {
      name: eventName,
      category,
      description,
      startDate: startDate,
      endDate: endDate,
      venue,
      registrationRequired,
      maxAttendees: maxAttendees ? parseInt(maxAttendees) : undefined
    };
    
    onEventCreated(eventData);
    
    if (!editingEvent) {
      resetForm();
    }
  };

  const resetForm = () => {
    setEventName('');
    setCategory('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setVenue('');
    setRegistrationRequired(false);
    setMaxAttendees('');
  };

  const handleCancelClick = () => {
    resetForm();
    onCancel();
  };

  const formContent = (
    <form onSubmit={handleSubmit} className={isModal ? '' : 'max-w-4xl mx-auto'}>
      {/* Event Details Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg text-gray-900 mb-4 text-left">Event Details</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="eventName" className="block text-sm text-left text-gray-700 mb-1.5">
              Event Name *
            </label>
            <input
              id="eventName"
              type="text"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm text-gray-700 text-left mb-1.5">
              Category *
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select a category</option>
              <option value="festival">Festival</option>
              <option value="cultural">Cultural Program</option>
              <option value="sports">Sports</option>
              <option value="health">Health Camp</option>
              <option value="education">Education</option>
              <option value="community">Community Meeting</option>
              <option value="agriculture">Agriculture</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm text-gray-700 mb-1.5 text-left">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <label htmlFor="startDate" className="block text-sm text-gray-700 mb-1.5">
                <span className="flex items-center gap-2">
                  Start Date & Time *
                </span>
              </label>
              <input
                id="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm text-gray-700 text-left mb-1.5">
                <span className="flex items-center gap-2">
                  End Date & Time *
                </span>
              </label>
              <input
                id="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="venue" className="block text-sm text-gray-700 text-left mb-1.5">
              <span className="flex items-center gap-2">
                Venue *
              </span>
            </label>
            <input
              id="venue"
              type="text"
              placeholder="Enter event venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Registration Settings Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg text-gray-900 mb-4 text-left">Registration Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="text-sm text-gray-900 mb-1 text-left">
                Registration Required
              </p>
              <p className="text-sm text-gray-600 text-left">
                {registrationRequired 
                  ? 'Users must register to attend this event' 
                  : 'No registration needed for this event'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRegistrationRequired(!registrationRequired)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                registrationRequired ? 'bg-[#fe640b]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  registrationRequired ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {registrationRequired && (
            <div className="pl-4 border-l-4 text-left border-[#fe640b]">
              <label htmlFor="maxAttendees" className="block text-sm text-gray-700 mb-1.5">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Maximum Attendees
                </span>
              </label>
              <input
                id="maxAttendees"
                type="number"
                placeholder="Enter no of attendees"
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value)}
                min="1"
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty for unlimited attendees
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={handleCancelClick}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#e55a0a] transition-colors disabled:opacity-50"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-xl text-gray-900">
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </h2>
            <button 
              onClick={handleCancelClick} 
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {formContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl text-[#fe640b] font-bold text-left mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600 text-left">
            Fill in the details to create a community event
          </p>
        </div>
        {formContent}
      </div>
    </div>
  );
}