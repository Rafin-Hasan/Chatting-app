import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const yes = () => {
    navigate("/login");
  };
  const no = () => {
    navigate("/");
  };
  return (
    <>
      <div className="w-[500px] p-3 bg-white rounded-lg ">
        <h4 className="font-poppins font-semibold text-3xl text-center">
          Are you sure?
        </h4>
        <div className="flex justify-center gap-5 pt-3">
          <button
            onClick={yes}
            className="bg-red-600 py-1 px-5 text-white rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={no}
            className="bg-green-600 py-1 px-5 text-white rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
