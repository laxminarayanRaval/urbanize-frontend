import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import authService from "../../store/services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../store/slices/authSlice";

const DeactivateAccount = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = useSelector((state) => state.auth?.user?.id);
  const passVisibleClickHandler = () => {
    setPassVisible(!passVisible);
  };
  const deactivateAccountHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password.length >= 8) e.disabled = true;
    // console.log(":-->", password, userId);
    try {
      const response = await authService.deactivateAccount(userId, password);
      const data = await response.data;
      // console.log("8==>", data.message);
      localStorage.removeItem("token");
      const dispatch = useDispatch();
      dispatch(signout());
    } catch (err) {
      const errorMessage = JSON.stringify(err.response.data.message);
      setErrorMessage(errorMessage);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Typography variant="h4" component="h2">
        Deactivate Account
      </Typography>
      <Typography variant="h6" component="h4" sx={{ mt: 5, mb: 3 }}>
        Are You sure to Deactivate Your Account. This Step is irreversable.
      </Typography>
      <Button
        color="danger"
        variant="contained"
        onClick={(_) => {
          setDialogOpen(true);
        }}
      >
        Deactivate Now
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={(_) => {
          setDialogOpen(false);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>You are Deactivating your Account.</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <DialogContentText color="danger">{errorMessage}</DialogContentText>
          )}
          <DialogContentText mt={2}>
            Please Confirm Your identity via Password.
          </DialogContentText>
          <TextField
            name="password"
            label="Password"
            fullWidth
            required
            sx={{ mt: 1, mb: 2 }}
            type={passVisible ? "text" : "password"}
            value={password}
            disabled={isLoading}
            onChange={(event) => {
              // event.target.style.setProperty("background", "white")
              // if (event.target.value.length < 8)
              // event.target.style.setProperty("background", "#7003")
              setPassword(event.target.value);
            }}
            InputProps={{
              endAdornment: passVisible ? (
                <Visibility color="danger" onClick={passVisibleClickHandler} />
              ) : (
                <VisibilityOff
                  color="danger"
                  onClick={passVisibleClickHandler}
                />
              ),
            }}
          />

          <Button
            color="danger"
            variant="contained"
            disabled={isLoading}
            onClick={deactivateAccountHandler}
          >
            Confirm Deactivation
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeactivateAccount;
