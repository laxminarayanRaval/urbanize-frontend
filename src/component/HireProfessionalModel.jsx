import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Cancel, Close } from "@mui/icons-material";
import userService from "../store/services/user.service";
import { setMessage } from "../store/slices/messageSlice";

const HireProfessionalModel = ({
  profName = "Professional",
  profId = null,
  pus_id = null,
  subServiceName = "Sub Service",
  subServiceId = null,
  ...props
}) => {
  const [dd, mm, yyyy] = new Date().toLocaleDateString().split("/");
  const today = [yyyy, mm, dd].join("-").toString();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [hireDate, setHireDate] = React.useState(today);
  const [errorDate, setErrorDate] = React.useState(false);
  const handleHireDateChange = (event) => {
    setErrorDate(event.target.value < today);
    if (event.target.value >= today) setHireDate(event.target.value);
  };

  const [desc, setDesc] = React.useState("");
  const authUser = useSelector((state) => state?.auth?.user);

  React.useEffect(() => {
    const [Y, M, D] = hireDate.split("-");
    setDesc(
      `Hello '${profName}', i saw your listings for "${subServiceName}", i would like to hire you on "${D}-${M}-${Y}". 
- '${authUser?.full_name}'
Contact on: ${authUser?.mobile_no ?? authUser?.email} `
    );
  }, [profName, subServiceName, hireDate, authUser]);

  const dispatch = useDispatch();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      // prof_id: formData.get("profId"),
      subservice_id: formData.get("subServiceId"),
      prof_id: pus_id,
      hire_date: formData.get("hireDate"),
      descriptive_msg: formData.get("descMsg"),
    };
    userService?.hireProfessionalService(data).then(
      (response) => {
        console.log("Resolve Response: ", response);
        dispatch(setMessage(response));
      },
      ({ response, ...error }) => {
        console.log("Rejected Response: ", response, "\n==error==\n :", error);
      }
    );
    // console.log("Data: ", data);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Hire Now
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={onSubmitHandler}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          variant="h4"
        >
          {"Hire " + profName} <Cancel onClick={handleClose} cursor="pointer" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="subtitle2">
            To Hire {profName}, you will need to make a request and provide
            below details.
          </DialogContentText>
          <Typography variant="h6" color="primary">
            {subServiceName}
          </Typography>
          <TextField
            sx={{ display: "none" }}
            id="profId"
            name="profId"
            value={profId}
            type="hidden"
          />
          <TextField
            sx={{ display: "none" }}
            id="subServiceId"
            name="subServiceId"
            value={subServiceId}
            type="hidden"
          />
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            type="date"
            id="hireDate"
            name="hireDate"
            label="Hire Date"
            value={hireDate}
            onChange={handleHireDateChange}
            error={errorDate}
            helperText={errorDate && "Past Dates cannot be accepted."}
          />
          <TextField
            multiline
            margin="dense"
            id="descMsg"
            name="descMsg"
            rows={4}
            value={desc}
            onChange={(event) => {
              setDesc(event.target.value);
            }}
            label="Description for Hiring"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            type="submit"
            color="success"
            onClick={handleClose}
          >
            Hire
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

/* <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal> */

export default HireProfessionalModel;
