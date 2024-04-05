import React from "react";
import { Add, Check } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export interface FollowButtonProps {
  isFavourite?: boolean;
  isLoading?: boolean;
  onClick?: (currentValue: boolean) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
                                                     isFavourite = false, isLoading = false, onClick = () => {
  }
                                                   }) => {
  return (
    /*    <Button
          disabled={isLoading}
          variant={isFavourite ? "contained" : "outlined"}
          onClick={() => onClick(isFavourite)}
          endIcon={isFavourite ? <Remove /> : <Add />}>
          {isFavourite ? "Following" : "Follow"}
        </Button>*/
    <Box gap={1} display="flex">
      <Typography variant="body1" color="primary">{isFavourite ? "Following" : "Follow"}</Typography>
      <IconButton color="primary" size="xs" disabled={isLoading} variant={isFavourite ? "contained" : "outlined"}
                  onClick={() => onClick(isFavourite)}>{isFavourite ?
        <Check fontSize="small" /> : <Add fontSize="small" />}</IconButton>
    </Box>
  );
};

export default FollowButton;
