import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import database from "./firebase.config";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./pages/ForgetPassword";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={route} />
    </>
  );
}

export default App;
