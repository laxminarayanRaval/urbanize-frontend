import React, { useEffect, useState } from "react";
import { Bookmark, BookmarkBorder, Message, Tag } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Link,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";

import { makeAvtarText, makeSlug } from "../utils/Helpers";
import moment from "moment";
import userService from "../store/services/user.service";
import { useSelector } from "react-redux";
import HireProfessionalModel from "./HireProfessionalModel";

const avtarMale =
  "https://res.cloudinary.com/urbanize/image/upload/v1657176333/user-profile-my-account-avatar-login-icon-man-male-face-smile-symbol-flat-vector-human-person-member-sign-user-profile-182815734_v2q12a.jpg";
const avtarFemale =
  "https://res.cloudinary.com/urbanize/image/upload/v1657176262/user-profile-my-account-avatar-login-icon-woman-female-face-smile-symbol-flat-vector-human-lady-person-member-sign-186506698_ltneic.jpg";

const today = moment();
const isAvailable = (startsTime, endsTime) =>
  startsTime < today.format("HH:mm:ss") && endsTime > today.format("HH:mm:ss");

const ServiceListCard = ({ profId = null, servId = null, ...props }) => {
  const [isLoading, setIsLoading] = useState(profId == null); // loading = false,
  const [isBookmarked, setIsBookmarked] = useState(false); // bookmarked = false,
  const [profUserData, setProfUserData] = useState({});
  const [profUSData, setProfUSData] = useState({});
  const [userData, setUserData] = useState({});

  const authUser = useSelector((state) => state?.auth?.user);

  const serviceData = useSelector((state) =>
    state?.content?.services?.find((ele) => ele.id === profUSData?.service_id)
  );

  const subServiceData =
    serviceData?.subservice_set?.filter((ele) =>
      profUSData?.subservice_ids?.includes(ele.id)
    ) ?? [];

  const highlightedSubService = subServiceData?.filter(
    (ele) => ele.id === (servId ?? "")
  );

  // highlightedSubService?.concat(subServiceData)
  //   ?.filter((ele, index) => self.indexOf(value) === index);
  // console.log(
  //   "highlightedSubService:",
  //   highlightedSubService?.concat(subServiceData)?.filter(
  //     (value, index, self) => self.indexOf(value) === index
  //   )
  // );

  useEffect(() => {
    setIsLoading(true);
    if (profId ?? false) {
      const data = userService
        .getProfessionalService(profId)
        .then((response) => {
          const data = response.data;
          setProfUserData(data);
        });
      // console.log(`ProfUserData(${profId}): ${data}`);
    }
    // setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const { user_id, professionaluserservice_set } = profUserData;
    setProfUSData(
      professionaluserservice_set && professionaluserservice_set[0]
    );

    if (user_id ?? false) {
      const data = userService.getUserDetailsById(user_id).then((response) => {
        const data = response.data;
        setUserData(data);
      });
      // console.log(`UserData(${user_id}): ${data}`);
    }
    // setIsLoading(false);
  }, [profUserData?.user_id]);

  const status = isAvailable(profUserData?.startsTime, profUserData?.endsTime)
    ? "available"
    : "unavailable " +
      `${profUserData?.startsTime ?? ""} - ${profUserData?.endsTime ?? ""}`;

  console.log("profId:", profId, "profUSData:", profUSData);

  if (profId == null) {
    return (
      <Card component={Paper} elevation={8} sx={{ m: 0.25 }}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circular"
              height={40}
              width={40}
            />
          }
          action={
            <Grid sx={{ display: "flex", m: 1 }}>
              <Skeleton
                animation="wave"
                variant="circular"
                sx={{ ml: 1 }}
                height={25}
                width={25}
              />
              <Skeleton
                animation="wave"
                variant="circular"
                sx={{ ml: 1 }}
                height={25}
                width={25}
              />
            </Grid>
          }
          title={<Skeleton animation="wave" />}
          subheader={<Skeleton animation="wave" height={10} width="75%" />}
        />
        <CardMedia>
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={200}
            width="100%"
          />
        </CardMedia>
        <CardContent>
          <Skeleton animation="wave" height={15} />
          <Skeleton animation="wave" height={15} width="75%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      component={Paper}
      elevation={8}
      sx={{
        mx: 0.75,
        backgroundImage: `url('${
          profUSData?.proof_img_url ?? serviceData?.img_url
        }')`,
        // backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        "& > div": {
          p: "10px",
          height: "100%",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#000C" : "#FFFD",
          backgroundAttachment: "scroll",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={userData?.profile_pic_url}
            sx={{ bgcolor: (theme) => theme.palette.primary.main }}
          >
            {makeAvtarText(userData?.full_name)?.slice(0, 2)}
          </Avatar>
        }
        action={
          <>
            <IconButton>
              <Message />
            </IconButton>
            <IconButton
              onClick={() => {
                setIsBookmarked((prev) => !prev);
              }}
            >
              {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
            </IconButton>
          </>
        }
        title={
          <Typography
            component={Link}
            href={`/profile/${profUserData.id}/${makeSlug(
              userData?.full_name
            )}/`}
            fontWeight="bold"
          >
            {userData?.full_name}
          </Typography>
        }
        subheader={status}
      />
      <CardContent sx={{ pt: "0px !important" }}>
        {/* <Tooltip title={serviceData?.description ?? "No Description"} arrow>
          <Typography variant="h6">{serviceData?.service_name}</Typography>
        </Tooltip> */}
        {highlightedSubService
          ?.concat(subServiceData)
          ?.filter((value, index, self) => self.indexOf(value) === index)
          ?.filter((_, index) => index < 3)
          ?.map((ele, index) => (
            <Tooltip
              key={`${ele.service_name}-${index}`}
              title={ele?.description ?? "No Description"}
              arrow
            >
              <Chip
                sx={{ cursor: "zoom-in", my: 0.25, mx: 0.1 }}
                icon={<Tag size="small" />}
                color="primary"
                variant={ele?.id === (servId ?? "") ? "" : "outlined"}
                size="small"
                label={ele?.service_name}
              />
            </Tooltip>
          ))}
      </CardContent>
      {/* <CardMedia
        component="img"
        height="200"
        image={profUSData?.proof_img_url ?? serviceData?.img_url}
        alt={userData?.full_name}
      /> */}
      <CardContent sx={{ pb: "10px !important" }}>
        <Grid container flex alignItems="center" textAlign="center">
          <Grid item xs={3}>
            <Tooltip title="Minimum Charges" arrow>
              <Typography variant="body1" fontWeight="bold">
                ₹{profUSData?.charges}
              </Typography>
            </Tooltip>
            <Typography variant="caption" color="text.secondary">
              Charges
            </Typography>
          </Grid>
          <Grid item xs>
            {profUSData?.payment_modes?.map((ele, index) => (
              <Tooltip key={`${ele}-${index}`} title="Payment Methods" arrow>
                <Chip label={ele} size="small" color="primary" />
              </Tooltip>
            ))}
          </Grid>
          <Grid item xs={3}>
            <Tooltip title="Estimated Time to complete Task" arrow>
              <Typography variant="body1">
                {profUSData?.estimate_time}
              </Typography>
            </Tooltip>
            <Typography variant="caption" color="text.secondary">
              Estimate Time
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {authUser ? (
              authUser?.id != userData?.id && (
                <HireProfessionalModel
                  profName={userData?.full_name}
                  profId={userData?.id}
                  pus_id={profUSData?.id}
                  subServiceName={highlightedSubService[0]?.service_name}
                  subServiceId={highlightedSubService[0]?.id}
                />
              )
            ) : (
              <Button component={Link} href="/signin">
                Signin To Hire
              </Button>
            )}
          </Grid>
        </Grid>
        <Tooltip title={profUSData?.description ?? "No Description"} arrow>
          <Typography
            variant="caption"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            color="text.secondary"
          >
            {profUSData?.description ?? serviceData?.description}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default ServiceListCard;
