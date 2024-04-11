declare module "react-iubenda-policy" {
  import { ReactNode, FC } from "react";

  interface IubendaProps {
    id: number;
    styling?: "nostyle" | "black" | "white";
    children?: ReactNode;
    type?: "cookie" | "privacy" | string;
  }

  const Iubenda: FC<IubendaProps>;

  export { Iubenda, IubendaProps };
  export default Iubenda;
}

