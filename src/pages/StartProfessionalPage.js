import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
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
import { HighlightOffOutlined } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { citiesNames } from "../utils/Helpers";
import userService from "../store/services/user.service";
import { getUserDetails } from "../store/slices/authSlice";
import FileUpload from "../component/FileUpload";

import VectorGif from "../assets/gifs/Enthusiastic.gif";

/* Steps for being professional
    0. Apply for being Professional
    1. List Your Services
    2. Done
*/

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

// start ------ Apply for being Professional    ----------------------------------------
const ProfessionalListing = ({ isCompleted, ...props }) => {
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

  // console.log("respStatusCode:", respStatusCode);
  useEffect(() => {
    setTimeout(() => {
      // console.log("after 3s respStatusCode:", respStatusCode);
      if (respStatusCode >= 200 && respStatusCode < 300)
        isCompleted("ProfessionalListing");
    }, 3000);
  }, [respStatusCode]);

  const submitDataHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = {
      cities: citiesList.join(","),
      startsTime,
      endsTime,
      address,
    };
    // console.log("formDataaaaaaaaaaaa: ", formData);

    const response = userService
      .beingUserProfessional(formData)
      .then((response) => {
        const data = response.data;

        // console.log("--------------------", data.message);
        setMessage(JSON.stringify(data.message));
        setRespStatusCode(response.status);
        setIsLoading(false);
        return data;
      })
      .catch((err) => {
        // console.log("========error==========", err);
        const response = err.response;
        const data = response.data;

        // console.log("--------------------", data.message);
        setMessage(JSON.stringify(data.message));
        setRespStatusCode(response.status);
        setIsLoading(false);
      });

    console.log(
      "---------------------response---------------------------: ",
      response
    );

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
      onSubmit={submitDataHandler}
      my={2}
    >
      <Grid item container xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Cities List: *</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <FormControl sx={{ m: 1, width: "315px" }}>
            <InputLabel id="demo-multiple-chip-label">Cities</InputLabel>
            <Select
              required
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={citiesList ?? ""}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              MenuProps={MenuProps}
              {...citiesInputProps}
            >
              {citiesNames.map(({ id, name }) => (
                <MenuItem
                  key={id}
                  value={name ?? ""}
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
          <Typography variant="h6">Availability Hours: *</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <TextField
            required
            name="startTime"
            helperText="Service Start Time"
            type="time"
            sx={{ mr: 2 }}
            onChange={avalblHrsHandler}
          />
          <TextField
            required
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
          <Typography variant="h6">Professional Address: *</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} px={2}>
          <TextField
            required
            multiline
            fullWidth
            rows={3}
            value={address ?? ""}
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
          type="submit"
          // onClick={submitDataHandler}
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
      {message && (
        <Typography
          component="b"
          variant="h6"
          fontWeight="bold"
          sx={{
            textTransform: "capitalize",
            color:
              theme.palette[
                respStatusCode >= 200 && respStatusCode < 300
                  ? "success"
                  : "danger"
              ].main,
          }}
        >
          <Divider variant="middle" />
          {message}
        </Typography>
      )}
    </Box>
  );
};
// end   ------ Apply for being Professional    ----------------------------------------

// start ------ List Your Services              ----------------------------------------
const ServicesListing = ({ isCompleted, prof_id = "", ...props }) => {
  const Services = useSelector((state) => state?.content?.services);

  const servicesList = [];
  const [subServiceList, setSubServiceList] = useState([]);

  if (Services?.length) {
    Services?.forEach((service) => {
      servicesList.push({
        id: service.id,
        name: service.service_name,
        desc: service.description,
      });
    });
  }
  const paymentMethods = ["Cash", "UPI", "Cheque"];

  const [selectedSID, setSelectedSID] = useState(servicesList[0]?.id);
  const [selectedSSID, setSelectedSSID] = useState([]);
  const [estimateTime, setEstimateTime] = useState("");
  const [selectedPayMeth, setSelectedPayMeth] = useState([]);
  const [charges, setCharges] = useState("");

  useEffect(() => {
    // console.log("======= selectedSID: " + selectedSID);
    setSubServiceList(
      Services?.filter(
        (service) => service.id === selectedSID
      )[0]?.subservice_set?.map((service) => ({
        id: service.id,
        name: service.service_name,
        desc: service.description,
      })) ?? []
    );
  }, [selectedSID]);

  /* useEffect(() => {
    // console.log("+++++++ selectedSSID: ", selectedSSID);
  }, [selectedSSID]); */
  // console.log("subServiceList:", subServiceList, subServiceList.length);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [respStatusCode, setRespStatusCode] = useState();
  const [isImgLoading, setIsImgLoading] = useState(false);

  const [imgData, setImgData] = useState({});

  const dataPack = {
    prof_id,
    service_id: selectedSID,
    subservice_ids: selectedSSID,
    proof_img_url: imgData?.secure_url ?? "",
    estimate_time: estimateTime,
    payment_modes: selectedPayMeth,
    charges: charges,
  };

  const submitDataHandler = (event) => {
    event.preventDefault();

    console.log("/-----professionalServiceListing-----\\");
    setIsLoading(true);
    userService.professionalServiceListing(dataPack)?.then(
      (response) => {
        console.log(response.status, " ==+== success", response);
        setRespStatusCode(response.status);
        setMessage(response.data.message);
        setIsLoading(false);
        isCompleted("ServicesListing");
      },
      (error) => {
        setIsLoading(false);
        console.log(error?.response?.status, " ==-== error", error);
        setRespStatusCode(error?.response.status);
        setMessage(JSON.stringify(error?.response.data));
      }
    );
    console.log("\\-----professionalServiceListing-----/");
  };

  const theme = useTheme();

  function getStyles(name, list, theme) {
    return {
      fontWeight:
        list.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightBold,
    };
  }

  return (
    <Box
      container
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      onSubmit={submitDataHandler}
      my={2}
    >
      <Grid item container alignItems="center" xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Services:*</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <FormControl sx={{ m: 1, width: "315px" }}>
            <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
            <Select
              required
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              value={selectedSID ?? ""}
              input={
                <OutlinedInput id="select-multiple-chip" label="Services" />
              }
              MenuProps={MenuProps}
              onChange={(event) => setSelectedSID(event.target.value)}
              // {...citiesInputProps}
            >
              {servicesList.map((service) => (
                <MenuItem
                  key={service.id}
                  value={service?.id ?? ""}
                  sx={{
                    fontWeight: service.id == selectedSID ? "bold" : "regular",
                  }}
                >
                  {service.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Type of Service You provide</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} mb={1} width="350px">
          {!selectedSID && (
            <Typography variant="body1">Please Select one service.</Typography>
          )}
          {!!selectedSID && (
            <Chip
              color="primary"
              key={selectedSID}
              sx={{ m: 0.5 }}
              deleteIcon={<HighlightOffOutlined />}
              label={
                servicesList.filter((ele) => ele.id == selectedSID)[0]?.name
              }
            />
          )}
        </Grid>
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Sub Services:*</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <FormControl sx={{ m: 1, width: "315px" }}>
            <InputLabel id="demo-multiple-chip-label">Sub Services</InputLabel>
            <Select
              required
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedSSID ?? ""}
              input={
                <OutlinedInput id="select-multiple-chip" label="Sub Services" />
              }
              MenuProps={MenuProps}
              onChange={(event) => {
                setSelectedSSID([...event.target.value]);
              }}
            >
              {subServiceList?.length ? (
                subServiceList?.map((sservice) => (
                  <MenuItem
                    key={sservice?.id}
                    value={sservice?.id ?? ""}
                    sx={{
                      fontWeight: selectedSSID.includes(sservice.id)
                        ? "bold"
                        : "",
                    }}
                  >
                    {sservice.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>Not available at Moment</MenuItem>
              )}
            </Select>
            <FormHelperText>Type of sub Services you offer. </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} mb={1} width="350px">
          {!selectedSSID.length && (
            <Typography variant="body1">
              Select at least one sub service.
            </Typography>
          )}
          {!!selectedSSID.length &&
            selectedSSID.map((id, index) => (
              <Chip
                color="primary"
                key={index}
                sx={{ m: 0.5 }}
                deleteIcon={<HighlightOffOutlined />}
                label={subServiceList.find((ss) => ss.id === id)?.name}
                onDelete={() =>
                  setSelectedSSID((prev) => prev.filter((_, i) => i !== index))
                }
              />
            ))}
        </Grid>
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Estimate Time:*</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} px={2}>
          <TextField
            required
            fullWidth
            value={estimateTime ?? ""}
            onChange={(e) => {
              setEstimateTime(e.target.value);
            }}
            name="estimate_time"
            label="Estimated Time"
            helperText="Estimated Time to Complete the Tasks."
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Charges:*</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} px={2}>
          <TextField
            required
            fullWidth
            value={charges ?? ""}
            onChange={(e) => {
              setCharges(e.target.value);
            }}
            name="charges"
            label="Chargers"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
            helperText="The Aprox. Amount You charges for these tasks."
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Payment Methods:*</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <FormControl sx={{ m: 1, width: "315px" }}>
            <InputLabel id="demo-multiple-chip-label">Methods</InputLabel>
            <Select
              required
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedPayMeth ?? ""}
              input={<OutlinedInput id="select-multiple-chip" label="Method" />}
              MenuProps={MenuProps}
              onChange={(event) => setSelectedPayMeth(event.target.value)}
              // {...citiesInputProps}
            >
              {paymentMethods.map((method, index) => (
                <MenuItem
                  key={index}
                  value={method ?? ""}
                  style={getStyles(method, selectedPayMeth, theme)}
                >
                  {method}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>How Would You like to Paid</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} mb={1} width="350px">
          {!selectedPayMeth.length && (
            <Typography variant="body1">
              Please Select at least one method.
            </Typography>
          )}
          {!!selectedPayMeth.length &&
            selectedPayMeth.map((ele, index) => (
              <Chip
                color="primary"
                key={index}
                sx={{ m: 0.5 }}
                deleteIcon={<HighlightOffOutlined />}
                label={ele}
                onDelete={() =>
                  setSelectedPayMeth((prev) =>
                    prev.filter((e, i) => i !== index)
                  )
                }
              />
            ))}
        </Grid>
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={12} md={12} p={1}>
        <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
          <Typography variant="h6">Feature Image:*</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} px={2}>
          <FileUpload
            folderName={prof_id}
            onClick={() => {
              setIsImgLoading(true);
            }}
            getImageData={(data) => {
              console.log("-=-=-=-=-=- Image DAta: ", data);
              setImgData(data);
              setIsImgLoading(false);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} p={2}>
          <Typography variant="body1">Preview Image</Typography>
          {isImgLoading && <CircularProgress color="primary" />}
          {imgData?.secure_url && (
            <img
              src={imgData?.secure_url}
              width="300px"
              height="100%"
              alt={imgData?.name}
            />
          )}
        </Grid>
      </Grid>

      <Grid item container xs={12} sm={12} md={12} p={1}>
        <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
        <Grid
          component={Button}
          type="submit"
          variant="contained"
          item
          disabled={isLoading}
          xs={12}
          sm={12}
          md={5}
          lg={5}
        >
          List your services
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
        {isLoading && (
          <Box width="100%">
            <LinearProgress color="secondary" />
          </Box>
        )}
      </Grid>
      {message && (
        <Typography
          component="b"
          variant="h6"
          fontWeight="bold"
          sx={{
            textTransform: "capitalize",
            color:
              theme.palette[
                respStatusCode >= 200 && respStatusCode < 300
                  ? "success"
                  : "danger"
              ].main,
          }}
        >
          <Divider variant="middle" />
          {message}
        </Typography>
      )}
    </Box>
  );
};
// end   ------ List Your Services              ----------------------------------------
// start ------ Done Animation                  ----------------------------------------
const DoneAnimation = ({ isCompleted, ...props }) => {
  return (
    <Grid
      display="flex"
      flexDirection="column"
      textAlign="center"
      alignItems="center"
    >
      <img src={VectorGif} height="75%" />
      {/* <Button
      variant="contained" color="success"
        onClick={() => {
          isCompleted("DoneAnimation");
        }}
      >
        Want to List More Service
      </Button> */}
    </Grid>
  );
};
// end   ------ Done Animation                  ----------------------------------------

// Start ====== StartProfessionalPage           =================================================
const StartProfessionalPage = (props) => {
  const userData = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    if (Object.keys(userData?.professionaluser_set || {}).length)
      setCurrentStep(1);
    if (userData?.role == "prof") setCurrentStep(2);
  }, [userData?.professionaluser_set]);

  const isCompletedHandler = (stepName) => {
    const nameViseStep = {
      ProfessionalListing: 0,
      ServicesListing: 1,
      DoneAnimation: 0,
    };
    const xyz = nameViseStep[stepName];
    console.log(
      "------- isCompletedHandler: " + nameViseStep[stepName],
      stepName,
      "xyz",
      xyz
    );
    dispatch(getUserDetails());
    if (xyz >= 0 && xyz < Object.keys(nameViseStep).length) {
      // console.log("------- xyz: " + xyz);
      setCurrentStep(xyz + 1);
    }
  };

  useEffect(() => {
    if (Object.keys(userData?.professionaluser_set ?? {}).length) {
      dispatch(getUserDetails());
    }
  }, []);

  const steps = [
    {
      label: "Professional Listing",
      caption: "Your Professional Details to be shown on the listing page",
      component: <ProfessionalListing isCompleted={isCompletedHandler} />,
    },
    {
      label: "Services Listing",
      caption: "Each of your services is available on your personal",
      component: (
        <ServicesListing
          isCompleted={isCompletedHandler}
          prof_id={userData?.professionaluser_set?.id ?? ""}
        />
      ),
    },
    {
      label: "Done",
      caption: "No step Just Relax",
      component: <DoneAnimation isCompleted={isCompletedHandler} />,
    },
  ];

  /* const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  }; */

  // console.log("currentStep:", currentStep);

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
      <Grid item xs={12} md={12}>
        <Stepper activeStep={currentStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconProps={{ sx: { width: 45, height: 45, mx: 1 } }}
                optional={
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "'DM Serif Display', serif",
                      fontStyle: "italic",
                    }}
                  >
                    {step.caption}
                  </Typography>
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
                <Paper elevation={4} sx={{ py: 1, my: 1 }}>
                  {step.component}
                </Paper>
                {/* <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                </Box> */}
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
