import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import { Link as RRLink, Navigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../store/slices/messageSlice";
import { signin } from "../store/slices/authSlice";
import axios from "axios";

const theme = createTheme();

const SigninPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dispatch: ", formData);
    dispatch(clearMessage);
  }, [dispatch]);

  const onChangeFormData = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    // && formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if (event.target.name === "password" && event.target.value.length >= 8)
      setIsFormValid(true);
    else setIsFormValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    console.log("handleSubmit: ", formData);
    dispatch(signin(formData))
      .unwrap()
      .then(() => {
        // props.history.push("/");
        console.log("then: ", formData);
        console.log("Login success");
      })
      .catch(() => {
        console.log("catch: ", formData);
        console.log("Login fails");
        setIsLoading(false);
      });
  };
  // console.log("<==> ", formData);

  if (isAuth) return <Navigate to="/" />;
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar src={Logo} sx={{ m: 2, bgcolor: "#222", width: "25%", height: "25%" }}          /> */}
          <Typography
            sx={{
              fontFamily: "Smooch",
              letterSpacing: 15,
              fontSize: "7rem",
              transform: "rotate(-15deg)",
            }}
            component="h1"
            // variant="h1"
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            method="post"
            sx={{ mt: 1 }}
          >
            <TextField
              type="email"
              name="email"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoFocus
              helperText={!isFormValid && "Need a proper Email address"}
              onChange={onChangeFormData}
              disabled={isLoading}
            />
            <TextField
              type="password"
              name="password"
              required
              margin="normal"
              fullWidth
              label="Password"
              helperText={
                !isFormValid && "Password must be at least 8 characters"
              }
              onChange={onChangeFormData}
              disabled={isLoading}
            />
            <FormControlLabel
              name="rememberme"
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid || isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? <CircularProgress /> : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RRLink} to="/signup" variant="body2">
                  Don't have an account? Sign Up
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
