import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import HeroHome from "../components/HeroHome.tsx";
import { useAuth } from "../hoc/AuthProvider.tsx";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "../utils.ts";

export interface HomeProps {
}

const Home: React.FC<HomeProps> = ({}) => {
  const [isReady, setIsReady] = useState(false);
  const auth = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const sku = searchParams.get("sku");
  const email = searchParams.get("email");


  useEffect(() => {
    setIsReady(false);
    if(sku && email){
      auth.addTemporaryOrder(sku,email);
    }
    if (!auth.isAuthenticated) {
      auth.login();
    }
    else{
      navigate('/acquisto-esterno');
    }
  }, [auth.isAuthenticated, sku, email]);


  return (
    <DefaultLayout pageLoading={!isReady} topBar={<HeroHome />} maxWidth="xl">

    </DefaultLayout>
  );
};

export default Home;
