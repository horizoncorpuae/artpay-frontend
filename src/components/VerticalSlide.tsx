import React from "react";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Cta } from "../types/ui.ts";

export interface VerticalSlideProps {
  title: string;
  imgSrc: string;
  text: string;
  cta?: Cta;
}

const VerticalSlide: React.FC<VerticalSlideProps> = ({ title, text, imgSrc, cta }) => {
  const theme = useTheme();


  const belowSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));

  const isMobile = isSm || belowSm;

  let textWidth = "240px";
  let slideHeight = "800px";
  if (belowSm) {
    textWidth = "100%";
    slideHeight = "auto";
  } else if (isSm) {
    textWidth = "100%";
    slideHeight = "500px";
  } else if (isMd) {
    slideHeight = "500px";
    textWidth = "320px";
  } else if (isLg) {
    slideHeight = "720px";
  }

  // , maxWidth: "620px"
  return (<Grid sx={{ height: isMobile ? undefined : "100%", background: "#E5E7E9" }} container>
    <Grid xs={12} md={6} lg={7} sx={{ background: isMobile ? "none" : theme.palette.primary.main }} item>
      <img style={{ width: "100%", maxHeight: slideHeight, objectFit: "cover" }} src={imgSrc} />
    </Grid>
    <Grid display="flex" alignItems={isMd ? "flex-end" : "center"} px={6} pb={6} pt={{ xs: 3, md: 0 }} item>
      <Box sx={{ maxWidth: textWidth }}>
        <Typography variant="h1">{title}</Typography>
        {cta && <Button href={cta.link} sx={{ my: 3 }} variant="contained">{cta.text}</Button>}
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Grid>
  </Grid>);
};

export default VerticalSlide;
