import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
  Button,
  Chip,
  FormControlLabel,
  Switch,
  Autocomplete,
  TextField,
} from "@mui/material";
import { ZoomIn, ZoomOut, RestartAlt, Close } from "@mui/icons-material";
import Mermaid from "./Mermaid";
import { ICON_PADDING, LINE_VAR_OPTIONS } from "./constants";

export default function ChartDialog({
  open,
  onClose,
  chart,
  scale,
  setScale,
  useMaxWidth,
  windowDimension,
  mermaidInfo,
  direction,
  setDirection,
  lineVar,
  setLineVar,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={"paper"}
      fullScreen
      style={{ backdropFilter: "blur(5px" }}
    >
      <DialogTitle>
        <Tooltip title={`Zoom out`}>
          <IconButton
            size="small"
            onClick={() => setScale(scale > 0.25 ? scale - 0.25 : 0.125)}
            sx={{ backgroundColor: "white", color: "blue", float: "left" }}
          >
            <ZoomOut fontSize="small" />
          </IconButton>
        </Tooltip>{" "}
        <Tooltip title={`Reset`}>
          <IconButton
            size="small"
            onClick={() => setScale(1)}
            sx={{ backgroundColor: "white", color: "blue", float: "left" }}
          >
            <RestartAlt fontSize="small" />
          </IconButton>
        </Tooltip>{" "}
        <Tooltip title={`Zoom in`}>
          <IconButton
            size="small"
            onClick={() => setScale(scale + 0.5)}
            sx={{ backgroundColor: "white", color: "blue", float: "left" }}
          >
            <ZoomIn fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle diagram direction">
          <FormControlLabel
            sx={{
              borderRadius: 3,
              backgroundColor: "#cccccc",
              mr: ICON_PADDING,
              ml: ICON_PADDING,
            }}
            control={
              <Switch
                checked={direction}
                onChange={() => setDirection(!direction)}
                name="direction"
                size="small"
                color="warning"
                sx={{ ml: 0.5, mr: 0.5 }}
              />
            }
            label={direction ? "Top to Bottom" : "Left to Right"}
          />
        </Tooltip>
        <Autocomplete
          value={lineVar}
          onChange={(event, newValue) => setLineVar(newValue)}
          size="small"
          id="lineVarId"
          options={LINE_VAR_OPTIONS}
          sx={{ width: 200, display: "inline-flex", mx: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="Line labels" size="small" />
          )}
        />
        <Button onClick={onClose}>Close</Button>
        <Tooltip title={`Close Dialog`}>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ backgroundColor: "white", color: "red", float: "right" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Tooltip>
        {mermaidInfo.lines && (
          <Tooltip title={`Copy Mermaid Code`}>
            <Chip
              label={mermaidInfo.lines.toLocaleString() + " lines"}
              sx={{ fontSize: 12, float: "right" }}
              onClick={() => navigator.clipboard.writeText(chart)}
            />
          </Tooltip>
        )}
        {mermaidInfo.characters && (
          <Tooltip title={`Copy Mermaid Code and open a mermaid editor`}>
            <Chip
              label={mermaidInfo.characters.toLocaleString() + " characters"}
              sx={{ fontSize: 12, float: "right" }}
              onClick={() => {
                navigator.clipboard.writeText(chart);
                setTimeout(function () {
                  window.open("https://mermaid.live/");
                }, 500);
              }}
            />
          </Tooltip>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          transform: `scale(${scale})`,
          transformOrigin: "0% 0% 0px;",
          width: Math.round(windowDimension.winWidth) - 50,
        }}
      >
        <Mermaid chart={chart} useMaxWidth={useMaxWidth} />
      </DialogContent>
    </Dialog>
  );
}
