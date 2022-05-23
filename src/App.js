import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  DashboardPage,
  HomePage,
  NotFoundPage,
  SigninPage,
  SignupPage,
} from "./pages/";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes elements=''>
          <Route element={<PrivateRoute />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
