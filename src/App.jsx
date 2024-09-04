import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Registion from "./pages/Registion";
import database from "./firebase.config";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/registion" element={<Registion />} />
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
