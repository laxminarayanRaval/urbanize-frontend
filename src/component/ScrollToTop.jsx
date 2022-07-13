import * as React from "react";
import { Navigation } from "@mui/icons-material";
import { Box, Fab, useScrollTrigger } from "@mui/material";

import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

export default function ScrollToTop(props) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  const fabClickHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const fabStyle = {
    backgroundImage: "linear-gradient(130deg, #0080ff 20%, #ff1200 80%)",
    position: "fixed",
    bottom: 20,
    right: 20,
  };

  const fab = {
    // color: "primary",
    sx: fabStyle,
    icon: (
      <Navigation sx={{ color: (theme) => theme.palette.background.default }} />
    ),
    label: "Add",
  };

  // ----------------------------------------------
  function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      // target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      hidden: !trigger,
    });
  }
  // ----------------------------------------------

  return (
    <ElevationScroll {...props}>
      <Box>
        <Fab
          size="small"
          sx={fab.sx}
          color={fab.color}
          onClick={fabClickHandler}
        >
          {fab.icon}
        </Fab>
      </Box>
    </ElevationScroll>
  );
}
