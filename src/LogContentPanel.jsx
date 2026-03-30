import React from "react";
import { Box, Grid } from "@mui/material";

export default function LogContentPanel({
  rightPanelWidth,
  dirListing,
  logText,
  fontSize,
  windowDimension,
  verticalSplit,
  logRef,
  listOfDirs,
  logDirectory,
  setLogDirectory,
  processDirectory,
}) {
  return (
    <Grid item xs={rightPanelWidth}>
      {dirListing}
      {logText && (
        <Box
          placeholder="Empty"
          sx={{
            border: 2,
            fontSize: fontSize,
            fontFamily: "courier",
            maxHeight: windowDimension.winHeight - 42 * verticalSplit,
            maxWidth:
              (windowDimension.winWidth / 12) * rightPanelWidth - 25,
            overflow: "auto",
          }}
          ref={logRef}
        >
          <pre
            className="content"
            style={{ whiteSpace: "pre", padding: 10 }}
            dangerouslySetInnerHTML={{ __html: logText }}
          ></pre>
        </Box>
      )}
      {!logText && listOfDirs ? (
        listOfDirs.map((dir, id) => {
          return (
            <Box
              key={"dir" + id}
              onClick={() => {
                setLogDirectory(logDirectory + "/" + dir);
                processDirectory(logDirectory + "/" + dir);
              }}
              sx={{ color: "blue", cursor: "pointer" }}
            >
              {dir}
            </Box>
          );
        })
      ) : !logText ? (
        <Box sx={{ m: 10, fontSize: 20, color: "red" }}>
          Log will be displayed here.
        </Box>
      ) : null}
    </Grid>
  );
}
