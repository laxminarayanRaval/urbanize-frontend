import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const StartProfessionalPage = () => {
  const userData = useSelector((state) => state.auth.user);

  const [avlHrs, setAvlHrs] = useState({ start_time: "", end_time: "" });

  const avlHrsHandler = () => {
    
  } 

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
        display="flex"
        flexDirection="column"
        alignItems="center"
        my={4}
      >
        <Typography component="h3" variant="h4">
          {`Mr. ${userData.full_name}`}
        </Typography>
        <TextField
          name="cities"
          label="Cities"
          fullWidth
          helperText="Cities where you want to provide Services"
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Process Further
        </Button>
      </Box>
    </Grid>
  );
};

export default StartProfessionalPage;
