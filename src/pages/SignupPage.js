import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RRLink, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { useFormik } from "formik";
import { clearMessage } from "../store/slices/messageSlice";
import { signup } from "../store/slices/authSlice";

// import Logo from "../assets/logo.png";
const theme = createTheme();

const SignupPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  if (isAuth) return <Navigate to="/" />;

  const dispatch = useDispatch();
  const [sucessful, setSuccessful] = React.useState(false);

  React.useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    full_name: "",
    email: "",
    password: "",
    password2: "",
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Please enter a full name"),
    email: Yup.string()
      .email("This email is not valid.")
      .required("Please Provide a valid email"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 8 and 25 characters.",
        (val) =>
          val && val.toString().length >= 8 && val.toString().length <= 25
      )
      .required("A strong password must be provided."),
    password2: Yup.string().test(
      "match",
      "Please Insert Same Password as Above.",
      (val) => this.parent.password === val
    ), // some sort of error
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      setSuccessful(false);
      debugger;
      dispatch(signup(values))
        .unwrap()
        .then(() => {
          setSuccessful(true);
          console.log("dispatch then");
        })
        .catch(() => {
          setSuccessful(false);
          console.log("dispatch catch");
        });
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "#222", width: "25%", height: "25%" }} src={Logo} /> */}
          <Typography
            sx={{
              fontFamily: "Smooch",
              letterSpacing: 15,
              fontSize: "7rem",
              transform: "rotate(-15deg)",
            }}
            component="h1"
            // variant="h2"
          >
            Sign up
          </Typography>
          <Box
            visibility={sucessful && "hidden"}
            component="form"
            method="post"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="full_name"
                  fullWidth
                  id="full_name"
                  label="Full Name"
                  autoFocus
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.full_name && Boolean(formik.errors.full_name)
                  }
                  helperText={
                    formik.touched.full_name && formik.errors.full_name
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                  sx={{ mt: 2 }}
                  // required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password2 && Boolean(formik.errors.password2)
                  }
                  helperText={
                    formik.touched.password2 && formik.errors.password2
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RRLink} to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupPage;
