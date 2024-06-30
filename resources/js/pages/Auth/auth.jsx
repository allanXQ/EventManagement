import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Auth = ({ title, sublink, children, sx }) => {
  return (
    <>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mt: 5,
          // height: "100vh",
          color: "white.main",
          overflowX: "hidden",
          ...sx,
        }}
      >
        <Typography variant="h4">{title}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography variant="bodyRegular">{sublink.text}</Typography>
          <Typography
            component={Link}
            to={sublink.pathname}
            variant="bodyRegularBold"
            // sx={{ color: "blue.main" }}
          >
            {sublink.sublinkText}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "0.3rem",
          }}
        ></Box>
      </Box>
    </>
  );
};

export default Auth;
