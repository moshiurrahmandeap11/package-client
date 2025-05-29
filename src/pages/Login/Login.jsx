import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Slide } from "react-awesome-reveal";
import loginAnimation from "../../assets/lotties/login.json";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/Hooks";
import { toast } from "react-toastify";

const Login = () => {
  const location = useLocation();
  const emailFromSignup = location.state?.email || "";
  const { userLogin, user } = useAuth();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      toast.warn("Please fill in both email and password.");
      return;
    }

    if (user) {
      return toast.warn("Already Logged In");
    } else {
      userLogin(email, password)
        .then((loggedInUser) => {
          // assuming loggedInUser.user.email contains the email
          if (loggedInUser.user.email === "moshiurrahmandeap@gmail.com") {
            navigate("/admin-dashboard");
          } else {
            navigate(from, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Login failed. Please check your credentials.");
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full p-10 max-w-4xl bg-transparent backdrop-blur-3xl border border-gray-50/10 shadow-2xl rounded-2xl overflow-hidden">
        {/* Lottie Animation */}
        <div className="md:w-1/2 bg-green-100 flex items-center justify-center p-6">
          <Player
            autoplay
            loop
            src={loginAnimation}
            style={{ height: "300px", width: "300px" }}
          />
        </div>

        {/* Login Form */}
        <div className="md:w-1/2 p-6">
          <Slide direction="right" triggerOnce>
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Welcome Back!
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={emailFromSignup}
                  autoComplete="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="password"
                />
              </div>
              <button
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              >
                Log In
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-green-600 hover:underline">
                Sign up
              </Link>
            </p>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Login;
