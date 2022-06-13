import React, { useState } from "react";
import { Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  ChangePassword,
  ContactDetails,
  DeactivateAccount,
} from "../component/AccountComponents";
import { useSelector } from "react-redux";

const TabPanel = (props) => {
  const { children, value, index, ...rest } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...rest}
    >
      {value == index && (
        <Box component={Paper} sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const tabsProps = (index) => ({
  id: `vertical-tab-${index}`,
  "aria-controls": `vertical-tabpanel-${index}`,
});

const AccountPage = () => {
  const tabs = [
    { title: "Contact Details", component: <ContactDetails /> },
    { title: "Change Password", component: <ChangePassword /> },
    { title: "Deactivate Account", component: <DeactivateAccount /> },
  ];

  const userRole = useSelector((state) => state.auth.user.role);
  if (userRole !== "user")
    tabs.splice(0, 0, {
      title: "Manage Professional Acc",
      component: <DeactivateAccount />,
    });

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTabs = (event, value) => {
    setSelectedTab(value);
  };

  const tabsList = () =>
    tabs.map((ele, index) => (
      <Tab label={ele.title} key={index} {...tabsProps(index)} />
    ));
  return (
    <>
      <Typography component="h3" variant="h4" textAlign="center">
        Account Settings
      </Typography>
      <Grid
        container
        // spacing={2}
        // px={5}
        sx={{ display: "flex", minHeight: "70vh", alignItems: "center" }}
      >
        <Grid item sx={{ display: { xs: "none", md: "flex" } }} md={3} lg={3} pl={8}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={selectedTab}
            onChange={handleChangeTabs}
            aria-label="account page menu"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {tabsList()}
          </Tabs>
        </Grid>
        <Grid item sx={{ display: { xs: "flex", md: "none" }, backgroundColor: (theme) => theme.palette.divider }} xs={12} sm={12} mx={2} >
          <Tabs
            variant="scrollable"
            value={selectedTab}
            onChange={handleChangeTabs}
            aria-label="account_page_menu"
          >
            {tabsList()}
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          {tabs.map((ele, index) => (
            <TabPanel value={selectedTab} index={index} key={index}>
              {ele.component}
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default AccountPage;
