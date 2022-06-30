import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { HighlightOffOutlined } from "@mui/icons-material";

import { citiesNames } from "../utils/Helpers";
import userService from "../store/services/user.service";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// start ------ Apply for being Professional    ----------
const ProfessionalListing = (props) => {
  const [citiesList, setCitiesList] = useState([]);

  const maxCityLimit = 8;

  const updateCitiesList = (event) => {
    const {
      target: { value },
    } = event;
    const cityName = event.target.value;
    if (citiesList.length < maxCityLimit) {
      if (!citiesList.includes(cityName))
        setCitiesList(typeof value === "string" ? value.split(",") : value);
      event.target.value = "";
    }
    // console.log(citiesList);
  };

  const citiesInputProps =
    citiesList.length < maxCityLimit
      ? { placeholder: "Add More", onChange: updateCitiesList }
      : { placeholder: "Limit Reached", disabled: true };

  const removeCity = (index) => {
    const updateValue = [...citiesList];
    updateValue.splice(index, 1);
    setCitiesList(updateValue);
  };
  // Availability Time Formatting and Storing

  const [startsTime, setStartTime] = useState("");
  const [endsTime, setEndTime] = useState("");

  const avalblHrsHandler = (event) => {
    if (event.target.name === "startTime") setStartTime(event.target.value);
    else if (event.target.name === "endTime") setEndTime(event.target.value);
  };

  const formattedTime = `${startsTime} to ${endsTime}`;
  // console.log("========= Formatted Time =========", formattedTime);

  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [respStatusCode, setRespStatusCode] = useState();

  const submitDataHandler = async () => {
    setIsLoading(true);
    const formData = {
      cities: citiesList.join(","),
      startsTime,
      endsTime,
      address,
    };
    console.log(
      "formDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ",
      formData
    );

    try {
      const response = await userService
        .beingUserProfessional(formData)
        .then((response) => {
          const data = response.data;

          console.log("--------------------", data.message);
          setMessage(data.message);
          setRespStatusCode(response.status);
          setIsLoading(false);
          return data;
        });
    } catch (err) {
      console.log("========================", err);
      setIsLoading(false);
    }
    console.log("------------------------------------------------: ", response);

    // setTimeout(() => {
    //   debugger;
    // }, 3000);
  };

  const theme = useTheme();

  function getStyles(name, citiesList, theme) {
    return {
      fontWeight:
        citiesList.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightBold,
    };
  }

  return (
    <Box
      component="form"
      container
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={2}
    >
      <Grid item container xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Cities List:</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <FormControl sx={{ m: 1, width: "315px" }}>
            <InputLabel id="demo-multiple-chip-label">Cities</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={citiesList}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              MenuProps={MenuProps}
              {...citiesInputProps}
            >
              {citiesNames.map(({ id, name }) => (
                <MenuItem
                  key={id}
                  value={name}
                  style={getStyles(name, citiesList, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Cities where you want to provide Services.(Max {maxCityLimit})
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} mb={1} width="350px">
          {!citiesList.length && (
            <Typography variant="body1">Please Select some Cities.</Typography>
          )}
          {!!citiesList.length &&
            citiesList.map((ele, index) => (
              <Chip
                color="primary"
                key={index}
                sx={{ m: 0.5 }}
                deleteIcon={<HighlightOffOutlined />}
                label={ele}
                onDelete={() => removeCity(index)}
              />
            ))}
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Availability Hours:</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <TextField
            name="startTime"
            helperText="Service Start Time"
            type="time"
            sx={{ mr: 2 }}
            onChange={avalblHrsHandler}
          />
          <TextField
            name="endTime"
            helperText="Service End Time"
            type="time"
            sx={{ ml: 2 }}
            onChange={avalblHrsHandler}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Typography variant="h5">{formattedTime}</Typography>
          <Typography variant="body2">
            Availability Hours in Which you are able to provide Service
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Professional Address:</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} px={2}>
          <TextField
            multiline
            fullWidth
            rows={3}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            name="address"
            label="Profession's Address"
            helperText="If someone wants to meet you."
          />
          {isLoading && (
            <Box width="100%">
              <LinearProgress color="secondary" />
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
      </Grid>
      <Grid item container xs={12} sm={12} md={12} p={1}>
        <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
        <Grid
          component={Button}
          onClick={submitDataHandler}
          variant="contained"
          item
          disabled={isLoading}
          xs={12}
          sm={12}
          md={5}
          lg={5}
        >
          Process Further
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
      </Grid>
      {!message && (
        <Typography
          component="b"
          variant="h6"
          fontWeight="bold"
          sx={{
            textTransform: "capitalize",
            color: theme.palette[respStatusCode ? "success" : "danger"].main,
          }}
        >
          <Divider variant="middle" />
          {message +
            "data is transmitted to server and will be sent to the administrators office"}
        </Typography>
      )}
    </Box>
  );
};
// end   ------ Apply for being Professional    ----------

// start ------ List Your Services              ----------
const ServicesListing = (props) => {
  return <h1>ServicesListing</h1>;
};
// end   ------ List Your Services              ----------
// start ------ Done Animation                  ----------
const DoneAnimation = () => {
  return <h1>DoneAnimation</h1>;
};
// end   ------ Done Animation                  ----------

// Start ====== StartProfessionalPage           =================================================
const StartProfessionalPage = () => {
  const userData = useSelector((state) => state?.auth?.user);

  /* Steps for being professional
    0. Apply for being Professional
    1. List Your Services
    2. Done
  */

  // Check for current step
  const [currentStep, setCurrentStep] = useState(0);
  // if (userData?.professionaluser_set) {
  if (Object.keys(userData?.professionaluser_set || {}).length)
    setCurrentStep(1);
  if (userData?.role == "prof") setCurrentStep(2);
  // }
  const steps = [
    {
      label: "Professional Listing",
      caption: "Your Professional Details to be shown on the listing page",
      component: <ProfessionalListing />,
    },
    { label: "Services Listing", caption: "", component: <ServicesListing /> },
    {
      label: "Done",
      caption: "No step Just Relax",
      component: <DoneAnimation />,
    },
  ];

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  console.log("currentStep:", currentStep);

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      textAlign="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={12}>
        <Typography
          component="h3"
          variant="h3"
          sx={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
          }}
        >
          {`Mr/Ms. ${userData?.full_name ?? "Error"}`}
        </Typography>
        <Typography component="p" variant="body1" px={1} mt={1}>
          Please Provide Few Additional information to process your application
          for being Professional
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stepper activeStep={currentStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconProps={{ color: "red" }}
                optional={
                  // index === 2 ? (
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "'DM Serif Display', serif",
                      fontStyle: "italic",
                    }}
                  >
                    {step.caption}
                  </Typography>
                  // ) : null
                }
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'DM Serif Display', serif",
                    fontStyle: "italic",
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Paper elevation={4} sx={{ p: 1, my: 1 }}>
                  {step.component}
                </Paper>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
};
// End   ====== StartProfessionalPage           =================================================
export default StartProfessionalPage;
