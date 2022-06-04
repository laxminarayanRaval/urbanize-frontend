import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { uid, token } = useParams();

  const [passVisible, setPassVisible] = useState(false);

  console.log(uid, token);
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", marginBottom: "5%" }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        maxWidth="xs"
        sx={{
          mx: "3%",
          padding: "3%",
          // minHight: "max-content",
          marginTop: "-3%",
        }}
      >
        <Typography component="h1" variant="h1">
          Sign up
        </Typography>
        <Box
          component="form"
          method="post"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3, display: sucessful && "none" }}
        >
          <TextField
            // required
            type={passVisible ? "text" : "password"}
            fullWidth
            name="password"
            label="Password"
            id="password"
            margin="dense"
            autoComplete="new-password"
            // value={formik.values.password}
            // onChange={formik.handleChange}
            // error={formik.touched.password && Boolean(formik.errors.password)}
            // helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: passVisible ? (
                <Visibility color="primary" onClick={passVisibleClickHandler} />
              ) : (
                <VisibilityOff
                  color="primary"
                  onClick={passVisibleClickHandler}
                />
              ),
            }}
          />
          <TextField
            type={passVisible ? "text" : "password"}
            name="password2"
            label="Confirm Password"
            id="password2"
            autoComplete="new-password"
            fullWidth
            margin="dense"
            // value={formik.values.password2}
            // onChange={formik.handleChange}
            // error={formik.touched.password2 && Boolean(formik.errors.password2)}
            // helperText={formik.touched.password2 && formik.errors.password2}
            InputProps={{
              endAdornment: passVisible ? (
                <Visibility color="primary" onClick={passVisibleClickHandler} />
              ) : (
                <VisibilityOff
                  color="primary"
                  onClick={passVisibleClickHandler}
                />
              ),
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordPage;
