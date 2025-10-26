import React from "react";
import { Box } from "@mui/material";

export interface SyncProgressBarProps {
  progress: number;
  visible: boolean;
}

export const SyncProgressBar: React.FC<SyncProgressBarProps> = ({ progress, visible }) => {
  if (!visible) return null;
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: 4,
        bgcolor: (theme) => theme.palette.action.hover,
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <Box
        sx={{
          height: 4,
          width: `${Math.max(0, Math.min(100, progress))}%`,
          bgcolor: (theme) => theme.palette.success.main,
          transition: "width 200ms ease",
        }}
      />
    </Box>
  );
};

export default SyncProgressBar;
