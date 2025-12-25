import { useState, useRef } from "react";
import { GraduationCap, X, Upload, Image as ImageIcon } from "lucide-react";

export function AddTrainingProgramModal({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    programName: "",
    trainingCenter: "",
    duration: "",
    fee: "",
    availableSeats: "",
    startDate: "",
    description: "",
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

      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#dce0e8] p-6 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fe640b] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-[#4c4f69]">Add Training Program</h2>
              <p className="text-[#6c6f85] mt-1">
                Create skill development opportunities for villagers
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
              Program Name <span className="text-[#d20f39]">*</span>
            </label>
            <input
              type="text"
              value={formData.programName}
              onChange={(e) =>
                setFormData({ ...formData, programName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl"
            />
          </div>

          <div>
            <label className="block text-[#4c4f69] mb-2">
              Training Center <span className="text-[#d20f39]">*</span>
            </label>
            <input
              type="text"
              value={formData.trainingCenter}
              onChange={(e) =>
                setFormData({ ...formData, trainingCenter: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="px-4 py-2 border rounded-2xl"
            />
            <input
              placeholder="Fee"
              value={formData.fee}
              onChange={(e) =>
                setFormData({ ...formData, fee: e.target.value })
              }
              className="px-4 py-2 border rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Seats"
              value={formData.availableSeats}
              onChange={(e) =>
                setFormData({ ...formData, availableSeats: e.target.value })
              }
              className="px-4 py-2 border rounded-2xl"
            />
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="px-4 py-2 border rounded-2xl"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-2xl"
          />

          {/* Image Upload */}
          <div>
            {!image ? (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full border-dashed border-2 p-8 rounded-2xl flex flex-col items-center gap-3"
              >
                <Upload />
                Upload Image
              </button>
            ) : (
              <div className="relative">
                <img src={image} className="rounded-xl" />
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
              Add Training Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
