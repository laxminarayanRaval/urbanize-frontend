import React, { useEffect, useState } from "react";
import {
  Chip,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { EmailOutlined, Message, Phone, Verified } from "@mui/icons-material";
import { strArrToStr } from "../utils/Helpers";

const avtarMale =
  "https://res.cloudinary.com/urbanize/image/upload/v1657176333/user-profile-my-account-avatar-login-icon-man-male-face-smile-symbol-flat-vector-human-person-member-sign-user-profile-182815734_v2q12a.jpg";
const avtarFemale =
  "https://res.cloudinary.com/urbanize/image/upload/v1657176262/user-profile-my-account-avatar-login-icon-woman-female-face-smile-symbol-flat-vector-human-lady-person-member-sign-186506698_ltneic.jpg";

const ProfileLeftSection = ({ isAuth = false, proData = null, ...props }) => {
  if (!proData)
    return (
      <Grid p={1}>
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

  // id,
  // email,
  // role,
  // full_name,
  // mobile_no,
  // date_of_birth,
  // gender,
  // profile_pic_url,
  // is_verified,
  // professionaluser_set,

  const profilePicUrl = !!proData?.profile_pic_url
    ? proData?.profile_pic_url
    : proData?.gender === "female"
    ? avtarFemale
    : avtarMale;

  const { professionaluser_set: profUserData } = proData;

  const IconButtonClickHandler = (link) => {
    window.open(link);
  };

  return (
    <Grid p={1}>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 1,
        }}
      >
        <img
          src={profilePicUrl}
          alt={proData?.full_name}
          style={{ maxWidth: "50%", height: "auto", borderRadius: "50%" }}
        />
        <Typography variant="h4" fontStyle="italic" fontWeight="bold">
          {proData?.full_name}
          {proData?.is_verified && <Verified color="primary" />}
        </Typography>
      </Grid>
      <Divider>
        <Chip label={proData?.role === "prof" ? "Professional" : "User"} />
      </Divider>
      <Table px={1}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
              <Typography variant="h5">Contact :</Typography>
            </TableCell>
            <TableCell>
              <IconButton
                onClick={(e) => {
                  window.location.href = `/mailto:${proData?.email}?BCC=lx.raval01+&Subject=Hello%20Justin%2C%20I%20Found%20You%20on%20Urbanize&Body=I%20want%20to%20hire%20you`;
                  e.preventDefault();
                }}
              >
                <EmailOutlined />
              </IconButton>
              <IconButton
                href={(_) => {
                  IconButtonClickHandler(`/tel:${proData?.mobile_no}`);
                }}
              >
                <Phone />
              </IconButton>
              <IconButton>
                <Message />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
              <Typography variant="h5">Timing :</Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="h6"
                fontWeight="bold"
              >{`${profUserData?.startsTime} to ${profUserData?.endsTime}`}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
              <Typography variant="h5">Address :</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                {profUserData?.address}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
              <Typography variant="h5">Cities :</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                {profUserData?.cities?.join(", ")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
};

const ProfileRightSection = ({ userName, userId, ...props }) => {
  return <Grid container> </Grid>;
};

const ProfilePage = () => {
  const { uid } = useParams();

  const isAuth = useSelector((state) => state?.auth?.isAuthenticated);
  const userData = useSelector((state) => state?.auth?.user);

  if (isAuth && uid === userData?.id) {
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={4} mx={2} borderRadius={1}>
          <ProfileLeftSection proData={userData} isAuth={isAuth} />
        </Grid>
        <Grid item xs={12} sm={12} md={8} bgcolor="#777">
          <ProfileRightSection />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={4} mx={2} borderRadius={1}>
        <ProfileLeftSection />
      </Grid>
      <Grid item xs={12} sm={12} md={8} bgcolor="#B77">
        <ProfileRightSection />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
