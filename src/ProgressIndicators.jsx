import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressIndicators({
  isFetchingFile,
  isProcessingLog,
  processingProgress,
}) {
  return (
    <>
      {isFetchingFile ? (
        <Box sx={{ px: 1, pt: 0.5, bgcolor: "#fff3e0" }}>
          <Typography sx={{ fontSize: 12, color: "#bf360c", mb: 0.25 }}>
            Loading file...
          </Typography>
          <LinearProgress variant="indeterminate" color="warning" />
        </Box>
      ) : null}
      {isProcessingLog ? (
        <Box sx={{ px: 1, pt: 0.5, bgcolor: "#f6f7fb" }}>
          <Typography sx={{ fontSize: 12, color: "#1a237e", mb: 0.25 }}>
            Processing log... {Math.round(processingProgress)}%
          </Typography>
          <LinearProgress variant="determinate" value={processingProgress} />
        </Box>
      ) : null}
    </>
  );
}
