import React, { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";

export interface ContentCardProps {
  icon?: ReactNode;
  title: string;
  children?: ReactNode | ReactNode[];
  headerButtons?: ReactNode[];
  contentPadding?: number;
}

const ContentCard: React.FC<ContentCardProps> = ({ icon, title, headerButtons = [], children, contentPadding = 5 }) => {
  // const theme = useTheme();
  return (
    <Paper elevation={1}>
      <Box display="flex" flexDirection="column">
        <Box gap={2} mb={1} p={2} alignItems="center" display="flex">
          {icon}
          <Typography sx={{ flexGrow: 1 }} variant="subtitle1">
            {title}
          </Typography>
          <Box>{headerButtons}</Box>
        </Box>
        <Box px={contentPadding}>{children}</Box>
      </Box>
    </Paper>
  );
};

export default ContentCard;
