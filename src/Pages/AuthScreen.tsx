import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import logoSrc from "../assets/Logo.png"


export default function AuthScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && formData.confirmPassword !== formData.password) {
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
        setErrorMessage(error.message);
        return;
      }
      data;
    } else {
      let { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        console.log(error);
        setErrorMessage(error.message);
        return;
      }
      data;
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      let redirectPath = "/"
      if (location.state?.fromLoading) redirectPath = "/report"

      const { data, error } = isLogin
        ? await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })
        : await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
          })

      if (error) throw error
      if (data.session || data.user) navigate(redirectPath)
    } catch (err: any) {
      setErrorMessage(err.message || "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-cloud font-body text-graySlate">
      <div className="flex flex-grow items-center justify-center py-16">
        <div className="flex w-full max-w-4xl rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-cloud via-paleLavender to-mintWash">
          {/* Left side - Branding */}
          <div className="hidden lg:flex w-1/2 text-white p-10 flex-col justify-center items-start">
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="logo" className="w-10 h-10" />
              <h1 className="text-3xl font-bold font-heading text-graySlate hover:scale-105 transition-transform duration-300 cursor-pointer">Alfred.AI</h1>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-1/2 p-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-graySlate font-heading">
                {isLogin ? "Sign In" : "Create Account"}
              </h2>
              <Link to="/" className="text-sm text-plum hover:scale-105 hover:text-plum/80 transition-transform duration-200">
                Home
              </Link>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-plum"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-plum"
                />
                {!isLogin && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-plum"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cloud text-graySlate py-3 rounded-md shadow hover:bg-paleLavender transition" ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading
                  ? "Loading..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            <p
              onClick={() => setIsLogin(!isLogin)}
              className="mt-6 text-center text-sm text-plum hover:text-plum/80 cursor-pointer"
            >

              {isLogin
                ? "Need an account? Sign up"
                : "Already have an account? Sign in"}
            </p>

            {errorMessage && (
              <div className="mt-6 p-4 text-red-700 bg-red-200 border border-red-300 rounded-lg text-center text-sm">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <footer className="w-full text-center text-sm text-graySlate/70 py-6 bg-cloud">
  <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
    <p>&copy; 2025 Alfred.AI. All rights reserved.</p>
    <p>
      Questions? <a href="mailto:support@alfred.ai" className="text-plum hover:underline">Contact us</a>
    </p>
    <p>
      Connect: <a href="https://linkedin.com/in/alfred-ai" target="_blank" className="text-plum hover:underline">LinkedIn</a> |
      <a href="https://github.com/alfred-ai" target="_blank" className="text-plum hover:underline">GitHub</a>
    </p>
  </div>
</footer>
    </div>
  );
};


      {/* Footer */}
      <footer className="w-full text-center text-sm text-graySlate/70 py-6 bg-cloud">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
          <p>&copy; 2025 Alfred.AI. All rights reserved.</p>
          <p>
            Questions?{" "}
            <a
              href="mailto:support@alfred.ai"
              className="text-plum hover:underline"
            >
              Contact us
            </a>
          </p>
          <p>
            Connect:{" "}
            <a
              href="https://linkedin.com/in/alfred-ai"
              target="_blank"
              className="text-plum hover:underline"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/alfred-ai"
              target="_blank"
              className="text-plum hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
