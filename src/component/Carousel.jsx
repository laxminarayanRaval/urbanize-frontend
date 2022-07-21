import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import { DoubleArrowSharp } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundImage: `linear-gradient(150deg, ${theme.palette.primary.main} 0%, ${theme.palette.danger.main} 100%)`,
  ...theme.typography.body2,
  textAlign: "center",
  height: 5,
  width: 25,
  opacity: 0.4,
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
}));

const Carousel = ({ dataArray, duration = 3 }) => {
  const dataLength = dataArray.length;
  const [activeSlid, setActiveSlid] = useState(0);

  const evenOdd = activeSlid % 2 == 0;

  useEffect(() => {
    const interval = slideCarousel(duration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const slideCarousel = (interval) =>
    setInterval(() => {
      setActiveSlid((prevState) =>
        prevState < dataLength - 1 ? prevState + 1 : 0
      );
    }, 1000 * interval);

  return (
    <Grid container sx={{ mb: 5 }}>
      <Grid
        container
        item
        xs={12}
        sx={{
          width: "100%",
          py: 0,
          display: "flex",
          flexDirection: {
            xs: "auto",
            md: evenOdd ? "row" : "row-reverse",
          },
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          // mx: 1,
        }}
      >
        {dataArray[activeSlid]?.img && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: evenOdd ? "flex-end" : "flex-start",
            }}
          >
            <img
              src={dataArray[activeSlid]?.img}
              width="90%"
              height="auto"
              alt={dataArray[activeSlid]?.title}
            />
          </Grid>
        )}
        <Grid
          item
          xs
          md
          textAlign={evenOdd ? "left" : "right"}
          sx={{ maxWidth: { xs: "99%", md: "40% !important" } }}
        >
          {dataArray[activeSlid]?.title}

          {dataArray[activeSlid]?.subTitle}

          {dataArray[activeSlid]?.action}
        </Grid>
      </Grid>
      <Grid item xs={12} p={0} m={0}>
        <Stack direction="row" spacing={5} justifyContent="center">
          {[...Array(dataLength)].map((_, index) => (
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
