import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  DashboardPage,
  HomePage,
  NotFoundPage,
  SigninPage,
  SignupPage,
  MainLayout,
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
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

/**
 * 
import jwt_decode from "jwt-decode";
 
var token = "eyJ0eXAiO.../// jwt token";
var decoded = jwt_decode(token);
 
console.log(decoded);
 */