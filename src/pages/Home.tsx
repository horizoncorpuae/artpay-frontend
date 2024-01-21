import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Grid } from "@mui/material";
import { useData } from "../hoc/DataProvider.tsx";
import HeroSlider from "../components/HeroSlider.tsx";
import NewsletterBig from "../components/NewsletterBig.tsx";
import ArtworksList from "../components/ArtworksList.tsx";
import { HomeContent } from "../types/home.ts";
import PromoItem from "../components/PromoItem.tsx";
import { artistsToGalleryItems, artworksToGalleryItems } from "../utils.ts";
import { ArtworkCardProps } from "../components/ArtworkCard.tsx";
import { ArtistCardProps } from "../components/ArtistCard.tsx";
import ArtistsList from "../components/ArtistsList.tsx";

export interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const data = useData();

  const [featuredArtworks, setFeaturedArtworks] = useState<ArtworkCardProps[]>();
  const [featuredArtists, setFeaturedArtists] = useState<ArtistCardProps[]>();
  const [homeContent, setHomeContent] = useState<HomeContent>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Promise.all([
      data.getHomeContent().then((resp) => setHomeContent(resp)),
      data.listFeaturedArtworks().then((resp) => setFeaturedArtworks(artworksToGalleryItems(resp))),
      data.listFeaturedArtists().then((resp) => setFeaturedArtists(artistsToGalleryItems(resp))),
    ]).then(() => {
      setIsReady(true);
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
  }, [data]);

  return (
    <DefaultLayout pageLoading={!isReady} maxWidth={false}>
      <HeroSlider slides={homeContent?.heroSlides} />
      <Grid sx={{ px: 6, mt: 4 }} container>
        <ArtworksList items={featuredArtworks || []} title="Opere in evidenza" showEmpty />
      </Grid>
      <Grid spacing={4} sx={{ mt: 4 }} justifyContent="center" container>
        {homeContent?.promoItems.map((promoItem, i) => <PromoItem key={`promo-${i}`} {...promoItem} />)}
      </Grid>
      <Grid container>
        <Grid mt={4} xs={12} item>
          <NewsletterBig title="Iscriviti alla nostra newsletter" />
        </Grid>
      </Grid>
      <Grid sx={{ px: 6, my: 6 }} container>
        <ArtistsList items={featuredArtists || []} title="Artisti in evidenza" />
      </Grid>
    </DefaultLayout>
  );
};

export default Home;
