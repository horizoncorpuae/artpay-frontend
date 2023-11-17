import React from "react";
import { SvgIconProps } from "@mui/material";
import Icon from "./Icon";

const GoogleIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Icon
      render={(color) => (
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M18.2914 9.25008H10.6497V11.5251H16.0747C15.7997 14.7001 13.1581 16.0584 10.6581 16.0584C7.46641 16.0584 4.66641 13.5417 4.66641 10.0001C4.66641 6.58341 7.33307 3.94175 10.6664 3.94175C13.2414 3.94175 14.7497 5.58341 14.7497 5.58341L16.3331 3.93341C16.3331 3.93341 14.2997 1.66675 10.5831 1.66675C5.84974 1.66675 2.19141 5.66675 2.19141 10.0001C2.19141 14.2084 5.63307 18.3334 10.7081 18.3334C15.1664 18.3334 18.4164 15.2751 18.4164 10.7584C18.4164 9.80008 18.2914 9.25008 18.2914 9.25008Z"
              fill={color}
            />
          </g>
        </svg>
      )}
      {...props}></Icon>
  );
};

export default GoogleIcon;
