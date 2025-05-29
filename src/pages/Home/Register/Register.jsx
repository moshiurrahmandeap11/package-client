import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Slide } from "react-awesome-reveal";
import registerAnimation from "../../../assets/lotties/register.json";
import { useAuth } from "../../../hooks/Hooks";
import { useNavigate } from "react-router";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [errors, setErrors] = useState({});
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const validate = ({ name, number, password, confirmpassword }) => {
    const newErrors = {};

    // Name Validation (only letters and spaces)
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    // Phone Validation (10-15 digits)
    if (!number.trim()) {
      newErrors.number = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(number)) {
      newErrors.number = "Phone number must be 10 to 15 digits";
    }

    // Password Validation (1 uppercase, 1 lowercase, min 6 chars)
    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])/.test(password) ||
      !/(?=.*[A-Z])/.test(password) ||
      password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters with 1 uppercase and 1 lowercase letter";
    }

    // Confirm Password match
    if (confirmpassword !== password) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    return newErrors;
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { name, number, password, confirmpassword, email } =
      Object.fromEntries(formData.entries());

    const validationErrors = validate({
      name,
      number,
      password,
      confirmpassword,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const result = await createUser(email, password);
        const firebaseUid = (result.user.uid);
        await sendEmailVerification(result.user);
        const userInfo = {
          name,
          number,
          email,
          firebaseUid,
        };
        axios.post("http://localhost:3000/users", userInfo).then((res) => {
          console.log(res.data);
        });
        navigate("/");
        toast.warn("Verification email sent! Check your inbox.");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-5xl bg-white bg-opacity-90 backdrop-blur-md border border-green-200 shadow-lg rounded-2xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10">
          <Slide direction="left" triggerOnce>
            <h2 className="text-3xl font-extrabold text-green-600 mb-6 text-center sm:text-left">
              Create Your Account 🌿
            </h2>
            <form onSubmit={handleSignUp} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-green-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="number"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.number ? "border-red-500" : "border-green-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Phone number"
                />
                {errors.number && (
                  <p className="mt-1 text-red-500 text-sm">{errors.number}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-green-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.confirmpassword
                      ? "border-red-500"
                      : "border-green-300"
                  } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Confirm password"
                />
                {errors.confirmpassword && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.confirmpassword}
                  </p>
                )}
              </div>

              <button
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                type="submit"
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-green-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-green-800 hover:underline font-semibold"
              >
                Log In
              </a>
            </p>
          </Slide>
        </div>

        {/* Lottie Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-green-100">
          <Player
            autoplay
            loop
            src={registerAnimation}
            className="w-64 h-64 sm:w-80 sm:h-80"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
