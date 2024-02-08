import React from "react";
import { Box, BoxProps, Typography, TypographyOwnProps } from "@mui/material";

export interface DisplayPropertyProps {
  label: string;
  value: string;
  gap?: number;
  variant?: TypographyOwnProps["variant"];
  sx?: BoxProps["sx"];
}

const DisplayProperty: React.FC<DisplayPropertyProps> = ({ label, value, gap = 1, variant = "subtitle1", sx = {} }) => {
  return (
    <Box sx={sx}>
      <Typography variant={variant} fontWeight={600}>
        {label}
      </Typography>
      <Typography sx={{ mt: gap }} variant={variant}>
        {value || "-"}
      </Typography>
    </Box>
  );
};

export default DisplayProperty;
