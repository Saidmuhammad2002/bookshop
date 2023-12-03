import { ThemeProvider } from "@mui/material";
import SignUp from "./features/auth/signUp/SignUp";
import { theme } from "./utils/theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./features/ErrorPage";
import Dashboard from "./features/Dashboard";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/login/Login";

const router = createBrowserRouter([
  // { path: "/login", element: <Login /> },
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RequireAuth />,
        children: [{ path: "/", element: <Dashboard /> }],
      },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      {/* <Login /> */}
    </>
  );
}

export default App;
