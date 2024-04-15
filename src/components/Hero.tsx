import React, { ReactNode } from "react";
import { Box, Grid, GridProps, useTheme } from "@mui/material";
import { getDefaultPaddingX } from "../utils.ts";
import onboardingImg1 from "../assets/images/gallery-onboarding-img-1.png";
import onboardingImg2 from "../assets/images/gallery-onboarding-img-2.png";

export interface HeroProps {
  children?: ReactNode | ReactNode[];
  sx?: GridProps["sx"];
  imgOffset?: GridProps["pt"];
  variant?: "standard" | "contrast";
}

const Hero: React.FC<HeroProps> = ({ children, sx, imgOffset = { xs: 6, md: 0 }, variant = "standard" }) => {
  const theme = useTheme();

  const px = getDefaultPaddingX();
  const maxWidth = theme.breakpoints.values["xl"];

  const boxSx = variant === "contrast" ? {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  } : {};

  return (<Box
    sx={{
      pt: { xs: 12, md: 16, lg: 18 },
      overflow: "hidden",
      ...boxSx
    }}>
    <Grid sx={{ px: px, maxWidth: maxWidth, mx: "auto" }} container>
      <Grid item xs={12} sm={10} md={8} lg={8} sx={{ pb: { xs: 3, sm: 6, lg: 12 }, ...sx }}>
        {children}
      </Grid>
      <Grid item xs={12} sm={2} md={4} lg={4} sx={{ pl: { xs: 0, sm: 1, md: 5, lg: 2 }, pt: imgOffset }}>
        <Box sx={{ position: "relative", minHeight: { xs: "640px", sm: "600px", md: "680px" } }}>
          <img style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            width: "232px",
            boxShadow: "0px 4px 64px 0px rgba(1, 15, 34, 0.15)",
            borderRadius: "24px"
          }} src={onboardingImg1} />
          <img style={{
            position: "absolute",
            transform: "translate(168px, 104px)",
            width: "232px",
            boxShadow: "0px 4px 64px 0px rgba(1, 15, 34, 0.15)",
            borderRadius: "24px"
          }}
               src={onboardingImg2} />
        </Box>
      </Grid>
    </Grid>
  </Box>);
};

export default Hero;
