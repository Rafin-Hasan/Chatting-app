import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Icons for showing/hiding password
import Lottie from "lottie-react"; // Lottie for rendering animations
import LoginAnimation from "../../../public/animetion/Animation.json"; // JSON file for the login animation
import "./Login.css"; // Importing custom styles for the Login page
import { Bounce, toast } from "react-toastify"; // Toast notifications for success/error messages
import "react-toastify/dist/ReactToastify.css"; // Toastify's CSS for styling notifications
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase authentication methods
import { Link, useNavigate } from "react-router-dom"; // For navigation between pages
import { motion } from "framer-motion"; // Animation library for smooth transitions
import { useDispatch } from "react-redux"; // Redux for managing global state

const LoginPageComponent = () => {
  // useState to manage the email input value and any errors
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // useState to manage the password input value and any errors
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // useState to toggle between showing and hiding the password
  const [showPassword, setShowPassword] = useState(false);

  // Hook for navigation between pages
  const navigate = useNavigate();

  // Hook for dispatching actions to the Redux store
  const dispatch = useDispatch();

  // Firebase Authentication instance
  const auth = getAuth();

  // Function to toggle password visibility (text/password input type)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Switch between true/false
  };

  // Event handler for email input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state with input value
    setEmailError(""); // Clear any previous email errors
  };

  // Event handler for password input changes
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update password state with input value
    setPasswordError(""); // Clear any previous password errors
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Input validation: check if email and password are provided
    if (!email) {
      setEmailError("Please enter your email"); // Set error if email is missing
    } else if (!password) {
      setPasswordError("Please enter your password"); // Set error if password is missing
    } else {
      // Clear previous errors if validation passes
      setEmailError("");
      setPasswordError("");

      // Sign in the user using Firebase Authentication
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // User successfully signed in
          const user = userCredential.user;

          // Check if the user's email is verified
          if (!user.emailVerified) {
            // Show error toast if email is not verified
            toast.error("Your email is not verified", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } else {
            // Show success toast if login is successful and email is verified
            toast.success("Login successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });

            // Navigate to the chatting page after successful login
            navigate("/");

            // Dispatch the current user data to Redux store
            dispatch({ type: "SET_CURRENT_USER", payload: user });

            // Store user data in localStorage for persistence
            localStorage.setItem("userLoginData", JSON.stringify(user));
          }
        })
        .catch((error) => {
          // Handle login errors (e.g., incorrect password)
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode); // Log error code for debugging

          // If the error is an incorrect password, show the appropriate error message
          if (errorCode === "auth/wrong-password") {
            toast.error("Password is incorrect", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } else {
            // Show general error message for other errors
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        });
    }
  };

  // JSX structure for the login page
  return (
    <div className="w-[1300px] h-[700px] rounded-3xl shadow-2xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4">
      {/* Outer container with framer motion animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Initial state for animation
        animate={{ opacity: 1, scale: 1 }} // Target state for animation
        transition={{ duration: 0.8, ease: "easeInOut" }} // Animation duration and easing
        className="grid grid-cols-2 gap-10 w-full max-w-6xl bg-white shadow-2xl rounded-3xl backdrop-blur-lg bg-opacity-80"
      >
        {/* Left Column with Animation */}
        <div className="flex flex-col justify-center items-center p-10">
          {/* Lottie animation */}
          <Lottie
            animationData={LoginAnimation} // Load the Lottie animation JSON
            className="w-full h-auto max-h-96" // Styling for the animation
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
                type="email" // Email input type
                value={email} // Bind the email state
                onChange={handleEmailChange} // Update state when input changes
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 transform hover:scale-105"
                placeholder="Enter your email" // Placeholder text for email input
              />
              {/* Display email error if any */}
              {emailError && (
                <p className="mt-2 text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* Password input field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Conditional rendering for password visibility
                value={password} // Bind the password state
                onChange={handlePasswordChange} // Update state when input changes
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 transform hover:scale-105"
                placeholder="Enter your password" // Placeholder text for password input
              />
              {/* Toggle password visibility icon */}
              <div
                className="absolute inset-y-0 right-6 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility} // Toggle visibility on click
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
              {/* Display password error if any */}
              {passwordError && (
                <p className="mt-2 text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            {/* Remember me checkbox and Forgot password link */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="text-purple-600 form-checkbox focus:ring-purple-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                to="/forgetPassword" // Link to forgot password page
                className="text-sm text-purple-500 hover:text-purple-700 transition-all duration-300"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button with framer motion animation */}
            <motion.button
              whileHover={{ scale: 1.05 }} // Animation on hover
              whileTap={{ scale: 0.95 }} // Animation on tap/click
              type="submit" // Form submit button
              className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
            >
              Login
            </motion.button>

            {/* Redirect to register page */}
            <div className="text-center mt-6">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link
                  to="/registration" // Link to registration page
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

export default LoginPageComponent;
