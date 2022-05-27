import React from "react";
import { Link } from "react-router-dom";

import PageNotFoundAnimation from "../assets/lottiefiles/page_notfound_anim.json";
import Lottie from "lottie-react";

import { Box, Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box display="flex" alignItem="center">
      <Lottie
        animationData={PageNotFoundAnimation}
        style={{ width: "65%" }}
        loop={true}
      />
      <Button component={Link} to="/">Home</Button>
    </Box>
  );
};

export default NotFoundPage;
