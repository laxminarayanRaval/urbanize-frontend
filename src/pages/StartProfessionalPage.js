import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const StartProfessionalPage = () => {
  const userData = useSelector((state) => state.auth.user);

  const [citiesList, setCitiesList] = useState([]);

  const updateCitiesList = (event) => {
    // event.preventDefault();
    if (event.key === "Enter") {
      debugger;
      const data = event.target.value;
      // setCitiesList(citiesList.splice(citiesList.length, 0, data));
      setCitiesList(prevState => [...prevState,data]);
      event.target.value = "";
    }
    console.log(citiesList);
  };

  const removeCity = (index) => {
    debugger;
    const updateValue = [...citiesList]
    updateValue.splice(index, 1)
    setCitiesList(updateValue);
  };

  const [avlHrs, setAvlHrs] = useState({ start_time: "", end_time: "" });

  const avlHrsHandler = () => {};

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      textAlign="center"
      alignItems="center"
    >
      <Typography component="p" variant="body1">
        Please Provide Few Additional information to process your application
        for being Professional
      </Typography>
      <Box
        component="form"
        container
        display="flex"
        flexDirection="column"
        alignItems="center"
        my={4}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Typography component="h3" variant="h4" mb={3}>
            {`Mr. ${userData.full_name}`}
          </Typography>
        </Grid>
        {!!citiesList.length && (
          <Box my={1} maxWidth="max-content" p={1} boxShadow={3}>
            {citiesList.map((ele, index) => (
              <Chip label={ele} onDelete={() => removeCity(index)} />
            ))}
          </Box>
        )}
        <TextField
          name="cities"
          label="Cities"
          fullWidth
          helperText="Cities where you want to provide Services"
          placeholder="Add More"
          onKeyDown={(event) => updateCitiesList(event)}
        />
        <TextField
          name="avl_hrs"
          label="Availability Hours"
          disabled
          fullWidth
          variant="standard"
          helperText="Availability Hours : in Which you are able to provide Service"
        />
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            name="start_time"
            helperText="Service Start Time"
            type="time"
            sx={{ mx: 2 }}
          />
          <TextField
            name="end_time"
            helperText="Service End Time"
            type="time"
            sx={{ mx: 2 }}
          />
        </Grid>
        <TextField
          multiline
          fullWidth
          rows={3}
          name="address"
          label="Profession's Address"
          helperText="If someone wants to meet you."
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Process Further
        </Button>
      </Box>
    </Grid>
  );
};

export default StartProfessionalPage;
