import { useState, useRef } from "react";
import { Building, X, Upload, Image as ImageIcon } from "lucide-react";

export function AddGovernmentJobModal({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    qualification: "",
    lastDate: "",
    applicationLink: "",
  });

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData, image);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#dce0e8] p-6 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fe640b] flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-[#4c4f69]">Add Government Job</h2>
              <p className="text-[#6c6f85] mt-1">
                Post government job opportunities for villagers
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-[#6c6f85] hover:text-[#4c4f69]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-[#4c4f69] mb-2">
              Job Title <span className="text-[#d20f39]">*</span>
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl"
            />
          </div>

          <div>
            <label className="block text-[#4c4f69] mb-2">
              Department <span className="text-[#d20f39]">*</span>
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl"
            />
          </div>

          <div>
            <label className="block text-[#4c4f69] mb-2">
              Required Qualification <span className="text-[#d20f39]">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.qualification}
              onChange={(e) =>
                setFormData({ ...formData, qualification: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl resize-none"
            />
          </div>

          <div>
            <label className="block text-[#4c4f69] mb-2">
              Last Date to Apply <span className="text-[#d20f39]">*</span>
            </label>
            <input
              type="date"
              value={formData.lastDate}
              onChange={(e) =>
                setFormData({ ...formData, lastDate: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl"
            />
          </div>

          <div>
            <label className="block text-[#4c4f69] mb-2">
              Official Application Link <span className="text-[#d20f39]">*</span>
            </label>
            <input
              type="url"
              value={formData.applicationLink}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  applicationLink: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-2xl"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-[#4c4f69] mb-2">
              Job Poster / Image
            </label>
            {!image ? (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3"
              >
                <Upload className="text-[#1e66f5]" />
                Upload Job Poster
              </button>
            ) : (
              <div className="relative">
                <img
                  src={image}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-2xl p-1"
                >
                  <X />
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 border px-4 py-2 rounded-2xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#fe640b] text-white px-4 py-2 rounded-2xl"
            >
              Add Government Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
