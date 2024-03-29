import React, { ImgHTMLAttributes, ReactNode } from "react";
import { Box, Link, Typography, useTheme } from "@mui/material";

export interface PromoCardSmallProps {
  title: string | ReactNode;
  text?: string | ReactNode;
  link?: string | ReactNode;
  variant?: "primary" | "secondary" | "white";
  imgSrc?: ImgHTMLAttributes<any>["src"];
}

const PromoCardSmall: React.FC<PromoCardSmallProps> = ({ title, text, link, imgSrc, variant = "primary" }) => {
  const theme = useTheme();
  let backgroundColor: string;
  let textColor: string;
  let border: string = "";

  switch (variant) {
    case "primary":
      backgroundColor = theme.palette.primary.main;
      textColor = theme.palette.common.white;
      break;
    case "secondary":
      backgroundColor = theme.palette.secondary.main;
      textColor = theme.palette.common.white;
      break;
    default:
      backgroundColor = theme.palette.common.white;
      textColor = theme.palette.common.black;
      border = `1px solid #6576EE`;
  }
  return (
    <Box
      sx={{ background: backgroundColor, borderRadius: "24px", p: 3, border: border, height: "100%" }}
      display="flex"
      flexDirection="column">
      <Box sx={{ height: "154px" }}>
        <img src={imgSrc} />
      </Box>
      <Typography sx={{ color: textColor, mb: 3, mt: 5 }} variant="h3">
        {title}
      </Typography>
      <Box flexGrow={1}>
        <Typography variant="body1" fontWeight={500} sx={{ color: textColor, opacity: "0.75" }}>
          {text}
        </Typography>
      </Box>
      {link && (
        <Box mt={4}>
          <Link href="#" sx={{ color: textColor }}>
            {link}
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default PromoCardSmall;
