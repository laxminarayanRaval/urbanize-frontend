import React from "react";
import { Grid, Typography } from "@mui/material";
import AboutUsGif from "../assets/gifs/About_me.gif";
const AboutUs = () => {
  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      flexDirection={"row-reverse"}
    >
      <Grid item xs={12} md={5}>
        <img
          src={AboutUsGif}
          width="100%"
          height="auto"
          alt="About Us (Urbanize)"
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Typography variant="paragraph">
          Urbanize gazed with the affection of 1389 popular enchanting
          elephants. He said, in hushed tones, "I love you and I want closure."
          <br />
          Laxminarayan looked back, even more sleepy and still fingering the
          ribbed rock. "Urbanize, I want you," he replied.
          <br />
          They looked at each other with delighted feelings, like two
          outrageous, obedient ostriches sleeping at a very clever internship,
          which had reggae music playing in the background and two ruthless
          uncles thinking to the beat.
          <br />
          Laxminarayan regarded Urbanize's handsome eyebrows and ruddy toenails.
          "I feel the same way!" revealed Laxminarayan with a delighted grin.
          <br />
          Urbanize looked puzzled, his emotions blushing like a rabblesnatching,
          rough ruler.
          <br />
          Then Urbanize came inside for a nice glass of brandy.
          <br />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
