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
  // debugger
  return (
    <>
      <AlertMessage />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/contactus" element={<ContactUsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
