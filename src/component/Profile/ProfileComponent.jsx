import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileComponent = () => {
  // Fetching userData from Redux store
  const userData = useSelector((state) => state.counter.userData);

  return (
    <motion.div
      className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-500 ease-in-out"
      whileHover={{ scale: 1.05 }} // Slight scale on hover
      whileTap={{ scale: 0.95 }} // Slight shrink on tap
    >
      {/* Profile Image */}
      <div className="relative">
        <img
          className="w-full h-80 object-cover"
          // Check if userData is available before accessing photoURL
          src={userData?.photoURL}
          alt="Profile"
        />
        {/* Overlay with name */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h1 className="text-3xl text-white font-bold">
            {/* Display name from userData */}
            {userData?.displayName}
          </h1>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-8 text-center">
        {/* Email */}
        <p className="text-gray-600 mb-3 text-xl">{userData?.email}</p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-8">
          {/* Social Media Links */}
          <motion.a
            href="https://facebook.com"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
          >
            <FaFacebookF size={28} />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            className="text-gray-600 hover:text-blue-400 transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
          >
            <FaTwitter size={28} />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
          >
            <FaLinkedinIn size={28} />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
            whileHover={{ scale: 1.2 }}
          >
            <FaInstagram size={28} />
          </motion.a>
        </div>

        {/* Contact Button */}
        <motion.button
          className="mt-8 bg-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-600 transition-colors duration-300 text-lg"
          whileHover={{ scale: 1.1 }}
        >
          Contact Me
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileComponent;
