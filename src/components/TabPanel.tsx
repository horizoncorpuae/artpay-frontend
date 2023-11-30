import React from "react";
import { Box } from "@mui/material";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  //sx={{ mx: { xs: 2, sm: 0 } }}
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}>
      {value === index && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ py: { xs: 3, md: 6 }, px: { xs: 2, sm: 3, md: 0 } }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
