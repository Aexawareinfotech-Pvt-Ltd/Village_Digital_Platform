import { X, Download, User, Mail, Phone, FileText } from 'lucide-react';

export function RegistrationDetailsModal({ eventName, registrations, isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Phone', 'Additional Details', 'Registered At'];
    const rows = registrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.additionalDetails || '',
      new Date(reg.registeredAt).toLocaleString('en-IN')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${eventName.replace(/\s+/g, '_')}_registrations.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl text-gray-900 mb-1">Event Registrations</h2>
            <p className="text-sm text-gray-600">{eventName}</p>
            <p className="text-sm text-gray-500 mt-1">
              {registrations.length} {registrations.length === 1 ? 'registration' : 'registrations'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {registrations.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No registrations yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {registrations.map((registration, index) => (
                <div 
                  key={registration.id} 
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center">
                        <span className="text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-base text-gray-900">{registration.name}</h3>
                        <p className="text-xs text-gray-500">
                          Registered: {new Date(registration.registeredAt).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-13">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="w-4 h-4 text-orange-500" />
                      <a href={`mailto:${registration.email}`} className="hover:underline">
                        {registration.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="w-4 h-4 text-orange-500" />
                      <a href={`tel:${registration.phone}`} className="hover:underline">
                        {registration.phone}
                      </a>
                    </div>
                  </div>

                  {registration.additionalDetails && (
                    <div className="mt-3 ml-13">
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <FileText className="w-4 h-4 text-orange-500 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Additional Details:</p>
                          <p>{registration.additionalDetails}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
