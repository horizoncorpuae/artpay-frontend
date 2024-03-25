import React from "react";
import { Box, Button, Grid, SxProps, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import DisplayImage from "./DisplayImage.tsx";
import { Cta } from "../types/ui.ts";
import sanitizeHtml from "sanitize-html";

export interface PromoBigProps {
  sx?: SxProps<Theme>;
  title: string;
  content?: string;
  cta?: Cta;
  imgUrl?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const PromoBig: React.FC<PromoBigProps> = ({ sx = {}, cta, imgUrl, title, content, disabled = false, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const textColor = theme.palette.primary.contrastText;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        background: theme.palette.primary.main,
        py: { xs: 2, md: 6 },
        px: { xs: 2, md: 6, lg: 14 }
      }}>
      <Grid
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
          ...sx
        }}
        maxWidth="xl"
        container>
        <Grid xs={12} md={6} sx={{ pr: { xs: 0, md: 4 } }} justifyContent="center" item>
          <Box
            sx={{
              minHeight: { xs: "auto", md: "550px" },
              display: { xs: imgUrl ? "block" : "none", md: "flex" },
              justifyContent: "center",
              borderRadius: "5px",
              background: imgUrl ? "" : theme.palette.primary.light,
              pt: { xs: 3, md: 0 }
            }}>
            {imgUrl && (
              <DisplayImage
                sx={{ justifyContent: "center", display: "flex" }}
                objectFit="contain"
                src={imgUrl}
                height={isMobile ? "auto" : 550}
                width={"100%"}
              />
            )}
          </Box>
        </Grid>
        <Grid xs={12} md={6} px={4} display="flex" flexDirection="column" justifyContent="center" item>
          <Typography variant="h2" color={textColor}>
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{ mt: 3 }}
            color={textColor}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content || "") }}
          />
          {cta && (
            <Box mt={3}>
              <Button color="contrast" href={cta.link} onClick={onClick} disabled={disabled}>
                {cta.text}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PromoBig;
