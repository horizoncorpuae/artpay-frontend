import React from "react";
import DefaultLayout from "../components/DefaultLayout.tsx";
import { Box, Button, Grid, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import PromoCard from "../components/PromoCard.tsx";
// import reservationBackground from "../assets/images/reservation-box-background.png";
import onboardingBackground from "../assets/images/background-onboarding.svg";

import onboardingImg1 from "../assets/images/gallery-onboarding-img-1.png";
import onboardingImg2 from "../assets/images/gallery-onboarding-img-2.png";
import { getDefaultPaddingX } from "../utils.ts";

export interface GalleryOnboardingProps {
}

const GalleryOnboarding: React.FC<GalleryOnboardingProps> = ({}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const px = getDefaultPaddingX();

  return (
    <DefaultLayout sx={{ overflowX: "hidden" }}>
      <Grid sx={{ mt: 18, px: px }} container>
        <Grid item xs={12} md={8} lg={7}>
          <Typography variant="body1" color="primary" sx={{ textTransform: "uppercase" }}>
            Artpay per gallerie
          </Typography>
          <Typography variant="display1" color="primary" sx={{ mt: 1 }}>
            Hai una galleria d’arte? Scopri come potenziare le sue vendite con Artpay!
          </Typography>
          <Typography variant="body1" sx={{ mt: 6 }}>
            Artpay nasce per supportare e far crescere la tua galleria. Con Artpay la tua galleria acquisisce un nuovo
            pubblico qualificato di appassionati e collezionisti d’arte, potrai allargare la base dei potenziali clienti
            grazie ai prodotti finanziari offerti direttamente online per rendere l’arte accessibile a tutti tramite
            prestiti rateali da parte di istituti bancari partner. Artpay è utile anche alle vendite direttamente in
            galleria. Ti basta esporre il logo/marker/qr-code (presto in dotazione) per le opera in vendita e i tuoi
            clienti potranno accedere al suo acquisto diretto online e ai servizi finanziari rateali, a loro dedicati.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>Entra a fare parte di Artpay in 3 soli semplici
            passaggi.</Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={5} sx={{ pl: { xs: 0, sm: 8 }, pt: 9, minHeight: "760px" }}>
          <Box sx={{ position: "relative" }}>
            <img style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }} src={onboardingImg1} />
            <img style={{ position: "absolute", top: "104px", left: "168px" }} src={onboardingImg2} />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ py: 12, background: `url(${onboardingBackground})`, px: px }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <PromoCard
            border
            title={
              <>
                Iscriviti
                <br />
                ad artpay
              </>
            }>
            <Typography variant="body1">
              Dopo un colloquio conoscitivo online e la firma del contratto, avrai un’area riservata in cui gestire la
              presenza online della tua galleria, la vendita delle opere e tutte le operazioni accessorie. Sarà attivata
              entro 2 giorni dall’iscrizione. Il processo di iscrizione è veloce e facile. Per qualsiasi necessità, il
              nostro team dedicato sarà pronto a supportarti in qualsiasi momento.
            </Typography>
            <Button variant="contained" href="#form" sx={{ mt: 3 }}>
              Inizia ora
            </Button>
          </PromoCard>
          <PromoCard
            title={
              <>
                Metti online
                <br />le tue opere
              </>
            }>
            <Typography variant="body1">
              Una volta creata l’area riservata, potrai registrare la tua galleria e inserire le opere d’arte che vuoi
              vendere, attraverso il nostro sistema facile e veloce, che ti consentirà di caricare informazioni testuali
              e immagini per ciascuna, specificando se rendere pubblici o meno prezzi e informazioni.
            </Typography>
          </PromoCard>
          <PromoCard
            title={
              <>
                Inizia a<br />
                vendere
              </>
            }>
            <Typography variant="body1">
              La tua presenza online su Artpay è pronta! Ora puoi vendere le tue opere online o nella tua galleria in
              modo semplice e sicuro, attraverso la nostra piattaforma. I tuoi clienti potranno acquistare direttamente
              le opere o accedere ai prodotti finanziari rateali a loro dedicati, offerti direttamente dai nostri
              partner bancari, con approvazione entro 2-24 ore.
            </Typography>
          </PromoCard>
          <PromoCard title="Ancora dubbi?" variant="contrast">
            <Typography color="white" sx={{ mb: 2 }} variant="body1">
              Consulta le nostre <Link color="inherit" href="/faq">FAQ</Link> e, se non trovi risposta ai tuoi quesiti,
              scrivici
            </Typography>
            <Button
              variant="outlined"
              color="contrast"
              href="mailto:hello@artpay.art"
              fullWidth={isMobile}
              sx={{ mt: { xs: 3, md: 0 } }}>
              Scrivi a hello@artpay.art
            </Button>
          </PromoCard>
        </Box>
      </Box>
      <Grid sx={{ py: 12, px: px }} id="form" container>
        <Grid item xs={12} md={6} sx={{ mb: { xs: 3, sm: 0 } }} display="flex" alignItems="center">
          <Box sx={{ maxWidth: "400px" }} display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="display3">Entra a far parte di artpay</Typography>
            <Typography sx={{ my: 6 }} variant="body1">
              Compila il form e raccontaci il tuo business
            </Typography>
            <Button sx={{ mb: 2 }} href="mailto:hello@artpay.art" variant="contained">
              Scrivi a hello@artpay.art
            </Button>
            <Link color="primary" href="/faq">
              Consulta le FAQ
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <iframe
            data-cmp-ab="2"
            src="https://form.typeform.com/to/aDnsAoId?typeform-embed-id=8112263680325873&amp;typeform-embed=embed-widget&amp;typeform-source=gallerie.artpay.art&amp;typeform-medium=snippet&amp;typeform-medium-version=next&amp;embed-opacity=100&amp;typeform-embed-handles-redirect=1"
            data-testid="iframe"
            style={{ border: "0px", transform: "translateZ(0px)", width: "100%", height: isMobile ? "400px" : "612px" }}
            allow="microphone; camera"
            title="My branded typeform"
            data-cmp-info="8"></iframe>
          {/*          <Button variant="outlined" sx={{ mt: 3 }} fullWidth>
            oppure prenota una chiamata subito
          </Button>*/}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default GalleryOnboarding;
