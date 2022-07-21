import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import {
  AboutUs,
  Carousel,
  FAQs,
  GradientStepper,
  History,
} from "../component/";

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
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // mt: 3,
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
      <Box>
        <Typography id="FAQs" component="h2" variant="h2" mb={2}>
          FAQs
        </Typography>
        <FAQs />
      </Box>
      <Box>
        <Typography id="History" component="h2" variant="h2" mb={2}>
          History
        </Typography>
        <History />
      </Box>
      <Box>
        <Typography id="About_us" component="h2" variant="h2" mb={2}>
          About Us
        </Typography>
        <AboutUs />
      </Box>
    </Box>
  );
};

export default HomePage;
