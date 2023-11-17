import React from "react";

import { SvgIconProps } from "@mui/material";
import Icon from "./Icon";

export interface RadioIconProps {
  checked?: boolean;
  disabled?: boolean;
}

const RadioIcon: React.FC<SvgIconProps & RadioIconProps> = ({
  checked,
  disabled,
  ...props
}) => {
  const colors: { fill: string; stroke: string } = {
    fill: disabled ? "#CCCFD3" : "white",
    stroke: disabled ? "#999FA7" : "#3E4EEC",
  };

  return (
    <Icon
      render={(color) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="-2 -2 24 24"
          fill="none">
          {checked ? (
            <rect
              x="3"
              y="3"
              width="14"
              height="14"
              rx="7"
              fill={colors.fill}
              stroke={
                disabled ? "#999FA7" : props.color ? color : colors.stroke
              }
              strokeWidth="6"
            />
          ) : (
            <rect
              x="0.5"
              y="0.5"
              width="19"
              height="19"
              rx="9.5"
              fill={disabled ? "#E5E7E9" : "white"}
              stroke="#CCCFD3"
            />
          )}
        </svg>
      )}
      {...props}></Icon>
  );
};

export default RadioIcon;
