import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { UserRequirement, NewUserRequirementModal } from "../component";

const PostServiceRequirementPage = ({ ...props }) => {
  const userData = useSelector((state) => state?.auth?.user);
  const [userRequirements, setUserRequirements] = useState(null);

  useEffect(() => {
    console.log("userData?.role", userData?.role === "prof");
  }, [userData?.role === "prof"]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        {userData?.userrequirement_set?.length > 0 ? (
          <>
            <Divider>
              <Typography variant="h4">
                Previously Posted Requirements
              </Typography>
            </Divider>
            {userData?.userrequirement_set?.map((ele) => {
              console.log(ele);
              return (
                <UserRequirement
                  data={{ ...ele, created_by: userData }}
                  isOwner={true}
                />
              );
            })}
          </>
        ) : (
          <Typography variant="h6" textAlign="center">
            You've Not Posted Requirements Yet
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} md={10} textAlign="center">
        <Divider>
          <Typography variant="h4">Post New Requirement</Typography>
        </Divider>
        <NewUserRequirementModal
          userName={userData?.full_name}
          userContact={userData?.mobile_no ?? userData?.email}
        />
      </Grid>
      {userData?.role === "prof" && (
        <Grid item xs={12} md={10} textAlign="center">
          <Divider>
            <Typography variant="h4">Professionals Section</Typography>
          </Divider>
          <Typography variant="body1">You Might be interested in this, check once.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default PostServiceRequirementPage;
