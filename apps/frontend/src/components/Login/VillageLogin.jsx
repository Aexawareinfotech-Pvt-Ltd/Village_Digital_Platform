import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";

const VillageLogin = () => {
  const [userType, setUserType] = useState("user"); // 'user' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
        setLoading(true);
   const res = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );

    const { token, role } = res.data;

      // Store token & role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "Admin") {
        window.location.href = "/AdminDashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br bg-orange-100 rounded-xl flex items-center justify-center p-8">
      
        <div className="w-full max-w-md">
          
         <div className="bg-orange-50 rounded-2xl shadow-xl p-8 md:p-12">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-latte-peach rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">V</span>
              </div>
              <h1 className="text-gray-900 text-xl font-semibold">
                Village Digital
              </h1>
              
            </div>

            {/* Form Title */}
            <h2 className="text-gray-900 text-2xl font-semibold mb-2">
              User Login
            </h2>
            <p className="text-gray-600 mb-6">
             Login to access your account
            </p>

          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mt-2 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              
              <a
                href="/forgot-password"
                className="text-orange-400 hover:text-latte-peach text-sm"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-latte-peach text-white py-3 rounded-xl hover:bg-orange-400 transition-colors"
            >
              {userType === "user" ? "Sign In" : "Access Admin Portal"}
            </button>
          </form>

          {/* Register Link */}
          {userType === "user" && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => (window.location.href = "/VillageRegister")}
                  className="text-orange-400 hover:text-latte-peach font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
          )}

            {/* Error Message */}
            <div className="mt-4 text-center">
                {error && <p className="text-red-500">{error}</p>}
            </div>   
          </div>
        </div>
      

      
    </div>
  );
}

export default VillageLogin;
