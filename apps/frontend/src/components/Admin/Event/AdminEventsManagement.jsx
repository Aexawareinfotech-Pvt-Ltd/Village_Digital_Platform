import { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Loader2
} from 'lucide-react';

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

export function AdminEventsManagement({
  events,
  onCreateNew,
  onViewRegistrations,
  onEditEvent,
  onDeleteEvent,
  loading
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const openDeleteDialog = (event) => {
    setEventToDelete(event);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setEventToDelete(null);
  };

  const confirmDelete = () => {
    if (!eventToDelete) return;
    onDeleteEvent(eventToDelete.id);
    closeDeleteDialog();
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl text-[#fe640b] font-bold text-left mb-2">
              Manage Events
            </h1>
            <p className="text-gray-600 text-left">
              View and manage all community events
            </p>
          </div>
          <button
            onClick={onCreateNew}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#e55a0a] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Create New Event
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && events.length === 0 && (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading events...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">No Events Yet</h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first community event
            </p>
            <button
              onClick={onCreateNew}
              className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl mx-auto hover:bg-[#e55a0a] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base text-gray-900 pr-2 text-left flex-1">
                      {event.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${categoryColors[event.category]}`}
                    >
                      {event.category}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 text-left">
                      {event.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-[#fe640b]" />
                    {formatDate(event.date)} at {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-[#fe640b]" />
                    {event.venue}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  {event.registrationRequired && (
                    <button
                      onClick={() => onViewRegistrations(event.id)}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-[#fe640b] text-[#fe640b] rounded-2xl text-sm hover:bg-[#fe640b]/10 transition-colors disabled:opacity-50"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  )}

                  <button
                    onClick={() => onEditEvent(event)}
                    disabled={loading}
                    className="p-2 text-[#fe640b] hover:bg-[#fe640b]/10 rounded-2xl transition-colors disabled:opacity-50"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openDeleteDialog(event)}
                    disabled={loading}
                    className="p-2 text-[#d20f39] hover:bg-red-50 rounded-2xl transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteDialog && eventToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Delete Event?
              </h2>
            </div>

            <p className="text-gray-600 mb-6 text-left">
              Are you sure you want to delete{' '}
              <strong>"{eventToDelete.name}"</strong>?  
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={closeDeleteDialog}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}