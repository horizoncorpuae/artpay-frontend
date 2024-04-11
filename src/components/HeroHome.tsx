import React from "react";
import { getDefaultPaddingX } from "../utils.ts";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import onboardingImg1 from "../assets/images/gallery-onboarding-img-1.png";
import onboardingImg2 from "../assets/images/gallery-onboarding-img-2.png";
import { useNavigate } from "react-router-dom";

export interface HeroHomeProps {

}

const HeroHome: React.FC<HeroHomeProps> = ({}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const px = getDefaultPaddingX();
  const maxWidth = theme.breakpoints.values["xl"];

  return (<Box
    sx={{
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      pt: { xs: 12, md: 16, lg: 18 },
      overflow: "hidden"
    }}>
    <Grid sx={{ px: px, maxWidth: maxWidth, mx: "auto" }} container>
      <Grid item xs={12} sm={9} md={8} lg={7} sx={{ pt: { xs: 0, md: 3, lg: 6 }, pb: 3 }}>
        <Typography variant="display1" color="inherit" sx={{ mt: 1 }}>
          La piattaforma n.1 in Italia per promuovere e acquistare opere d’arte selezionate e garantite dai migliori
          galleristi italiani.
        </Typography>
        <Typography variant="subtitle1" sx={{ my: 6, maxWidth: "400px" }}>
          Artpay è un servizio digitale che facilita l’acquisto delle migliori opere d’arte attraverso una piattaforma
          digitale innovativa che offre soluzioni di acquisto rateali e personalizzabili.
        </Typography>
        <Button variant="contained" color="contrast" onClick={() => navigate("/chi-siamo")}>Scopri di più</Button>
      </Grid>
      <Grid item xs={12} sm={3} md={4} lg={5} sx={{ pl: { xs: 0, sm: 5, lg: 8 }, pt: { xs: 6, md: 0 } }}>
        <Box sx={{ position: "relative", minHeight: { xs: "640px", sm: "600px", md: "680px" } }}>
          <img style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }} src={onboardingImg1} />
          <img style={{ position: "absolute", transform: "translate(168px, 104px)" }} src={onboardingImg2} />
        </Box>
      </Grid>
    </Grid>
  </Box>);
};

export default HeroHome;
