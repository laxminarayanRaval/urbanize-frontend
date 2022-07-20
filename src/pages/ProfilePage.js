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
import userService from "../store/services/user.service";

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
  profUserData = null,
  profUserServiceData = null,
  ...props
}) => {
  // console.log("profUserData :", profUserData);
  if (!profUserData)
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

  const profilePicUrl = !!profUserData?.profile_pic_url
    ? profUserData?.profile_pic_url
    : profUserData?.gender === "female"
    ? avtarFemale
    : avtarMale;

  // const { professionaluser_set: profUserServiceData } = profUserData;
  console.log("profUserServiceData: ", profUserServiceData);

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
            isAvailable(
              profUserServiceData?.startsTime,
              profUserServiceData?.endsTime
            )
              ? "available"
              : "unavailable"
          }
          color={
            isAvailable(
              profUserServiceData?.startsTime,
              profUserServiceData?.endsTime
            )
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
            alt={profUserData?.full_name}
            style={{
              maxWidth: "30%",
              minWidth: "25% !important",
              height: "auto",
              borderRadius: "50%",
            }}
          />
        </Badge>
        <Typography variant="h5" fontStyle="italic" fontWeight="bold">
          {profUserData?.full_name}
          {profUserData?.is_verified && <Verified color="primary" />}
        </Typography>
        <Grid container justifyContent="center">
          <IconButton
            title={`Mail ${profUserData?.full_name}`}
            color="primary"
            disabled={!profUserData?.email}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${profUserData?.email}?BCC=lx.raval01+admin@gmail.com&Subject=Hello%20Justin%2C%20I%20Found%20You%20on%20Urbanize&Body=I%20want%20to%20hire%20you`;
            }}
          >
            <EmailOutlined />
          </IconButton>
          <IconButton
            title={`Call ${profUserData?.full_name}`}
            color="secondary"
            disabled={!profuserData?.mobile_no}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `tel:${profuserData?.mobile_no}`;
            }}
          >
            <Phone />
          </IconButton>
          <IconButton
            title={`Message ${profUserData?.full_name}`}
            color="success"
          >
            <Message />
          </IconButton>
          <IconButton
            title={`Report ${profUserData?.full_name}`}
            color="danger"
          >
            <Flag />
          </IconButton>
        </Grid>
      </Grid>
      <Divider>
        <Chip label={profUserData?.role === "prof" ? "Professional" : "User"} />
      </Divider>
      <Table px={1}>
        <TableBody>
          {!!profUserData?.date_of_birth && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Age :</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                >{`${profUserData?.date_of_birth}`}</Typography>
              </TableCell>
            </TableRow>
          )}
          {!!profUserData?.email && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Email :</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  {profUserData?.email}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {!!profuserData?.mobile_no && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Mobile :</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  {profuserData?.mobile_no}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {profUserServiceData?.startsTime && profUserServiceData?.endsTime && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Timing :</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                >{`${profUserServiceData?.startsTime} - ${profUserServiceData?.endsTime}`}</Typography>
              </TableCell>
            </TableRow>
          )}
          {profUserServiceData?.address && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Address :</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  {profUserServiceData?.address}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {profUserServiceData?.cities && (
            <TableRow>
              <TableCell sx={{ minWidth: 110, textAlign: "right", p: 0 }}>
                <Typography variant="body1">Cities :</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight="bold">
                  {profUserServiceData?.cities?.join(", ")}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Grid>
  );
};

const ProfileRightSection = ({ profId = null, ...props }) => {
  return <ServiceListCard profId={profId} />;
  /*     <Grid container p={1}>
      <Grid item sm={12} md={6}>
      </Grid>
      <Grid item sm={12} md={6}>
        <ServiceListCard />
      </Grid>
    </Grid> */
};

const ProfilePage = () => {
  const { uid, uname } = useParams();

  const [profUserData, setProfUserData] = useState({});
  const [profUSData, setProfUSData] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (uid ?? false) {
      const data = userService.getProfessionalService(uid).then((response) => {
        const data = response.data;
        setProfUserData(data);
      });
      // console.log(`ProfUserData(${uid}): ${data}`);
    }
  }, []);

  useEffect(() => {
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
  }, [profUserData?.user_id]);

  const isAuth = useSelector((state) => state?.auth?.isAuthenticated);
  const currUser = useSelector((state) => state?.auth?.user);
  const profId = currUser?.professionaluser_set;

  // console.log(profId, "-----", uid);
  if (uid === profId) {
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
            profUserData={userData}
            profUserServiceData={profUserData}
            isAuth={isAuth}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8} px={2} bgcolor="#DDD5">
          <ProfileRightSection profId={uid} />
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
        <ProfileLeftSection
          profId={uid}
          profName={uname}
          profUserData={userData}
          profUserServiceData={profUserData}
          isAuth={isAuth}
        />
      </Grid>
      <Grid item xs={12} md={8} px={2}>
        <ProfileRightSection profId={uid} />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
