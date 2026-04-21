// import { useState } from "react";
// import {
//   Mail,
//   Lock,
//   User,
//   Phone,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   LucideHome,
// } from "lucide-react";
// import axios from "axios";

// const VillageRegister = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try{
//         setLoading(true);

//         const res = await axios.post(
//         "http://localhost:3000/api/users/register",
//         {
//         name: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         password: formData.password,
//         }
//         );


//       alert("Registration successful! Please login.");
//       window.location.href = "/VillageLogin";

//     }
//     catch (err) {
//       // Handle array of errors from backend
//       if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
//         setError(err.response.data.errors.join(" | "));
//       } else if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Registration failed");
//       }
//     } finally {
//       setLoading(false);
//     }
    
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br bg-orange-100 rounded-xl flex items-center justify-center p-8">
//       <div className="w-full max-w-2xl">

        
//         <div className="bg-orange-50 rounded-2xl shadow-xl p-8 md:p-12">

//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center space-x-2 mb-4">
//               <div className="w-12 h-12 bg-latte-peach rounded-xl flex items-center justify-center">
//                 <span className="text-white text-2xl">V</span>
//               </div>
//               <h1 className="text-gray-900 text-xl font-semibold">
//                 Village Digital
//               </h1>
//             </div>
//             <h2 className="text-gray-900 text-2xl font-semibold mb-2">
//               Create Your Account
//             </h2>
//             <p className="text-gray-600">
//               Join your village community today
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="grid md:grid-cols-2 gap-5">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-gray-700 mb-2">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     value={formData.fullName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, fullName: e.target.value })
//                     }
//                     placeholder="Enter your full name"
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                     placeholder="+91 XXXXX XXXXX"
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//             <label className="block text-gray-700 mb-2">Address</label>
//             <div className="relative">
//               <LucideHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
            
//             <input
//               type="text"
//               value={formData.address}
//               onChange={(e) =>
//                 setFormData({ ...formData, address: e.target.value })
//               }
//               placeholder="House no, Street, Area"
//               className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
//               required
//             />
//             </div>
//           </div>

//             {/* Email */}
//             <div>
//               <label className="block text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   placeholder="you@example.com"
//                   className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-5">
//               {/* Password */}
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={(e) =>
//                       setFormData({ ...formData, password: e.target.value })
//                     }
//                     placeholder="Create password"
//                     className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={formData.confirmPassword}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         confirmPassword: e.target.value,
//                       })
//                     }
//                     placeholder="Confirm password"
//                     className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowConfirmPassword(!showConfirmPassword)
//                     }
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff size={20} />
//                     ) : (
//                       <Eye size={20} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="flex items-start space-x-2">
//               <input
//                 type="checkbox"
//                 required
//                 className="w-4 h-4 mt-1 accent-latte-peach rounded"
//               />
//               <p className="text-gray-600 text-sm">
//                 I agree to the{" "}
//                 <span className="text-latte-peach cursor-pointer">
//                   Terms & Conditions
//                 </span>{" "}
//                 and{" "}
//                 <span className="text-latte-peach cursor-pointer">
//                   Privacy Policy
//                 </span>
//               </p>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-latte-peach text-white py-3 rounded-xl hover:bg-orange-600 transition-colors"
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>

//           {/* Login */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <button
//                 onClick={() => (window.location.href = "/VillageLogin")}
//                 className="text-latte-peach hover:underline"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default VillageRegister;

// import { useState, useEffect } from "react";
// import {
//   Mail,
//   Lock,
//   User,
//   Phone,
//   Eye,
//   EyeOff,
//   LucideHome,
//   MapPin,
//   ChevronDown,
// } from "lucide-react";
// import axios from "axios";

// const STATES = [
//   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
//   "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
//   "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
//   "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
//   "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
// ];

// const SelectField = ({ icon: Icon, label, value, onChange, options, placeholder, disabled, loading }) => (
//   <div>
//     <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
//     <div className="relative">
//       <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
//       <select
//         value={value}
//         onChange={onChange}
//         disabled={disabled || loading}
//         className={`w-full pl-11 pr-10 py-3 rounded-xl border appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors
//           ${disabled || loading ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed" : "border-gray-300 text-gray-800 cursor-pointer"}
//         `}
//       >
//         <option value="">{loading ? "Loading..." : placeholder}</option>
//         {options.map((opt) => (
//           <option key={opt} value={opt}>{opt}</option>
//         ))}
//       </select>
//       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
//     </div>
//   </div>
// );

// const VillageRegister = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Location state
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedTaluka, setSelectedTaluka] = useState("");
//   const [selectedVillage, setSelectedVillage] = useState("");

//   const [districts, setDistricts] = useState([]);
//   const [talukas, setTalukas] = useState([]);
//   const [villages, setVillages] = useState([]);

//   const [loadingDistricts, setLoadingDistricts] = useState(false);
//   const [loadingTalukas, setLoadingTalukas] = useState(false);
//   const [loadingVillages, setLoadingVillages] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Fetch Districts when State changes
//   useEffect(() => {
//     if (!selectedState) {
//       setDistricts([]);
//       setSelectedDistrict("");
//       setTalukas([]);
//       setSelectedTaluka("");
//       setVillages([]);
//       setSelectedVillage("");
//       return;
//     }
//     const fetchDistricts = async () => {
//       setLoadingDistricts(true);
//       setSelectedDistrict("");
//       setTalukas([]);
//       setSelectedTaluka("");
//       setVillages([]);
//       setSelectedVillage("");
//       try {
//         const res = await axios.get(`http://localhost:3000/api/users/districts?state=${encodeURIComponent(selectedState)}`);
//         setDistricts(res.data);
//       } catch {
//         setDistricts([]);
//       } finally {
//         setLoadingDistricts(false);
//       }
//     };
//     fetchDistricts();
//   }, [selectedState]);

//   // Fetch Talukas when District changes
//   useEffect(() => {
//     if (!selectedDistrict) {
//       setTalukas([]);
//       setSelectedTaluka("");
//       setVillages([]);
//       setSelectedVillage("");
//       return;
//     }
//     const fetchTalukas = async () => {
//       setLoadingTalukas(true);
//       setSelectedTaluka("");
//       setVillages([]);
//       setSelectedVillage("");
//       try {
//         const res = await axios.get(`http://localhost:3000/api/users/talukas?state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}`);
//         setTalukas(res.data);
//       } catch {
//         setTalukas([]);
//       } finally {
//         setLoadingTalukas(false);
//       }
//     };
//     fetchTalukas();
//   }, [selectedDistrict]);

//   // Fetch Villages when Taluka changes
//   useEffect(() => {
//     if (!selectedTaluka) {
//       setVillages([]);
//       setSelectedVillage("");
//       return;
//     }
//     const fetchVillages = async () => {
//       setLoadingVillages(true);
//       setSelectedVillage("");
//       try {
//         const res = await axios.get(`http://localhost:3000/api/users/villages?state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}&taluka=${encodeURIComponent(selectedTaluka)}`);
//         setVillages(res.data);
//       } catch {
//         setVillages([]);
//       } finally {
//         setLoadingVillages(false);
//       }
//     };
//     fetchVillages();
//   }, [selectedTaluka]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     // Build full address from dropdowns + manual address
//     const fullAddress = [
//       formData.address,
//       selectedVillage,
//       selectedTaluka,
//       selectedDistrict,
//       selectedState,
//     ].filter(Boolean).join(", ");

//     try {
//       setLoading(true);
//       await axios.post("http://localhost:3000/api/users/register", {
//         name: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         address: fullAddress,
//         password: formData.password,
//       });

//       alert("Registration successful! Please login.");
//       window.location.href = "/VillageLogin";
//     } catch (err) {
//       if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
//         setError(err.response.data.errors.join(" | "));
//       } else if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Registration failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br bg-orange-100 rounded-xl flex items-center justify-center p-8">
//       <div className="w-full max-w-2xl">
//         <div className="bg-orange-50 rounded-2xl shadow-xl p-8 md:p-12">

//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center space-x-2 mb-4">
//               <div className="w-12 h-12 bg-latte-peach rounded-xl flex items-center justify-center">
//                 <span className="text-white text-2xl">V</span>
//               </div>
//               <h1 className="text-gray-900 text-xl font-semibold">Village Digital</h1>
//             </div>
//             <h2 className="text-gray-900 text-2xl font-semibold mb-2">Create Your Account</h2>
//             <p className="text-gray-600">Join your village community today</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="grid md:grid-cols-2 gap-5">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     value={formData.fullName}
//                     onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                     placeholder="Enter your full name"
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
//                 <div className="relative">
//                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     placeholder="+91 XXXXX XXXXX"
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Manual Address Line */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">House / Street / Area</label>
//               <div className="relative">
//                 <LucideHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   value={formData.address}
//                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                   placeholder="House no, Street, Area"
//                   className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                 />
//               </div>
//             </div>

//             {/* Location Dropdowns */}
//             <div className="bg-orange-100/60 border border-orange-200 rounded-xl p-4 space-y-4">
//               <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
//                 <MapPin className="w-4 h-4 text-orange-500" />
//                 Select your location
//               </p>

//               <div className="grid md:grid-cols-2 gap-4">
//                 {/* State */}
//                 <SelectField
//                   icon={MapPin}
//                   label="State"
//                   value={selectedState}
//                   onChange={(e) => setSelectedState(e.target.value)}
//                   options={STATES}
//                   placeholder="Select State"
//                   disabled={false}
//                   loading={false}
//                 />

//                 {/* District */}
//                 <SelectField
//                   icon={MapPin}
//                   label="District"
//                   value={selectedDistrict}
//                   onChange={(e) => setSelectedDistrict(e.target.value)}
//                   options={districts}
//                   placeholder={selectedState ? "Select District" : "Select State first"}
//                   disabled={!selectedState}
//                   loading={loadingDistricts}
//                 />

//                 {/* Taluka */}
//                 <SelectField
//                   icon={MapPin}
//                   label="Taluka / Subdistrict"
//                   value={selectedTaluka}
//                   onChange={(e) => setSelectedTaluka(e.target.value)}
//                   options={talukas}
//                   placeholder={selectedDistrict ? "Select Taluka" : "Select District first"}
//                   disabled={!selectedDistrict}
//                   loading={loadingTalukas}
//                 />

//                 {/* Village */}
//                 <SelectField
//                   icon={MapPin}
//                   label="Village"
//                   value={selectedVillage}
//                   onChange={(e) => setSelectedVillage(e.target.value)}
//                   options={villages}
//                   placeholder={selectedTaluka ? "Select Village" : "Select Taluka first"}
//                   disabled={!selectedTaluka}
//                   loading={loadingVillages}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="you@example.com"
//                   className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-5">
//               {/* Password */}
//               <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     placeholder="Create password"
//                     className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={formData.confirmPassword}
//                     onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                     placeholder="Confirm password"
//                     className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   >
//                     {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="flex items-start space-x-2">
//               <input
//                 type="checkbox"
//                 required
//                 className="w-4 h-4 mt-1 accent-latte-peach rounded"
//               />
//               <p className="text-gray-600 text-sm">
//                 I agree to the{" "}
//                 <span className="text-latte-peach cursor-pointer">Terms & Conditions</span>{" "}
//                 and{" "}
//                 <span className="text-latte-peach cursor-pointer">Privacy Policy</span>
//               </p>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-latte-peach text-white py-3 rounded-xl hover:bg-orange-600 transition-colors font-medium"
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>

//           {/* Login Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Already have an account?{" "}
//               <button
//                 onClick={() => (window.location.href = "/VillageLogin")}
//                 className="text-latte-peach hover:underline"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default VillageRegister;


import { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  LucideHome,
  MapPin,
  ChevronDown,
} from "lucide-react";
import axios from "axios";

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const SelectField = ({ icon: Icon, label, value, onChange, options, placeholder, disabled, loading }) => (
  <div>
    <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
      <select
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className={`w-full pl-11 pr-10 py-3 rounded-xl border appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-colors
          ${disabled || loading ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed" : "border-gray-300 text-gray-800 cursor-pointer"}
        `}
      >
        <option value="">{loading ? "Loading..." : placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  </div>
);

const VillageRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Location state
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);

  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingTalukas, setLoadingTalukas] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  // Fetch Districts when State changes
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict("");
      setTalukas([]);
      setSelectedTaluka("");
      setVillages([]);
      setSelectedVillage("");
      return;
    }
    const fetchDistricts = async () => {
      setLoadingDistricts(true);
      setSelectedDistrict("");
      setTalukas([]);
      setSelectedTaluka("");
      setVillages([]);
      setSelectedVillage("");
      try {
        const res = await axios.get(`http://localhost:3000/api/users/districts?state=${encodeURIComponent(selectedState)}`);
        setDistricts(res.data);
      } catch {
        setDistricts([]);
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, [selectedState]);

  // Fetch Talukas when District changes
  useEffect(() => {
    if (!selectedDistrict) {
      setTalukas([]);
      setSelectedTaluka("");
      setVillages([]);
      setSelectedVillage("");
      return;
    }
    const fetchTalukas = async () => {
      setLoadingTalukas(true);
      setSelectedTaluka("");
      setVillages([]);
      setSelectedVillage("");
      try {
        const res = await axios.get(`http://localhost:3000/api/users/talukas?state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}`);
        setTalukas(res.data);
      } catch {
        setTalukas([]);
      } finally {
        setLoadingTalukas(false);
      }
    };
    fetchTalukas();
  }, [selectedDistrict]);

  // Fetch Villages when Taluka changes
  useEffect(() => {
    if (!selectedTaluka) {
      setVillages([]);
      setSelectedVillage("");
      return;
    }
    const fetchVillages = async () => {
      setLoadingVillages(true);
      setSelectedVillage("");
      try {
        const res = await axios.get(`http://localhost:3000/api/users/villages?state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}&taluka=${encodeURIComponent(selectedTaluka)}`);
        setVillages(res.data);
      } catch {
        setVillages([]);
      } finally {
        setLoadingVillages(false);
      }
    };
    fetchVillages();
  }, [selectedTaluka]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // ✅ Send location fields separately to match registerUser controller
      await axios.post("http://localhost:3000/api/users/register", {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,       // only manual house/street line
        district: selectedDistrict,      // matches controller: district
        subDistrict: selectedTaluka,     // matches controller: subDistrict
        village: selectedVillage,        // matches controller: village
        password: formData.password,
      });

      alert("Registration successful! Please login.");
      window.location.href = "/VillageLogin";
    } catch (err) {
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(err.response.data.errors.join(" | "));
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-orange-100 rounded-xl flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="bg-orange-50 rounded-2xl shadow-xl p-8 md:p-12">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-latte-peach rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">V</span>
              </div>
              <h1 className="text-gray-900 text-xl font-semibold">Village Digital</h1>
            </div>
            <h2 className="text-gray-900 text-2xl font-semibold mb-2">Create Your Account</h2>
            <p className="text-gray-600">Join your village community today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Manual Address Line */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">House / Street / Area</label>
              <div className="relative">
                <LucideHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House no, Street, Area"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* Location Dropdowns */}
            <div className="bg-orange-100/60 border border-orange-200 rounded-xl p-4 space-y-4">
              <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Select your location
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* State */}
                <SelectField
                  icon={MapPin}
                  label="State"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  options={STATES}
                  placeholder="Select State"
                  disabled={false}
                  loading={false}
                />

                {/* District */}
                <SelectField
                  icon={MapPin}
                  label="District"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  options={districts}
                  placeholder={selectedState ? "Select District" : "Select State first"}
                  disabled={!selectedState}
                  loading={loadingDistricts}
                />

                {/* Taluka → maps to subDistrict in controller */}
                <SelectField
                  icon={MapPin}
                  label="Taluka / Subdistrict"
                  value={selectedTaluka}
                  onChange={(e) => setSelectedTaluka(e.target.value)}
                  options={talukas}
                  placeholder={selectedDistrict ? "Select Taluka" : "Select District first"}
                  disabled={!selectedDistrict}
                  loading={loadingTalukas}
                />

                {/* Village */}
                <SelectField
                  icon={MapPin}
                  label="Village"
                  value={selectedVillage}
                  onChange={(e) => setSelectedVillage(e.target.value)}
                  options={villages}
                  placeholder={selectedTaluka ? "Select Village" : "Select Taluka first"}
                  disabled={!selectedTaluka}
                  loading={loadingVillages}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create password"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm password"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 accent-latte-peach rounded"
              />
              <p className="text-gray-600 text-sm">
                I agree to the{" "}
                <span className="text-latte-peach cursor-pointer">Terms & Conditions</span>{" "}
                and{" "}
                <span className="text-latte-peach cursor-pointer">Privacy Policy</span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-latte-peach text-white py-3 rounded-xl hover:bg-orange-600 transition-colors font-medium"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => (window.location.href = "/VillageLogin")}
                className="text-latte-peach hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VillageRegister;