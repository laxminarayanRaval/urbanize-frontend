import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { Link as RRLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearMessage } from "../store/slices/messageSlice";
import { signin } from "../store/slices/authSlice";

import SigninAnimation from "../assets/lottiefiles/signin_animation.json";
import Lottie from "lottie-react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import authService from "../store/services/auth.service";

const SigninPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [passVisible, setPassVisible] = useState(false);
  const passVisibleClickHandler = () => setPassVisible(!passVisible);

  useEffect(() => {
    // console.log("dispatch: ", formData);
    dispatch(clearMessage);
  }, [dispatch]);

  const changeForgetPassSiginHandler = (e) => {
    e.preventDefault();
    setIsForgetPassword(!isForgetPassword);
  };

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
    // const data = new FormData(event.currentTarget);
    // console.log("handleSubmit: ", formData);
    dispatch(signin(formData))
      .unwrap()
      .then(() => {
        // props.history.push("/");
        // console.log("then: ", formData);
        console.log("Login success");
      })
      .catch(() => {
        // console.log("catch: ", formData);
        console.log("Login fails");
        setIsLoading(false);
      });
  };

  const requestForgetPassword = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("requestForgetPassword", data.get("email"), data);
    try {
      const response = await authService.forgetPassword(data);

      console.log(response, response.data.message);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };
  const showForgetPassword = () => (
    <Grid elevation={3} mx={1} p={2} item xs={12} sm={12} md={4} maxWidth="sm">
      <Typography component="h3" variant="h4">
        Please Enter Your Registered Email.
      </Typography>
      <Box
        component="form"
        onSubmit={requestForgetPassword}
        method="post"
        sx={{ mt: 1 }}
      >
        <TextField
          type="email"
          name="email"
          margin="normal"
          helperText="Email Address Which is used to register your account"
          required
          fullWidth
          label="Email Address"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            cursor: "pointer",
          }}
        >
          Send Reset Password Link
        </Button>
        <Grid container>
          <Grid item xs>
            <Link onClick={changeForgetPassSiginHandler} variant="body2">
              Rememberred ? Sig In.
            </Link>
          </Grid>
          <Grid item>
            <Link component={RRLink} to="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
  const showSignin = () => (
    <Grid elevation={3} mx={1} p={2} item xs={12} sm={12} md={4} maxWidth="sm">
      <Typography component="h3" variant="h1">
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
          type={passVisible ? "text" : "password"}
          name="password"
          required
          margin="normal"
          fullWidth
          label="Password"
          helperText={!isFormValid && "Password must be at least 8 characters"}
          InputProps={{
            endAdornment: passVisible ? (
              <Visibility onClick={passVisibleClickHandler} />
            ) : (
              <VisibilityOff onClick={passVisibleClickHandler} />
            ),
          }}
          onChange={onChangeFormData}
          disabled={isLoading}
        />
        <FormControlLabel
          name="rememberme"
          control={<Checkbox value="remember" />}
          label="Remember me"
          disabled={isLoading}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isFormValid || isLoading}
          sx={{
            mt: 3,
            mb: 2,
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          {isLoading ? <CircularProgress /> : "Sign In"}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              href=""
              onClick={changeForgetPassSiginHandler}
              variant="body2"
            >
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
    </Grid>
  );

  if (isAuth) return <Navigate to="/" />;

  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: "90vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          sx={{
            display: { xs: "none", md: "flex" },
            // alignItems: "flex-start",
            // justifyContent: "flex-end",
          }}
          md={6}
        >
          <Lottie
            animationData={SigninAnimation}
            style={{ width: "95%" }}
            loop={true}
          />
        </Grid>
        {isForgetPassword ? showForgetPassword() : showSignin()}
      </Grid>
    </>
  );
};

export default SigninPage;
