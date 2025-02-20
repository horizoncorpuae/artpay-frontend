import React from "react";
import { Artwork } from "../types/artwork.ts";
import { Box, Typography } from "@mui/material";
import DisplayProperty from "./DisplayProperty.tsx";
import { getArtworkDimensions, getPropertyFromMetadata } from "../utils.ts";
import { useData } from "../hoc/DataProvider.tsx";
import { Artist } from "../types/artist.ts";

export interface ArtworkDetailsProps {
  artwork: Artwork;
  artist?: Artist;
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({ artwork, artist }) => {
  const data = useData();
  const artworkDetails = {
    material: data.getCategoryMapValues(artwork, "materiale").join(" "), //getPropertyFromMetadata(artwork.meta_data, "tecnica"),
    measures: getArtworkDimensions(artwork),
    style: data.getCategoryMapValues(artwork, "stile").join(" "),
    artworkClass: data.getCategoryMapValues(artwork, "tipologia").join(" "),
    technique: data.getCategoryMapValues(artwork, "tecnica").join(" "), //getPropertyFromMetadata(artwork.meta_data, "tipologia"),
    conditions: getPropertyFromMetadata(artwork?.meta_data || [], "condizioni")?.value || "-",
    creationYear: getPropertyFromMetadata(artwork?.meta_data || [], "anno_di_produzione")?.value || "-",
    signature: data.getCategoryMapValues(artwork, "firma").join(" "),
    certificate: data.getCategoryMapValues(artwork, "certificato").join(" "),
    frame: data.getCategoryMapValues(artwork, "cornice").join(" "),
    theme: data.getCategoryMapValues(artwork, "tema").join(" "),
    epoch: data.getCategoryMapValues(artwork, "periodo").join(" ")
  };
  return (
    <Box display="flex" flexDirection="column" sx={{ maxWidth: { xs: undefined, md: "612px" } }}>
      <div>
        <Typography fontSize={16} lineHeight={'125%'} fontWeight={500} marginBottom={0.5}>{artwork.name}</Typography>
        <Typography fontSize={16} color="textSecondary">
          {getPropertyFromMetadata(artwork.meta_data, "artist")?.artist_name}, {artist?.acf.birth_nation},{" "}
          {artist?.acf.birth_year}
        </Typography>
        <Typography
          fontWeight={500}
          lineHeight={'20px'}
          color="textSecondary"
          sx={{ my: 3 }}
          dangerouslySetInnerHTML={{ __html: artwork.short_description }}
        />
      </div>
      <Box
        display="flex"
        flexDirection={"column"}
        gap={"16px"}
        sx={{
          width: "100%",
          justifyContent: { xs: "flex-start", sm: "center" },
        }}>
          <DisplayProperty label="Materiale" value={artworkDetails.material} />
          <DisplayProperty label="Tecnica" value={artworkDetails.technique} />
          <DisplayProperty label="Misure" value={artworkDetails.measures} />
          <DisplayProperty label="Tipologia" value={artworkDetails.artworkClass} />
          <DisplayProperty label="Condizioni" value={artworkDetails.conditions} />
          <DisplayProperty label="Firma" value={artworkDetails.signature} />
          <DisplayProperty label="Certificato di autenticità" value={artworkDetails.certificate} />
          <DisplayProperty label="Anno di creazione" value={artworkDetails.creationYear} />
          <DisplayProperty label="Stile" value={artworkDetails.style} />
          <DisplayProperty label="Cornice" value={artworkDetails.frame} />
          <DisplayProperty label="Tema" value={artworkDetails.theme} />
          <DisplayProperty label="Periodo" value={artworkDetails.epoch} />
      </Box>
    </Box>
  );
};

export default ArtworkDetails;
