import * as React from "react";
import Typography from "@mui/material/Typography";
import Copyright from "./Copyright";
import {
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  DarkMode,
  Facebook,
  Instagram,
  LightMode,
  LinkedIn,
  Pinterest,
  Twitter,
  YouTube,
} from "@mui/icons-material";

import { changeThemeMode } from "../store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { makeSlug } from "../utils/Helpers";

const setHashLinks = (element) => (
  <ListItemButton
    sx={{
      borderRadius: 10,
      my: 0,
      py: 0,
      maxWidth: "max-content",
    }}
    component={Link}
    href={"/#" + makeSlug(element)}
  >
    <ListItemText>{element}</ListItemText>
  </ListItemButton>
);

const setListLinks = (prefix = "", element) => (
  <ListItemButton
    sx={{
      borderRadius: 10,
      my: 0,
      py: 0,
      maxWidth: "max-content",
    }}
    component={Link}
    href={prefix + makeSlug(element) + "/"}
  >
    <ListItemText>{element}</ListItemText>
  </ListItemButton>
);

export default function Footer() {
  const themeMode = useSelector((state) => state?.theme?.mode);

  const dispatch = useDispatch();

  const socialLinks = [
    { name: "Facebook", icon: <Facebook />, href: "Facebook.com/" },
    { name: "Instagram", icon: <Instagram />, href: "Instagram.com/" },
    { name: "Twitter", icon: <Twitter />, href: "Twitter.com/" },
    { name: "YouTube", icon: <YouTube />, href: "YouTube.com/" },
    { name: "Pinterest", icon: <Pinterest />, href: "Pinterest.com/" },
    { name: "LinkedIn", icon: <LinkedIn />, href: "LinkedIn.com/" },
  ];

  const companyTags = [
    "About us",
    "Blog",
    // "Career",
    "FAQs",
    "History",
    // "Sitemap",
    "Story",
  ];
  const companyLinks = [
    "Trust & Safety",
    "Advertise with us",
    "Press & Journal",
    "Support Center",
    "Terms And Conditions",
  ];

  return (
    <Grid
      container
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Grid item p={2} xs={12} sm={12} md={3} lg={3}>
        <Typography ml={2} variant="h4">
          Urbanize Inc.
        </Typography>
        <Divider light sx={{ mt: 1 }} />
        {socialLinks.map((ele) => (
          <IconButton
            key={ele.name}
            title={ele.name}
            component={Link}
            href={ele.href}
          >
            {ele.icon}
          </IconButton>
        ))}
        {/* <Tooltip title={`${themeMode} Mode`}> */}
        <IconButton onClick={(_) => dispatch(changeThemeMode())}>
          {themeMode === "light" ? (
            <LightMode sx={{ color: "#222" }} />
          ) : (
            <DarkMode sx={{ color: "#ddd" }} />
          )}
        </IconButton>
        {/* </Tooltip> */}
      </Grid>
      <Grid item container p={2} xs={12} sm={12} md={6} lg={6}>
        <Grid item xs={6} sm={6} md>
          <Typography variant="h5">Company</Typography>
          <List>
            {companyTags.map((ele) => (
              <ListItem key={ele} sx={{ py: 0 }}>
                {setHashLinks(ele)}
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs sm md>
          <Typography variant="h5">Links</Typography>
          <List>
            {companyLinks.map((ele) => (
              <ListItem key={ele} sx={{ py: 0 }}>
                {setListLinks("/", ele)}
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs sm={6} md>
          <Typography variant="h5">Popular Services</Typography>
          {[
            {service: "Appliance_&_Electronic_Repairs",subservice: "AC Service & Repair",},
            {service: "Cleaning_Services",subservice: "Bathroom Cleaning",},
            {service: "Cleaning_Services",subservice: "Kitchen Cleaning",},
            {service: "Re-location_Services",subservice: "Packing & Unpacking",},
            {service: "Re-location_Services",subservice: "Plants Relocation",},
            {service: "Cleaning_Services",subservice: "Sofa Cleaning",},
            {service: "Appliance_&_Electronic_Repairs",subservice: "Washing Machine Repair",},
          ].map((ele) => (
            <ListItem key={ele} sx={{ py: 0.25 }}>
              {setListLinks(`/services/${ele.service}/`, ele.subservice)}
            </ListItem>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} p={2}>
        <Typography variant="h5">Download Our App</Typography>
        <Typography variant="body2">
          Do things with ease on tips your fingers.
        </Typography>
        <img
          src="https://res.cloudinary.com/urbanize/image/upload/v1655109450/RCB-Google-Play_dllw9s.png"
          width="200px"
          alt="Google Play Store"
        />
        <img
          src="https://res.cloudinary.com/urbanize/image/upload/v1655109550/download-on-the-app-store_kyuqqf.svg"
          width="200px"
          alt="Google Play Store"
        />
        <Typography variant="body2">All illustrations are picked from <a href="https://storyset.com/profile">Storyset</a></Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} justifyContent="center" maxWidth="sm">
        <Typography variant="body1" textAlign="center">
          All you need is to care about yourself 1st.
        </Typography>
        <Copyright />
      </Grid>
    </Grid>
  );
}
