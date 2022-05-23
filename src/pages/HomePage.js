import React from "react";
import { Header, Footer } from "../component/";

import Box from "@mui/material/Box";

const HomePage = () => {
  return (
    <>
      <Header />
      <Box
        component="article"
        sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}
      >
        <h1>Welcome to the HomePage</h1>
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
