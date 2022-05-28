import React from "react";

import Lottie from "lottie-react";
import ContactusAnim from "../assets/lottiefiles/contactus_anim.json";

import { Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/system";

const ContactUsPage = () => {
  return (
    <Grid container justifyContent="space-evenly" alignItems="center">
      <Grid item xs={false} md={6}>
        <Lottie animationData={ContactusAnim} loop={true} />
      </Grid>
      {/* <Grid item xs={12} md={4} spacing={2}> */}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { mx: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Tooltip arrow title="Contact us animation">
          <Typography component="h1" variant="h3">
            Contact Us
          </Typography>
        </Tooltip>
        <Grid component="form">
          <Grid container spacing={5}>
            <Grid item md={6}>
              <TextField
                name="first_name"
                id="first_name"
                label="First Name"
                variant="standard"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name="last_name"
                id="last_name"
                label="Last Name"
                variant="standard"
              />
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item md={6}>
              <TextField
                name="email_id"
                id="email_id"
                label="Email Id"
                variant="standard"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name="phone"
                id="phone"
                label="Phone Number"
                variant="standard"
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              name="message_title"
              id="message_title"
              label="Message Title"
              variant="standard"
              fullWidth
              margin="normal"
            />
            <TextField
              name="message_desc"
              id="message_desc"
              label="Message Description"
              variant="standard"
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button>
          Submit <ArrowForwardIcon />
        </Button>
      </Box>
      {/* </Grid> */}
    </Grid>
  );
};

export default ContactUsPage;
