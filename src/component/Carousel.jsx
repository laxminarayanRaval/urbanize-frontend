import React, { useState } from "react";
import { Button, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import { DoubleArrowSharp } from "@mui/icons-material";

import vector1 from "../assets/gifs/vector_gif01.gif";
import vector2 from "../assets/gifs/vector_gif02.gif";
import vector3 from "../assets/gifs/vector_gif03.gif";
import vector4 from "../assets/gifs/vector_gif07.gif";
import vector5 from "../assets/gifs/vector_gif05.gif";
import { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#CCC" : "#222",
  ...theme.typography.body2,
  //   padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 5,
  width: 25,
  opacity: 0.4,
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
}));

const Carousel = () => {
  const duration = 2500;
  const dataX = [
    {
      img: vector1,
      title: "Planing to Change office location",
      subTitle:
        "Packing-Unpacking to Loading-Unloading for every task you can trust on us.",
      action: "",
    },
    {
      img: vector2,
      title: "Fiting Switches to AC Repairing",
      subTitle:
        "All kind of electronic repairing service providers are available.",
      action: "",
    },
    {
      img: vector3,
      title: "Dust Alergy?",
      subTitle:
        "Stop dusting now and hire some professional cleaning services providers.",
      action: "",
    },
    {
      img: vector4,
      title: "Plants Lovers, never get them Damage!",
      subTitle:
        "Here we have Bestest plant relocators, who will care your love like baby.",
      action: "",
    },
    {
      img: vector5,
      title: "Long Time No See, Ohh it looks so messy",
      subTitle: "Looking For Professional Cleaners to cleanup your mess.",
      action: "",
    },
  ];

  const dataLength = dataX.length;

  const [activeSlid, setActiveSlid] = useState(0);

  const evenOdd = activeSlid % 2 == 0;

  /*  useEffect(() => {
    // const interval = setInterval(() => {
    // console.log(
    // "activeSlid: " + activeSlid,
    // activeSlid < 5 ? activeSlid + 1 : 0
    // );
    // setActiveSlid(activeSlid < 5 ? activeSlid + 2 : 0);
    // }, duration);

    return () => {
      // clearInterval(interval);
    };
  }, []); */

  setTimeout(() => {
    // console.log(activeSlid, activeSlid < 5 ? activeSlid + 1 : 0);
    console.log("before activeSlid", activeSlid);
    setActiveSlid((prevState) => (prevState < 5 ? prevState + 1 : 0));
    console.log("after activeSlid", activeSlid);
  }, duration);

  return (
    <Grid
      container
      sx={{
        // width: { xs: "82%", md: "100%" },
        width: "100%",
        mb: 5,
        py: 0,
        display: "flex",
        flexDirection: {
          xs: "auto",
          md: evenOdd ? "row" : "row-reverse",
        },
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent={evenOdd ? "flex-end" : "flex-start"}
      >
        <img src={dataX[activeSlid]?.img} height="75%" />
      </Grid>
      <Grid
        item
        xs
        md
        textAlign={evenOdd ? "left" : "right"}
        sx={{ maxWidth: "35% !important" }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
          }}
        >
          {dataX[activeSlid]?.title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'DM Serif Display', serif",
            fontStyle: "italic",
          }}
          mb={3}
        >
          {dataX[activeSlid]?.subTitle}
        </Typography>
        <Button
          variant="outlined"
          href={dataX[activeSlid]?.action}
          endIcon={<DoubleArrowSharp />}
        >
          Hire Now
        </Button>
      </Grid>
      <Grid item xs={12} p={0} m={0}>
        <Stack direction="row" spacing={5} justifyContent="center">
          {[...Array(5)].map((_, index) => (
            <Item
              key={index}
              sx={{
                opacity: activeSlid === index && 1,
              }}
              onClick={() => {
                setActiveSlid(index);
              }}
            />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Carousel;
