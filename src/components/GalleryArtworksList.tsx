import React, { useState } from "react";
import { ArtworkCardProps } from "./ArtworkCard.tsx";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import ArtworksList from "./ArtworksList.tsx";
import ArtworksGrid from "./ArtworksGrid.tsx";

export interface GalleryArtworksListProps {
  artworks?: ArtworkCardProps[];
}

const GalleryArtworksList: React.FC<GalleryArtworksListProps> = ({ artworks = [] }) => {
  const navigate = useNavigate();
  const handleSelectArtwork = (index: number) => {
    const selectedArtwork = artworks[index];
    navigate(`/artwork/${selectedArtwork.id}`);
  };

  return (
    <Grid container>
      <Grid xs={12} py={6} sx={{ maxWidth: "100%", overflow: "auto" }} item>
        <ArtworksGrid title="Le nostre opere" items={artworks} onSelect={handleSelectArtwork} cardSize="large" />
      </Grid>
    </Grid>
  );
};

export default GalleryArtworksList;
