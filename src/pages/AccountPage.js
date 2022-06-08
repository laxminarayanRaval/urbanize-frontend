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
        <Box component={Paper} sx={{ m: 2, p: 3 }}>
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
  if (userRole !== "user") tabs.splice(0, 0, { title: "Manage Professional Acc", component: <DeactivateAccount />});

  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTabs = (event, value) => {
    setSelectedTab(value);
  };
  return (
    <Grid
      container spacing={2} px={5}
      sx={{ display: "flex", minHeight: "70vh", alignItems: "center" }}
    >
      <Grid item xs={3} sm={3} md={3} lg={3} textAlign="left">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selectedTab}
          onChange={handleChangeTabs}
          aria-label="account page menu"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {tabs.map((ele, index) => (
            <Tab label={ele.title} key={index} {...tabsProps(index)} />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={7} sm={7} md={7} lg={9}>
        {tabs.map((ele, index) => (
          <TabPanel value={selectedTab} index={index} key={index}>
            {ele.component}
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  );
};

export default AccountPage;
