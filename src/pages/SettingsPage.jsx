import React from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleChange = () => {
    navigate("/");
  };
  return (
    <>
      <div className="flex-grow p-6 bg-gray-100 rounded-lg ">
        <h2 className="text-3xl font-semibold text-center text-gray-700 w-[700px]">
          Sittings ke shikhaisen? Na shikhaila kare wait kortasen, back koren.
        </h2>
        <div className="flex justify-center pt-3">
          <button
            className="p-2 bg-purple-600 rounded-lg text-white "
            onClick={handleChange}
          >
            Home
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
