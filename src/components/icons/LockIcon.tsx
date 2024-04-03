import React from "react";
import { SvgIconProps } from "@mui/material";
import Icon from "./Icon";

const LockIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <Icon
      sx={{ transform: "translateY(1px)" }}
      render={(color) => (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.8125 13.125H3.89392C3.47949 13.125 3.13983 12.9705 2.9166 12.7013C2.72968 12.475 2.625 12.168 2.625 11.8031V11.0833V7.01495V7C2.625 6.98903 2.62607 6.97906 2.62607 6.9681C2.64423 6.21942 3.11206 5.72994 3.81702 5.69704V4.24654C3.81702 2.1979 5.1575 0.875 6.9968 0.875C8.8425 0.875 10.1776 2.1979 10.1776 4.24654V5.69704C10.8837 5.72795 11.3536 6.21543 11.3739 6.96411C11.3739 6.97607 11.375 6.98804 11.375 7V7.01495V11.0833V11.8031C11.375 12.6036 10.8687 13.125 10.1061 13.125H9.1875H4.8125ZM9.68951 5.69505H4.31155V4.23657C4.31155 2.49198 5.41385 1.33457 6.9968 1.33457C8.57547 1.33457 9.68951 2.49198 9.68951 4.23657V5.69505Z"
            fill={color}
          />
        </svg>
      )}
      {...props}></Icon>
  );
};

export default LockIcon;
