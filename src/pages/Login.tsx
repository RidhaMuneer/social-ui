// icons
import useUser from "@/hooks/user/useUser";
import EyeIcon from "@/icons/EyeIcon";

// react
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { handleSetAccessToken } = useUser();

  const navigate = useNavigate();

  const onSubmit = async () => {
    setMessage(null);
    const formData = new FormData();
    formData.append("username", email!);
    formData.append("password", password!);
    const response = await fetch("http://127.0.0.1:8000/app/login", {
      method: "POST",
      body: formData
    });
    if (response.ok) {
      const responseJson = await response.json();
      handleSetAccessToken(responseJson.access_token);
      navigate("/home");
    } else {
      setMessage("Invalid email or password");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
        </div>
        <section className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                required
                className="relative block w-full text-black rounded-t-md border px-3 py-2 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="relative block w-full rounded-b-md border px-3 py-2 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm text-black"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="absolute bottom-1 right-1 h-7 w-7">
                  <EyeIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle password visibility</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to=""
                className="font-medium text-primary hover:text-primary-foreground"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          {message !== null && (
            <div className="flex justify-start">
              <p className="text-red-600">{message}</p>
            </div>
          )}
          <div>
            <button
              className={`w-full bg-white text-black rounded py-1 ${
                email !== null || password !== null
                  ? "cursor-not-allowed"
                  : ""
              }`}
              onClick={onSubmit}
            >
              Sign in
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Login;
