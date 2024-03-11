import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Typography, Button, TypographyProps } from "@mui/material";

interface ReadMoreTypographyProps {
  children: string | ReactNode;
  heightLimit: number; // Height limit in pixels
}

const ReadMoreTypography: React.FC<ReadMoreTypographyProps & TypographyProps> = ({
                                                                                   children,
                                                                                   heightLimit,
                                                                                   sx,
                                                                                   ...props
                                                                                 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Check if the content is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(textRef.current.scrollHeight > heightLimit);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [heightLimit, children]);

  return (
    <div>
      <Typography
        {...props}
        ref={textRef}
        sx={{
          ...sx,
          maxHeight: isExpanded ? "none" : `${heightLimit}px`,
          overflow: "hidden"
        }}>
        {children}
      </Typography>
      {isOverflowing && (
        <Button sx={{ px: 0, mt: 1 }} onClick={() => setIsExpanded(!isExpanded)} size="small">
          {isExpanded ? "Leggi meno" : "Leggi di più"}
        </Button>
      )}
    </div>
  );
};

export default ReadMoreTypography;
