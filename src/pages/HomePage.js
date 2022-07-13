import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Carousel, FAQs, GradientStepper } from "../component/";

import { HeroCarouselData } from "../utils/HeroCarouselData";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const { hash } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const element = document.querySelector(hash);
        // console.log("Hash", hash, "element", element);
        element?.scrollIntoView({
          block: "center",
          inline: "nearest",
          behavior: "smooth",
        });
      }
    }, 100);
  }, [hash]);
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Carousel dataArray={HeroCarouselData} duration={5} />
      <Box
        sx={{
          minHeight: "calc(35vh + 25px)",
          width: "80%",
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
      <Box
        id="FAQs"
        sx={{
          minHeight: "calc(35vh + 25px)",
          // pt: "15vh",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h3" variant="h3" mb={2}>
          FAQs
        </Typography>
        <FAQs />
      </Box>
    </Box>
  );
};

export default HomePage;
