import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, DollarSign, User } from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await register(name, email, password);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("User already exists. Please login.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Registration failed. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 text-white p-4 rounded-full mb-4 shadow-lg">
            <DollarSign size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">ExpenseTracker</h1>
          <p className="text-gray-500 mt-2">Manage your finances with ease</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="p-6 bg-blue-600 text-white">
            <h2 className="text-2xl font-semibold">Create Account</h2>
            <p className="text-blue-100 mt-1">Sign up to start tracking your expenses</p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 p-3 rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>

            <div className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </div>

        {/* Privacy Note */}
        <div className="text-center text-gray-500 text-xs mt-6 max-w-sm mx-auto">
          By creating an account, you agree to our 
          <Link to="/terms" className="text-blue-600 hover:underline mx-1">Terms of Service</Link>
          and
          <Link to="/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</Link>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2025 ExpenseTracker. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;