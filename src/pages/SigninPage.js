import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link as RRLink } from "react-router-dom"

const theme = createTheme();

const SigninPage = () => {
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("handleSubmit");

    const data = new FormData(event.currentTarget);

    console.log(JSON.stringify(data), data);
    axios
      .post("auth/signin/", data)
      .then((response) => {
        console.log("then", response);
      })
      .catch((error) => {
        console.log("catch", error.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column",  alignItems: "center",}} >
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign IN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} > 
            <TextField name="email" margin="normal" required fullWidth id="email" label="Email Address"
              autoComplete="email" autoFocus />
            <TextField name="password" required margin="normal" fullWidth label="Password" type="password"
              id="password" autoComplete="current-password" />
            <FormControlLabel name="rememberme" control={<Checkbox value="remember" color="primary" />} 
              label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RRLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SigninPage;
