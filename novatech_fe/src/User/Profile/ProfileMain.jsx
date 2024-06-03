import { Grid } from "@mui/material";
import React from "react";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routerProfile";
import Info from "./Info";
import History from "./History";
import SignIn from "../Auth/Signin";
import Address from "./Address";
import Support from "./Support";

const ProfileMain = () => {
  const background = "https://cdn.pixabay.com/photo/2016/10/22/01/54/wood-1759566_1280.jpg"
  return (
    <Grid
      container
      mt={10}
      spacing={2}
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Grid item xs={4}>
        <Profile routes={routes} />
      </Grid>
      <Grid item xs={8}>
        <Routes>
          <Route path="/info" element={<Info />} />
          <Route path="/" element={<Info />} />
          <Route path="/history" element={<History />} />
          <Route path="/address" element={<Address />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default ProfileMain;
