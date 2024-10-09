import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export interface AvatarCircleTextProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const AvatarCircleText: React.FC<AvatarCircleTextProps> = ({ text = "", size = "md" }) => {
  const theme = useTheme();
  const sizeMap = {
    sm: 24,
    md: 48,
    lg: 96,
    xl: 150
  };
  const fontSizes = {
    sm: 10,
    md: 16,
    lg: 48,
    xl: 60
  };
  return (<Box sx={{
    height: sizeMap[size],
    width: sizeMap[size],
    p: 1,
    borderRadius: sizeMap[size] / 2,
    border: "1px solid #CDCFD3",
    background: theme.palette.primary.main
  }} display="flex" alignItems="center" justifyContent="center">
    <Typography fontSize={fontSizes[size]} color="white">{text}</Typography>
  </Box>);
};

export default AvatarCircleText;
