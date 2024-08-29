import { useRoutes } from "react-router-dom";
import Layout from "../pages/layout";
import Page from "../pages/page";
import LoginPage from "../pages/auth/login-page";
import ProtectedRoute from "./protected-route";

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Page />,
        },
        {
          path: "/dashboard",
          element: <Page />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
}
