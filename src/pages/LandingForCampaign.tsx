import React, {useState } from "react";
import Logo from "../components/icons/Logo.tsx";
//import {useMediaQuery, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import FormSkeleton from "../components/FormSkeleton.tsx";
import LandingCampaignCopy from "../features/landingcampaign/LandingCampaignCopy.tsx";


const LandingForCampaign: React.FC = () => {
/*
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
*/

  const [isLoad, setIsLoad] = useState<boolean>(false)

  const handleLoad = () => {
    setIsLoad(true)
  }

  return (
    <div className={"min-h-screen flex flex-col "}>
      <header className={"fixed w-full z-50 top-6"}>
        <nav className={"p-4 custom-navbar flex justify-center w-full bg-white "}>
          <Logo />
        </nav>
      </header>
      <main className={"flex-1 flex flex-col w-full lg:pt-47.5 lg:px-12 lg:flex-row"}>
        <aside>
          <LandingCampaignCopy />
        </aside>
        <aside>
          {!isLoad && <FormSkeleton />}
          <div className={`${isLoad ? "" : "hidden"} `}>
            <iframe
              onLoad={handleLoad}
              className={'border border-[#CDCFD3] rounded-3xl w-md shadow-custom'}
              width={400}
              height={700}
              src="https://51f5628d.sibforms.com/serve/MUIFACNgGrBHfoqFH4d5pJ9R0sh4e7hFHxBzQ7y-72qTA_B8J0DdMck17CtI56ZykRrxOkluPkoEHjZc6hBFnp0mnrg8ydermGZ8Wd4lJa799Zz2bn86ppow-s_fvPq0dcvYIwt_mf5yWsEMinQr6YC87MPzBN-SFG7NUqjaoopymMIDP6KUQ2nUdLlRvJCAA6EJTr7dl85Jn0qz"
              style={{
                display: "block",
                padding: 0,
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
              }}></iframe>
          </div>
        </aside>
      </main>
      <footer className={"p-6 pt-8 w-full bg-[#FAFAFB] text-xs text-secondary"}>
        <section className={"max-w-[1344px] mx-auto"}>
          <p>© artpay srl 2024 - Tutti i diritti riservati</p>
          <div className={"flex flex-col items-center gap-4 border-b border-gray-300 py-8 md:flex-row"}>
            <a
              href="https://www.iubenda.com/privacy-policy/71113702"
              className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe "
              title="Privacy Policy ">
              Privacy Policy
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/71113702/cookie-policy"
              className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe "
              title="Cookie Policy ">
              Cookie Policy
            </a>
            <NavLink to="/termini-e-condizioni" className={"underline-none text-primary"}>
              Termini e condizioni
            </NavLink>

            <NavLink to="/condizioni-generali-di-acquisto" className={"underline-none text-primary"}>
              Condizioni generali di acquisto
            </NavLink>
          </div>
          <div className={"pt-8"}>
            <p>Artpay S.R.L. Via Carloforte, 60, 09123, Cagliari Partita IVA 04065160923</p>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default LandingForCampaign;
