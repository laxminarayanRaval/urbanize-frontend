import React from "react";

import { Outlet, Link as RouterLink, MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import PropTypes from "prop-types";

import { Footer, Header, ScrollToTop } from "../component";
import { useSelector } from "react-redux";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  experimental_sx as sx,
} from "@mui/material/styles";
import { orange, red } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const MainLayout = () => {
  const themeMode = useSelector((state) => state?.theme?.mode);
  // console.log(themeMode);

  // -------------------------------------------------------------------------------------
  const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return (
      <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
    );
  });

  LinkBehavior.propTypes = {
    href: PropTypes.oneOfType([
      PropTypes.shape({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
      }),
      PropTypes.string,
    ]).isRequired,
  };

  function Router(props) {
    const { children } = props;
    if (typeof window === "undefined") {
      return <StaticRouter location="/">{children}</StaticRouter>;
    }

    return <MemoryRouter>{children}</MemoryRouter>;
  }

  Router.propTypes = {
    children: PropTypes.node,
  };
  // -------------------------------------------------------------------------------------

  let theme = createTheme({
    palette: {
      mode: themeMode === "light" ? themeMode : "dark",
      // common: {
      // black: "#333",
      // white: "#ddd",
      // },
      // primary: { main: themeMode === "dark" ? teal[500] : teal[800] },
      // primary: { main: indigo[600] },
      secondary: { main: orange[600] },
      danger: { main: red[800] },
      action: { hover: "#0002" },
      background:
        themeMode === "dark"
          ? {
              paper: "#111",
            }
          : {},
    },
    typography: {
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 14,
    },
    divider: "#333",
    spacing: 10,
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: '#B7B7B7 transparent',
            '&::-webkit-scrollbar': {
              width: 5,
              height: 5,
              backgroundColor: 'transparent',
              zIndex: 100,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 5,
              backgroundColor: '#B7B7B7',
              minHeight: 20,
              minWidth: 20,
            },
            '&::-webkit-scrollbar-thumb:focus': {
              backgroundColor: '#adadad',
            },
            '&::-webkit-scrollbar-thumb:active': {
              backgroundColor: '#adadad',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#adadad',
            },
            '&::-webkit-scrollbar-corner': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...// ownerState.variant === "contained" &&
            (ownerState.color === "primary" && {
              backgroundSize: "0% 100%",
              transition: "all 0.35s ease-in-out",
              // backgroundPosition: "0 88%",
              backgroundRepeat: "no-repeat",
              "&:hover": {
                backgroundImage:
                  "linear-gradient(160deg, #1976d2 0%, #ea4336 100%)",
                backgroundSize: "100% 100%",
                color: "#FFF !important",
              },
            }),
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  // const theme = createTheme({ mode: 'light', palette: lightPalette, ...themeOptions });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Header />
      <div style={{ marginTop: "15vh", minHight: "95vh" }}>
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default MainLayout;

/*
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
*/
/*
const lightPalette = {
  primary: {
    main: "#144043",
  },
  secondary: {
    main: "#c3590c",
  },
  divider: "rgba(67,58,58,0.94)",
};
*/
/*
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
*/
/*
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
*/
