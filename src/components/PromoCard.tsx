import React, { ReactNode } from "react";
import { Box, Typography, TypographyProps, useTheme } from "@mui/material";

export interface PromoCardProps {
  title: string | ReactNode;
  children?: ReactNode;
  variant?: "standard" | "contrast";
  titleVariant?: TypographyProps["variant"];
  border?: boolean;
}

const PromoCard: React.FC<PromoCardProps> = ({ title, children, variant, titleVariant = "display3", border }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: { xs: "column", md: "row" },
        border: border ? `4px solid ${theme.palette.primary.main}` : "none",
        borderRadius: "24px",
        background: variant === "contrast" ? theme.palette.primary.main : "white",
        boxShadow: variant === "contrast" ? "none" : "0px 4px 64px 0px rgba(1, 15, 34, 0.08)",
        alignItems: { xs: "flex-start", md: "center" },
        py: { xs: 6, md: 8 },
        px: { xs: 4, md: 13 },
      }}>
      <Typography
        sx={{ flexGrow: 1 }}
        color={variant === "contrast" ? theme.palette.primary.contrastText : undefined}
        variant={titleVariant}>
        {title}
      </Typography>
      <Box
        sx={{
          maxWidth: variant === "contrast" ? undefined : { xs: undefined, md: "250px", lg: "400px" },
          mt: { xs: 3, md: 0 },
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default PromoCard;
