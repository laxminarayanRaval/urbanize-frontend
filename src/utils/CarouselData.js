import vector1 from "../assets/gifs/vector_gif01.gif";
import vector2 from "../assets/gifs/vector_gif02.gif";
import vector3 from "../assets/gifs/vector_gif03.gif";
import vector4 from "../assets/gifs/vector_gif07.gif";
import vector5 from "../assets/gifs/vector_gif05.gif";

import { Button, Typography } from "@mui/material";
import { DoubleArrowSharp } from "@mui/icons-material";

const setTitle = (title) => (
  <Typography
    variant="h2"
    sx={{
      fontFamily: "'DM Serif Display', serif",
      fontStyle: "italic",
    }}
  >
    {title}
  </Typography>
);

const setSubTitle = (subTitle) => (
  <Typography
    variant="h5"
    sx={{
      fontFamily: "'DM Serif Display', serif",
      fontStyle: "italic",
      mb: 3,
    }}
  >
    {subTitle}
  </Typography>
);

const setAction = ({ link, text, icon = <DoubleArrowSharp /> }) => (
  <Button variant="outlined" href={link} endIcon={icon}>
    {text}
  </Button>
);

export const CarouselData = [
  {
    img: vector1,
    title: setTitle("Planing to Change office location"),
    subTitle: setSubTitle(
      "Packing-Unpacking to Loading-Unloading for every task you can trust on us."
    ),
    action: setAction({link:'#', text: 'Hire Now'}),
  },
  {
    img: vector2,
    title: setTitle("Fiting Switches to AC Repairing"),
    subTitle: setSubTitle(
      "All kind of electronic repairing service providers are available."
    ),
    action: setAction({link:'#', text: 'Hire Now'}),
  },
  {
    img: vector3,
    title: setTitle("Dust Alergy?"),
    subTitle: setSubTitle(
      "Stop dusting now and hire some professional cleaning services providers."
    ),
    action: setAction({link:'#', text: 'Hire Now'}),
  },
  {
    img: vector4,
    title: setTitle("Plants Lovers, never get them Damage!"),
    subTitle: setSubTitle(
      "Here we have Bestest plant relocators, who will care your love like baby."
    ),
    action: setAction({link:'#', text: 'Hire Now'}),
  },
  {
    img: vector5,
    title: setTitle("Long Time No See, Ohh it looks so messy"),
    subTitle: setSubTitle(
      "Looking For Professional Cleaners to cleanup your mess."
    ),
    action: setAction({link:'#', text: 'Hire Now'}),
  },
];
