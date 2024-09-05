import React from "react";
import Navber from "../component/Navber/Navber";
import { Outlet } from "react-router-dom";

const LayoutOne = () => {
  return (
    <>
      <Navber />
      <Outlet />
    </>
  );
};

export default LayoutOne;
