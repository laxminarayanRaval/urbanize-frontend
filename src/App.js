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

const App = () => {
  const privateRoutesList = [
    { path: "/dashboard", element: <DashboardPage /> },
  ];
  const publicRoutesList = [
    { path: "/", element: <HomePage /> },
    { path: "/signin", element: <SigninPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/contact_us", element: <ContactUsPage /> },
    { path: "*", element: <NotFoundPage /> },
  ];
  // debugger
  return (
    <>
      <AlertMessage />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route element={<PrivateRoute />}>
              {privateRoutesList.map((route) => (
                <Route path={route.path} element={route.element} />
              ))}
              {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            </Route>
            {publicRoutesList.map((route) => (
              <Route path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
