import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

import { getService, getSubservice } from "../store/slices/contentSlice";
import { toTitleCase, makeSlug } from "../utils/Helpers";

const pages = [
  { name: "Products", link: "products" },
  { name: "Pricing", link: "pricing" },
  { name: "Contact Us", link: "contact_us" },
];
const ResponsiveAppBar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  
  const userData = useSelector((state) => state.auth.user);
  const userMenuIconStyle = {
    fontSize: "large",
    mr: 1,
    border: "0px solid",
    borderColor: "primary",
    ":hover": {
      borderLeft: "7px solid",
    },
  };

  const settings = isAuth
    ? [
        {
          name: "Profile",
          link: `profile/${makeSlug(userData.full_name)}/${userData.user_id}/`,
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
      link: "start_as_professional",
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

  React.useEffect(() => {
    dispatch(getService());
    dispatch(getSubservice());
    return () => {
      //   second;
    };
  }, []);

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar>
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
            key="box1-mobileView"
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
            <Drawer
              anchor="top"
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <Box role="navigation" onClick={handleCloseNavMenu}>
                <List>
                  {pages.map((page) => (
                    <ListItem
                      key={page.name}
                      disablePadding
                      onClick={handleCloseNavMenu}
                    >
                      <ListItemButton component={Link} to={`/${page.link}`}>
                        <ListItemText primary={page.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
          <Avatar
            alt="logo"
            sx={{ display: { xs: "flex", md: "none" } }}
            src={Logo}
          />
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
            key="box2-deskView"
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

          <Box key="box3-userDrawer" display="flex">
            <Tooltip title="Open">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  flexDirection: "row",
                  border: "1px dashed",
                  p: 0.5,
                  borderRadius: 5,
                  ":hover": {
                    border: "1px solid",
                  },
                }}
              >
                {isAuth ? (
                  <Avatar
                    alt={userData.full_name}
                    src={userData.pic_url}
                    sx={{ height: 25, width: 25 }}
                  />
                ) : (
                  <AccountCircle sx={{ color: "#ddd", fontSize: "xx-large" }} />
                )}
              </IconButton>
            </Tooltip>

            <Drawer
              anchor="right"
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <List>
                {isAuth && (
                  <ListItem key="userName">
                    <Typography variant="h6" ml={2} component="h6">
                      {toTitleCase(userData.full_name)}
                    </Typography>
                  </ListItem>
                )}
                <Divider />
                {settings.map((element) => (
                  <ListItem
                    key={element.name}
                    sx={{
                      borderLeft: "5px solid #0000",
                      ":hover": {
                        borderLeft: "5px solid",
                        transition: "ease-in-out",
                      },
                    }}
                  >
                    <ListItemButton
                      sx={{ px: 1 }}
                      component={Link}
                      to={`/${element.link}`}
                    >
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        {element.icon}{" "}
                      </ListItemIcon>
                      <ListItemText primary={element.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {isAuth && (
                  <ListItem
                    key="signout"
                    sx={{
                      borderLeft: "5px solid #0000",
                      color: (theme) => theme.palette.danger.main,
                      ":hover": {
                        borderLeft: "5px solid",
                        borderColor: (theme) => theme.palette.danger.main,
                      },
                    }}
                    onClick={() => {
                      dispatch(signout());
                    }}
                  >
                    <ListItemButton sx={{ px: 1 }}>
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <Logout sx={userMenuIconStyle} />
                      </ListItemIcon>
                      <ListItemText primary={toTitleCase("sign out")} />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
