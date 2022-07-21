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

const data = {
  id: null,
  is_active: null,
  descriptive_msg: null,
  created_at: null,
  updated_at: null,
  subservice_id: null,
  interested_prof: [],
  created_by: null,
};

const UserRequirement = ({ data, isOwner = false, ...props }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (isOwner) setUserData(data?.created_by);
    else {
      const dataX = userService.getUserDetailsById(data?.created_by).then(
        (response) => {
          // console.log("getUserDetailsById response: ", response);
          setUserData(response.data);
        },
        (error) => {
          console.log("getUserDetailsById    error: ", error);
        }
      );
    }
  }, [isOwner]);

  return (
    <Card elevation={isOwner ? 12 : 4} sx={{ minWidth: "50%", m: 2 }}>
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
          moment(data?.created_at).fromNow() ?? (
            <Skeleton animation="wave" height={10} />
          )
        }
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h5">
          {data?.descriptive_msg ?? (
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
          {data?.interested_prof?.length ?? "No"}
          {" interested professionals"}
        </Typography>
        {isOwner ? (
          <>
            <Button variant="outlined" color="success">
              Close Requirement
            </Button>
          </>
        ) : (
          <Tooltip
            title={
              (data?.interested_prof?.length ?? "No") +
              " professionals has showed interest"
            }
            arrow
          >
            <Button>Show Interest</Button>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default UserRequirement;
