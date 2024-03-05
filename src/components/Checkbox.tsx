import React, { ReactNode } from "react";
import {
  FormControlLabel,
  Checkbox as BaseCheckbox,
  CheckboxProps,
  SxProps,
  Theme,
} from "@mui/material";
import CheckboxIcon from "./icons/CheckboxIcon.tsx";

export interface ExtendedCheckboxProps {
  label: string|ReactNode;
  checkboxSx?: SxProps<Theme>;
  alignTop?: boolean;
  error?: boolean;
}

const Checkbox: React.FC<ExtendedCheckboxProps & CheckboxProps> =
  React.forwardRef(
    ({ label, checkboxSx = {}, alignTop = false, error, ...props }, ref) => {
      const sx: { [key: string]: unknown } = {};
      if (alignTop) {
        sx["transform"] = "translateY(-5px)";
        sx["alignSelf"] = "flex-start";
      }
      Object.assign(sx, checkboxSx);
      return (
        <FormControlLabel
          label={label}
          componentsProps={{
            typography: {
              color: error ? "error" : "inherit",
            },
          }}
          control={
            <BaseCheckbox
              ref={ref}
              sx={{ ...sx, ...checkboxSx }}
              icon={
                <CheckboxIcon size={props.size} disabled={props.disabled} />
              }
              checkedIcon={
                <CheckboxIcon
                  size={props.size}
                  disabled={props.disabled}
                  checked
                />
              }
              {...props}
            />
          }
        />
      );
    },
  );

export default Checkbox;
