import useUser from "@/hooks/user/useUser"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react"
import { createRecord } from "@/api/requests"

const Login = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null);;
  const [isLoading, setIsLoading] = useState(false)

  const { handleSetAccessToken } = useUser()
  const navigate = useNavigate()

  const onSubmit = async () => {
    setMessage(null)
    setIsLoading(true)
    try {
      const response = await createRecord<{email: string, password: string}, {access_token: string}>('/app/login', {email: email!, password: password!});
      handleSetAccessToken(response.access_token)
      navigate("/home")
    } catch (error) {
      setMessage("Invalid entries");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen text-black items-center justify-center bg-gradient-to-br from-primary/20 to-background px-4 py-12 sm:px-6 lg:px-8">
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
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="" className="font-medium text-primary hover:text-primary-dark transition-colors">
                Forgot your password?
              </Link>
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
              className={`group relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors text-black ${
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
          <Link to="/signup" className="font-medium text-primary hover:text-primary-dark transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

