import React, { ImgHTMLAttributes } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { BoxProps } from "@mui/system";

import bestChoiceImg from "../assets/images/best_choice.svg";

export interface LoanConditionsCardProps {
  sx?: BoxProps["sx"];
  logoSrc: ImgHTMLAttributes<any>["src"];
  isBestChoice?: boolean;
  monthlyEstimateText: string;
  monthlyAmount: string;
  taegText: string;
  requestQuoteUrl: string;
  requestQuoteText: string;
  freeAndNonBindingText: string;
}

const LoanConditionsCard: React.FC<LoanConditionsCardProps> = ({
                                                                 sx,
                                                                 logoSrc,
                                                                 isBestChoice = false,
                                                                 monthlyEstimateText,
                                                                 monthlyAmount,
                                                                 taegText,
                                                                 requestQuoteUrl,
                                                                 requestQuoteText,
                                                                 freeAndNonBindingText
                                                               }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py={3}
      px={14}
      sx={{ background: theme.palette.secondary.light, px: { xs: 3, sm: 6, md: 14 }, ...sx }}>
      <Box
        alignSelf="stretch"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}>
        <img style={{ height: "48px" }} src={logoSrc} />
        {isBestChoice ? <img style={{ height: "30px" }} src={bestChoiceImg} /> : <div />}
      </Box>
      <Box
        mt={3}
        mb={1}
        py={2}
        display="flex"
        alignSelf="stretch"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ background: theme.palette.contrast.main, borderRadius: "5px" }}>
        <Typography sx={{ mb: 0.5 }} variant="body1">
          {monthlyEstimateText}
        </Typography>
        <Typography sx={{ mb: 1 }} variant="h4" color="primary">
          {monthlyAmount}
        </Typography>
      </Box>
      <Typography sx={{ mt: 1, mb: 2 }} variant="body2">
        {taegText}
      </Typography>
      <Button variant="contained" href={requestQuoteUrl} target="_blank">
        {requestQuoteText}
      </Button>
      <Typography sx={{ mt: 0.5 }} color="primary" variant="body1">
        {freeAndNonBindingText}
      </Typography>
    </Box>
  );
};

export default LoanConditionsCard;
