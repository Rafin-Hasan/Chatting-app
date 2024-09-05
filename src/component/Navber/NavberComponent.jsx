import React, { useState } from "react";
import { FaBars, FaHome, FaUserAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For animations

const NavberComponent = () => {
  // State to toggle the sidebar collapse
  const [isOpen, setIsOpen] = useState(true);

  // Function to toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar - fixed on the left side */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } h-screen bg-gradient-to-br from-blue-400 to-purple-700 text-white transition-all duration-500 shadow-lg fixed left-0 top-0 z-50`}
      >
        {/* Toggle Button */}
        <div className="p-4 flex justify-between items-center">
          <motion.button
            className="text-white focus:outline-none"
            whileHover={{ scale: 1.2, rotate: 180 }}
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </motion.button>
          <motion.h1
            className={`text-2xl font-bold transition-all duration-500 ${
              !isOpen && "hidden"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            Akto aDDa
          </motion.h1>
        </div>

        {/* Navigation Menu with fancy hover effects */}
        <ul className="mt-10 space-y-4">
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/home"
              className="flex justify-center items-center p-4 hover:bg-purple-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaHome size={20} className="mr-4" />
              <span className={`${!isOpen && "hidden"} transition-all`}>
                Home
              </span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/profile"
              className="flex justify-center items-center p-4 hover:bg-purple-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaUserAlt size={20} className="mr-4" />
              <span className={`${!isOpen && "hidden"} transition-all`}>
                Profile
              </span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/profile"
              className="flex justify-center items-center p-4 hover:bg-purple-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <IoPersonAddSharp size={20} className="mr-4" />
              <span className={`${!isOpen && "hidden"} transition-all`}>
                Add Friend
              </span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/settings"
              className="flex justify-center items-center p-4 hover:bg-purple-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaCog size={20} className="mr-4" />
              <span className={`${!isOpen && "hidden"} transition-all`}>
                Settings
              </span>
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/logout"
              className="flex justify-center items-center p-4 hover:bg-purple-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <FaSignOutAlt size={20} className="mr-4" />
              <span className={`${!isOpen && "hidden"} transition-all`}>
                Logout
              </span>
            </Link>
          </motion.li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`flex-grow p-6 bg-gray-100 ml-${isOpen ? "64" : "20"}`}>
        <h2 className="text-3xl font-semibold text-gray-700">
          Welcome to the Dashboard
        </h2>
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default NavberComponent;
