import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";

const VillageRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try{
        setLoading(true);

        const res = await axios.post(
        "http://localhost:3000/api/users/register",
        {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        }
        );


      alert("Registration successful! Please login.");
      window.location.href = "/VillageLogin";

    }
    catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
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
              <h1 className="text-gray-900 text-xl font-semibold">
                Village Digital
              </h1>
            </div>
            <h2 className="text-gray-900 text-2xl font-semibold mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600">
              Join your village community today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
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

            <div className="grid md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Create password"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm password"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
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
                <span className="text-latte-peach cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-latte-peach cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-latte-peach text-white py-3 rounded-xl hover:bg-orange-400 transition-colors"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
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
