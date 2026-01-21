import { useState, useEffect } from "react";
import {
  Building,
  Search,
  Phone,
  MapPin,
  Clock,
  Droplet,
  Shield,
  GraduationCap,
  Heart,
  Plus,
  X,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";



const API_BASE_URL = "http://localhost:3000/api/local-services";

const categoryIcons = {
  health: Heart,
  police: Shield,
  education: GraduationCap,
  government: Building,
  utilities: Droplet,
};

export default function LocalServicesAdminModule() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);   // page / list loading
  const [saving, setSaving] = useState(false);   // add/edit submit

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    hours: "",
    services: "",
    category: "health",
  });

  /* ---------------- FETCH SERVICES ---------------- */
  const loadServices = async () => {
  try {
    setLoading(true);
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    setServices(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to load services", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadServices();
  }, []);

  /* ---------------- OPEN MODAL ---------------- */
  const openAdd = () => {
    setEditingService(null);
    setFormData({
      name: "",
      phone: "",
      address: "",
      hours: "",
      services: "",
      category: "health",
    });
    setOpen(true);
  };

  const openEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      phone: service.phone,
      address: service.address,
      hours: service.hours,
      services: service.services,
      category: service.category,
    });
    setOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */
  const submit = async () => {
  setSaving(true);

  const url = editingService
    ? `${API_BASE_URL}/update/${editingService._id}`
    : `${API_BASE_URL}/create`;

  const method = editingService ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Failed to save service");
      return;
    }

    await loadServices();
    setOpen(false);
  } catch (err) {
    console.error("Save failed", err);
  } finally {
    setSaving(false);
  }
};

  /* ---------------- DELETE ---------------- */
  const remove = async (id) => {
    if (!confirm("Delete this service?")) return;

    await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    loadServices();
  };

  const filteredServices = services.filter((s) => {
  const matchesSearch =
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.phone?.includes(searchQuery);

  const matchesCategory =
    categoryFilter === "all" || s.category === categoryFilter;

  return matchesSearch && matchesCategory;
});

  

  /* ---------------- UI ---------------- */
  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 ">
        <div>
          <h1 className="text-[#fe640b] text-3xl font-bold text-left">Local Service Management</h1>
          <p className="text-[#6c6f85] mt-1 text-left">
            Manage village local services
          </p>
        </div>
        <button
          onClick={() => openAdd()}
          className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] hover:bg-[#fe640b]/90 text-white rounded-2xl shadow-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>


      {/* SERVICES LIST */}
      <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6 mt-6">
      <div className="p-6 border-b border-latte-surface0">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* SEARCH */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-latte-subtext0" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 hover:bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text placeholder-latte-subtext0 focus:outline-none focus:ring-2 focus:ring-latte-peach"
          />
        </div>

        {/* CATEGORY FILTER */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-latte-mantle border border-latte-surface0 rounded-xl text-latte-text focus:outline-none focus:ring-2 focus:ring-latte-peach"
        >
          <option value="all">All Categories</option>
          <option value="health">Health</option>
          <option value="police">Police</option>
          <option value="education">Education</option>
          <option value="government">Government</option>
          <option value="utilities">Utilities</option>
        </select>
      </div>
      </div>

      
        {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fe640b]" />
        </div>
        ) : filteredServices.length > 0 ? filteredServices.map((s) => {
          const Icon = categoryIcons[s.category] || Building;

          return (
            <div
              key={s._id}
              className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-6 mt-6 flex items-center justify-between"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold">{s.name}</h4>
                  <p className="text-sm text-gray-600">{s.address}</p>
                  <p className="text-xs text-gray-500">
                    {s.category} • {s.phone}
                  </p>
                </div>
              </div>
                
              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(s)}
                  className="p-2 bg-yellow-100 text-yellow-700 rounded-xl"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => remove(s._id)}
                  className="p-2 bg-red-100 text-red-600 rounded-xl"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
            </div>
          );
        }) : (
        <div className="text-center text-gray-500 py-8">
          No services found.
        </div>
      )}
      </div>
  </div>
      

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            {/* MODAL HEADER */}
            <div className="sticky top-0 bg-white border-b border-[#dce0e8] p-6 z-10  ">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fe640b] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-[#4c4f69] text-left">
                {editingService ? "Edit Service" : "Add Service"}
              </h2>
              <p className="text-[#6c6f85] text-left mt-1">
                {editingService
                  ? "Update Local Service details"
                  : "Create a new Local Service"}
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-[#6c6f85] hover:text-[#4c4f69]"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>


            {/* FORM */}
            <div className="space-y-4 p-6">
              
               
                <label className="block text-[#4c4f69] text-left mb-2">
                Service Name<span className="text-[#d20f39]">*</span>
                </label>
                <input
                type="text"
                placeholder="Enter service name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-2xl"
                required
                />
              
             
              <label className="block text-[#4c4f69] text-left mb-2">
                Phone Number <span className="text-[#d20f39]">*</span>
              </label>
              <input
                placeholder="Phone"
                className="w-full px-4 py-2 border rounded-xl"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              
                <label className="block text-[#4c4f69] text-left mb-2">
                Address <span className="text-[#d20f39]">*</span>
              </label>
              <input
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-xl"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
              
              <label className="block text-[#4c4f69] text-left mb-2">
                Working Hours <span className="text-[#d20f39]">*</span>
              </label>
              <input
                placeholder="Working Hours"
                className="w-full px-4 py-2 border rounded-xl"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({ ...formData, hours: e.target.value })
                }
                required
              />

              <label className="block text-[#4c4f69] text-left mb-2">
                Services Description <span className="text-[#d20f39]">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Services Description"
                className="w-full px-4 py-2 border rounded-xl"
                value={formData.services}
                onChange={(e) =>
                  setFormData({ ...formData, services: e.target.value })
                }
                required
              />

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
                    <option value="health">Health</option>
                    <option value="police">Police</option>
                    <option value="education">Education</option>
                    <option value="government">Government</option>
                    <option value="utilities">Utilities</option>
                </select>
             

              <button
              onClick={submit}
              disabled={saving}
              className={`w-full py-2 rounded-xl text-white ${
                saving ? "bg-gray-400 cursor-not-allowed" : "bg-[#fe640b]"
              }`}
            >
              {saving
                ? "Saving..."
                : editingService
                ? "Update Service"
                : "Save Service"}
            </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
