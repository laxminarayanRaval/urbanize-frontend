import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountBox,
  AccountCircle,
  AppRegistration,
  DarkMode,
  Dashboard,
  LightMode,
  Login,
  Logout,
  ManageAccounts,
  MenuSharp,
} from "@mui/icons-material";
// import BlurOnIcon from "@mui/icons-material/BlurOn";

import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../store/slices/authSlice";
import { changeThemeMode } from "../store/slices/themeSlice";

const pages = [
  { name: "Products", link: "products" },
  { name: "Pricing", link: "pricing" },
  { name: "Contact Us", link: "contact_us" },
];
const ResponsiveAppBar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const themeMode = useSelector((state) => state.theme.mode);
  const userData = useSelector((state) => state.auth.user);
  const userMenuIconStyle = {
    fontSize: "large",
    mr: 1,
    ":hover": {
      borderLeft: "7px solid primary",
    },
  };
  const settings = isAuth
    ? [
        {
          name: "Profile",
          link: "profile",
          icon: <AccountBox sx={{ ...userMenuIconStyle }} />,
        },
        {
          name: "Account",
          link: "account",
          icon: <ManageAccounts sx={userMenuIconStyle} />,
        },
        {
          name: "Dashboard",
          link: "dashboard",
          icon: <Dashboard sx={userMenuIconStyle} />,
        },
      ]
    : [
        {
          name: "Sign In",
          link: "signin",
          icon: <Login sx={userMenuIconStyle} />,
        },
        {
          name: "Sign Up",
          link: "signup",
          icon: <AppRegistration sx={userMenuIconStyle} />,
        },
      ];

  if (userData && userData.role === "user") {
    settings.push({
      name: "Became a Professional",
      link: "as_a_professional",
      icon: <AppRegistration sx={userMenuIconStyle} />,
    });
  }

  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar>
          {/* <BlurOnIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Avatar
            key="logo"
            alt="logo"
            sx={{ display: { xs: "none", md: "flex" } }}
            src={Logo}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".25rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            URBANIZE
          </Typography>

          <Box
            key="box1"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuSharp />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  {/* <Typography textAlign="center">{page}</Typography> */}
                  <Button
                    sx={{ color: "#222" }}
                    component={Link}
                    to={`/${page.link}`}
                  >
                    {page.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Avatar
            alt="logo"
            sx={{ display: { xs: "flex", md: "none" } }}
            src={Logo}
          />
          {/* <BlurOnIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            URBANIZE
          </Typography>
          <Box
            key="box2"
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-evenly",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ mx: 1, color: "white", display: "block" }}
                component={Link}
                to={`/${page.link}`}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box key="box3" display="flex">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{ color: "#ddd", fontSize: "xx-large" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={`${themeMode} Mode`}>
              <IconButton
                sx={{ p: 0 }}
                onClick={(_) => dispatch(changeThemeMode())}
              >
                {themeMode === "light" ? (
                  <LightMode sx={{ color: "#ddd", fontSize: "xx-large" }} />
                ) : (
                  <DarkMode sx={{ color: "#ddd", fontSize: "xx-large" }} />
                )}
              </IconButton>
            </Tooltip>

            <Menu
              keepMounted
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((element) => (
                <MenuItem
                  key ={element.name}
                  component={Link}
                  to={`/${element.link}`}
                  sx={{
                    borderLeft: "7px solid #0000",
                    ":hover": {
                      borderLeft: "7px solid",
                      borderColor: 'primary',
                      transition: "ease-in-out",
                    },
                  }}
                >
                  <Divider />
                  <Button>
                    {element.icon}
                    {element.name}
                  </Button>
                </MenuItem>
              ))}
              {isAuth && (
                <MenuItem
                  key="signout"
                  flexDirection="column"
                  sx={{
                    borderLeft: "7px solid #0000",
                    ":hover": {
                      borderLeft: "7px solid #700",
                    },
                  }}
                >
                  <Button
                    sx={{ color: "#700" }}
                    onClick={() => {
                      dispatch(signout());
                    }}
                  >
                    <Logout sx={userMenuIconStyle} />
                    sign out
                  </Button>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
