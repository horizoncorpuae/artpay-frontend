import React from "react";
import { Box, BoxProps, Typography, TypographyOwnProps, useMediaQuery, useTheme } from "@mui/material";
import CopyText from "./CopyText.tsx";

export interface DisplayPropertyProps {
  label: string;
  value: string;
  gap?: number;
  copy?: boolean;
  variant?: TypographyOwnProps["variant"];
  sx?: BoxProps["sx"];
}

const DisplayProperty: React.FC<DisplayPropertyProps> = ({ label, value, copy = false }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "flex-start" },
        gap: { xs: 0.5, sm: 0 },
      }}>
      <div
        style={{
          flexGrow: 1,
          maxWidth: isMobile ? '100%' : "50%",
        }}>
        <Typography fontWeight={500} fontSize={16}>
          {label}
        </Typography>
      </div>
      {copy ? (
        <div>
          <CopyText text={value} />
        </div>
      ) : (
        <div style={{ alignSelf: "start" }}>
          <Typography color="textSecondary">{value || "-"}</Typography>
        </div>
      )}
    </Box>
  );
};

export default DisplayProperty;
