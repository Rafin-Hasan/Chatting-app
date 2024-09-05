import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import LoginAnimation from "../../../public/animetion/Registration.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

const RegistrationPageComponent = () => {
  // ========== State for inputs ==========
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loader, setLoader] = useState(false); // Loader for form submission

  // Show/hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ========== Firebase setup ==========
  const auth = getAuth();
  const navigate = useNavigate();

  // ========== Handlers for form fields ==========
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  // ========== Form submission handler ==========
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!firstName) {
      setFirstNameError("Please enter your first name");
    } else if (!email) {
      setEmailError("Please enter your email");
    } else if (!password) {
      setPasswordError("Please enter your password");
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please enter your confirm password");
    } else if (password !== confirmPassword) {
      // If passwords do not match
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      // Form validation successful, show loader
      setLoader(true);

      // ========== Firebase Create Account ==========
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setLoader(false); // Hide loader after account creation

          // Success toast message
          toast.success("Verification email sent", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Bounce,
          });

          // Update user profile with display name
          updateProfile(auth.currentUser, {
            displayName: firstName,
            photoURL:
              "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
          });

          // Send email verification
          sendEmailVerification(auth.currentUser);

          // Navigate to login page
          navigate("/login");
        })
        .catch((error) => {
          setLoader(false); // Hide loader in case of error
          const errorCode = error.code;

          // Handle specific Firebase errors
          if (errorCode === "auth/email-already-in-use") {
            toast.error("Email is already in use", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              transition: Bounce,
            });
          } else if (errorCode === "auth/weak-password") {
            toast.error("Use a stronger password", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              transition: Bounce,
            });
          }
        });
    }
  };

  // ========== JSX Return ==========
  return (
    <div className="w-[1300px] h-[700px] rounded-3xl shadow-2xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 px-4">
      {/* Outer container with two columns for landscape layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="grid grid-cols-2 gap-10 w-full max-w-6xl bg-white shadow-2xl rounded-3xl backdrop-blur-lg bg-opacity-80"
      >
        {/* Left Column with Animation and Welcome Text */}
        <div className="flex flex-col justify-center items-center p-10">
          <Lottie
            animationData={LoginAnimation}
            className="w-full h-auto max-h-96"
          />
          <h2 className="text-4xl font-bold text-center text-purple-600 mt-4">
            Create Your Account
          </h2>
          <p className="text-lg text-center text-gray-600 mt-2">
            Join us and explore new experiences.
          </p>
        </div>

        {/* Right Column with Registration Form */}
        <div className="flex flex-col justify-center p-10">
          <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-8">
            Register
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name Input */}
            <div className="relative">
              <input
                type="text"
                value={firstName}
                onChange={handleFirstName}
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 transform hover:scale-105"
                placeholder="First Name"
              />
              {firstNameError && (
                <p className="mt-2 text-red-500 text-sm">{firstNameError}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleEmail}
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 transform hover:scale-105"
                placeholder="Email"
              />
              {emailError && (
                <p className="mt-2 text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 transform hover:scale-105"
                placeholder="Password"
              />
              <div
                className="absolute inset-y-0 right-6 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
              {passwordError && (
                <p className="mt-2 text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 transform hover:scale-105"
                placeholder="Confirm Password"
              />
              <div
                className="absolute inset-y-0 right-6 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
              {confirmPasswordError && (
                <p className="mt-2 text-red-500 text-sm">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            {/* Loader or Submit Button */}
            {loader ? (
              <div className="flex justify-center items-center w-full h-[45px] active:scale-105 transition-all border-none outline-none shadow-md cursor-pointer text-[17px] text-[#333] font-semibold rounded-[40px] bg-white">
                <BeatLoader /> {/* Spinner during loading */}
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
              >
                Sign Up {/* Submit Button */}
              </motion.button>
            )}

            {/* Already Have Account Link */}
            <div className="text-center mt-6">
              <p className="text-sm">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-bold text-purple-500 hover:text-purple-700 transition-all duration-300"
                >
                  Login {/* Redirect to Login page */}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationPageComponent;
