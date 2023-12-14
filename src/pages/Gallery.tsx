import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout.tsx";
import { Box, Button, Chip, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import TabPanel from "../components/TabPanel.tsx";
import GalleryInfo, { GalleryInfoProps } from "../components/GalleryInfo.tsx";
import GalleryContacts, { GalleryContactsProps } from "../components/GalleryContacts.tsx";
import { useData } from "../hoc/DataProvider.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { ArtworkCardProps } from "../components/ArtworkCard.tsx";
import { artistsToGalleryItems, artworksToGalleryItems } from "../utils.ts";
import GalleryArtworksList from "../components/GalleryArtworksList.tsx";
import GalleryArtistsList from "../components/GalleryArtistsList.tsx";
import { ArtistCardProps } from "../components/ArtistCard.tsx";

export interface GalleryProps {
  selectedTab?: number;
}

interface GalleryContent {
  coverImage: string;
  title: string;
  logoImage: string;
  subtitle: string;
  description: string;
  categories: string[];
}
const subPageSlugs = ["about", "tutte-le-opere", "tutti-gli-artisti", "contacts"];

const galleryInfoExample: GalleryInfoProps = {
  title:
    "Siamo entusiasti di darvi il benvenuto nella nostra galleria d'arte, un luogo dove la creatività prende vita e l'arte diventa un'esperienza coinvolgente.",
  textContent: [
    "La nostra galleria è più di un semplice spazio espositivo; è un rifugio per gli amanti dell'arte, un luogo dove artisti e appassionati si incontrano per celebrare l'arte in tutte le sue forme. Siamo dedicati alla promozione di artisti emergenti e affermati, offrendo una piattaforma per esporre le loro opere più significative.",
    "La nostra missione è quella di condividere l'arte con il mondo, ispirando, educando e coinvolgendo il pubblico. Crediamo che l'arte abbia il potere di trasformare, di aprire nuove prospettive e di collegare le persone attraverso la bellezza e la creatività.",
    "Nella nostra galleria troverete una vasta collezione di opere d'arte uniche, dalla pittura alla scultura, dalla fotografia all'arte digitale. Ogni opera ha una storia da raccontare, un messaggio da trasmettere e un'emozione da condividere.",
  ],
  imageUrl: "/gallery-info-image.png",
};
const Gallery: React.FC<GalleryProps> = ({ selectedTab = 0 }) => {
  const [isReady, setIsReady] = useState(false);
  const [selectedTabPanel, setSelectedTabPanel] = useState(selectedTab);
  const [galleryContent, setGalleryContent] = useState<GalleryContent>();
  const [galleryArtworks, setGalleryArtworks] = useState<ArtworkCardProps[]>();
  const [galleryContacts, setGalleryContacts] = useState<GalleryContactsProps>();
  const [galleryArtists, setGalleryArtists] = useState<ArtistCardProps[]>();

  const [galleryInfo, setGalleryInfo] = useState<GalleryInfoProps>();

  const data = useData();
  const urlParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!urlParams.slug) {
      navigate("/");
      return;
    }
    data
      .getGalleryBySlug(urlParams.slug)
      .then(async (gallery) => {
        //const description = gallery.shop.description.split("\n")[0];
        setGalleryContent({
          title: gallery.display_name,
          subtitle: `${gallery.address?.city}`,
          logoImage: gallery.shop?.image,
          coverImage: gallery.shop?.banner,
          categories: [],
          description: gallery.message_to_buyers,
        });
        const galleryAddress = [gallery.address.address_1, gallery.address.address_2].join(" ");
        setGalleryContacts({
          address: galleryAddress,
          country: gallery.address.country,
          city: gallery.address.city,
          postcode: gallery.address.postcode,
          email: gallery.email,
          phoneNumbers: [gallery.address.phone],
          website: gallery.shop.url,
        });
        const artworks = await data.listArtworksForGallery(gallery.id.toString());
        setGalleryArtworks(artworksToGalleryItems(artworks, "large"));
        const artists = await data.listArtistsForGallery(gallery.id.toString());
        setGalleryArtists(artistsToGalleryItems(artists));
        setGalleryInfo({ ...galleryInfoExample });
      })
      .finally(() => {
        setIsReady(true);
      });
    //data.getGallery()
    // TODO: loadData
  }, [data, navigate, urlParams.id]);

  /*const galleryContacts: GalleryContactsProps = {
    address: "via della Rocca 39/A 10100, Torino",
    email: "info@galleria.it",
    phoneNumbers: ["+39 011 11 22 333", "+39 393 11 22 333"],
    website: "galleria.it",
  };*/

  return (
    <DefaultLayout pageLoading={!isReady || !galleryContent}>
      <Grid sx={{ p: 0, maxWidth: "1440px" }} container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            maxHeight: { xs: "315px", sm: "660px", md: "100%" },
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}>
          <img src={galleryContent?.coverImage} style={{ width: "100%" }} />
          <Box
            position="absolute"
            sx={{
              height: "100px",
              width: "100px",
              bottom: "48px",
              left: "48px",
              display: { xs: "none", sm: "block" },
            }}>
            <img className="borderRadius" src={galleryContent?.logoImage} style={{ width: "100%" }} />
          </Box>
        </Grid>
        <Grid item xs={12} p={3} pt={12} md display="flex" justifyContent="center" flexDirection="column">
          <Typography sx={{ typography: { sm: "h1", xs: "h3" }, pr: { xs: 0, md: 5 } }}>
            {galleryContent?.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
            {galleryContent?.subtitle}
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2, maxWidth: { md: "560px" } }}>
            {galleryContent?.description}
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 3, sm: 0 }}
            mt={{ xs: 3, md: 7 }}
            sx={{ maxWidth: { md: "560px" } }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between">
            <Box display="flex" gap={{ xs: 1, md: 2 }}>
              {(galleryContent?.categories || []).map((category, index) => (
                <Chip key={index} label={category} color="secondary" size="small" />
              ))}
            </Box>
            <Button variant="outlined" endIcon={<Add />}>
              Follow
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box mt={12}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "secondary",
            mx: { xs: 0, sm: 3, md: 6 },
          }}>
          <Tabs
            value={selectedTabPanel}
            onChange={(_, newValue) => {
              window.history.replaceState(null, "", `/gallerie/${urlParams.slug}/${subPageSlugs[newValue]}`);
              setSelectedTabPanel(newValue);
            }}
            color="secondary"
            centered>
            <Tab label="Informazioni galleria" />
            <Tab label="Opere d'arte" />
            <Tab label="Artisti" />
            <Tab label="Contatti" />
          </Tabs>
        </Box>
        <TabPanel value={selectedTabPanel} index={0}>
          {galleryInfo && <GalleryInfo {...galleryInfo} />}
        </TabPanel>
        <TabPanel value={selectedTabPanel} index={1}>
          <GalleryArtworksList artworks={galleryArtworks} />
        </TabPanel>
        <TabPanel value={selectedTabPanel} index={2}>
          <GalleryArtistsList artists={galleryArtists || []} />
        </TabPanel>
        <TabPanel value={selectedTabPanel} index={3}>
          <GalleryContacts {...galleryContacts} />
        </TabPanel>
      </Box>
    </DefaultLayout>
  );
};
export default Gallery;
