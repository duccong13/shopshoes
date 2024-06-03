import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input, Typography, avatar } from "@material-tailwind/react";
import { NavLink, Route, Router, Routes } from "react-router-dom";

const Profile = ({routes}) => {
  return (
    <div className="fixed left-28">
      {routes.map(({ layout, pages }, key) => (
        <ul key={key} className="mb-4">
          {pages.map(({ icon, name, path }) => (
            <li key={name}>
              <NavLink to={`/${layout}/${path}`}>
                {({ isActive }) => (
                  <Button
                    variant="gradient"
                    className="px-2 capitalize hover:shadow-md"
                    fullWidth
                  >
                    {icon}
                    <Typography
                      color="#fff"
                      className="font-medium capitalize p-2"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default Profile;
