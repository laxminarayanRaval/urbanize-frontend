import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import {
  AccountBox,
  AccountCircle,
  AppRegistration,
  Dashboard,
  KeyboardArrowDown,
  Login,
  Logout,
  ManageAccounts,
  MenuSharp,
} from "@mui/icons-material";

import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../store/slices/authSlice";

import { getService, getSubservice } from "../store/slices/contentSlice";
import {
  toTitleCase,
  makeSlug,
  makeAvtarText,
  citiesNames,
} from "../utils/Helpers";
import { getUserDetails } from "../store/slices/authSlice";
import { useSearchParams } from "react-router-dom";

/* Underline Magic scss */
const underlineMagicStyle = {
  backgroundImage: "linear-gradient(120deg, #1976d2AA 0%, #ea433688 100%)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 0.2em",
  backgroundPosition: "0 88%",
  transition: "background-size 0.25s ease-in",
  "&:hover": {
    backgroundSize: "100% 100%",
    color: "#FFF",
  },
};
/* -------------------- */

// Change City Start --------------------------------------------------------
const SelectCity = ({ selectedCity = null, ...props }) => {
  let defaultCity = "";

  if (selectedCity != null)
    defaultCity = citiesNames.filter((ele) => ele.name == selectedCity)[0]
      ?.name;

  if (!defaultCity) {
    defaultCity = citiesNames[0]?.name;
    props.getSelectedCity(defaultCity);
  }

  const [city, setCity] = React.useState(defaultCity);

  const handleChange = (event) => {
    setCity(event.target.value);
    props.getSelectedCity(event.target.value);
  };

  return (
    <FormControl
      size="small"
      sx={{
        px: { xs: 0, md: 1 },
      }}
    >
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        defaultValue={city}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          backgroundImage: "linear-gradient(300deg, #1976d2 0%, #ea4336 100%)",
          color: "#FFF !important",
          textTransform: "uppercase",
          fontWeight: "bold",
          "&:focus-visible": { border: "0px solid #0000" },
          "& svg": { color: "#FFF !important" },
        }}
        IconComponent={KeyboardArrowDown}
        onChange={handleChange}
        autoWidth
        // label="City"
      >
        {citiesNames.map(({ id, name }, index) => (
          <MenuItem
            color="primary"
            key={`${id}-${index}`}
            sx={{
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
              },
            }}
            value={name}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
// Change City End --------------------------------------------------------

const pages = [
  { name: "Products", link: "products" },
  { name: "Pricing", link: "pricing" },
  { name: "Contact Us", link: "contact_us" },
];
const ResponsiveAppBar = (props) => {
  const isAuth = useSelector((state) => state?.auth?.isAuthenticated);

  const userData = useSelector((state) => state?.auth?.user);
  const userMenuIconStyle = {
    fontSize: "large",
    mr: 1,
    // border: "0px solid",
    // borderColor: "primary",
    // ":hover": {
    //   borderLeft: "7px solid",
    // },
  };

  const settings = isAuth
    ? [
        {
          name: "Profile",
          link: `profile/${makeSlug(userData?.full_name)}/${userData?.id}/`,
          icon: <AccountBox sx={userMenuIconStyle} />,
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

  if (userData && userData?.role === "user") {
    settings.push({
      name: "Became a Professional",
      link: "start_as_professional",
      icon: <AppRegistration sx={userMenuIconStyle} />,
    });
  }

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const getCityHandler = (city) => {
    setSearchParams({ city });
  };

  React.useEffect(() => {
    dispatch(getService());
    dispatch(getSubservice());
    return () => {
      //   second;
    };
  }, [getCityHandler]);

  React.useEffect(() => {
    if (isAuth) dispatch(getUserDetails());
  }, [isAuth]);

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

  // --------------------------------------------------------------------------------------
  function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      // target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  // --------------------------------------------------------------------------------------

  return (
    <ElevationScroll {...props}>
      <AppBar
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
      >
        <Container
          maxWidth="xl"
          sx={{ minHight: "12.5vh", justifyContent: "center", my: 1 }}
        >
          <Toolbar>
            <Avatar
              key="logo"
              alt="logo"
              sx={{
                display: { xs: "none", md: "flex" },
                width: 24,
                height: 24,
                mr: 1,
              }}
              src={Logo}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                // fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".2rem",
                color: (theme) => theme.palette.primary,
                textDecoration: "none",
              }}
            >
              Urbanize
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
                sx={{ color: (theme) => theme.palette.primary }}
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
                        sx={{ ...underlineMagicStyle }}
                        key={page.name}
                        disablePadding
                        onClick={handleCloseNavMenu}
                      >
                        <ListItemButton href={`/${page.link}`}>
                          <ListItemText primary={page.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <ListItem key="changeCity">
                      <SelectCity
                        selectedCity={searchParams.get("city")}
                        getSelectedCity={getCityHandler}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </Box>
            <Avatar
              alt="logo"
              sx={{
                display: { xs: "flex", md: "none" },
                width: 24,
                height: 24,
                mr: 1,
              }}
              src={Logo}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                // fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".2rem",
                color: (theme) => theme.palette.primary,
                textDecoration: "none",
              }}
            >
              Urbanize
            </Typography>
            <Box
              key="box2-deskView"
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "flex-end",
                },
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  sx={{ mx: 1, ...underlineMagicStyle }}
                  href={`/${page.link}`}
                >
                  {page.name}
                </Button>
              ))}
              <SelectCity
                selectedCity={searchParams.get("city")}
                getSelectedCity={getCityHandler}
              />
            </Box>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ mx: 1, display: { xs: "none", md: "flex" } }}
            />

            <Box key="box3-userDrawer" display="flex">
              <Tooltip
                title={`Mr./Ms. ${
                  !!userData?.full_name ? userData?.full_name : "Signin First"
                }`}
              >
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    flexDirection: "row",
                    p: 0,
                    // border: "0.5px dashed",
                    // borderRadius: 5,
                    // ":hover": {
                    // border: "px solid",
                    // },
                  }}
                >
                  {isAuth ? (
                    <Avatar
                      alt={userData?.full_name}
                      src={userData?.pic_url}
                      sx={{
                        background:
                          "linear-gradient(60deg, #1976d2 0%, #ea4336 100%)",
                        fontWeight: "bold",
                        color: "#FFF",
                        textTransform: "uppercase",
                      }}
                    >
                      {makeAvtarText(userData?.full_name)}
                    </Avatar>
                  ) : (
                    <AccountCircle sx={{ fontSize: "xx-large" }} />
                  )}
                </IconButton>
              </Tooltip>

              <Drawer
                anchor="right"
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{minWidth: '35rem'}}
              >
                <List>
                  {isAuth && (
                    <>
                      <ListItem key="userName">
                        <Typography
                          variant="h5"
                          mx={2}
                          component="h5"
                          sx={{
                            background:
                              "-webkit-linear-gradient(60deg, #1976d2 0%, #ea4336 100%)",
                            "-webkit-background-clip": "text",
                            "-webkit-text-fill-color": "transparent",
                            fontWeight: "bold",
                          }}
                        >
                          {toTitleCase(userData?.full_name)}
                        </Typography>
                      </ListItem>
                      <Divider />
                    </>
                  )}
                  {settings.map((element) => (
                    <ListItem
                      key={element.name}
                      sx={{
                        p: 0,
                        borderLeft: "5px solid #0000",
                        color: (theme) => theme.palette.primary.main,
                        "&:hover": {
                          borderColor: (theme) => theme.palette.primary.main,
                          transition: "ease-in-out",
                        },
                      }}
                    >
                      <ListItemButton
                        sx={{ px: 1 }}
                        component={Link}
                        href={`/${element.link}`}
                        onClick={handleCloseUserMenu}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            color: (theme) => theme.palette.primary.main,
                          }}
                        >
                          {element.icon}
                        </ListItemIcon>
                        <ListItemText primary={element.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {isAuth && (
                    <ListItem
                      key="signout"
                      sx={{
                        p: 0,
                        borderLeft: "5px solid #0000",
                        color: (theme) => theme.palette.danger.main,
                        "&:hover": {
                          borderColor: (theme) => theme.palette.danger.main,
                        },
                      }}
                      onClick={() => {
                        dispatch(signout());
                      }}
                    >
                      <ListItemButton sx={{ px: 1 }}>
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            color: (theme) => theme.palette.danger.main,
                          }}
                        >
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
    </ElevationScroll>
  );
};
export default ResponsiveAppBar;
