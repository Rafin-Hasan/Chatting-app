import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { motion } from "framer-motion";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please provide your email");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Email sent to reset your password", {
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
          navigate("/login");
        })
        .catch((error) => {});
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  return (
    <div className="w-[700px] h-[600px] rounded-3xl flex flex-col justify-center sm:py-12 bg-gradient-to-br from-purple-500 to-indigo-500 overflow-hidden">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-600 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className="relative px-8 py-10 bg-white shadow-2xl sm:rounded-3xl sm:p-20 backdrop-filter backdrop-blur-lg bg-opacity-70"
        >
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Reset Your Password
            </h1>
            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="appearance-none block w-full px-5 py-3 border border-gray-300 rounded-full shadow-lg placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-all duration-300 ease-in-out transform hover:scale-105"
                    placeholder="Enter your email"
                  />
                </div>
                {errorMessage && (
                  <div className="w-full mt-2 text-red-500">
                    <p>{errorMessage}</p>
                  </div>
                )}
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 ease-in-out"
                >
                  Send Verification Email
                </motion.button>
              </div>
              <div className="w-full h-full flex justify-center mt-6">
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-800 transition-all duration-300 ease-in-out"
                >
                  ⬅️ Back to Home
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Forget;
