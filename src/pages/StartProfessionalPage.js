import React, { useState } from "react";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { HighlightOffOutlined } from "@mui/icons-material";

import { toTitleCase } from "../utils/Helpers";

const StartProfessionalPage = () => {
  const userData = useSelector((state) => state.auth.user);

  const [citiesList, setCitiesList] = useState([]);

  const updateCitiesList = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const cityName = event.target.value.toLowerCase();
      // setCitiesList(citiesList.splice(citiesList.length, 0, cityName));
      if (citiesList.length < 8) {
        if (!citiesList.includes(cityName))
          setCitiesList((prevState) => [...prevState, cityName]);
        event.target.value = "";
      }
    }
    console.log(citiesList);
  };

  const citiesInputProps =
    citiesList.length < 8
      ? { placeholder: "Add More", onKeyDown: updateCitiesList }
      : { placeholder: "Limit Reached", disabled: true };

  const removeCity = (index) => {
    const updateValue = [...citiesList];
    updateValue.splice(index, 1);
    setCitiesList(updateValue);
  };
  // Availability Time Formatting and Storing

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const avalblHrsHandler = (event) => {
    if (event.target.name === "startTime") setStartTime(event.target.value);
    else if (event.target.name === "endTime") setEndTime(event.target.value);
  };

  const formattedTime = `${startTime} to ${endTime}`;
  console.log("========= Formatted Time =========", formattedTime);

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      textAlign="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={12}>
        <Typography component="h3" variant="h5">
          {`Mr. ${userData.full_name}`}
        </Typography>
        <Typography component="p" variant="body1">
          Please Provide Few Additional information to process your application
          for being Professional
        </Typography>
      </Grid>
      <Box
        component="form"
        container
        display="flex"
        flexDirection="column"
        alignItems="center"
        my={4}
      >
        <Grid item container xs={12} sm={12} md={12} p={1}>
          <Grid textAlign="left" item xs={12} sm={12} md={2} lg={2}>
            <Typography variant="h6">Cities List:</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <TextField
              name="cities"
              label="Cities"
              // fullWidth
              helperText="Cities where you want to provide Services. (Max 8)"
              {...citiesInputProps}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} mb={1} width="350px">
            {!citiesList.length && <Typography variant="body1">Please Select some Cities.</Typography>}
            {!!citiesList.length &&
              citiesList.map((ele, index) => (
                <Chip
                  color="primary"
                  sx={{ m: 0.5 }}
                  deleteIcon={<HighlightOffOutlined />}
                  label={toTitleCase(ele)}
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
              name="address"
              label="Profession's Address"
              helperText="If someone wants to meet you."
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
        </Grid>
        <Grid item container xs={12} sm={12} md={12} p={1}>
          <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
          <Grid component={Button} variant="contained" item xs={12} sm={12} md={5} lg={5}>
            {/* <> */}
              Process Further
            {/* </Button> */}
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}></Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default StartProfessionalPage;
