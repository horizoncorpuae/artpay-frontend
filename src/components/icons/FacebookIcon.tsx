import React from "react";
import { SvgIconProps } from "@mui/material";
import Icon from "./Icon";

const FacebookIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Icon
      render={(color) => (
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M10.5003 1.69995C5.91699 1.69995 2.16699 5.44162 2.16699 10.05C2.16699 14.2166 5.21699 17.6749 9.20033 18.2999V12.4666H7.08366V10.05H9.20033V8.20828C9.20033 6.11662 10.442 4.96662 12.3503 4.96662C13.2587 4.96662 14.2087 5.12495 14.2087 5.12495V7.18328H13.1587C12.1253 7.18328 11.8003 7.82495 11.8003 8.48328V10.05H14.117L13.742 12.4666H11.8003V18.2999C13.764 17.9898 15.5522 16.9879 16.8419 15.475C18.1317 13.9621 18.8381 12.038 18.8337 10.05C18.8337 5.44162 15.0837 1.69995 10.5003 1.69995Z"
              fill={color}
            />
          </g>
        </svg>
      )}
      {...props}></Icon>
  );
};

export default FacebookIcon;
