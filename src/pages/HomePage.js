import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { AboutUs, Carousel, FAQs, GradientStepper } from "../component/";

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
    }, 250);
  }, [hash]);
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "90vh",
        "& > div": {
          minHeight: { xs: "calc(20vh + 30px)", md: "calc(35vh + 25px)" },
          width: { xs: "90%", md: "75%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3
        },
      }}
    >
      <Carousel dataArray={HeroCarouselData} duration={5} />
      <Box>
        <Typography component="h2" variant="h2" mb={2}>
          How things done here?
        </Typography>
        <GradientStepper />
      </Box>
      <Box id="FAQs">
        <Typography component="h2" variant="h2" mb={2}>
          FAQs
        </Typography>
        <FAQs />
      </Box>
      <Box id="History">
        <Typography component="h2" variant="h2" mb={2}>
          History of Urbanize
        </Typography>
        <AboutUs />
      </Box>
      <Box id="About_us">
        <Typography component="h2" variant="h2" mb={2}>
          About Us
        </Typography>
        <AboutUs />
      </Box>
    </Box>
  );
};

export default HomePage;
