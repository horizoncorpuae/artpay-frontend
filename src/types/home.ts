import { HeroSlideItem } from "../components/HeroSlide.tsx";
import { PromoItemProps } from "../components/PromoItem.tsx";

export type HomeContent = {
  heroSlides: HeroSlideItem[];
  promoItems: PromoItemProps[];
};
