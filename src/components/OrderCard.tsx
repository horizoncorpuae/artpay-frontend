import React from "react";
import { Box, Typography } from "@mui/material";
import DisplayProperty from "./DisplayProperty.tsx";

export interface OrderCardProps {
  title: string;
  subtitle: string;
  galleryName: string;
  formattePrice: string;
  purchaseDate: string;
  purchaseMode: string;
  imgSrc: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  formattePrice,
  galleryName,
  purchaseDate,
  purchaseMode,
  subtitle,
  title,
  imgSrc,
}) => {
  return (
    <Box
      sx={{ border: `1px solid #D9D9D9`, borderRadius: "5px", p: 3, flex: "200px 0", height: "100%" }}
      gap={3}
      display="flex">
      <Box>
        <img style={{ width: "200px", borderRadius: "5px" }} src={imgSrc} />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography
          variant="h2"
          sx={{
            mb: 1,
            pb: 1,
          }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mb: 1 }} color="textSecondary">
          {subtitle}
        </Typography>
        <DisplayProperty label="Nome galleria" value={galleryName} gap={0} variant="h6" sx={{ mt: 1, mb: 3 }} />
        <Typography variant="h5">{formattePrice}</Typography>
        <DisplayProperty label="Data di acquisto" value={purchaseDate} gap={0} variant="h6" sx={{ mt: 2, mb: 0 }} />
        <DisplayProperty label="Modalità di acquisto" value={purchaseMode} gap={0} variant="h6" sx={{ mt: 3, mb: 2 }} />
      </Box>
    </Box>
  );
};

export default OrderCard;
