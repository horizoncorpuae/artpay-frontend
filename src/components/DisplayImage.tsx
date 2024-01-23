import React from "react";
import { Box, SxProps, Theme } from "@mui/material";

export interface DisplayImageProps {
  src?: string;
  width?: number | string;
  height?: number | string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  objectFit?: "contain" | "cover";
}

const DisplayImage: React.FC<DisplayImageProps> = ({ src, width, height, sx = {}, objectFit, onClick }) => {
  return (
    <Box
      sx={{
        ...sx,
        //height: height || "auto",
        maxHeight: height || "auto",
        //width: width || "auto",
        maxWidth: width || "auto",
        //background: "rgba(0,0,0,0.2)",
        flexShrink: 0,
        textAlign: "center",
      }}
      className="borderRadius">
      <img
        style={{
          maxHeight: height || "auto",
          maxWidth: width || "auto",
          cursor: onClick ? "pointer" : "auto",
          objectFit: objectFit,
        }}
        onClick={onClick}
        src={src}
      />
    </Box>
  );
};

export default DisplayImage;
