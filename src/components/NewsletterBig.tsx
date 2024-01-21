import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import TextField from "./TextField.tsx";
import Checkbox from "./Checkbox.tsx";

export interface NewsletterBigProps {
  title: string;
  subtitle?: string;
  checkboxText?: string;
  ctaText?: string;
}

const NewsletterBig: React.FC<NewsletterBigProps> = ({ title, subtitle, checkboxText, ctaText = "Prosegui" }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      py={12}
      px={5}
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#010F22", color: theme.palette.contrast.main }}>
      <Typography variant="h3" color="white">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" color="white">
          Lasciaci un indirizzo email e ti invieremo una selezione di opere presenti su artpay
        </Typography>
      )}
      <Box sx={{ maxWidth: "667px", width: "100%" }} my={6}>
        <TextField
          placeholder="email"
          size="medium"
          variant="outlined"
          sx={{
            color: "black",
            input: { background: "white", borderRadius: "24px" },
            mb: 2,
          }}
          fullWidth
        />
        {checkboxText && <Checkbox label={checkboxText} />}
      </Box>
      <Button color="contrast" size="large" sx={{ color: theme.palette.primary.main }} variant="contained">
        {ctaText}
      </Button>
    </Box>
  );
};

export default NewsletterBig;
