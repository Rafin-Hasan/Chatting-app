import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react"; // Lottie for animation
import LoginAnimation from "./../../../public/animetion/Animation.json"; // JSON animation file
import "./Home.css";
import { Bounce, toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth methods
import { Link } from "react-router-dom"; // For navigation between pages
import { motion } from "framer-motion"; // Framer motion for animations

const LoginPage = () => {
  // useState for email and its error handling
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const auth = getAuth(); // Initialize Firebase Auth

  // useState for password and its error handling
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear error message when user starts typing
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(""); // Clear error message when user starts typing
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form inputs
    if (!email) {
      setEmailError("Please enter your email");
    } else if (!password) {
      setPasswordError("Please enter your password");
    } else {
      setEmailError(""); // Clear email error if validation passes
      setPasswordError(""); // Clear password error if validation passes

      // Firebase Sign-In method
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user; // Extract user data
          console.log(user);

          // Check if email is verified
          if (!user.emailVerified) {
            toast.error("Your email is not verified", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          } else {
            toast.success("Login successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code; // Firebase error code

          // Handle specific error codes
          if (errorCode === "auth/invalid-credential") {
            toast.error("Password is incorrect", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }
        });
    }
  };

  // JSX for the login page
  return (
    <div className="w-[1300px] h-[700px] rounded-3xl shadow-2xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4">
      {/* Outer container with framer motion animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="grid grid-cols-2 gap-10 w-full max-w-6xl bg-white shadow-2xl rounded-3xl backdrop-blur-lg bg-opacity-80"
      >
        {/* Left Column with Animation */}
        <div className="flex flex-col justify-center items-center p-10">
          {/* Lottie animation */}
          <Lottie
            animationData={LoginAnimation}
            className="w-full h-auto max-h-96"
          />
          <h2 className="text-4xl font-bold text-center text-purple-600 mt-4">
            Welcome Back!
          </h2>
          <p className="text-lg text-center text-gray-600 mt-2">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Right Column with Login Form */}
        <div className="flex flex-col justify-center p-10">
          <h1 className="text-4xl font-extrabold text-purple-600 mb-8">
            Sign In
          </h1>
          {/* Login form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email input field */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 transform hover:scale-105"
                placeholder="Enter your email"
              />
              {/* Display email error */}
              {emailError && (
                <p className="mt-2 text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* Password input field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 transform hover:scale-105"
                placeholder="Enter your password"
              />
              {/* Toggle password visibility */}
              <div
                className="absolute inset-y-0 right-6 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
              {/* Display password error */}
              {passwordError && (
                <p className="mt-2 text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            {/* Remember me and forgot password links */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="text-purple-600 form-checkbox focus:ring-purple-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                to="/forgetPassword"
                className="text-sm text-purple-500 hover:text-purple-700 transition-all duration-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button with framer motion animation */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
            >
              Login
            </motion.button>

            {/* Redirect to register page */}
            <div className="text-center mt-6">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link
                  to="/registration"
                  className="font-bold text-purple-500 hover:text-purple-700 transition-all duration-300"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
