import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";

export interface PurchaseLoanStepTwoProps {}

const PurchaseLoanStepTwo: React.FC<PurchaseLoanStepTwoProps> = ({}) => {
  const theme = useTheme();

  const maxWidth = `${theme.breakpoints.values.xl}px`;

  return (
    <Grid sx={{ background: theme.palette.secondary.light, justifyContent: "center" }} container>
      <Grid sx={{ maxWidth: `${maxWidth}!important`, p: 6 }} xs={12} mb={6} item>
        <Typography sx={{ mb: { xs: 2 } }} variant="h3">
          La tua opera è bloccata!
        </Typography>
        <Typography variant="subtitle1">Scegli la finanziaria e completa l’acquisto!</Typography>
      </Grid>
    </Grid>
  );
};

export default PurchaseLoanStepTwo;
