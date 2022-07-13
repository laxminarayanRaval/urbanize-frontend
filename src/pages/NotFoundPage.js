import React from "react";

// import PageNotFoundAnimation from "../assets/lottiefiles/page_notfound_anim.json";
// import Lottie from "lottie-react";
import NotFoundGif from "../assets/gifs/404_error_with_landscape.gif";

import { Box, Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: -5,
      }}
    >
      <img
        src={NotFoundGif}
        style={{ maxWidth: '100%', height: "auto" }}
        alt="404 | Page Not Found Animation Should be Here Sooner"
      />
      <Button color="primary" href="/">
        Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
