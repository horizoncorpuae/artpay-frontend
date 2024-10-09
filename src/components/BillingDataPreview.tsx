import React from "react";
import { BillingData } from "../types/user.ts";
import { Box, Typography } from "@mui/material";
import countries from "../countries.ts";
import { areBillingFieldsFilled } from "../utils.ts";

export interface UserDataPreviewProps {
  value?: BillingData;
  emptyText?: string;
}

const defaultEmptyText = "Compila i dati di fatturazione selezionando \"modifica\" per completare l'acquisto";

const ShippingDataPreview: React.FC<UserDataPreviewProps> = ({
                                                               value,
                                                               emptyText = defaultEmptyText
                                                             }) => {
  const countryName = countries.find((c) => c.code === value?.country)?.name || value?.country || "";
  const isPrivateCustomer = value?.private_customer !== "false";
  const dataFilled = areBillingFieldsFilled(value);
  console.log("dataFilled", dataFilled);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {dataFilled ? (<>
          <Typography variant="subtitle1" fontWeight={600}>
            {value?.first_name || ""} {value?.last_name || ""} <small
            style={{ fontWeight: 400 }}>({isPrivateCustomer ? "Persona fisica" : "Titolare di P.IVA / Persona giuridica"})</small>
          </Typography>
          <Typography variant="body1">
            {value?.address_1 || ""}
            {value?.address_2 ? `, ${value.address_2}` : ""}
          </Typography>
          <Typography variant="body1">
            {value?.postcode || ""}, {value?.city || ""}, {countryName}
          </Typography>
          {!isPrivateCustomer && <>
            <Typography variant="body1">
              P.IVA {value?.cf}
            </Typography>
          </>}
        </>) :
        <Typography variant="subtitle1" color="error" fontWeight={600}>
          {emptyText}
        </Typography>
      }
    </Box>
  );
};

export default ShippingDataPreview;
