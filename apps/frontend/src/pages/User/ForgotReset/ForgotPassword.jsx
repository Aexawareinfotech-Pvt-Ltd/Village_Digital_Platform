import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:3000/api/users/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    alert(data.message || "Check your email");
  };

  return (
    // <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
    //   <h2>Forgot Password</h2>
    //   <input
    //     type="email"
    //     placeholder="Enter email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
    //     required
    //   />
    //   <button type="submit">Send Reset Link</button>
    // </form>
    <div className="min-h-screen bg-gradient-to-br bg-orange-100 rounded-xl flex items-center justify-center p-8">
          
            <div className="w-full max-w-md">
              
             <div className="bg-orange-50 rounded-2xl shadow-xl p-8 md:p-12">
              
    
                {/* Form Title */}
                <h2 className="text-gray-900 text-2xl font-semibold mb-2">
                  Forgot-Password
                </h2>
                
    
              
              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-gray-700 mt-2 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <email size={20} />
                    </div>
                    <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-latte-peach"
                    required
                    />
                  </div>
                </div>
    
                
    
                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-latte-peach text-white py-3 rounded-xl hover:bg-orange-400 transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
    
              
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
              
    
                
              </div>
            </div>
        </div>
  );
};

export default ForgotPassword
