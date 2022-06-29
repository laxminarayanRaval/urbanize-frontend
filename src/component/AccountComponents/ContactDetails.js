import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Edit, EditOff, Visibility, VisibilityOff } from "@mui/icons-material";
import userService from "../../store/services/user.service";
import { updateContacts } from "../../store/slices/authSlice";

const ContactDetails = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const userData = useSelector((state) => state?.auth?.user);

  const [passVisible, setPassVisible] = useState(false);
  const [emailEdit, setEmailEdit] = useState(true);
  const [mobileEdit, setMobileEdit] = useState(true);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(userData?.email);
  const [mobile, setMobile] = useState(userData?.mobile);

  const [preventChange, setPreventChange] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (userData?.mobile === mobile && userData?.email === email) {
      setPreventChange(true);
    } else setPreventChange(false);
  }, [email, mobile]);

  const passVisibleClickHandler = () => {
    setPassVisible(!passVisible);
  };

  const dispatch = useDispatch();

  const updateContactDetailHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPassword("");
    dispatch(updateContacts({ password, email, mobile }))
      .unwrap()
      .then(() => {
        setPreventChange(true);
        setErrorMessage("");
        setSuccessMessage("Details updated successfully.");
      })
      .catch(() => {
        setSuccessMessage("");
        setErrorMessage("Update contact details failed.");
      });
    setEmailEdit(true);
    setMobileEdit(true);
    // console.log("85: ");

    // try {
    //   const response = await userService.updateContactDetails({
    //     password,
    //     email,
    //     mobile,
    //   });

    //   const data = await response.data;
    //   console.log("BD: ", data.message);
    //   setPreventChange(true);
    //   setErrorMessage("");
    //   setSuccessMessage(data.message);
    // } catch (err) {
    //   const errorMessage = JSON.stringify(err?.response?.data?.message)
    //     .replace(/\[|]|{|}/g, " ")
    //     // .replaceAll(",", "\n")
    //     .split(":")[1];
    //   setSuccessMessage("");
    //   setErrorMessage(errorMessage);
    // }
    setIsLoading(false);
  };

  return (
    <>
      <Typography variant="h4" component="h4">
        Contact Details
      </Typography>

      <Grid
        container
        component="address"
        spacing={1}
        pl={1}
        alignItems="baseline"
      >
        <Grid item xs={12} sm={12} md={2} mt={2}>
          <Typography variant="body1" component="p">
            Email Address:
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <Typography variant="h6" component="h6">
            {userData?.email}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={2} mt={2}>
          <Typography variant="body2" component="p">
            Phone Number:
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={10}>
          <Typography variant="h6" component="h6">
            {userData?.mobile ? userData?.mobile : "Not Provider"}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" component="h4" sx={{ mt: 3, mb: 1 }}>
        Do You want to update your contact details
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Update Contact Details
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>You are Changing Contact Details.</DialogTitle>
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
            Please Confirm Your identity via Password.
          </DialogContentText>
          <form method="post" onSubmit={updateContactDetailHandler}>
            <TextField
              name="password"
              label="Password"
              fullWidth
              required
              sx={{ mt: 1, mb: 2 }}
              type={passVisible ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              InputProps={{
                endAdornment: passVisible ? (
                  <Visibility
                    color="primary"
                    onClick={passVisibleClickHandler}
                  />
                ) : (
                  <VisibilityOff
                    color="primary"
                    onClick={passVisibleClickHandler}
                  />
                ),
              }}
            />

            <Divider />

            <DialogContentText mt={2}>Edit Detail.</DialogContentText>

            <TextField
              type="email"
              name="email"
              label="Email"
              fullWidth
              sx={{ mt: 1 }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              disabled={emailEdit}
              InputProps={{
                endAdornment: emailEdit ? (
                  <EditOff
                    color="primary"
                    onClick={() => {
                      setEmailEdit(!emailEdit);
                    }}
                  />
                ) : (
                  <Edit
                    color="primary"
                    onClick={() => {
                      setEmailEdit(!emailEdit);
                    }}
                  />
                ),
              }}
            />

            <TextField
              type="number"
              name="mobile"
              label="Mobile"
              fullWidth
              sx={{ mt: 1, mb: 2 }}
              onChange={(e) => {
                const mobileValue =
                  e.target.value === "" ? "None" : e.target.value;
                setMobile(mobileValue);
              }}
              value={mobile == "None" ? "" : mobile}
              disabled={mobileEdit}
              InputProps={{
                endAdornment: mobileEdit ? (
                  <EditOff
                    color="primary"
                    onClick={() => {
                      setMobileEdit(!mobileEdit);
                    }}
                  />
                ) : (
                  <Edit
                    color="primary"
                    onClick={() => {
                      setMobileEdit(!mobileEdit);
                    }}
                  />
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={preventChange || isLoading}
            >
              {isLoading ? "Loading..." : "Change Details"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactDetails;
