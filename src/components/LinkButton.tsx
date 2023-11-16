import { Button } from "@mui/material";
import React from "react";
import { ButtonProps } from "@mui/material/Button/Button";

export interface LinkButtonProps {
  //children?: React.ReactNode | string;
}

type ExtendedButtonProps = LinkButtonProps & ButtonProps;
const LinkButton: React.FC<ExtendedButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="link" {...props} disableRipple>
      {children}
    </Button>
  );
};

export default LinkButton;
