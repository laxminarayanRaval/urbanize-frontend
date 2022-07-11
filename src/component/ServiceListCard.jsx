import React, { useState } from "react";
import { Bookmark, BookmarkBorder, Message } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";

import { makeAvtarText } from "../utils/Helpers";
import moment from "moment";

const avtarMale =
  "https://res.cloudinary.com/urbanize/image/upload/v1657176333/user-profile-my-account-avatar-login-icon-man-male-face-smile-symbol-flat-vector-human-person-member-sign-user-profile-182815734_v2q12a.jpg";
const avtarFemale =
  "https://res.cloudinary.com/urbanize/image/upload/v1657176262/user-profile-my-account-avatar-login-icon-woman-female-face-smile-symbol-flat-vector-human-lady-person-member-sign-186506698_ltneic.jpg";

const today = moment();
const isAvailable = (startsTime, endsTime) =>
  startsTime < today.format("HH:mm:ss") && endsTime > today.format("HH:mm:ss");

const ServiceListCard = ({
  profId = null,
  title = "",
  status = "",
  avtarUrl = "",
  content,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(!!profId); // loading = false,
  const [isBookmarked, setIsBookmarked] = useState(false); // bookmarked = false,

  console.log("profId:", profId);
  /* avtarUrl: avtar image url,
   title: professional's full name,
   status: available status according to time,
   content: featured image & description
  */
  if (isLoading) {
    return (
      <Card component={Paper} elevation={4} sx={{ m: 1 }}>
        <CardHeader
          avatar={<Skeleton animation='wave' variant="circular" height={40} width={40} />}
          action={
            <Grid sx={{ display: "flex", m: 1 }}>
              <Skeleton animation='wave'
                variant="circular"
                sx={{ ml: 1 }}
                height={25}
                width={25}
              />
              <Skeleton animation='wave'
                variant="circular"
                sx={{ ml: 1 }}
                height={25}
                width={25}
              />
            </Grid>
          }
          title={<Skeleton animation='wave' />}
          subheader={<Skeleton animation='wave' height={10} width="75%" />}
        />
        <CardMedia>
          <Skeleton animation='wave' variant="rectangular" height={200} width="100%" />
        </CardMedia>
        <CardContent>
          <Skeleton animation='wave' height={15} />
          <Skeleton animation='wave' height={15} width="75%" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card component={Paper} elevation={4} sx={{ m: 1 }}>
      <CardHeader
        avatar={
          <Avatar src={avtarUrl} sx={{ bgcolor: "#F55" }} aria-label="recipe">
            {makeAvtarText(title)}
          </Avatar>
        }
        action={
          <>
            <IconButton>
              <Message />
            </IconButton>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                setIsBookmarked((prev) => !prev);
              }}
            >
              {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </>
        }
        title={title}
        subheader={status}
      />
      <CardMedia
        component="img"
        height="200"
        image={content?.proof_img_url}
        alt={title}
      />
      <CardContent sx={{ p: 1 }}>
        <Tooltip title={content?.description ?? "No Description"} arrow>
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            color="text.secondary"
          >
            {content?.description}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default ServiceListCard;
