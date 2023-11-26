import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import NewProductPage from "./pages/NewProductPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import EditProductPage from "./pages/EditProductPage";
import OrdersPage from "./pages/OrdersPage";

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "app", element: <DashboardAppPage /> },
      { path: "user", element: <UserPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "newproduct", element: <NewProductPage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "products/editproduct/:id", element: <EditProductPage /> },
    ],
  },

  {
    path: "login",
    element: <LoginPage />,
  },

  {
    element: <SimpleLayout />,
    children: [
      { element: <Navigate to="/dashboard/app" />, index: true },
      { path: "404", element: <Page404 /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
