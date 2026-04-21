import { Shield, User, Mail, Phone, Lock, MapPin, Eye, Users, Search, Trash, Send, Loader2, Pencil, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:3000/api/admin';

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const SelectField = ({ icon: Icon, label, value, onChange, options, placeholder, disabled, loading }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none" />
      <select
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className={`w-full pl-10 pr-8 py-3 rounded-lg border appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors
          ${disabled || loading
            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-gray-200 bg-gray-50 text-gray-800 cursor-pointer focus:bg-white'
          }`}
      >
        <option value="">{loading ? 'Loading...' : placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  </div>
);

// ─── API helpers ──────────────────────────────────────────────────────────────
const api = {
  getAdmins: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/village-admins`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch admins');
    return res.json();
  },

  createAdmin: async (data) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/village-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create admin');
    return json;
  },

  updateAdmin: async (id, data) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/village-admin/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update admin');
    return json;
  },

  deleteAdmin: async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/village-admin/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete admin');
    return json;
  },

  getDistricts: async (state) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/api/users/districts?state=${encodeURIComponent(state)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch districts');
    return res.json();
  },

  getTalukas: async (state, district) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:3000/api/users/talukas?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error('Failed to fetch talukas');
    return res.json();
  },

  getVillages: async (state, district, taluka) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:3000/api/users/villages?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&taluka=${encodeURIComponent(taluka)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error('Failed to fetch villages');
    return res.json();
  },
};

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium min-w-72 ${
            t.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          <span className="flex-1">{t.message}</span>
          <button onClick={() => onRemove(t.id)} className="opacity-70 hover:opacity-100">✕</button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  return { toasts, addToast, removeToast };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function MasterAdmin({ activeSection, onSectionChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluka, setSelectedTaluka] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);

  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingTalukas, setLoadingTalukas] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  const emptyForm = {
    fullName: '', phone: '', email: '', password: '', notificationEmail: ''
  };
  const [formData, setFormData] = useState(emptyForm);

  const activeTab = activeSection === 'Assign village Admin' ? 'assign' : 'manage';

  useEffect(() => { fetchAdmins(); }, []);

  const fetchAdmins = async () => {
    setFetching(true);
    try {
      const data = await api.getAdmins();
      setAdmins(data.map(a => ({ ...a, id: a._id || a.id })));
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!selectedState) {
      setDistricts([]); setSelectedDistrict('');
      setTalukas([]); setSelectedTaluka('');
      setVillages([]); setSelectedVillage('');
      return;
    }
    const load = async () => {
      setLoadingDistricts(true);
      setSelectedDistrict(''); setTalukas([]); setSelectedTaluka(''); setVillages([]); setSelectedVillage('');
      try { setDistricts(await api.getDistricts(selectedState)); }
      catch { setDistricts([]); }
      finally { setLoadingDistricts(false); }
    };
    load();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedDistrict) {
      setTalukas([]); setSelectedTaluka('');
      setVillages([]); setSelectedVillage('');
      return;
    }
    const load = async () => {
      setLoadingTalukas(true);
      setSelectedTaluka(''); setVillages([]); setSelectedVillage('');
      try { setTalukas(await api.getTalukas(selectedState, selectedDistrict)); }
      catch { setTalukas([]); }
      finally { setLoadingTalukas(false); }
    };
    load();
  }, [selectedDistrict]);

  useEffect(() => {
    if (!selectedTaluka) { setVillages([]); setSelectedVillage(''); return; }
    const load = async () => {
      setLoadingVillages(true); setSelectedVillage('');
      try { setVillages(await api.getVillages(selectedState, selectedDistrict, selectedTaluka)); }
      catch { setVillages([]); }
      finally { setLoadingVillages(false); }
    };
    load();
  }, [selectedTaluka]);

  useEffect(() => {
    if (activeTab === 'assign' && !editingAdmin) {
      setSelectedState(''); setSelectedDistrict(''); setSelectedTaluka(''); setSelectedVillage('');
    }
  }, [activeTab]);

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const password = Array.from({ length: 12 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    setFormData(f => ({ ...f, password }));
  };

  const openDeleteDialog = (admin) => { setAdminToDelete(admin); setShowDeleteDialog(true); };

  const handleDeleteAdmin = async () => {
    if (!adminToDelete) return;
    setLoading(true);
    try {
      await api.deleteAdmin(adminToDelete.id || adminToDelete._id);
      setAdmins(prev => prev.filter(a => (a.id || a._id) !== (adminToDelete.id || adminToDelete._id)));
      addToast(`"${adminToDelete.name}" deleted successfully`);
      setShowDeleteDialog(false);
      setAdminToDelete(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      fullName: admin.name,
      phone: admin.phone,
      email: admin.email,
      password: '',
      notificationEmail: '',
    });
    setSelectedState(admin.state || 'Gujarat');
    setSelectedDistrict(admin.district || '');
    setSelectedTaluka(admin.subDistrict || '');
    setSelectedVillage(admin.village || '');
    onSectionChange('Assign village Admin');
  };

  const handleAssignAdmin = async () => {
    if (!formData.fullName || !formData.phone || !formData.email || !selectedVillage) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    if (!editingAdmin && !formData.password) {
      addToast('Password is required for new admins', 'error');
      return;
    }

    setSubmitLoading(true);
    try {
      if (editingAdmin) {
        // ── UPDATE — notificationEmail not relevant for edit ──────────────────
        const { admin } = await api.updateAdmin(
          editingAdmin.id || editingAdmin._id,
          {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            district: selectedDistrict,
            subDistrict: selectedTaluka,
            village: selectedVillage,
            state: selectedState,
          }
        );
        setAdmins(prev =>
          prev.map(a =>
            (a.id || a._id) === (editingAdmin.id || editingAdmin._id)
              ? { ...admin, id: admin._id || admin.id }
              : a
          )
        );
        addToast('Admin updated successfully');

      } else {
        // ── CREATE — send notificationEmail to backend ────────────────────────
        const { admin, message } = await api.createAdmin({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          notificationEmail: formData.notificationEmail,  // ← sent to backend
          district: selectedDistrict,
          subDistrict: selectedTaluka,
          village: selectedVillage,
          state: selectedState,
        });
        setAdmins(prev => [{ ...admin, id: admin._id || admin.id }, ...prev]);
        addToast(message || 'Admin assigned & credentials sent successfully');
      }

      setFormData(emptyForm);
      setEditingAdmin(null);
      setSelectedState('');
      setSelectedDistrict('');
      setSelectedTaluka('');
      setSelectedVillage('');
      onSectionChange('Manage village Admin');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingAdmin(null);
    setFormData(emptyForm);
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTaluka('');
    setSelectedVillage('');
    onSectionChange('Manage village Admin');
  };

  const filteredAdmins = admins.filter(admin =>
    admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.village?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Toast toasts={toasts} onRemove={removeToast} />

      <div className="p-8">
        {activeTab === 'manage' ? (
          /* ─── Manage Tab ─────────────────────────────────────────────────── */
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-orange-500" />
                  <h1 className="text-3xl font-bold">Manage Village Admins</h1>
                </div>
                <p className="text-gray-600">View and manage all administrators assigned to specific villages.</p>
              </div>
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, village, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {fetching ? (
                <div className="flex items-center justify-center py-20 gap-3 text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                  <span>Loading admins...</span>
                </div>
              ) : filteredAdmins.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  {searchQuery ? 'No admins match your search.' : 'No village admins found.'}
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {['Admin Name', 'Contact Info', 'Village', 'Sub District', 'District', 'Actions'].map(h => (
                        <th key={h} className="text-left px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAdmins.map((admin) => (
                      <tr key={admin.id || admin._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-semibold text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">Role: {admin.role}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm text-gray-900">{admin.email}</div>
                          <div className="text-sm text-gray-500">{admin.phone}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                            {admin.village}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-900">{admin.subDistrict}</td>
                        <td className="px-6 py-5 text-sm text-gray-900">{admin.district}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleEditAdmin(admin)} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit Admin">
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button onClick={() => openDeleteDialog(admin)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Admin">
                              <Trash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        ) : (
          /* ─── Assign / Edit Tab ──────────────────────────────────────────── */
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-orange-500" />
                <h1 className="text-3xl font-bold">{editingAdmin ? 'Edit' : 'Assign'} Village Admin</h1>
              </div>
              <p className="text-gray-600">
                {editingAdmin
                  ? 'Update administrator information and village assignment.'
                  : 'Create new administrative accounts for specific villages. Credentials will be automatically emailed to the admin.'}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">

              {/* Section 1: Credentials */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-center mb-6 pb-3 border-b-2 border-gray-300">
                  1. Admin Credentials
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="E.g., Ramesh Bhai"
                        value={formData.fullName}
                        onChange={(e) => setFormData(f => ({ ...f, fullName: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="10 digit active phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email Address (For Login)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="admin@village.com"
                        value={formData.email}
                        onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Send Credentials To (Optional)</label>
                    <div className="relative">
                      <Send className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="notification@email.com (optional)"
                        value={formData.notificationEmail}
                        onChange={(e) => setFormData(f => ({ ...f, notificationEmail: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Leave blank to send to admin email</p>
                  </div>
                </div>

                {!editingAdmin && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Account Password</label>
                      <button onClick={handleGeneratePassword} className="text-sm text-orange-500 font-medium hover:text-orange-600">
                        Generate Secure
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter or generate password"
                        value={formData.password}
                        onChange={(e) => setFormData(f => ({ ...f, password: e.target.value }))}
                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                      />
                      <button onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Village Assignment */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-center mb-6 pb-3 border-b-2 border-gray-300">
                  2. Village Assignment
                </h2>

                <div className="bg-orange-100/60 border border-orange-200 rounded-xl p-4 space-y-4">
                  <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    Select village location
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      icon={MapPin} label="State"
                      value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
                      options={STATES} placeholder="Select State"
                    />
                    <SelectField
                      icon={MapPin} label="District"
                      value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}
                      options={districts} placeholder={selectedState ? 'Select District' : 'Select State first'}
                      disabled={!selectedState} loading={loadingDistricts}
                    />
                    <SelectField
                      icon={MapPin} label="Taluka / Sub District"
                      value={selectedTaluka} onChange={(e) => setSelectedTaluka(e.target.value)}
                      options={talukas} placeholder={selectedDistrict ? 'Select Taluka' : 'Select District first'}
                      disabled={!selectedDistrict} loading={loadingTalukas}
                    />
                    <SelectField
                      icon={MapPin} label="Village To Manage"
                      value={selectedVillage} onChange={(e) => setSelectedVillage(e.target.value)}
                      options={villages} placeholder={selectedTaluka ? 'Select Village' : 'Select Taluka first'}
                      disabled={!selectedTaluka} loading={loadingVillages}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleAssignAdmin}
                  disabled={submitLoading}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  {submitLoading
                    ? <><Loader2 className="w-5 h-5 animate-spin" />{editingAdmin ? 'Updating...' : 'Assigning...'}</>
                    : <><Shield className="w-5 h-5" />{editingAdmin ? 'Update Admin' : 'Assign Admin & Send Credentials'}</>
                  }
                </button>
                {editingAdmin && (
                  <button
                    onClick={handleCancelEdit}
                    disabled={submitLoading}
                    className="bg-gray-500 hover:bg-gray-600 disabled:opacity-60 text-white font-medium px-8 py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      {showDeleteDialog && adminToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <Trash className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-gray-900 text-lg font-semibold">Delete Admin?</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>"{adminToDelete.name}"</strong> from {adminToDelete.village}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteDialog(false); setAdminToDelete(null); }}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAdmin}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Deleting...</> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}