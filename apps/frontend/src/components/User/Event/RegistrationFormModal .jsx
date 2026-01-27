import { useState } from 'react';
import { X } from 'lucide-react';

export function RegistrationFormModal({ event, isOpen, onClose, onRegister, loading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!event) return;

    setSubmitting(true);

    const registrationData = {
      eventId: event.id,
      name,
      email,
      phone,
      additionalDetails
    };

    try {
      await onRegister(registrationData);
      
      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setAdditionalDetails('');
      
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAdditionalDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-orange-50 rounded-t-xl">
          <h2 className="text-xl text-gray-900">Register for Event</h2>
          <button
            onClick={handleClose}
            disabled={submitting}
            className="p-2 rounded-2xl transition-colors hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Event Info */}
        {event && (
          <div className="mx-6 mt-6 p-3 bg-orange-50 rounded-2xl border border-[#ffddb8]">
            <p className="text-sm text-gray-600 text-left">Event</p>
            <p className="text-sm text-gray-900 text-left">{event.name}</p>
          </div>
        )}

        {/* Fields */}
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1.5 text-left">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={submitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1.5 text-left">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm text-gray-700 mb-1.5 text-left">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={submitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="additionalDetails" className="block text-sm text-gray-700 mb-1.5 text-left">
              Additional Details (Optional)
            </label>
            <textarea
              id="additionalDetails"
              placeholder="Any special requirements or notes"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              rows={3}
              disabled={submitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none disabled:bg-gray-100"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !name || !email || !phone}
              className="flex-1 px-4 py-2 bg-[#fe640b] text-white rounded-2xl transition-colors hover:bg-[#e55a0a] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Registering...
                </>
              ) : (
                'Complete Registration'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}