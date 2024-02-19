import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout.tsx";
import HeroAbout from "../components/HeroAbout.tsx";
import PromoSide from "../components/PromoSide.tsx";

export interface AboutProps {}

const About: React.FC<AboutProps> = ({}) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <DefaultLayout pb={3} pageLoading={!ready} maxWidth={false}>
      <HeroAbout />
      <PromoSide />
      <PromoSide reverse />
      <PromoSide />
    </DefaultLayout>
  );
};

export default About;
