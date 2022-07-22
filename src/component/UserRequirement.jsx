import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { makeAvtarText } from "../utils/Helpers";
import { useState } from "react";
import { useEffect } from "react";
import userService from "../store/services/user.service";

const propsDataInitial = {
  id: null,
  is_active: null,
  descriptive_msg: null,
  created_at: null,
  updated_at: null,
  subservice_id: null,
  interested_prof: [],
  created_by: null,
};

const UserRequirement = ({
  data: propsData = propsDataInitial,
  isOwner = false,
  ...props
}) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (isOwner) setUserData(propsData?.created_by);
    else {
      const dataX = userService.getUserDetailsById(propsData?.created_by).then(
        (response) => {
          // console.log("getUserDetailsById response: ", response);
          setUserData(response.data);
        },
        (error) => {
          console.log("getUserDetailsById    error: ", error.response);
        }
      );
    }
  }, [isOwner]);

  const buttonClickHandler = () => {
    if (propsData.is_active) {
      if (!isOwner) {
        makeAPIcall({
          interested_prof: userData.id,
        });
      }
      if (isOwner) {
        debugger;
        makeAPIcall({
          is_active: false,
        });
      }
    }
  };

  const makeAPIcall = (data) => {
    if (propsData.id) {
      const dataX = userService.patchUserRequirements(propsData.id, data).then(
        (response) => {
          console.log(
            "response",
            response,
            response?.status,
            response?.statusText,
            response?.data
          );
        },
        (error) => {
          console.log("error", error.response);
        }
      );
    }
  };

  return (
    <Card
      elevation={isOwner ? 12 : 4}
      sx={{ maxWidth: "100%", bgcolor: propsData.is_active ? "" : "#ddd", m: 2 }}
    >
      <CardHeader
        sx={{ p: 1 }}
        avatar={
          (userData?.full_name && (
            <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
              {makeAvtarText(userData?.full_name)?.slice(0, 2)}
            </Avatar>
          )) ?? (
            <Skeleton
              animation="wave"
              variant="circular"
              height={40}
              width={40}
            />
          )
        }
        title={userData?.full_name ?? <Skeleton animation="wave" height={20} />}
        subheader={
          moment(propsData?.created_at).fromNow() ?? (
            <Skeleton animation="wave" height={10} />
          )
        }
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h5" sx={{ whiteSpace: "pre-line" }}>
          {propsData?.descriptive_msg ?? (
            <Skeleton variant="rectangular" height={80} />
          )}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="body2">
          {propsData?.interested_prof?.length > 0
            ? `${propsData?.interested_prof?.length} Professional${
                propsData?.interested_prof?.length > 1 ? "s" : ""
              }`
            : "No Professional"}
          {"has shown Interest"}
        </Typography>
        {propsData.is_active ? (
          <Button
            onClick={buttonClickHandler}
            variant="outlined"
            color={isOwner ? "success" : "primary"}
          >
            {isOwner ? "Close Requirement" : "Show Interest"}
          </Button>
        ) : (
          <Typography variant="h6" color="error" textAlign="center">
            This Requirement is Closed
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default UserRequirement;
