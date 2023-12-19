import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./pages/Dashboard/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Orders from "./pages/Dashboard/Orders";
import Customers from "./pages/Dashboard/Customers";
import Catalog from "./pages/Dashboard/Catalog";
import Queries from "./pages/Dashboard/Queries";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignIn />} />
      <Route path="/reset-password" element={<Resetpassword />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/customers" element={<Customers />} />
        <Route path="/dashboard/catalog" element={<Catalog />} />
        <Route path="/dashboard/queries" element={<Queries />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
