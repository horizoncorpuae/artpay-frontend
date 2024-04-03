import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout.tsx";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import PromoCard from "../components/PromoCard.tsx";
// import reservationBackground from "../assets/images/reservation-box-background.png";
import onboardingBackground from "../assets/images/background-onboarding.svg";

import onboardingImg1 from "../assets/images/gallery-onboarding-img-1.png";
import onboardingImg2 from "../assets/images/gallery-onboarding-img-2.png";
import PromoCardSmall from "../components/PromoCardSmall.tsx";

import prenotaOpera from "../assets/images/prenota_opera.svg";
import richiediPrestito from "../assets/images/richiedi_prestito.svg";
import completaAcquisto from "../assets/images/completa_acquisto.svg";
import ArtistsList from "../components/ArtistsList.tsx";
import LoanCard from "../components/LoanCard.tsx";
import { ArtistCardProps } from "../components/ArtistCard.tsx";
import { artistsToGalleryItems } from "../utils.ts";
import { useData } from "../hoc/DataProvider.tsx";
import { useAuth } from "../hoc/AuthProvider.tsx";

export interface CustomerOnboardingProps {
}

const CustomerOnboarding: React.FC<CustomerOnboardingProps> = ({}) => {
  const data = useData();
  const auth = useAuth();

  const theme = useTheme();

  const [featuredArtists, setFeaturedArtists] = useState<ArtistCardProps[]>();

  const handleRegistration = () => {
    auth.login(false);
  };

  useEffect(() => {
    data.listFeaturedArtists().then((resp) => setFeaturedArtists(artistsToGalleryItems(resp)));
  }, []);

  const px = { xs: 4, sm: 4, md: 10, lg: 12 };

  return (
    <DefaultLayout sx={{ overflowX: "hidden" }}>
      <Grid sx={{ mt: 18, px: px }} container>
        <Grid item xs={12} md={8} lg={7}>
          <Typography variant="body1" color="primary" sx={{ textTransform: "uppercase" }}>
            Artpay per collezionisti
          </Typography>
          <Typography variant="display1" color="primary" sx={{ mt: 1 }}>
            Artpay per collezionisti Lorem ipsum dolor sit amet, conetur adipiscing elit, sed do eiusmod.
          </Typography>
          <Typography variant="body1" sx={{ mt: 6, maxWidth: "400px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Typography>
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
                Navigazione e<br />
                blocco dellʼopera
              </>
            }>
            <Typography variant="body1">
              Lʼutente dopo essersi iscritto ad artpay esplora le tipologie di artwork a sua disposizione potendo
              approfondire informazioni su artisti e gallerie. <br />
              Una volta dimostrato il proprio interesse per unʼopera la blocca attraverso una % trattenuta sulla propria
              carta di credito a garanzia dellʼacquisto
            </Typography>
          </PromoCard>
          <PromoCard
            title={
              <>
                Avvio procedura <br />
                di pagamento
              </>
            }>
            <Typography variant="body1">
              Lʼutente può comprare immediatamente tramite carta di credito, oppure ha 24ore per procedere allʼacquisto
              del bene bloccato scegliendo tra diverse tipologie di pagamento:
            </Typography>
            <ul>
              <li>bonifico bancario</li>
              <li>buy now pay later</li>
              <li>rateale</li>
            </ul>
            <Typography variant="body1">
              In caso di mancato avvio della procedura, lʼopera tornerà disponibile allʼinterno della piattaforma.
            </Typography>
          </PromoCard>
          <PromoCard
            title={
              <>
                Percorso di <br />
                acquisto
              </>
            }>
            <Typography variant="body1">
              Scegliendo lʼacquisto rateale (focus di artpay), lʼutente potrà usufruire del tool interno alla
              piattaforma per selezionare la proposta di finanziamento di maggior interesse tra quelle messe a
              disposizione. <br />
              In questo processo la galleria tiene traccia dello stato delle operazioni: dalla scelta dellʼopera
              allʼacquisto finale.
            </Typography>
          </PromoCard>
          <PromoCard
            title={
              <>
                Come funziona <br />
                il pagamento rateale
              </>
            }>
            <Typography variant="body1">
              Una volta selezionato lʼistituto finanziario con il quale avviare la procedura rateale di pagamento, il
              visitatore potrà procedere autonomamente con la richiesta di finanziamento.
              Al termine della valutazione da parte dellʼistituto finanziario, se ottenuta la liquidità, sarà possibile
              saldare lʼintero importo dellʼopera alla galleria entro circa 7 giorni dallʼapprovazione del credito
              ottenuto.
            </Typography>
          </PromoCard>
          <PromoCard
            title={
              <>
                Consegna <br />
                dellʼopera
              </>
            }>
            <Typography variant="body1">
              Al ricevimento del saldo, lʼopera viene spedita o consegnata al cliente direttamente dalla galleria, resta
              a suo carico spedizione e costi accessori inclusa lʼeventuale assicurazione.
              Lʼutente a questo punto prosegue con il pagamento delle rate secondo il piano concordato. La galleria
              salda ad artpay i compensi da questʼultima.
            </Typography>
          </PromoCard>

          <PromoCard titleVariant="h2" title="Cosa aspetti? Entra subito a far parte di artpay!" variant="contrast">
            <Button variant="outlined" color="contrast" onClick={handleRegistration} sx={{ ml: 3 }}>
              Registrati
            </Button>
          </PromoCard>
        </Box>
      </Box>
      <Grid sx={{ py: 12, px: px }} container>
        <Grid item xs={12} sx={{ mb: { xs: 3, sm: 0 } }}>
          <Typography variant="h2">
            Non vuoi farti sfuggire un’opera? <span style={{ color: theme.palette.primary.main }}>Prenotala!</span>
          </Typography>
          <Typography variant="body1" fontWeight={500} sx={{ maxWidth: "400px", mt: 2 }}>
            Se sei intenzionato ad acquistare un’opera, non devi fare altro che prenotarla e non fartela scappare!
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{ py: 0, px: px }} spacing={3} display="flex" container>
        <Grid xs={12} md={4} px={1} item>
          <PromoCardSmall
            imgSrc={prenotaOpera}
            title={
              <>
                Prenota <br />
                l’opera
              </>
            }
            text="Con una piccola quota bloccata sulla tua carta di credito, proporzionale al prezzo d’acquisto, prenoti l’opera che ti interessa e ti garantisci i diritti esclusivi d’acquisto. Dal momento della prenotazione, l’opera sarà riservata a tuo nome per 7 giorni. In caso di mancato acquisto, la somma sarà sbloccata entro 5 giorni lavorativi. "
          />
        </Grid>
        <Grid xs={12} md={4} px={1} item>
          <PromoCardSmall
            variant="secondary"
            imgSrc={richiediPrestito}
            title={
              <>
                Richiedi <br />
                un prestito
              </>
            }
            link="Scopri i nostri partner"
            linkHref="#partners"
            text="Con artpay puoi finalmente accedere a prestiti personalizzati. Per i tuoi acquisti d'arte scegli la migliore proposta di prestito tra quelle degli istituti bancari nostri partner. Di norma l’approvazione avviene in poche ore. "
          />
        </Grid>
        <Grid xs={12} md={4} px={1} item>
          <PromoCardSmall
            variant="white"
            imgSrc={completaAcquisto}
            title={
              <>
                Completa l’acquisto <br />
                dell’opera
              </>
            }
            text="Ad acquisto avvenuto, l’opera è tua e avrai massima libertà di personalizzare le modalità di consegna, confrontandoti direttamente col personale della galleria d’arte responsabile della vendita."
          />
        </Grid>
      </Grid>
      <div id="partners" style={{ top: "-80px", position: "relative", visibility: "hidden" }} />
      <Box sx={{ px: { ...px, xs: 0 }, mt: 3, mb: 12 }}>
        <LoanCard />
      </Box>
      <Box sx={{ px: px, mb: { xs: 12 } }}>
        <ArtistsList
          items={featuredArtists || []}
          disablePadding
          maxItems={4}
          size="medium"
          title="Artisti in evidenza"
        />
      </Box>
    </DefaultLayout>
  );
};

export default CustomerOnboarding;
