import useUser from "@/hooks/user/useUser"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react"
import { createRecord } from "@/api/requests"

const Login = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { handleSetAccessToken } = useUser()
  const navigate = useNavigate()

  const onSubmit = async () => {
    setMessage(null)
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("email", email!)
      formData.append("password", password!)

      const response = await createRecord<FormData, { access_token: string }>("/app/login", formData)

      handleSetAccessToken(response.access_token)
      navigate("/home")
    } catch (error) {
      setMessage("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const hexagonalPattern = {
    "--s": "92px",
    "--c1": "#f2f2f2",
    "--c2": "#c2d4ff",
    "--c3": "#2563eb",
    "--_g": "0 120deg,#0000 0",
    background: `
      conic-gradient(at calc(250%/3) calc(100%/3),var(--c3) var(--_g)),
      conic-gradient(from -120deg at calc(50%/3) calc(100%/3),var(--c2) var(--_g)),
      conic-gradient(from 120deg at calc(100%/3) calc(250%/3),var(--c1) var(--_g)),
      conic-gradient(from 120deg at calc(200%/3) calc(250%/3),var(--c1) var(--_g)),
      conic-gradient(from -180deg at calc(100%/3) 50%,var(--c2) 60deg,var(--c1) var(--_g)),
      conic-gradient(from 60deg at calc(200%/3) 50%,var(--c1) 60deg,var(--c3) var(--_g)),
      conic-gradient(from -60deg at 50% calc(100%/3),var(--c1) 120deg,var(--c2) 0 240deg,var(--c3) 0)
    `,
    backgroundSize: "calc(var(--s)*1.732) var(--s)",
  } as React.CSSProperties

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Hexagonal pattern */}
      <div className="md:w-1/2 fixed top-0 left-0 w-full md:relative h-64 md:h-auto" style={hexagonalPattern} />

      {/* Login form */}
      <div className="w-full md:w-1/2 z-10 md:mt-0 mt-20 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-center text-sm text-gray-600">Sign in to your account</p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email-address"
                  type="email"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {message && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{message}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  !email || !password || isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

