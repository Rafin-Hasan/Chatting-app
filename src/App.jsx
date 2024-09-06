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
import LayoutOne from "./Layouts/LayoutOne";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AddFriendPage from "./pages/AddFriendPage";
import SettingsPage from "./pages/SettingsPage";
import Logout from "./pages/Logout";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LayoutOne />}>
          <Route index element={<HomePage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/addfriend" element={<AddFriendPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
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
