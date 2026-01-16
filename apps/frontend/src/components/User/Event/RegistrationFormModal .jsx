import { useState } from 'react';
import { X } from 'lucide-react';

export function RegistrationFormModal({ event, isOpen, onClose, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!event) return;

    const registrationData = {
      eventId: event.id,
      name,
      email,
      phone,
      additionalDetails
    };

    onRegister(registrationData);
    
    setName('');
    setEmail('');
    setPhone('');
    setAdditionalDetails('');
    
    onClose();
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
            className="p-2 rounded-2xl transition-colors"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#fe640b] text-white rounded-2xl transition-colors"
            >
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
