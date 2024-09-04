import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import LoginAnimation from "../../public/animetion/Animation.json";
import "./Home.css";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

// Animation component
const Animation = () => {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return null; // This component doesn't need to render anything
};

const LoginPage = () => {
  // useState for email input
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // auth from firebase
  const auth = getAuth();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // for icons
  const [one, two] = useState(false);

  const nextIcon = () => {
    two(!one);
  };

  // Function for form

  const funForEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const funForpassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const SubForForm = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("please enter your email");
    } else if (!password) {
      setPasswordError("please enter your password");
    } else {
      setEmailError("");
      setPasswordError("");

      // User sign in firebase
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...

          if (user.emailVerified === false) {
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
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
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

  // Call the Animation component to initialize AOS
  Animation();

  return (
    <>
      <div className=" flex ">
        <div className=" w-[500px] gap-40 h-full ">
          <Lottie animationData={LoginAnimation} />
        </div>
        <div className="warper m-auto font-poppins rounded-[40px] ">
          <form onSubmit={SubForForm}>
            <h1 className=" text-[35px] text-center font-poppins font-semibold ">
              Welcome Back!
            </h1>
            <div className="inputBox">
              <input
                type="email"
                onChange={funForEmail}
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-8">
              <p className="pl-5 text-[#8bcfff] text-[12px] "> {emailError} </p>
            </div>

            <div className="inputBox">
              <input
                type={one ? "text" : "password"}
                onChange={funForpassword}
                placeholder="Enter your password"
              />
              {one ? (
                <FaRegEye className="icons" onClick={nextIcon} />
              ) : (
                <FaRegEyeSlash className="icons" onClick={nextIcon} />
              )}
            </div>
            <div className="mb-8">
              <p className="pl-5 text-[#8bcfff] text-[12px] ">
                {" "}
                {passwordError}{" "}
              </p>
            </div>
            <div className="rememberForgot">
              <label>
                {" "}
                <input type="checkbox" />
                Remember me{" "}
              </label>
              <Link to="/forgetPassword"> forgot password ? </Link>
            </div>
            <button
              type="submit"
              className=" w-full h-[45px] active:scale-105 transition-all border-none outline-none shadow-md cursor-pointer text-[17px] font-semibold rounded-[40px] text-black bg-white "
            >
              Login
            </button>
            <div className="w-full flex mt-10 items-center gap-3 justify-center ">
              <div className="w-40 h-[2px] bg-white  "></div>
              <div className="">
                <p>Or</p>
              </div>
              <div className="w-40 h-[2px] bg-white  "></div>
            </div>
            <div className="registerlink text-[15px] text-center mt-5 ">
              <p>
                Don't have an account ?{" "}
                <Link to="/registion" className="font-bold">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
