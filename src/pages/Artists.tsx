import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import VerticalSlider from "../components/VerticalSlider.tsx";
import { useData } from "../hoc/DataProvider.tsx";
import { artistsToGalleryItems } from "../utils.ts";
import { ArtistCardProps } from "../components/ArtistCard.tsx";
import { Box } from "@mui/material";
import ArtistsGrid from "../components/ArtistsGrid.tsx";
import { VerticalSlideProps } from "../components/VerticalSlide.tsx";
import sanitizeHtml from "sanitize-html";

export interface ArtistsProps {

}

const Artists: React.FC<ArtistsProps> = ({}) => {
  const [isReady, setIsReady] = useState(false);
  const [featuredArtists, setFeaturedArtists] = useState<ArtistCardProps[]>();
  const [artistSlides, setArtistSlides] = useState<VerticalSlideProps[]>();

  const data = useData();

  useEffect(() => {
    data.listFeaturedArtists().then(resp => {
      const artistCards = artistsToGalleryItems(resp);
      setFeaturedArtists(artistCards);
      setIsReady(true);
      setArtistSlides(artistCards.filter((_, i) => i < 2).map(artistCard => {
        return {
          cta: {
            link: `/artisti/${artistCard.slug}`,
            text: "Scopri l'artista"
          },
          imgSrc: artistCard.imgUrl || "",
          text: sanitizeHtml(artistCard.description || "", { allowedTags: [] }) || "",
          title: artistCard.title || ""
        };
      }));
    });

  }, []);

  return (
    <DefaultLayout pageLoading={!isReady}
                   topBar={<VerticalSlider slides={artistSlides} sx={{ pt: { xs: 10, sm: 0 } }} />}>

      <Box sx={{ px: { xs: 0, md: 6 }, my: { xs: 6, md: 12 } }}>
        <ArtistsGrid items={featuredArtists || []} title="Tutti gli artisti" />
      </Box>
    </DefaultLayout>);
};

export default Artists;
