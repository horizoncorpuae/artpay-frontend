import React from "react";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { SocialLinksProps } from "./SocialLinks.tsx";
import Map from "./Map.tsx";

export interface GalleryContactsProps {
  address: string;
  postcode: string;
  city: string;
  country: string;
  email: string;
  phoneNumbers: string[];
  website: string;
  social?: SocialLinksProps;
  sx?: SxProps<Theme>;
}

const GalleryContacts: React.FC<GalleryContactsProps> = ({
                                                           address,
                                                           city,
                                                           postcode,
                                                           country,
                                                           sx = {}
                                                         }) => {
  return (
    <Box sx={{ maxWidth: { xs: undefined, md: "400px" }, width: "100%", ...sx }} display="flex" flexDirection="column"
         alignItems="flex-start"
         justifyContent="flex-start">
      <Box sx={{ width: "100%" }}>
        <Typography sx={{ mt: 0 }} variant="subtitle1">
          {address}
        </Typography>
        <Typography sx={{ mt: 0 }} variant="subtitle1">
          {postcode}, {city} - {country}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", overflow: "hidden" }} mt={2}>
        <Map address={address} />
      </Box>
    </Box>
  );
};

export default GalleryContacts;
