import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Home/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Error from "../pages/Error/Error";
import Shop from "../pages/Shop/Shop";
import ShopDetails from "../components/ShopDetails/ShopDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/sign-up",
        Component: Register,
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/:id",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/shop",
        Component: Shop
      },
      {
        path: "/shop-details/:id",
        Component: ShopDetails,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  }
]);

export default router;
