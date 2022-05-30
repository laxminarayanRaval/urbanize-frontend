import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ContactUsPage,
  DashboardPage,
  HomePage,
  MainLayout,
  NotFoundPage,
  SigninPage,
  SignupPage,
} from "./pages/";
import PrivateRoute from "./utils/PrivateRoute";
import AlertMessage from "./component/AlertMessage";

export const privateRoutesList = [
  { url: "/dashboard", element: <DashboardPage /> },
  { url: "/as_a_professional", element: <DashboardPage /> },
];
export const publicRoutesList = [
  { name: "Home", url: "/", element: <HomePage /> },
  { name: "Sign In", url: "/signin", element: <SigninPage /> },
  { name: "Sign Up", url: "/signup", element: <SignupPage /> },
  { name: "Contact Us", url: "/contact_us", element: <ContactUsPage /> },
  // { url: "*", element: <NotFoundPage /> },
];

const App = () => {
  return (
    <>
      <AlertMessage />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<PrivateRoute />}>
              {privateRoutesList.map((route) => (
                <Route path={route.url} element={route.element} />
              ))}
              {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            </Route>
            {publicRoutesList.map((route) => (
              <Route path={route.url} element={route.element} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
