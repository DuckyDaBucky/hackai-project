import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(formData.confirmPassword === formData.password)) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (isLogin) {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.log(error);
        return -1;
      }
      data;
    } else {
      let { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.log(error);
        return -1;
      }
      data;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-2xl w-full mx-auto flex bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Left side - Image or Logo */}
        <div className="hidden lg:block w-1/2 bg-indigo-700 p-12">
          <div className="h-full flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 px-12 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                />
              </div>
              {!isLogin && (
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-150 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p
            onClick={() => setIsLogin(!isLogin)}
            className="mt-6 text-center text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </p>
          {errorMessage && (
            <div className="mt-6 p-4 text-red-200 bg-red-900/50 border border-red-800 rounded-lg text-center text-sm">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
