import { useState, useRef, useEffect } from "react";
import { Newspaper, X, Upload, Paperclip, Pin } from "lucide-react";

const API_BASE_URL = 'http://localhost:3000/api/news';

export function AddNewsModal({ open, onOpenChange, onSubmit, editingNews }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    expiryDate: "",
    isPinned: false,
    status: "draft",
  });

  const [attachments, setAttachments] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title,
        category: editingNews.category,
        description: editingNews.description,
        expiryDate: editingNews.expiryDate ? new Date(editingNews.expiryDate).toISOString().split('T')[0] : "",
        isPinned: editingNews.featured || false,
        status: editingNews.status,
      });
      setAttachments(editingNews.attachments || []);
      setNewFiles([]);
    } else {
      setFormData({
        title: "",
        category: "",
        description: "",
        expiryDate: "",
        isPinned: false,
        status: "draft",
      });
      setAttachments([]);
      setNewFiles([]);
    }
  }, [editingNews, open]);

  const handleFileUpload = (files) => {
    if (!files) return;

    const filesArray = Array.from(files);
    setNewFiles([...newFiles, ...filesArray]);

    const newAttachments = filesArray.map((file) => ({
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileType: file.type,
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
    setNewFiles(newFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("tokens");

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', status);
      formDataToSend.append('expiryDate', formData.expiryDate);
      formDataToSend.append('featured', formData.isPinned);

      newFiles.forEach((file) => {
        formDataToSend.append('attachments', file);
      });

      let response;
      if (editingNews) {
        response = await fetch(`${API_BASE_URL}/update/${editingNews._id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataToSend,
        });
      } else {
        response = await fetch(`${API_BASE_URL}/create`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataToSend,
        });
      }

      const data = await response.json();

      if (data.success) {
        onSubmit(data.data);
        onOpenChange(false);
      } else {
        alert(data.message || 'Failed to save news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Failed to save news');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b border-[#dce0e8] p-6 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fe640b] flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-[#4c4f69] text-left">
                {editingNews ? "Edit News" : "Add News"}
              </h2>
              <p className="text-[#6c6f85] text-left mt-1">
                {editingNews
                  ? "Update news announcement"
                  : "Create a new announcement for villagers"}
              </p>
            </div>

            <button
              onClick={() => onOpenChange(false)}
              className="text-[#6c6f85] hover:text-[#4c4f69]"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-[#4c4f69] text-left mb-2">
              News Title <span className="text-[#d20f39]">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl"
              required
            />
          </div>

          <div>
            <label className="block text-[#4c4f69] text-left mb-2">
              Category <span className="text-[#d20f39]">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl bg-white"
              required
            >
              <option value="">Select category</option>
              <option value="Administrative">Administrative</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Event">Event</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-[#4c4f69] text-left mb-2">
              Description <span className="text-[#d20f39]">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              placeholder="Enter description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#4c4f69] text-left mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl"
            />
          </div>

          <div>
            <label className="block text-[#4c4f69] text-left mb-2">
              Attachments (Images / PDFs)
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 cursor-pointer ${
                dragActive
                  ? "border-[#d20f39] bg-[#fce6e6]"
                  : "border-[#ccd0da] hover:border-[#d20f39]"
              }`}
            >
              <Upload className="mx-auto w-8 h-8 text-[#d20f39]" />
              <p className="text-center mt-2 text-[#6c6f85]">
                Click to upload or drag & drop
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />

            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#e6e9ef] p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-[#4c4f69]" />
                      <span className="text-[#4c4f69] text-sm">{file.fileName}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeAttachment(index)}
                      className="text-[#d20f39] hover:text-[#e64553]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#fef3c7] border border-[#df8e1d] rounded-2xl p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) =>
                  setFormData({ ...formData, isPinned: e.target.checked })
                }
                className="w-4 h-4 text-[#df8e1d] rounded focus:ring-[#df8e1d]"
              />
              <Pin className="w-4 h-4 text-[#df8e1d]" />
              <span className="text-[#4c4f69]">Pin this News (Featured)</span>
            </label>
          </div>

          <div>
            <label className="block text-[#4c4f69] text-left mb-2">Status</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, status: "draft" })
                }
                className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-colors ${
                  formData.status === "draft"
                    ? "border-[#df8e1d] bg-[#fef3c7] text-[#4c4f69]"
                    : "border-[#ccd0da] text-[#6c6f85] hover:bg-[#e6e9ef]"
                }`}
              >
                Draft
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, status: "published" })
                }
                className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-colors ${
                  formData.status === "published"
                    ? "border-[#40a02b] bg-[#d4f7dc] text-[#4c4f69]"
                    : "border-[#ccd0da] text-[#6c6f85] hover:bg-[#e6e9ef]"
                }`}
              >
                Published
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-2 border border-[#ccd0da] text-[#4c4f69] rounded-2xl hover:bg-[#e6e9ef] transition-colors"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, formData.status)}
              className="flex-1 px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#fe640b] transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : editingNews
                ? "Update News"
                : formData.status === "draft"
                ? "Save as Draft"
                : "Publish News"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}