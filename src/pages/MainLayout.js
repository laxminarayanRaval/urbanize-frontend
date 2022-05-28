import React from "react";

import { Outlet } from "react-router-dom";

import { Footer, Header } from "../component";
import { useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey, brown } from "@mui/material/colors";

const themeCode = {
  primary: {
    light: "#62727b",
    main: "#37474f",
    dark: "#102027",
    contrastText: "#fff",
  },
  secondary: {
    light: "#a98274",
    main: "#795548",
    dark: "#4b2c20",
    contrastText: "#000",
  },
};

const lightPalette = {
  primary: {
    main: "#144043",
  },
  secondary: {
    main: "#c3590c",
  },
  divider: "rgba(67,58,58,0.94)",
};

const darkPalette = {
  primary: {
    main: "#a64600",
  },
  secondary: {
    main: "#008292",
  },
  divider: "rgba(67,58,58,0.94)",
  background: {
    default: "#232323",
    paper: "#313131",
  },
};

export const themeOptions = {
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontFamily: '"Lato"',
    fontSize: 14,
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiSwitch: {
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: 8,
      },
      switchBase: {
        padding: 1,
        "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
          transform: "translateX(16px)",
          color: "#fff",
          "& + $track": {
            opacity: 1,
            border: "none",
          },
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 13,
        border: "1px solid #bdbdbd",
        backgroundColor: "#fafafa",
        opacity: 1,
        transition:
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
    MuiButton: {
      root: {
        backgroundImage:
          "linear-gradient(to right, #232526 0%, #414345  51%, #232526  100%)",
        margin: "10px",
        padding: "10px 30px",
        textAlign: "center",
        transition: "0.5s",
        backgroundSize: "200% auto",
        border: 0,
        borderRadius: 10,
        boxShadow: "0 0 20px #eee",
        color: "#FDFDFD",
        display: "block",
      },
      hover: {
        backgroundPosition: "right center",
        textDecoration: "none",
        color: "#FEFEFE",
      },
    },
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
};

const MainLayout = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  console.log(themeMode);
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: blueGrey[800] },
      secondary: { main: brown[500] },
    },
    typography: {
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14,
    },
    spacing: 10,
    shape: {
      borderRadius: 8,
    },
  });

  // const theme = createTheme({ mode: 'light', palette: lightPalette, ...themeOptions });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div style={{ marginTop: "5%" }}>
        <Outlet />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default MainLayout;
