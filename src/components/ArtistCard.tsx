import React from "react";
import { Box, Card, CardContent, CardMedia, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Add, Check } from "@mui/icons-material";
import { useNavigate } from "../utils.ts";
import { CardSize } from "../types";

export interface ArtistCardProps {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description?: string;
  artworksCount?: number;
  isFavourite?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  onSetFavourite?: (currentValue: boolean) => void;
  imgUrl?: string;
  mode?: "grid" | "list";
  fitWidth?: boolean;
  size: CardSize;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
                                                 slug,
                                                 title,
                                                 subtitle,
                                                 isFavourite = false,
                                                 isLoading = false,
                                                 imgUrl,
                                                 mode = "list",
                                                 onClick,
                                                 onSetFavourite,
                                                 size = "large",
                                                 fitWidth = false
                                                 // artworksCount = 0,
                                               }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const imgHeight = size === "medium" ? "396px" : "430px";
  const cardWidth = fitWidth ? "100%" : (size === "medium" ? "294px" : "320px");
  const className = fitWidth ? `SwiperCard-fit` : `SwiperCard-${size}`;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSetFavourite = () => {
    if (onSetFavourite) {
      onSetFavourite(isFavourite);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/artisti/${slug}`);
    }
  };

  return (
    <Card elevation={0} className={className} sx={{ width: cardWidth }}>
      <CardMedia
        component="img"
        image={imgUrl}
        width={cardWidth}
        height={fitWidth ? undefined : imgHeight}
        className="borderRadius"
        onClick={handleClick}
        sx={{
          objectFit: mode === "list" ? "cover" : "cover",
          minHeight: "100px",
          backgroundColor: imgUrl ? "" : "#D9D9D9",
          cursor: onClick ? "pointer" : "auto",
          aspectRatio: fitWidth ? "0.74" : undefined
        }}></CardMedia>
      <CardContent sx={{ p: 0, mt: 2 }}>
        <Box display="flex">
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography onClick={onClick} sx={{ cursor: "pointer" }} variant={isMobile ? "subtitle1" : "h6"}>
              {title}
            </Typography>
            <Typography onClick={onClick} sx={{ cursor: "pointer" }} variant="subtitle1" color="textSecondary">
              {subtitle}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <IconButton
              color="primary"
              disabled={isLoading}
              onClick={() => handleSetFavourite()}
              variant={isFavourite ? "contained" : "outlined"}
              size="small">
              {isFavourite ? <Check fontSize="inherit" /> : <Add fontSize="inherit" />}
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
