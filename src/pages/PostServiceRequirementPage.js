import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { UserRequirement, NewUserRequirementModal } from "../component";
import userService from "../store/services/user.service";

const PostServiceRequirementPage = ({ ...props }) => {
  const userData = useSelector((state) => state?.auth?.user);
  const [ownUserReq, setOwnUserReq] = useState(null);
  const [userRequirements, setUserRequirements] = useState(null);

  useEffect(() => {
    if (userData?.userrequirement_set?.length > 0) {
      setOwnUserReq(userData?.userrequirement_set);
    }
  }, [userData?.userrequirement_set]);

  const newPostDataHandler = (data) => {
    data.then(
      (response) => {
        console.log("donePublishresponse", response);
      },
      (error) => {
        console.log("donePublisherror", error);
      }
    );
  };

  useEffect(() => {
    // console.log("userData?.role", userData?.role === "prof");
    if (userData?.role === "prof") {
      const data = userService.getAllUserRequirements().then(
        (response) => {
          setUserRequirements(response.data);
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }, [userData?.role === "prof"]);

  // console.log("userData", userData?.professionaluser_set);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        {ownUserReq ? (
          <>
            <Divider>
              <Typography variant="h4">
                Previously Posted Requirements
              </Typography>
            </Divider>
            {/* {userRequirements
            ?.filter((ele) => ele.created_by === userData?.id)
            ?.map((ele) => (
              <UserRequirement key={ele.id} data={{ ...ele, created_by: userData }} isOwner={true} />
            ))} */}
            {ownUserReq?.map((ele) => {
              return (
                <UserRequirement
                  key={ele.id}
                  data={{ ...ele, created_by: userData }}
                  isOwner={true}
                />
              );
            })}
          </>
        ) : (
          <Typography variant="h6" textAlign="center">
            You've Not Posted Any Requirements Yet
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} md={10} textAlign="center">
        <Divider>
          <Typography variant="h4">Post New Requirement</Typography>
        </Divider>
        <NewUserRequirementModal
          userId={userData?.id}
          userName={userData?.full_name}
          userContact={userData?.mobile_no ?? userData?.email}
          donePublish={newPostDataHandler}
        />
      </Grid>
      {userData?.role === "prof" && (
        <Grid item xs={12} md={10}>
          <Divider>
            <Typography variant="h4">Professionals Section</Typography>
          </Divider>
          <Typography variant="body1" textAlign="center">
            You Might be interested in this, check once.
          </Typography>
          {userRequirements
            ?.filter((ele) => ele.is_active && ele.created_by !== userData?.id)
            ?.sort((curr, next) => curr.subservice_id > next.subservice_id)
            ?.map((ele) => (
              <UserRequirement key={ele.id} data={{ ...ele }} />
            ))}
        </Grid>
      )}
    </Grid>
  );
};

export default PostServiceRequirementPage;
