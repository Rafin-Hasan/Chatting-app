import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import LoginAnimetion from "../../public/animetion/Animation.json";
import Lottie from "lottie-react";

const RegistrationPage = () => {
  // =========Use state for inputs
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();

  // show password
  const [showPass, setShowPass] = useState(false);

  // for icons
  const [one, two] = useState(false);

  const nextIcon = () => {
    two(!one);
  };
  const [three, four] = useState(false);

  const nextIcon2 = () => {
    four(!three);
  };
  // show password funtion
  const visibility = () => {
    setShowPass(!showPass);
  };

  // ==========Firebase setup
  const auth = getAuth();

  // =======Handlers for form fields

  // user name
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  // Email
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  // password
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  // confirm password
  const handleconfirmPassword = (e) => {
    setConfirmError(e.target.value);
    setConfirmPasswordError("");
  };

  // =======Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName) {
      setFirstNameError("Please enter your first name");
    } else if (!email) {
      setEmailError("Please enter your email");
    } else if (!password) {
      setPasswordError("Please enter your password");
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please enter your confirm password");
    } else {
      if (password != confirmPassword) {
        toast.error("Password does not match with confirm password", {
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
        console.log("oll okay");
        // Button icons
        setLoader(true);

        // Email password auth from firebase
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Button icons
            setLoader(false);
            toast.success("Verification email send", {
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

            // Navigate user to the login page
            Navigate("/");

            // console user credit share just in case
            console.log(userCredential);

            // updete user profile
            updateProfile(auth.currentUser, {
              displayName: firstName,
              photoURL:
                "https://play-lh.googleusercontent.com/7oW_TFaC5yllHJK8nhxHLQRCvGDE8jYIAc2SWljYpR6hQlFTkbA6lNvER1ZK-doQnQ=w240-h480-rw",
            });

            sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              // ...
            });
          })
          // Catch all the errors
          .catch((error) => {
            // Icons in the button
            setLoader(false);

            // Error error
            const errorCode = error.code;

            // console error
            console.log(errorCode);
            if (errorCode == "auth/email-already-in-use") {
              // Toast container If or count already exists
              toast("🦄 Wow so easy!", {
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

            // If password is less than six characters
            if (errorCode == "auth/weak-password") {
              toast.error("Use stronger password", {
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
    }
  };

  return (
    <>
      <div className="flex">
        <div className=" w-[500px] gap-60 h-full ">
          <Lottie animationData={LoginAnimetion} />
        </div>
        <div className="warper m-auto font-poppins rounded-[40px] ">
          <form onSubmit={handleSubmit}>
            <h1 className="text-[35px] text-center font-poppins font-semibold">
              Register
            </h1>

            {/* user Name */}
            <div className="inputBox">
              <input
                onChange={handleFirstName}
                type="text"
                placeholder="User name"
              />
            </div>
            <div className="pl-5 text-[#8bcfff] text-[12px]">
              <p>{firstNameError}</p>
            </div>

            {/* Email */}
            <div className="inputBox">
              <input onChange={handleEmail} type="email" placeholder="Email" />
            </div>
            <div className="pl-5 text-[#8bcfff] text-[12px]">
              <p>{emailError}</p>
            </div>

            {/* Password */}
            <div className="inputBox">
              <input
                type={one ? "text" : "password"}
                onChange={handlePassword}
                placeholder="Password"
              />
              {one ? (
                <FaRegEye className="icons" onClick={nextIcon} />
              ) : (
                <FaRegEyeSlash className="icons" onClick={nextIcon} />
              )}
            </div>
            <div className="pl-5 text-[#8bcfff] text-[12px]">
              <p>{passwordError}</p>
            </div>

            {/*Confirm Password */}
            <div className="inputBox">
              <input
                type={three ? "text" : "password"}
                onChange={handleconfirmPassword}
                placeholder="Confirm password"
              />
              {three ? (
                <FaRegEye className="icons" onClick={nextIcon2} />
              ) : (
                <FaRegEyeSlash className="icons" onClick={nextIcon2} />
              )}
            </div>
            <div className="pl-5 text-[#8bcfff] text-[12px]">
              <p>{confirmPasswordError}</p>
            </div>

            {/* Submit Button */}
            {loader ? (
              <div className="flex justify-center items-center w-full h-[45px] active:scale-105 transition-all border-nshowPass outline-nshowPass shadow-md cursor-pointer text-[17px] text-[#333] font-semibold rounded-[40px] bg-white">
                <BeatLoader />
              </div>
            ) : (
              <button
                type="submit"
                className="w-full h-[45px] active:scale-105 transition-all border-nshowPass outline-nshowPass shadow-md cursor-pointer text-[17px] text-[#333] font-semibold rounded-[40px] bg-white"
              >
                Sign Up
              </button>
            )}

            {/* Divider */}
            <div className="w-full flex mt-10 items-center gap-3 justify-center">
              <div className="w-40 h-[2px] bg-white"></div>
              <p>Or</p>
              <div className="w-40 h-[2px] bg-white"></div>
            </div>

            {/* Already Have Account */}
            <div className="registerlink text-[15px] text-center mt-5">
              <p>
                Already have an account?{" "}
                <Link to="/" className="font-bold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
