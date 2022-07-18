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
import { useSelector } from "react-redux";
import { Cancel, Close } from "@mui/icons-material";

const HireProfessionalModel = ({
  profName = "Professional",
  profId = null,
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
  const userName = useSelector((state) => state?.auth?.user?.full_name);

  React.useEffect(() => {
    const [Y, M, D] = hireDate.split("-");
    setDesc(
      `Hello '${profName}', i saw your listings for "${subServiceName}", i would like to hire you on ${D}-${M}-${Y}. \n-'${userName}'\n`
    );
  }, [profName, subServiceName, hireDate, userName]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      profId: formData.get("profId"),
      subServiceId: formData.get("subServiceId"),
      hireDate: formData.get("hireDate"),
      descMsg: formData.get("descMsg"),
    };
    console.log("Data: ", data);
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
