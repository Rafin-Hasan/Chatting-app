import React from "react";
import Navber from "../component/Navber/Navber";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LayoutOne = () => {
  const sliceUser = useSelector((state) => state.counter.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (sliceUser == null) {
      navigate("/loginPage");
    }
  }, []);
  return (
    <>
      <Navber />
      <Outlet />
    </>
  );
};

export default LayoutOne;
