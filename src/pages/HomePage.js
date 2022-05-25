import React from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box component="article" sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }} >
      {/* <h1>Welcome to the HomePage</h1> */}
      <Typography sx={{ fontFamily: "Smooch", letterSpacing: 10}} component="h1" variant="h1">
        Welcome to the HomePage
      </Typography>
    </Box>
  );
};

export default HomePage;
