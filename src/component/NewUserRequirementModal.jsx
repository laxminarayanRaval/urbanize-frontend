import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState } from "react";
import userService from "../store/services/user.service";

const LoadingList = () => (
  <>
    <MenuItem value={"skeleton-20"}>
      <Skeleton animation="wave" width={150} height={10} />
    </MenuItem>
    <MenuItem value={"skeleton-30"}>
      <Skeleton animation="wave" width={150} height={10} />
    </MenuItem>
    <MenuItem value={"skeleton-40"}>
      <Skeleton animation="wave" width={150} height={10} />
    </MenuItem>
    <MenuItem value={"skeleton-50"}>
      <Skeleton animation="wave" width={150} height={10} />
    </MenuItem>
  </>
);

const SubServiceSelector = ({ setSubService, ...props }) => {
  const servicesList = useSelector((state) => state?.content?.services);
  const [selectedService, setSelectedService] = useState(null);
  const handleChangeService = (event) => {
    setSelectedService(event.target.value);
  };

  const [selectedSubService, setSelectedSubService] = useState(null);
  const handleChangeSubService = (event) => {
    setSelectedSubService(event.target.value);
    const { id, service_name } = event.target.value;
    setSubService({ id, service_name });
  };

  //   useEffect(() => {
  //     if (servicesList?.length)
  //       setSelectedService(servicesList?.find((ele, index) => index === 0));
  //     else setSelectedService(null);
  //   }, [servicesList?.length]);

  //   useEffect(() => {
  //     if (selectedService?.subservice_set?.length)
  //       setSelectedSubServiceId(
  //         selectedService?.subservice_set?.find((ele, index) => index === 0).id
  //       );
  //     else setSelectedSubServiceId(null);
  //   }, [setSelectedService]);

  //   console.log(
  //     "servicesList",
  //     servicesList,
  //     "selectedService",
  //     selectedService,
  //     "selectedSubServiceId",
  //     selectedSubServiceId
  //   );

  return (
    <>
      <FormControl sx={{ mt: 1, minWidth: "100%" }}>
        <InputLabel id="main-service-select-helper-label">Service *</InputLabel>
        <Select
          labelId="main-service-select-helper-label"
          id="main-service-select-helper"
          value={selectedService ?? ""}
          label="Service *"
          onChange={handleChangeService}
        >
          {servicesList?.length ? (
            servicesList
              ?.filter((service) => service?.subservice_set?.length)
              ?.map((service) => (
                <MenuItem value={service}>{service.service_name}</MenuItem>
              ))
          ) : (
            <LoadingList />
          )}
        </Select>
      </FormControl>
      {selectedService?.subservice_set?.length > 0 && (
        <FormControl sx={{ mt: 1, minWidth: "100%" }}>
          <InputLabel id="main-service-select-helper-label">
            Sub-Service *
          </InputLabel>
          <Select
            labelId="main-service-select-helper-label"
            id="main-service-select-helper"
            value={selectedSubService ?? ""}
            label="Sub-Service *"
            onChange={handleChangeSubService}
          >
            {selectedService?.subservice_set?.map((service) => (
              <MenuItem value={service}>{service.service_name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Select Sub-Service </FormHelperText>
        </FormControl>
      )}
    </>
  );
};

const NewUserRequirementModal = ({
  userId = null,
  userName = null,
  userContact = null,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const initialValue = {
    id: null,
    service_name: null,
  };

  const formattedString = `\n- ${userName}\ncontact on: ${userContact}`;

  const [subService, setSubService] = useState(initialValue);
  const [descriptive_msg, setDescriptiveMsg] = useState(formattedString);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setSubService(initialValue);
    setDescriptiveMsg(formattedString);
    setOpen(false);
  };

  useEffect(() => {
    if (subService.id !== initialValue.id)
      setDescriptiveMsg(
        (subService?.service_name
          ? `I want ${subService.service_name} Service.`
          : "<Your Message>") + formattedString
      );
  }, [subService]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (subService.id && userId) {
      const data = {
        subservice_id: subService.id,
        descriptive_msg,
        created_by: userId,
      };
      console.log("Form Submitted - ", data);
      const dataX = userService.postUserRequirements(data).then(
        (response) => {
          console.log(" postUserRequirements response", response);
          setIsSuccess(true);
          setIsLoading(false);
          handleClose();
        },
        (error) => {
          console.log(" postUserRequirements    error", error);
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ fontWeight: "bold", m: 2 }}
      >
        Publish Requirement
      </Button>
      <Dialog
        open={open}
        component="form"
        onClose={handleClose}
        onSubmit={onSubmitHandler}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            px: 2,
          }}
          variant="h4"
        >
          Service Requirement <Cancel onClick={handleClose} cursor="pointer" />
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent sx={{ py: 1, px: 2 }}>
          {isSuccess ? (
            <DialogContentText variant="subtitle2" color="success">
              Published Successfully, you will see it shortly
            </DialogContentText>
          ) : (
            <>
              <DialogContentText variant="subtitle2">
                A New Post will be shown to all online professionals releted to
                service requirement, you will need to wait for a professionals
                to show interest below details.
              </DialogContentText>
              <SubServiceSelector
                setSubService={(SSData) => setSubService(SSData)}
              />
              <TextField
                margin="dense"
                id="descMsg"
                name="descMsg"
                multiline
                required
                fullWidth
                rows={4}
                value={descriptive_msg}
                spellCheck={false}
                onChange={(event) => {
                  setDescriptiveMsg(event.target.value);
                }}
                helperText="You can Customize the Description, It can be Better for Understanding"
                label="Requirements Description"
              />
              <Typography
                variant="caption"
                color={
                  !subService?.id || !(descriptive_msg?.length > 0)
                    ? "error"
                    : "primary"
                }
              >
                {!subService?.id
                  ? "Please select a sub-service"
                  : !descriptive_msg?.length > 0
                  ? "Please Provide Some Description"
                  : "Looks Nice"}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ py: 1, px: 2 }}>
          <Button color="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={!subService?.id || !(descriptive_msg?.length > 0)}
            variant="outlined"
            type="submit"
            color="success"
          >
            {isLoading ? "Loading..." : "Publish"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewUserRequirementModal;
