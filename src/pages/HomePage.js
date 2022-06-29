import React from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Carousel, GradientStepper, Services } from "../component/";

import { HeroCarouselData } from "../utils/HeroCarouselData";

const HomePage = () => {
  return (
    <Box
      component="article"
      sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}
    >
      <Carousel dataArray={HeroCarouselData} duration={5} />
      <Box
        sx={{
          minHeight: "calc(35vh + 25px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h3" variant="h3" mb={2}>
          How things done here?
        </Typography>
        <GradientStepper />
      </Box>
      <Services />
    </Box>
  );
};

export default HomePage;
