import React, { Component } from "react";
import logo from "./logo.png";
import Box from "@mui/material/Box";
import "./App.css";
import SignIn from "./component/Signin";
import Footer from "./component/Footer";
import Header from "./component/Header";

class App extends Component {
  render() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <SignIn />
        <div className="">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
          <h2>Welcome to Urbanize</h2>
        </div>
        <Footer />
      </Box>
    );
  }
}

export default App;
