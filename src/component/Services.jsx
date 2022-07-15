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
import { useParams } from "react-router-dom";
import { revertSlug } from "../utils/Helpers";
import { useEffect } from "react";

const Services = () => {
  const [selectedSubServiceId, setSelectedSubServiceId] = useState(0);
  const services = useSelector((state) => state?.content?.services);
  // const subservices = useSelector((state) => state?.content?.subservices);

  const { service_name, subservice_name } = useParams();
  const CurrentService = services?.find(
    (ele) => ele.service_name === revertSlug(service_name)
  );

  const CurrentSubService = CurrentService?.subservice_set?.find(
    (ele) => ele.service_name === revertSlug(subservice_name)
  );

  useEffect(() => {
    setSelectedSubServiceId(CurrentSubService?.id);
  }, [CurrentService]);

  console.log(
    "CurrentService: ",
    CurrentService ?? "Finding...",
    "CurrentSubService: ",
    CurrentSubService ?? "Finding..."
  );

  useEffect(() => {
    if (selectedSubServiceId) {
      // const element = document.querySelector(`#${selectedSubServiceId}`);
    }
  }, [CurrentSubService]);

  const clickHandler = (event) => {
    // event.preventDefault();
    window.location.href(
      CurrentService?.subservice_set?.find((ele) => ele.id === event.target.id)
        ?.service_name
    );
    if (event.target.id === selectedSubServiceId) setSelectedSubServiceId(0);
    else setSelectedSubServiceId(event.target.id);
  };

  const isSelected = (id) => selectedSubServiceId === id;

  return (
    <Grid container display="flex" justifyContent="center">
      <Grid
        item
        sx={{
          display: "flex",
          overflowX: "auto",
          justifyContent: "flex-start",
        }}
      >
        {!CurrentService &&
          [1, 2, 3, 4].map((ele) => (
            <Stack display="flex" key={ele} alignItems="center">
              <Skeleton
                variant="circle"
                sx={{ width: "100px", height: "100px", borderRadius: 10 }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ width: "100px", height: "60px", m: 1, borderRadius: 1 }}
              />
            </Stack>
          ))}
        {CurrentService?.subservice_set?.map((service) => (
          <Grid
            className={service.id}
            id={service.id}
            component={Paper}
            elevation={isSelected(service.id) ? 8 : 2}
            xs={12}
            sm={12}
            md={12}
            item
            key={service.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              padding: 1,
              margin: 1,
              cursor: "pointer",
              zIndex: 10,
            }}
            onClick={clickHandler}
          >
            <Box
              id={service.id}
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
            <Typography component="h3" variant="h6" id={service.id}>
              {service.service_name}
            </Typography>
          </Grid>
        ))}
      </Grid>
      {!selectedSubServiceId == 0 && (
        <Grid width="85%" mt={2} item>
          <Box
            sx={{
              backgroundImage: `url('${CurrentSubService?.img_url}')`,
              height: "35vh",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                borderRadius: 2,
                height: "100%",
                backgroundColor: "#000A",
                backgroundAttachment: "scroll",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Typography variant="h2" fontWeight="bold" component="h1">
                {CurrentSubService?.service_name}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {CurrentSubService?.description}
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Services;
