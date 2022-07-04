import React from "react";

// import PageNotFoundAnimation from "../assets/lottiefiles/page_notfound_anim.json";
// import Lottie from "lottie-react";

import { Box, Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItem="center">
      {/* <Lottie
        animationData={PageNotFoundAnimation}
        style={{ width: "75%" }}
        loop={true}
      /> */} 404 | Page Not Found Animation Should be Here Sooner
      <Button color="primary" href="/">Home</Button>
    </Box>
  );
};

export default NotFoundPage;
