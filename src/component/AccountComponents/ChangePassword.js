import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import authService from "../../store/services/auth.service";

const ChangePassword = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [oldPassVisible, setOldPassVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassVisible, setNewPassVisible] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: "",
    password2: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (newPassword.password.length <= 8 || newPassword.password2.length <= 8)
      setErrorMessage("New password must be at least 8 characters");
    else if (newPassword.password !== newPassword.password2)
      setErrorMessage("New Password and Confirm New Password must be same.");
    else setErrorMessage("");
  }, [newPassword]);

  const oldPassVisibleClickHandler = () => {
    setOldPassVisible(!oldPassVisible);
  };
  const newPassVisibleClickHandler = () => {
    setNewPassVisible(!newPassVisible);
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(":-->");

    try {
      const response = await authService.changePassword({
        oldpassword: oldPassword,
        ...newPassword,
      });
      const data = await response.data;
      console.log("8==>", data.message);
      setErrorMessage("");
      setSuccessMessage(data.message);
    } catch (err) {
      const errorMessage = JSON.stringify(err?.response?.data?.message)
        .replaceAll(/\[|]|{|}/g, " ")
        .replaceAll(",", "\n")
        .split(":")[1];
      setSuccessMessage("");
      setErrorMessage(errorMessage);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Typography variant="h4" component="h3">
        Change Password
      </Typography>
      <Typography variant="h6" component="h4" sx={{ mt: 5, mb: 3 }}>
        You are About to Change Your Password.
      </Typography>
      <Button
        color="info"
        variant="contained"
        onClick={(_) => {
          setDialogOpen(true);
        }}
      >
        Change Password
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={(_) => {
          setDialogOpen(false);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>You are Changing Account's Password.</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <Typography
              variant="body2"
              sx={{ color: "#f55", fontWeight: "bold" }}
            >
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography
              variant="body2"
              sx={{ color: "green", fontWeight: "bold" }}
            >
              {successMessage}
            </Typography>
          )}
          <DialogContentText mt={2}>
            Please Confirm Your identity via old Password.
          </DialogContentText>
          <form method="post" onSubmit={changePasswordHandler}>
            <TextField
              name="oldpassword"
              label="Old Password"
              fullWidth
              required
              sx={{ mt: 1, mb: 2 }}
              type={oldPassVisible ? "text" : "password"}
              value={oldPassword}
              disabled={isLoading}
              onChange={(event) => {
                setOldPassword(event.target.value);
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              InputProps={{
                endAdornment: oldPassVisible ? (
                  <Visibility
                    color="info"
                    onClick={oldPassVisibleClickHandler}
                  />
                ) : (
                  <VisibilityOff
                    color="info"
                    onClick={oldPassVisibleClickHandler}
                  />
                ),
              }}
            />

            <Divider />

            <DialogContentText mt={2}>Set New Password.</DialogContentText>
            <TextField
              name="password"
              label="New Password"
              fullWidth
              required
              sx={{ mt: 1 }}
              type={newPassVisible ? "text" : "password"}
              value={newPassword.password}
              disabled={isLoading}
              onChange={(event) => {
                setNewPassword((prevState) => ({
                  ...prevState,
                  password: event.target.value,
                }));
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              InputProps={{
                endAdornment: newPassVisible ? (
                  <Visibility
                    color="info"
                    onClick={newPassVisibleClickHandler}
                  />
                ) : (
                  <VisibilityOff
                    color="info"
                    onClick={newPassVisibleClickHandler}
                  />
                ),
              }}
            />

            <TextField
              name="password2"
              label="Confirm New Password"
              fullWidth
              required
              color={
                newPassword.password === newPassword.password2
                  ? "info"
                  : "danger"
              }
              sx={{ mt: 1, mb: 2 }}
              type={newPassVisible ? "text" : "password"}
              value={newPassword.password2}
              disabled={isLoading}
              onChange={(event) => {
                setNewPassword((prevState) => ({
                  ...prevState,
                  password2: event.target.value,
                }));
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              InputProps={{
                endAdornment: newPassVisible ? (
                  <Visibility
                    color="info"
                    onClick={newPassVisibleClickHandler}
                  />
                ) : (
                  <VisibilityOff
                    color="info"
                    onClick={newPassVisibleClickHandler}
                  />
                ),
              }}
            />

            <Button
              type="submit"
              color="info"
              variant="contained"
              disabled={isLoading || errorMessage}
            >
              Change Password Now
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePassword;
