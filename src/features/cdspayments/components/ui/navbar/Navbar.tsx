import { NavLink } from "react-router-dom";
import LogoFastArtpay from "../../../../../components/icons/LogoFastArtpay.tsx";



const Navbar = () => {
  return (
    <header className={"fixed w-full z-50 top-6 px-2 max-w-md md:px-0"}>
      <nav className={"p-4 custom-navbar flex justify-between items-center w-full bg-white "}>
        <NavLink to={"/"} className={"text-tertiary underline underline-offset-3 leading-[125%]"}>
          Torna su artpay
        </NavLink>

        <LogoFastArtpay />
      </nav>
    </header>
  );
};

export default Navbar;