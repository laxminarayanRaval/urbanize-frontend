import React from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Services from "../component/Services";

const HomePage = () => {
  return (
    <Box component="article" sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }} >
      <Typography component="h1" variant="h1">
        {/* Welcome to the HomePage */}
      </Typography>
      <Services />
    </Box>
  );
};

export default HomePage;
