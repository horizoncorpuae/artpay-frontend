import React from "react";
import OrderCard from "./OrderCard.tsx";
import { Typography } from "@mui/material";
import DisplayProperty from "./DisplayProperty.tsx";

export interface OrderHistoryCardProps {
  title: string;
  subtitle: string;
  galleryName: string;
  formattePrice: string;
  purchaseDate: string;
  purchaseMode: string;
  imgSrc: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
                                                             formattePrice,
                                                             galleryName,
                                                             purchaseDate,
                                                             purchaseMode,
                                                             subtitle,
                                                             title,
                                                             imgSrc
                                                           }) => {
  return (
    <OrderCard imgSrc={imgSrc}>
      <Typography
        variant="h4"
        sx={{
          mb: 0,
          pb: 0
        }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }} color="textSecondary">
        {subtitle}
      </Typography>
      <Typography sx={{ my: 1 }} variant="subtitle1">{formattePrice}</Typography>
      <DisplayProperty label="Nome galleria" value={galleryName} gap={0} variant="subtitle1" sx={{ my: 1 }} />
      <DisplayProperty label="Data di acquisto" value={purchaseDate} gap={0} variant="subtitle1"
                       sx={{ my: 1 }} />
      <DisplayProperty label="Modalità di acquisto" value={purchaseMode} gap={0} variant="subtitle1"
                       sx={{ my: 1 }} />
    </OrderCard>
  );
};

export default OrderHistoryCard;
