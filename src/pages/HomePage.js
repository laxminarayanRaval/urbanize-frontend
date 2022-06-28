import React from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Carousel, Services } from "../component/";

import { HeroCarouselData } from "../utils/HeroCarouselData";

const HomePage = () => {
  return (
    <Box
      component="article"
      sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}
    >
      <Carousel dataArray={HeroCarouselData} duration={5} />
      <Typography component="h1" variant="h1">
        Welcome to the HomePage
      </Typography>
      <Services />
    </Box>
  );
};

export default HomePage;
