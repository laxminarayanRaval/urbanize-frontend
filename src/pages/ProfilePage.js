import React, { useEffect, useState } from "react";
import {
  Badge,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  EmailOutlined,
  Flag,
  Message,
  Phone,
  Verified,
} from "@mui/icons-material";
import moment from "moment";
import ServiceListCard from "../component/ServiceListCard";

const avtarMale =
  "https://res.cloudinary.com/urbanize/image/upload/v1657176333/user-profile-my-account-avatar-login-icon-man-male-face-smile-symbol-flat-vector-human-person-member-sign-user-profile-182815734_v2q12a.jpg";
const avtarFemale =
  "https://res.cloudinary.com/urbanize/image/upload/v1657176262/user-profile-my-account-avatar-login-icon-woman-female-face-smile-symbol-flat-vector-human-lady-person-member-sign-186506698_ltneic.jpg";

const today = moment();
const isAvailable = (startsTime, endsTime) =>
  startsTime < today.format("HH:mm:ss") && endsTime > today.format("HH:mm:ss");

const ProfileLeftSection = ({
  profName,
  profId,
  isAuth = false,
  proData = null,
  ...props
}) => {
  if (!proData)
    return (
      <Grid p={1} component={Paper}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 1,
            p: 0,
          }}
        >
          <Skeleton variant="circular" width={220} height={220} my={1} />
          <Skeleton variant="rectangular" width={320} height={60} my={1} />
        </Grid>
      </Grid>
    );

  const profilePicUrl = !!proData?.profile_pic_url
    ? proData?.profile_pic_url
    : proData?.gender === "female"
    ? avtarFemale
    : avtarMale;

  const { professionaluser_set: profUserData } = proData;

  return (
    <Grid
      p={1}
      component={Paper}
      elevation={10}
      sx={{ maxWidth: "90%", minWidth: "60%" }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 1,
        }}
      >
        <Badge
          overlap="circular"
          badgeContent={
            isAvailable(profUserData?.startsTime, profUserData?.endsTime)
              ? "available"
              : "unavailable"
          }
          color={
            isAvailable(profUserData?.startsTime, profUserData?.endsTime)
              ? "success"
              : "warning"
          }
          sx={{
            justifyContent: "center",
            "& span": {
              top: "15%",
              right: "40%",
            },
          }}
        >
          <img
            src={profilePicUrl}
            alt={proData?.full_name}
            style={{
              maxWidth: "30%",
              minWidth: "25% !important",
              height: "auto",
              borderRadius: "50%",
            }}
          />
        </Badge>
        <Typography variant="h5" fontStyle="italic" fontWeight="bold">
          {proData?.full_name}
          {proData?.is_verified && <Verified color="primary" />}
        </Typography>
        <Grid container justifyContent="center">
          <IconButton
            title={`Mail ${proData?.full_name}`}
            color="primary"
            disabled={!proData?.email}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${proData?.email}?BCC=lx.raval01+admin@gmail.com&Subject=Hello%20Justin%2C%20I%20Found%20You%20on%20Urbanize&Body=I%20want%20to%20hire%20you`;
            }}
          >
            <EmailOutlined />
          </IconButton>
          <IconButton
            title={`Call ${proData?.full_name}`}
            color="secondary"
            disabled={!proData?.mobile}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `tel:${proData?.mobile}`;
            }}
          >
            <Phone />
          </IconButton>
          <IconButton title={`Message ${proData?.full_name}`} color="success">
            <Message />
          </IconButton>
          <IconButton title={`Report ${proData?.full_name}`} color="danger">
            <Flag />
          </IconButton>
        </Grid>
      </Grid>
      <Divider>
        <Chip label={proData?.role === "prof" ? "Professional" : "User"} />
      </Divider>
      <Table px={1}>
        <TableBody>
          {!!proData?.date_of_birth && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Age :</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                >{`${proData?.date_of_birth}`}</Typography>
              </TableCell>
            </TableRow>
          )}
          {!!proData?.email && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Email :</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  {proData?.email}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {!!proData?.mobile && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Mobile :</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  {proData?.mobile}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
              <Typography variant="body1">Timing :</Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                fontWeight="bold"
              >{`${profUserData?.startsTime} - ${profUserData?.endsTime}`}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
              <Typography variant="body1">Address :</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {profUserData?.address}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
              <Typography variant="body1">Cities :</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {profUserData?.cities?.join(", ")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
};

const ProfileRightSection = ({
  profId = null,
  profName = null,
  proData = null,
  ...props
}) => {
  const profilePicUrl = !!proData?.profile_pic_url
    ? proData?.profile_pic_url
    : proData?.gender === "female"
    ? avtarFemale
    : avtarMale;

  const { professionaluser_set: profUserData } = proData ?? {};
  return (
    <Grid container p={1}>
      <Grid item sm={12} md={6}>
        <ServiceListCard
          profId={profId}
          /* title={proData?.full_name}
          status={
            isAvailable(profUserData?.startsTime, profUserData?.endsTime)
              ? "available"
              : `unavailable (timing ${profUserData?.startsTime} ${profUserData?.endsTime})`
          }
          avtarUrl={profilePicUrl}
          serviceId={profUserData?.serviceId}
          content={profUserData?.professionaluserservice_set[0]} */
        />
      </Grid>
      <Grid item sm={12} md={6}>
        {/* <ServiceListCard /> */}
      </Grid>
    </Grid>
  );
};

const ProfilePage = () => {
  const { uid, uname } = useParams();

  const isAuth = useSelector((state) => state?.auth?.isAuthenticated);
  const userData = useSelector((state) => state?.auth?.user);
  const profId = userData?.professionaluser_set

  console.log(profId, "-----", uid);
  if (isAuth && uid === profId) {
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ProfileLeftSection
            profId={uid}
            profName={uname}
            proData={userData}
            isAuth={isAuth}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <ProfileRightSection
            profId={uid}
            profName={uname}
            proData={userData}
            isAuth={isAuth}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ProfileLeftSection profId={uid} profName={uname} />
      </Grid>
      <Grid item xs={12} md={8} bgcolor="#B77">
        <ProfileRightSection profId={uid} profName={uname} />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
