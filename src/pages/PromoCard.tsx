import React, { ReactNode } from "react";
import { Box, Typography, useTheme } from "@mui/material";

export interface PromoCardProps {
  title: string | ReactNode;
  children?: ReactNode;
  variant?: "standard" | "contrast";
  border?: boolean;
}

const PromoCard: React.FC<PromoCardProps> = ({ title, children, variant, border }) => {
  const theme = useTheme();

  return (
    <Box display="flex"
         sx={{
           flexDirection: "row",
           border: border ? `4px solid ${theme.palette.primary.main}` : "none",
           borderRadius: "24px",
           background: variant === "contrast" ? theme.palette.primary.main : "white",
           boxShadow: variant === "contrast" ? "none" : "0px 4px 64px 0px rgba(1, 15, 34, 0.08)",
           alignItems: "center",
           py: 8,
           px: 13
         }}>
      <Typography sx={{ flexGrow: 1 }} color={variant === "contrast" ? theme.palette.primary.contrastText : undefined}
                  variant="display3">{title}</Typography>
      <Box sx={{ maxWidth: variant === "contrast" ? undefined : { xs: undefined, md: "250px", lg: "400px" } }}>
        {children}
      </Box>
    </Box>);
};

export default PromoCard;
