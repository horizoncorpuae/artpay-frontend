import React from "react";
import { Cta } from "../types/ui.ts";
import PromoBig from "./PromoBig.tsx";
import PromoSmall from "./PromoSmall.tsx";
import { Grid } from "@mui/material";

export type PromoComponentType = "promo-big" | "promo-small";
export interface PromoItemProps {
  title: string;
  content?: string;
  cta?: Cta;
  imgUrl?: string;
  componentType: PromoComponentType;
}

const PromoItem: React.FC<PromoItemProps> = ({ componentType, title, content, cta, imgUrl }) => {
  switch (componentType) {
    case "promo-big":
      return (
        <Grid xs={12} sx={{ maxWidth: "720px" }} item>
          <PromoBig title={title} content={content} cta={cta} imgUrl={imgUrl} />
        </Grid>
      );
    case "promo-small":
      return (
        <Grid xs={12} md={6} sx={{ maxWidth: "720px!important" }} item>
          <PromoSmall title={title} cta={cta} imgUrl={imgUrl} contrast />
        </Grid>
      );
    default:
      console.error("Promo item not supported: ", componentType);
      return <></>;
  }
};

export default PromoItem;
