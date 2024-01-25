import React, { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";

export interface ContentCardProps {
  icon?: ReactNode;
  title: string;
  children?: ReactNode | ReactNode[];
}

const ContentCard: React.FC<ContentCardProps> = ({ icon, title, children }) => {
  return (
    <Paper>
      <Box display="flex" p={2} flexDirection="column">
        <Box gap={2} mb={3} display="flex">
          {icon}
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
        <Box px={3}>{children}</Box>
      </Box>
    </Paper>
  );
};

export default ContentCard;
