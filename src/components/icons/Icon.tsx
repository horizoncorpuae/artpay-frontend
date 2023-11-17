import React from "react";
import { SvgIcon, SvgIconProps, useTheme } from "@mui/material";

export type PaletteColor =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export const paletteColors: string[] = [
  "primary",
  "secondary",
  "error",
  "info",
  "success",
  "warning",
];

export interface IconProps {
  render: (color: string) => React.ReactNode;
}

const Icon: React.FC<SvgIconProps & IconProps> = ({ render, ...props }) => {
  const theme = useTheme();
  let color = "#666F7A";
  if (props.color && paletteColors.indexOf(props.color) !== -1) {
    color = theme.palette[props.color as PaletteColor].main;
  }
  return <SvgIcon {...props}>{render(color)}</SvgIcon>;
};

export default Icon;
