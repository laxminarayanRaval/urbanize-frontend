import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { useSelector } from "react-redux";

const Services = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(0);
  const services = useSelector((state) => state?.content?.services);
  // const subservices = useSelector((state) => state?.content?.subservices);

  const clickHandler = (event) => {
    if (event.target.id === selectedServiceId) setSelectedServiceId(0);
    else setSelectedServiceId(event.target.id);
  };

  const isSelected = (id) => selectedServiceId === id;

  return (
    <Grid container display="flex" justifyContent="center">
      <Grid
        item
        display="flex"
        sx={{
          overflowX: "auto",
          justifyContent: "flex-start",
        }}
      >
        {services?.length === 0 &&
          [1, 2, 3, 4].map((ele) => (
            <Stack display="flex" key={ele} alignItems="center">
              <Skeleton
                variant="circle"
                sx={{ width: "100px", height: "100px", borderRadius: 10 }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ width: "100px", height: "60px", m: 1, borderRadius: 2 }}
              />
            </Stack>
          ))}
        {services?.map((service) => (
          <Grid
            xs={6}
            sm={6}
            md={6}
            item
            key={service.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              border: isSelected(service.id)
                ? "1px solid #555"
                : "1px solid #0000",
              padding: 1,
              cursor: "pointer",
            }}
            onClick={clickHandler}
          >
            <Box>
              <Box
                sx={{
                  backgroundImage: `url(${service.img_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "repeat",
                  width: "100px",
                  height: "100px",
                  borderRadius: 10,
                  minWidth: "max-content",
                }}
              ></Box>
            </Box>
            <Typography
              component="h3"
              variant="h6"
              id={service.id}
              sx={{
                // borderRadius: 2,
                // margin: 1,
                // px: 1,
                // border: isSelected(service.id)
                // ? "1px solid #555"
                // : "1px solid #5550",
                // cursor: "pointer",
                ":hover": {
                  // border: "1px solid",
                },
              }}
            >
              {service.service_name}
            </Typography>
          </Grid>
        ))}
      </Grid>
      {!selectedServiceId == 0 && (
        <Grid
          component={Paper}
          width="50%"
          item
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
        >
          {/* {subservices
            .filter((ele) => ele.service_id === selectedServiceId)
            .map((service) => (
              <Grid
                item
                key={service.id}
                display="flex"
                flexDirection="column"
                alignItems="center"
                margin={1}
              >
                <Typography component="h5" variant="body1" id={service.id}>
                  {service.service_name}
                </Typography>
              </Grid>
            ))} */}
        </Grid>
      )}
    </Grid>
  );
};

export default Services;
