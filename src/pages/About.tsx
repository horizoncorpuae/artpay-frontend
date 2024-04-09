import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout.tsx";
import HeroAbout, { HeroAboutProps } from "../components/HeroAbout.tsx";
import { Box, Grid, GridProps, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useData } from "../hoc/DataProvider.tsx";
import { useSnackbars } from "../hoc/SnackbarProvider.tsx";
import imgLogo from "../assets/images/logo.svg";
import imgAboutCover from "../assets/images/hero-about-cover.webp";
import { getDefaultPaddingX } from "../utils.ts";
import PromoCard from "../components/PromoCard.tsx";
import OnboardingCards from "../components/OnboardingCards.tsx";
import NewsletterBig from "../components/NewsletterBig.tsx";
import ContactForm from "../components/ContactForm.tsx";

export interface AboutProps {
}

const heroContent: HeroAboutProps = {
  mainTitle: "Con Artpay l’arte è per tutti",
  description:
    "Artpay è un servizio digitale che consente alle gallerie d’arte di vendere online le proprie opere in modo facile e veloce, permettendo agli appassionati d’arte l’acquisto diretto o finanziato tramite i servizi di istituti bancari convenzionati.",
  buttonText: "Entra nel mondo di artpay",
  imageSrc: imgAboutCover
};


const About: React.FC<AboutProps> = ({}) => {
  const theme = useTheme();
  const data = useData();
  const snackbar = useSnackbars();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [ready, setReady] = useState(false);
  // const [featuredArtworks, setFeaturedArtworks] = useState<ArtworkCardProps[]>();

  useEffect(() => {
    setReady(true);

  }, [data, snackbar]);

  const imgWidth = isMobile ? "100%" : `calc(100% - ${theme.spacing(6)})`;

  const px = getDefaultPaddingX();

  const centeredGridSx: GridProps["sx"] = {
    marginLeft: "auto",
    marginRight: "auto",
    px: px,
    py: { xs: 6, md: 12 },
    position: "relative"
    //flexDirection: isMobile ? "column-reverse" : undefined,
  };

  return (
    <DefaultLayout pb={3} pageLoading={!ready} topBar={<HeroAbout {...heroContent} />} maxWidth="xl">


      <Grid sx={{ ...centeredGridSx, flexDirection: isMobile ? "column" : undefined }} container>
        <Grid xs={12} sm={4} lg={5} sx={{ pb: { xs: 3, sm: 0 }, height: "auto" }} item>
          <img
            style={{ width: imgWidth, maxWidth: "300px", minHeight: isMobile ? "70px" : undefined }}
            src={imgLogo}
          />
        </Grid>
        <Grid xs={12} sm={8} lg={7} item>
          <Typography variant="h2">
            La nostra missione è rendere l'arte accessibile a tutti, trasformando radicalmente il modo in cui le opere
            d'arte vengono scoperte, acquisite e apprezzate. Con Artpay, vogliamo connettere gallerie di fama mondiale,
            artisti emergenti e collezionisti ed appassionati, creando un ecosistema innovativo che celebra la diversità
            e l'unicità dell'arte contemporanea. Siamo impegnati a fornire un'esperienza senza pari, dove la tecnologia
            incontra la creatività per ispirare e contribuire a trasformare il mercato dell'arte.
          </Typography>
          <Typography sx={{ mt: 6 }} variant="h4">
            Con il nostro approccio innovativo che offre anche sistemi di pagamento rateale integrati nella piattaforma,
            vogliamo abbattere le barriere finanziarie e consentire a chiunque, sia che desideri godersi un'opera per il
            puro piacere estetico che per investimento, di poter realizzare i propri sogni senza compromessi.
          </Typography>
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="column" gap={3} sx={{ px: px }}>
        <PromoCard border title="Per le gallerie">
          <Typography variant="body1">
            Attraverso Artpay possono estendere la propria presenza commerciale online, offrendo le proprie opere d’arte
            a un pubblico di potenziali appassionati e collezionisti d’arte su una piattaforma che favorisce la vendita
            diretta e finanziata delle singole opere con processi di approvazione veloci e garantiti e pagamenti
            immediati per i venditori. L’incontro tra offerta e domanda d’arte online non è mai stato così facile e
            veloce.
          </Typography>
        </PromoCard>
        <PromoCard border title="Per gli appassionati">
          <Typography variant="body1">
            E i collezionisti d’arte, che su Artpay possono trovare in vendita una selezione curata di opere certificate
            provenienti da gallerie selezionate e acquistarle con facilità e con l’agilità degli strumenti finanziari,
            come prestiti rateali ad approvazione rapida, offerti dagli istituti bancari partner.
          </Typography>
        </PromoCard>
      </Box>
      <OnboardingCards sx={{ my: 8 }} />
      <Box sx={{ px: px }}>
        <NewsletterBig />
      </Box>
      <Box px={px} my={12}>
        <Typography variant="h2">Vuoi entrare in contatto con Artpay e il suo team? </Typography>
        <Typography sx={{ mt: 2, maxWidth: "400px" }} variant="subtitle1">
          Compila il form, lasciando i tuoi contatti e indicando il tema per cui vuoi
          parlarci, sarà nostra cura risponderti entro il più breve tempo possibile.
        </Typography>
        <Box sx={{ maxWidth: "506px", mt: 8 }}>
          <ContactForm />
        </Box>
      </Box>

    </DefaultLayout>
  );
};

export default About;
