import React from "react";
import { Grid, Typography } from "@mui/material";
import HistoryGif from "../assets/gifs/Stamp_collecting.gif";

const History = () => {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={5}>
        <img
          src={HistoryGif}
          width="100%"
          height="auto"
          alt="History of Urbanize"
        />
      </Grid>
      <Grid item xs={12} md={7}>
        <Typography variant="paragraph" textAlign="justify" >
          Laxminarayan Raval had always loved cold LA NET Team with its
          decomposing, dark desks. It was a place where he felt surprised.
          <br />
          He was a spiteful, optimistic, brandy drinker with greasy eyebrows and
          curvy toenails. His friends saw him as a pretty, pickled patient.
          Once, he had even brought a quaint toddler back from the brink of
          death. That's the sort of man he was.
          <br />
          Laxminarayan walked over to the window and reflected on his magical
          surroundings. The rain hammered like chatting blue bottles.
          <br />
          Then he saw something in the distance, or rather someone. It was the
          figure of Urbanize App. Urbanize was a cold-blooded volcano with
          handsome eyebrows and ruddy toenails.
          <br />
          Laxminarayan gulped. He was not prepared for Urbanize.
          <br />
          As Laxminarayan stepped outside and Urbanize came closer, he could see
          the quiet glint in his eye.
          <br />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default History;
