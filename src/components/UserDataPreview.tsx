import React from "react";
import { BillingData } from "../types/user.ts";
import { Box, Typography } from "@mui/material";
import countries from "../countries.ts";

export interface UserDataPreviewProps {
  value?: BillingData;
}

const UserDataPreview: React.FC<UserDataPreviewProps> = ({ value }) => {
  const countryName = countries.find((c) => c.code === value?.country)?.name || value?.country || "";
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="subtitle1" fontWeight={600}>
        {value?.first_name || ""} {value?.last_name || ""}
      </Typography>
      <Typography variant="body1">
        {value?.address_1 || ""}
        {value?.address_2 ? `, ${value.address_2}` : ""}
      </Typography>
      <Typography variant="body1">
        {value?.postcode || ""}, {value?.city || ""}, {countryName}
      </Typography>
    </Box>
  );
};

export default UserDataPreview;
