import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useData } from "../hoc/DataProvider.tsx";
import NewsletterBig from "../components/NewsletterBig.tsx";
import ArtworksList from "../components/ArtworksList.tsx";
import { artistsToGalleryItems, artworksToGalleryItems, getDefaultPaddingX } from "../utils.ts";
import { ArtworkCardProps } from "../components/ArtworkCard.tsx";
import { ArtistCardProps } from "../components/ArtistCard.tsx";
import ArtistsList from "../components/ArtistsList.tsx";
import { useNavigate } from "react-router-dom";
import { useSnackbars } from "../hoc/SnackbarProvider.tsx";
import HeroHome from "../components/HeroHome.tsx";
import InfoCard from "../components/InfoCard.tsx";
import imgRocket from "../assets/images/rocket.svg";
import OnboardingCards from "../components/OnboardingCards.tsx";

export interface HomeProps {
}

const Home: React.FC<HomeProps> = ({}) => {
  const data = useData();
  const navigate = useNavigate();
  const snackbar = useSnackbars();
  const theme = useTheme();

  const [featuredArtworks, setFeaturedArtworks] = useState<ArtworkCardProps[]>();
  const [featuredArtists, setFeaturedArtists] = useState<ArtistCardProps[]>();
  // const [homeContent, setHomeContent] = useState<HomeContent>();
  const [isReady, setIsReady] = useState(false);

  const handleSelectArtwork = (item?: ArtworkCardProps) => {
    if (item) {
      navigate(`/opere/${item.slug}`);
    }
  };

  useEffect(() => {
    Promise.all([
      // data.getHomeContent().then((resp) => setHomeContent(resp)),
      data.listFeaturedArtworks().then((resp) => setFeaturedArtworks(artworksToGalleryItems(resp))),
      data.listFeaturedArtists().then((resp) => setFeaturedArtists(artistsToGalleryItems(resp)))
    ])
      .then(() => {
        setIsReady(true);
      })
      .catch(async (err) => {
        await snackbar.error(err, { autoHideDuration: 60000 });
      });
    /*if (auth.isAuthenticated) {
      data
        .listGalleries()
        .then((resp) => setGalleries(resp))
        .catch((err) => {
          console.log("Error", err);
        })
        .finally(() => setIsReady(true));
    } else {
      setIsReady(true);
      auth.login();
    }*/
    // auth, auth.isAuthenticated,
  }, [data, snackbar]);

  const px = getDefaultPaddingX();

  return (
    <DefaultLayout pageLoading={!isReady} topBar={<HeroHome />} maxWidth="xl">

      <Box sx={{ px: px, my: { xs: 6, md: 12 }, maxWidth: theme.breakpoints.values["xl"], ml: "auto", mr: "auto" }}>
        <Typography variant="display3" sx={{ maxWidth: "718px" }}>
          Value proposition lorem ipsum dolor sit amet
        </Typography>
      </Box>
      <Box
        sx={{
          px: px,
          maxWidth: theme.breakpoints.values["xl"], ml: "auto", mr: "auto",
          gridTemplateColumns: { xs: undefined, sm: "1fr 1fr 1fr" },
          display: { xs: "flex", sm: "grid" },
          flexDirection: { xs: "column", sm: undefined },
          gap: 3
        }}>
        <Box>
          <InfoCard
            title="Tre Principi"
            subtitle="Ad acquisto avvenuto, l’opera è tua e avrai massima libertà di personalizzare le modalità di consegna, confrontandoti direttamente col personale della galleria d’arte responsabile della vendita."
            imgSrc={imgRocket}
          />
        </Box>
        <Box>
          <InfoCard
            title="Richiedi il finanziamento"
            subtitle="Normalmente viene erogato in poche ore*."
            imgSrc={imgRocket}
          />
        </Box>
        <Box>
          <InfoCard
            title="Compra l’opera d’arte"
            subtitle="Completato l'iter di richiesta e ricevuto il finanziamento, l'acquirente può procedere all'acquisto dell'opera dal sito Artpay"
            imgSrc={imgRocket}
          />
        </Box>
      </Box>
      <OnboardingCards />
      <Grid sx={{ px: px, ml: "auto", mr: "auto" }} maxWidth="xl" container>
        <Grid mt={4} xs={12} item>
          <NewsletterBig title="Iscriviti alla nostra newsletter" />
        </Grid>
      </Grid>
      <Grid sx={{ px: px, my: 12, ml: "auto", mr: "auto" }} maxWidth="xl" container>
        <ArtistsList disablePadding size="medium" items={featuredArtists || []} title="Artisti in evidenza" />
      </Grid>
      <Grid sx={{ px: px, my: 12, justifyContent: "center", ml: "auto", mr: "auto" }} maxWidth="xl" container>
        {featuredArtworks && (
          <ArtworksList
            disablePadding
            items={featuredArtworks || []}
            onSelect={(i) => handleSelectArtwork(featuredArtworks[i])}
            title="Opere in evidenza"
            showEmpty
          />
        )}
      </Grid>
      {/*      <Grid spacing={4} sx={{ mt: 4 }} justifyContent="center" container>
        {homeContent?.promoItems.map((promoItem, i) => <PromoItem key={`promo-${i}`} {...promoItem} />)}
      </Grid>*/}


    </DefaultLayout>
  );
};

export default Home;
