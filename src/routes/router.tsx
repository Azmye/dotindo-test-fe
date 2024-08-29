import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import Page from "../pages/page";
import LoginPage from "../pages/auth/login-page";
import { AuthContextProvider } from "../context/authContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
    ),
    children: [
      {
        index: true,
        element: <Page />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
