import React from "react";
import Select from "react-select";
import {
  Box,
  Grid,
  Tooltip,
  IconButton,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Badge,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Publish, FileDownloadDone, Download } from "@mui/icons-material";
import {
  ROW_HEIGHT,
  ICON_PADDING,
  selectStyles,
  ColDefnOutputs,
  ColDefnInputs,
  ColDefnFiles,
  ColDefnRealTime,
  ColDefnCpuTime,
  ColDefnMprint,
  ColDefnMlogic,
  ColDefnSymbolgen,
} from "./constants";

export default function LeftPanel({
  leftPanelWidth,
  rightPanelWidth,
  windowDimension,
  logDirectory,
  setLogDirectory,
  mode,
  readLocalFiles,
  setLogText,
  setWaitGetDir,
  getLogWebDav,
  processDirectory,
  waitGetDir,
  waitSelectLog,
  listOfLogs,
  selectedLog,
  selectLog,
  selection,
  setSelection,
  handleNewLog,
  getLogVersions,
  program,
  submitted,
  submitEnd,
  nLines,
  uniqueTypes,
  badgeCount,
  check,
  changeCheck,
  links,
  showLineNumbers,
  zeroPad,
  logRef,
  fontSize,
  verticalSplit,
  tabValue,
  changeTabValue,
  outputs,
  inputs,
  files,
  realTime,
  cpuTime,
  mprint,
  mlogic,
  symbolgen,
  selectionModel,
  setSelectionModel,
}) {
  const rowHeight = ROW_HEIGHT,
    iconPadding = ICON_PADDING;

  return (
    <>
      <Grid item xs={leftPanelWidth} sx={{ mt: 0.5 }}>
        {logDirectory ? (
          <TextField
            id="logDirectory"
            label="Directory containing logs"
            value={logDirectory}
            size={"small"}
            onChange={(e) => setLogDirectory(e.target.value)}
            inputProps={{ style: { fontSize: 14 } }}
            sx={{
              width: (windowDimension.winWidth * leftPanelWidth) / 12 - 200,
              mt: 1,
              ml: 1,
            }}
          />
        ) : null}
        {!waitGetDir ? (
          <Tooltip title="Go up to parent directory">
            <IconButton
              size="small"
              onClick={() => {
                const parentDir = logDirectory
                  .split("/")
                  .slice(0, -1)
                  .join("/");
                if (mode === "local") {
                  readLocalFiles(parentDir);
                  setLogText(null);
                  setLogDirectory(parentDir);
                } else {
                  setWaitGetDir(true);
                  setLogDirectory(parentDir);
                  getLogWebDav(parentDir);
                }
              }}
              sx={{ mt: 1, color: "green" }}
            >
              <Publish fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : null}
        {!waitGetDir ? (
          <Tooltip title="Read directory and show a list of logs to select from">
            <Button
              id="readDirectory"
              onClick={() => processDirectory()}
              sx={{
                m: 2,
                fontSize: 12,
                backgroundColor: "lightgray",
                color: "darkgreen",
              }}
            >
              Read
            </Button>
          </Tooltip>
        ) : null}

        {waitGetDir ? <CircularProgress sx={{ ml: 9, mt: 2 }} /> : null}
        {!waitSelectLog && listOfLogs ? (
          <Select
            placeholder={
              listOfLogs.length > 0
                ? "Choose a log (" + listOfLogs.length + " found)"
                : "No logs found"
            }
            options={listOfLogs}
            value={selectedLog}
            onChange={selectLog}
            styles={selectStyles}
          />
        ) : null}
        {waitSelectLog ? <CircularProgress sx={{ ml: 9, mt: 2 }} /> : null}
      </Grid>
      <Grid item xs={rightPanelWidth} sx={{ mt: 0.5 }}>
        <Box
          variant={"dense"}
          sx={{ bgcolor: "background.paper", color: "text.secondary" }}
        >
          <TextField
            label="Log Name"
            value={selection}
            size={"small"}
            inputProps={{ style: { fontSize: 14 } }}
            onChange={(event) => setSelection(event.target.value)}
            sx={{
              width: (windowDimension.winWidth * rightPanelWidth) / 12 - 100,
              mt: 1,
            }}
          />
          <Tooltip title="Load log - either starting with http or /">
            <IconButton
              size="small"
              onClick={handleNewLog}
              sx={{ mt: 1, color: "green" }}
            >
              <FileDownloadDone fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Get a list of versions to choose from (not yet working)">
            <IconButton
              size="small"
              onClick={() => {
                setWaitGetDir(true);
                getLogVersions(logDirectory);
              }}
              sx={{ mt: 1, color: "green" }}
            >
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        {program && <b>Program:</b>} {program} &nbsp;{" "}
        {submitted && <b>Submitted:</b>} {submitted} &nbsp;{" "}
        {submitEnd && <b>Ended:</b>} {submitEnd} &nbsp;{" "}
        {submitted && submitEnd && (() => {
          const ms = new Date(submitEnd) - new Date(submitted);
          if (isNaN(ms) || ms < 0) return null;
          const totalSec = Math.floor(ms / 1000),
            h = Math.floor(totalSec / 3600),
            m = Math.floor((totalSec % 3600) / 60),
            s = totalSec % 60,
            parts = [];
          if (h) parts.push(h + "h");
          if (m) parts.push(m + "m");
          parts.push(s + "s");
          return <><b>Elapsed:</b> {parts.join(" ")} &nbsp; </>;
        })()}
        {nLines && <b>Lines:</b>} {nLines}
      </Grid>
      <Grid item xs={leftPanelWidth}>
        {uniqueTypes &&
          uniqueTypes.map((t) => {
            if (uniqueTypes.length >= Object.keys(badgeCount).length)
              return (
                <FormControlLabel
                  key={t}
                  label={t}
                  control={
                    <Badge color="info" badgeContent={badgeCount[t]}>
                      <Checkbox
                        checked={check[t] === undefined ? true : check[t]}
                        onChange={() => changeCheck(t)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Badge>
                  }
                />
              );
            else return null;
          })}
        <p />
        <Box
          placeholder="Empty"
          sx={{
            border: 0.5,
            color: "gray",
            fontSize: fontSize - 1,
            fontFamily: "courier",
            height: windowDimension.winHeight / verticalSplit,
            overflow: "auto",
          }}
        >
          {links &&
            links.map((link, id) => {
              let show = true;
              uniqueTypes.forEach((t) => {
                if (!check[t] && link.type === t) show = false;
              });
              if (show) {
                return (
                  <React.Fragment key={id}>
                    {showLineNumbers ? zeroPad(link.lineNumber, 7) + " " : ""}
                    <a
                      style={{ color: `${link.linkColor}` }}
                      href={`#${link.id}`}
                      onClick={() => {
                        setTimeout(function () {
                          logRef.current.scrollBy({
                            top: -33,
                            left: 0,
                            behavior: "smooth",
                          });
                        }, 500);
                      }}
                    >
                      {link.text}
                    </a>
                    <br />
                  </React.Fragment>
                );
              } else return null;
            })}
        </Box>

        <Tabs
          value={tabValue}
          onChange={(event, newValue) => changeTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Outputs" id={"tab0"} sx={{ fontSize: 12 }} />
          <Tab label="Inputs" id={"tab1"} sx={{ fontSize: 12 }} />
          <Tab label="Files" id={"tab2"} sx={{ fontSize: 12 }} />
          <Tab label="Real Time" id={"tab3"} sx={{ fontSize: 12 }} />
          <Tab label="CPU Time" id={"tab4"} sx={{ fontSize: 12 }} />
          <Tab label="MPRINT" id={"tab5"} sx={{ fontSize: 12 }} />
          <Tab label="MLOGIC" id={"tab6"} sx={{ fontSize: 12 }} />
          <Tab label="SYMBOLGEN" id={"tab7"} sx={{ fontSize: 12 }} />
        </Tabs>
        {outputs && tabValue === 0 && (
          <DataGridPro
            rows={outputs}
            rowHeight={rowHeight}
            columns={ColDefnOutputs}
            density="compact"
            hideFooter={true}
            sx={{
              height: windowDimension.winHeight / verticalSplit,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
              padding: iconPadding,
            }}
            onRowClick={(e) => {
              window.location.hash = e.row.link;
            }}
          />
        )}
        {inputs && tabValue === 1 && (
          <DataGridPro
            rows={inputs}
            rowHeight={rowHeight}
            columns={ColDefnInputs}
            density="compact"
            hideFooter={true}
            sx={{
              height: windowDimension.winHeight / verticalSplit,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
            }}
            onRowClick={(e) => {
              window.location.hash = e.row.link;
            }}
          />
        )}
        {inputs && tabValue === 2 && (
          <DataGridPro
            rows={files}
            rowHeight={rowHeight}
            columns={ColDefnFiles}
            density="compact"
            hideFooter={true}
            sx={{
              height: windowDimension.winHeight / verticalSplit,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
            }}
            onRowClick={(e) => {
              window.location.hash = e.row.link;
            }}
          />
        )}
        {inputs && tabValue === 3 && (
          <DataGridPro
            rows={realTime}
            rowHeight={rowHeight}
            columns={ColDefnRealTime}
            density="compact"
            hideFooter={true}
            sx={{
              height: windowDimension.winHeight / verticalSplit,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
            }}
            onRowClick={(e) => {
              window.location.hash = e.row.link;
            }}
          />
        )}
        {inputs && tabValue === 4 && (
          <DataGridPro
            rows={cpuTime}
            rowHeight={rowHeight}
            columns={ColDefnCpuTime}
            density="compact"
            hideFooter={true}
            sx={{
              height: windowDimension.winHeight / verticalSplit,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
            }}
            onRowClick={(e) => {
              window.location.hash = e.row.link;
            }}
          />
        )}
        {inputs && tabValue === 5 && (
          <DataGridPro
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) =>
              setSelectionModel(newSelectionModel)
            }
            selectionModel={selectionModel}
            rows={mprint}
            rowHeight={rowHeight}
            columns={ColDefnMprint}
            density="compact"
            hideFooter={true}
            sx={{
              height: windowDimension.winHeight / verticalSplit,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
              "& .MuiSvgIcon-root": { width: "0.6em" },
            }}
            onRowClick={(e) => {
              window.location.hash = e.row.link;
            }}
          />
        )}
        {inputs && tabValue === 6 && (
          <DataGridPro
            rows={mlogic}
            rowHeight={rowHeight}
            columns={ColDefnMlogic}
            density="compact"
            hideFooter={true}
            sx={{
              height: windowDimension.winHeight / verticalSplit,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
            }}
            onRowClick={(e) => {
              window.location.hash = e.row.link;
            }}
          />
        )}
        {inputs && tabValue === 7 && (
          <DataGridPro
            rows={symbolgen}
            rowHeight={rowHeight}
            columns={ColDefnSymbolgen}
            density="compact"
            hideFooter={true}
            sx={{
              height: windowDimension.winHeight / verticalSplit,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
            }}
            onRowClick={(e) => {
              window.location.hash = e.row.link;
            }}
          />
        )}
      </Grid>
    </>
  );
}
