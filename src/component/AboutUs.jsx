import { Typography } from "@mui/material";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <Typography variant="body1">
        Instagram, the globally famous photo app, was founded by Stanford
        University graduate, Kevin Systrom who was born in a very common family
        and was a tech genius.
      </Typography>

      <Typography variant="subtitle2">
        He was in school when he was introduced to tech and used to learn coding
        by himself at night. He started working on an app which was more or less
        a cross between Foresquare and Flickr.
      </Typography>

      <Typography variant="body2">
        Very few people know that Mark Zuckerburg wanted to hire him while he
        was undergraduate but he denied the offer as he wanted to complete his
        degree. Kevin, along with his friend Mike, spent eight weeks
        aggressively on developing this app And finally on the night of October
        6, 2010, they pushed the launch button!
      </Typography>

      <Typography variant="paragraph">
        Only after two hours of Instagram going LIVE, its servers started
        falling down because of rush of traffic and within 24 hours it became #1
        app on iOS. Within nine months, Instagram had a record-breaking 7
        million users, which also included some of the highly-influential
        tech-loving celebrities like Justin Bieber and Ryan Seacrest.
      </Typography>
    </div>
  );
};

export default AboutUs;
