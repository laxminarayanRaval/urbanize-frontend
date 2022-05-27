import React from "react";

import Lottie from "lottie-react";
import ContactusAnim from "../assets/lottiefiles/contactus_anim.json";

// import  from "@mui/material/Typography";
import { Grid, TextField, Typography } from "@mui/material";
// import  from "@mui/material/TextField";

const ContactUsPage = () => {
  return (
    <Grid container justifyContent="space-evenly" alignItems="center">
      <Grid item>
        <Lottie animationData={ContactusAnim} style={{}} loop={true} />
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h3">Contact Us</Typography>
        <Grid component="form">
        <TextField name="full_name" id="full_name" label="Full Name" autoComplete="off" fullWidth autoFocus margin="dense" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUsPage;
