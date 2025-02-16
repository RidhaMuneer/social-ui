import useUser from "@/hooks/user/useUser"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, ArrowRight, Loader2, User, Camera } from "lucide-react"
import { createRecord } from "@/api/requests"

const Registration = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()
  const [selectedImage, setSelectedImage] = useState<string | null>("/User-avatar.png")
  const [file, setFile] = useState<File>()
  const { handleSetAccessToken } = useUser()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    if (!file) {
      setError("file", {
        type: "manual",
        message: "Please provide a profile picture",
      })
      return
    }
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("file", file)

    try {
      const response = await createRecord<FormData, {access_token: string}>('/app/register', formData)
      handleSetAccessToken(response.access_token)
      navigate("/home")
    } catch (error) {
      setError("api", {
        type: "manual",
        message: "Registration failed. Please try again.",
      })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
      setFile(file)
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

      {/* Registration form */}
      <div className="w-full md:w-1/2 z-10 md:mt-0 mt-20 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an Account</h1>
            <p className="mt-2 text-center text-sm text-gray-600">Join our community today</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center flex-col mb-6">
              <div className="relative">
                <img
                  src={selectedImage! || "/placeholder.svg"}
                  alt="Selected"
                  className="rounded-full w-24 h-24 object-cover border-4 border-blue-500"
                  onClick={() => document.getElementById("fileInput")?.click()}
                  style={{ cursor: "pointer" }}
                />
                <div
                  className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </div>
              <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} accept="image/*" />
              <label className="mt-2 text-sm text-gray-600">Choose a profile picture</label>
            </div>
            {errors.file && <p className="text-sm text-red-600">{errors.file.message as string}</p>}
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("username", { required: "Username is required" })}
                />
              </div>
              {errors.username && <p className="text-sm text-red-600">{errors.username.message as string}</p>}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email.message as string}</p>}

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password.message as string}</p>}
            </div>

            {errors.api && <p className="text-sm text-red-600">{errors.api.message as string}</p>}

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Registering...
                  </>
                ) : (
                  <>
                    Sign up
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration

