import React from "react";
import { Grid, GridProps, useTheme } from "@mui/material";
import { getDefaultPaddingX } from "../utils.ts";
import OnboardingCard from "./OnboardingCard.tsx";
import { useNavigate } from "react-router-dom";
import bgOnboardingGallery from "../assets/images/bg_onboarding_gallery.png";
import bgOnboardingCustomer from "../assets/images/bg_onboarding_customer.png";

export interface OnboardingCardsProps {
  sx?: GridProps["sx"];
}

const OnboardingCards: React.FC<OnboardingCardsProps> = ({ sx = {} }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const px = getDefaultPaddingX();

  return (
    <Grid sx={{ px: px, my: 9, ml: "auto", mr: "auto", maxWidth: theme.breakpoints.values["xl"], ...sx }} spacing={0}
          container>
      <OnboardingCard title="Sei un gallerista?"
                      subtitle="Entra in Artpay e trasforma la tua galleria in un punto di riferimento globale. Attiva subito la tua iscrizione e accedi a strumenti esclusivi per ampliare la tua presenza sul mercato, raggiungere nuovi clienti e massimizzare i tuoi guadagni. Non perdere tempo, il futuro dell'arte è adesso."
                      ctaText="Scopri di più"
                      sx={{ pr: { xs: 0, md: 1.5 } }}
                      onClick={() => navigate("/artpay-per-gallerie")}
                      background={bgOnboardingGallery} />

      <OnboardingCard title="Sei un collezionista?"
                      subtitle="Esplora il mondo dell'arte come mai prima d'ora con Artpay! Accedi a una selezione esclusiva di opere curate dai principali galleristi italiani. Entra nel cuore dell'arte contemporanea e scopri capolavori unici. La tua collezione artistica inizia qui, con Artpay. Unisciti a noi oggi stesso e scopri un nuovo modo di vivere e comprare l'arte."
                      ctaText="Scopri di più"
                      sx={{ pl: { xs: 0, md: 1.5 }, pt: { xs: 3, md: 0 } }}
                      onClick={() => navigate("/artpay-per-collezionisti")}
                      background={bgOnboardingCustomer} />
    </Grid>);
};

export default OnboardingCards;
