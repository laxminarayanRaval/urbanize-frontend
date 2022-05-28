import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  DarkMode,
  LightMode,
  MenuSharp,
} from "@mui/icons-material";
// import BlurOnIcon from "@mui/icons-material/BlurOn";

import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../store/slices/authSlice";
import { changeThemeMode } from "../store/slices/themeSlice";

const pages = [
  { txt: "Products", link: "products" },
  { txt: "Pricing", link: "pricing" },
  { txt: "Dashboard", link: "dashboard" },
  { txt: "Contact Us", link: "contact_us" },
];

const ResponsiveAppBar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const themeMode = useSelector((state) => state.theme.mode);

  const settings = isAuth
    ? ["Profile", "Account", "Dashboard"]
    : ["Signin", "Signup"];

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
            // component="a"
            href="/"
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
                <MenuItem key={page.txt} onClick={handleCloseNavMenu}>
                  {/* <Typography textAlign="center">{page}</Typography> */}
                  <Button
                    sx={{ color: "#222" }}
                    component={Link}
                    to={`/${page.link}`}
                  >
                    {page.txt}
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
            component="a"
            href=""
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
                key={page.txt}
                sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                component={Link}
                to={`/${page.link}`}
              >
                {page.txt}
              </Button>
            ))}
          </Box>

          <Box key="box3" display="flex">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{ color: "white", fontSize: "xx-large" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={`${themeMode} Mode`}>
              <IconButton sx={{ p: 0 }}
                onClick={(_) =>
                  dispatch(changeThemeMode())
                }
              >
                {themeMode === "light" ? <LightMode sx={{ fontSize: "xx-large" }} /> : <DarkMode sx={{ fontSize: "xx-large" }} />}
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
              {settings.map((setting) => (
                <MenuItem key={setting}>
                  <Button
                    component={Link}
                    // sx={{ color: "#222" }}
                    to={`/${setting}`}
                  >
                    {setting}
                  </Button>
                </MenuItem>
              ))}
              {isAuth && (
                <MenuItem key="signout">
                  <hr width="50%" />
                  <Button
                    // component={Link}
                    sx={{ color: "#222" }}
                    onClick={() => {
                      dispatch(signout());
                    }}
                  >
                    signout
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
