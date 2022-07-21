import React, { useState } from "react";
import { Box, Grid, Paper, Stack, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { makeSlug, revertSlug } from "../utils/Helpers";
import { useEffect } from "react";
import ServiceListCard from "./ServiceListCard";

import NoDataGif from "../assets/gifs/No_data.gif";

const SubServicesTabs = ({
  currServices = null,
  selectedSubServiceId = null,
  clickHandler,
  ...props
}) => {
  useEffect(() => {
    if (selectedSubServiceId)
      setTimeout(() => {
        const element = document.querySelector("#" + selectedSubServiceId);
        if (selectedSubServiceId) {
          element?.scrollIntoView({
            block: "center",
            inline: "center",
            behavior: "smooth",
          });
        }
      }, 500);
  }, [selectedSubServiceId]);
  const isSelected = (id) => selectedSubServiceId === id;
  return (
    <Grid
      item
      sx={{
        display: "flex",
        overflowX: "auto",
        justifyContent: "flex-start",
        p: 1,
        mt: "-3vh",
      }}
    >
      {!currServices &&
        [1, 2, 3, 4].map((ele) => (
          <Stack
            display="flex"
            key={`sekeleton-${ele * 4}`}
            alignItems="center"
          >
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
      {currServices?.subservice_set?.map((subService) => (
        <Grid
          className={makeSlug(subService.service_name)}
          id={subService.id}
          component={Paper}
          elevation={isSelected(subService.id) ? 10 : 2}
          xs={12}
          md={12}
          item
          key={subService.id + "" + makeSlug(subService.service_name)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            padding: 1,
            margin: 1,
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={(event) => {
            // clickHandler(event);
            // window.history.pushState(
            //   null,
            //   `${subService.service_name} | ${currServices?.service_name}`,
            //   `/services/${makeSlug(currServices?.service_name)}/${makeSlug(
            //     subService.service_name
            //   )}/`
            // );
            window.location.href = `/services/${makeSlug(
              currServices?.service_name
            )}/${makeSlug(subService.service_name)}/`;
          }}
        >
          <Box
            id={subService.id}
            sx={{
              backgroundImage: `url(${subService.img_url})`,
              backgroundSize: "cover",
              backgroundPosition: "repeat",
              width: "100px",
              height: "100px",
              borderRadius: 10,
              minWidth: "max-content",
            }}
          ></Box>
          <Typography component="h3" variant="h6" id={subService.id}>
            {subService.service_name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

const Services = () => {
  const [selectedSubServiceId, setSelectedSubServiceId] = useState(0);
  const services = useSelector((state) => state?.content?.services);
  // const subservices = useSelector((state) => state?.content?.subservices);
  const [searchParams, setSearchParams] = useSearchParams();
  const { service_name, subservice_name } = useParams();
  const CurrentService =
    services?.find((ele) => ele.service_name === revertSlug(service_name)) ??
    services?.find((ele, index) => index === 0);

  // console.log("service_name", service_name, "subservice_name", subservice_name);

  const CurrentSubService =
    CurrentService?.subservice_set?.find(
      (ele) => ele.service_name === revertSlug(subservice_name)
    ) ?? CurrentService?.subservice_set?.find((ele, index) => index === 0);

  const AvailableProfessionals =
    CurrentService?.professionaluserservice_set?.filter((ele) =>
      ele?.subservice_ids?.includes(CurrentSubService?.id)
    );

  useEffect(() => {
    setSelectedSubServiceId(CurrentSubService?.id);
  }, [CurrentService]);

  /* console.log(
    "CurrentService: ",
    CurrentService ?? "Finding...",
    "CurrentSubService: ",
    CurrentSubService ?? "Finding...",
    "AvailableProfessionals: ",
    AvailableProfessionals ?? "Finding..."
  ); */

  useEffect(() => {
    if (selectedSubServiceId) {
      // const element = document.querySelector(`#${selectedSubServiceId}`);
    }
  }, [CurrentSubService]);

  const subServiceChangeHandler = (event) => {
    if (event.target.id === selectedSubServiceId) setSelectedSubServiceId(0);
    else setSelectedSubServiceId(event.target.id);
  };

  return (
    <Grid container display="flex" justifyContent="center">
      <SubServicesTabs
        currServices={CurrentService}
        selectedSubServiceId={selectedSubServiceId}
        clickHandler={subServiceChangeHandler}
      />
      {!selectedSubServiceId == 0 && (
        <Grid
          container
          sx={{
            width: "85%",
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          item
        >
          <Grid
            item
            xs={12}
            md={12}
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
                width: "100%",
                p: 2,
              }}
            >
              <Typography variant="h2" fontWeight="bold" component="h1">
                {CurrentSubService?.service_name}
              </Typography>
              <Typography
                sx={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: { xs: 4, md: 2 },
                  WebkitBoxOrient: "vertical",
                  fontWeight: "bold",
                }}
                variant="subtitle1"
              >
                {CurrentSubService?.description}
              </Typography>
            </Box>
          </Grid>
          {AvailableProfessionals?.length !== 0 ? (
            AvailableProfessionals?.map((ele) => (
              <Grid item xs={12} md={6} mt={2}>
                <ServiceListCard
                  profId={ele?.prof_id}
                  servId={CurrentSubService?.id}
                  cityFilter={searchParams?.get("city")}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} md={8} textAlign="center" mt={2}>
              <Typography variant="h4">Not Found Any Professional</Typography>
              <img
                src={NoDataGif}
                alt="No Data Available for this sub-service"
                width="100%"
                height="auto"
              />
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Services;
