import { useState, useRef, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

const SellProductModal = ({ categories = {}, onClose, defaultType = "sell", onSubmit,editItem }) => {

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    phone: "",
    description: "",
    type: defaultType,
    category: Object.keys(categories)[0] || "general",
  });



  const [images, setImages] = useState([]);

  /* ---------------- Image Upload ---------------- */
  const handleImageUpload = (files) => {
    if (!files) return;

    const fileArray = Array.from(files);

    const previews = fileArray.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- Submit ---------------- */
    const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      formData.append(k, v);
    });

    images.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file);
      }
    });

    const isEdit = Boolean(editItem);

    const url = isEdit
      ? `http://localhost:3000/api/marketplace/update/${editItem._id}`
      : `http://localhost:3000/api/marketplace/create`;

    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      onSubmit(data.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };


  useEffect(() => {
    if (editItem) {
      setForm({
        title: editItem.title,
        price: editItem.price,
        location: editItem.location,
        phone: editItem.phone,
        description: editItem.description,
        type: editItem.type,
      
      });
    }
  }, [editItem]);




  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sell / Rent Product</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sell / Rent Type */}
          <div className="grid grid-cols-2 gap-3">
            {["sell", "rent"].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setForm({ ...form, type })}
                className={`px-4 py-2 rounded-xl capitalize ${
                  form.type === type
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Inputs */}
          {[
            { key: "title", label: "Product Title" },
            { key: "price", label: form.type === "rent" ? "Rent Price" : "Price" },
            { key: "location", label: "Location" },
            { key: "phone", label: "Phone" },
    
          ].map(({ key, label }) => (
            <input
              key={key}
              placeholder={label}
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          ))}


          {/* Category */}
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {Object.entries(categories).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>


          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          
          {/* Attachments */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Product Images
            </label>

            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-orange-200 rounded-xl p-6 text-center cursor-pointer hover:border-orange-400"
            >
              <Upload className="mx-auto text-orange-500" />
              <p className="text-sm text-gray-500 mt-1">
                Click to upload images
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="hidden"
            />

            {/* Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.preview}
                      alt="preview"
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellProductModal;
