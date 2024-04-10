import React from "react";
import { Box, BoxProps, LinearProgress, Typography } from "@mui/material";

// import Lottie from "react-lottie";

export interface LoaderProps {
  sx?: BoxProps["sx"];
}

const Loader: React.FC<LoaderProps> = ({ sx }) => {
  /*const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: '',
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };*/

  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h6">Loading...</Typography>
      <LinearProgress />
      {/*<Lottie
        options={defaultOptions}
        height={400}
        width={400}
      />*/}
    </Box>
  );
};

export default Loader;
