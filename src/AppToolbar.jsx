import React from "react";
import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  FormControlLabel,
  TextField,
  Switch,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
  Divider,
} from "@mui/material";
import {
  Add,
  Remove,
  RestartAlt,
  Download,
  ArrowCircleLeft,
  ArrowCircleRight,
  SquareFoot,
  BarChart,
  Colorize,
  Visibility,
  Refresh,
  Info,
  Email,
  ContentPaste,
  KeyboardDoubleArrowUp,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import { FG_COLOR, ICON_PADDING } from "./constants";

export default function AppToolbar({
  leftPanelWidth,
  setLeftPanelWidth,
  rightPanelWidth,
  setRightPanelWidth,
  fontSize,
  setFontSize,
  selection,
  showSource,
  setShowSource,
  showMacroLines,
  setshowMacroLines,
  showLineNumbers,
  setshowLineNumbers,
  setAnalyseAgain,
  setOpenModal,
  setOpenRulesModal,
  extractSasCode,
  pasteClipboard,
  href,
  logRef,
  links,
  currentLine,
  setCurrentLine,
  jumpTo,
  search,
  setSearch,
  searchField,
  setSearchField,
  nextSearchItem,
  previousSearchTerm,
  setOpenInfo,
  openPopUp,
  setOpenPopUp,
  popUpMessage,
  openRulesMenu,
  setOpenRulesMenu,
  anchorEl,
  setAnchorEl,
  handleCloseRulesMenu,
  listOfRules,
  openInNewTab,
}) {
  const fgColor = FG_COLOR,
    iconPadding = ICON_PADDING;

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        background:
          "linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #0277bd 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
      }}
    >
      <Toolbar variant="dense" disableGutters sx={{ px: 0.5 }}>
        <Tooltip title="Move center to the left">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => {
              setLeftPanelWidth(Math.max(leftPanelWidth - 3, 0));
              setRightPanelWidth(Math.min(rightPanelWidth + 3, 12));
            }}
          >
            <ArrowCircleLeft />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset to middle">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => {
              setLeftPanelWidth(6);
              setRightPanelWidth(6);
            }}
          >
            <RestartAlt />
          </IconButton>
        </Tooltip>
        <Tooltip title="Move center to the right">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => {
              setLeftPanelWidth(Math.min(leftPanelWidth + 3, 12));
              setRightPanelWidth(Math.max(rightPanelWidth - 3, 0));
            }}
          >
            <ArrowCircleRight />
          </IconButton>
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "rgba(255,255,255,0.25)", mx: 0.75, my: 0.5 }}
        />
        <Tooltip title="Smaller">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => setFontSize(fontSize - 1)}
          >
            <Remove />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset to 12">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => setFontSize(12)}
          >
            <RestartAlt />
          </IconButton>
        </Tooltip>
        <Tooltip title="Larger">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => setFontSize(fontSize + 1)}
          >
            <Add />
          </IconButton>
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "rgba(255,255,255,0.25)", mx: 0.75, my: 0.5 }}
        />
        <Tooltip title="Download SAS Log">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => openInNewTab(`${selection}`)}
          >
            <Download />
          </IconButton>
        </Tooltip>
        <Tooltip title="Show Source Lines">
          <FormControlLabel
            label={
              <Typography
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.85)",
                  userSelect: "none",
                }}
              >
                Src
              </Typography>
            }
            sx={{
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              px: 0.75,
              mr: iconPadding,
              ml: iconPadding,
              m: 0.25,
            }}
            control={
              <Switch
                checked={showSource}
                onChange={() => {
                  setShowSource(!showSource);
                  setAnalyseAgain((prev) => !prev);
                }}
                name="source"
                size="small"
                color="warning"
              />
            }
          />
        </Tooltip>
        <Tooltip title="Show Mprint/Mlogic/Symbolgen/Mautocomploc Lines">
          <FormControlLabel
            label={
              <Typography
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.85)",
                  userSelect: "none",
                }}
              >
                Mac
              </Typography>
            }
            sx={{
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              px: 0.75,
              mr: iconPadding,
              ml: iconPadding,
              m: 0.25,
            }}
            control={
              <Switch
                checked={showMacroLines}
                onChange={() => {
                  setshowMacroLines(!showMacroLines);
                  setAnalyseAgain((prev) => !prev);
                }}
                name="mprint"
                size="small"
                color="warning"
                sx={{ ml: 0.5 }}
              />
            }
          />
        </Tooltip>
        <Tooltip title="Show Line numbers">
          <FormControlLabel
            label={
              <Typography
                sx={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.85)",
                  userSelect: "none",
                }}
              >
                Ln#
              </Typography>
            }
            sx={{
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              px: 0.75,
              mr: iconPadding,
              ml: iconPadding,
              m: 0.25,
            }}
            control={
              <Switch
                checked={showLineNumbers}
                onChange={() => setshowLineNumbers(!showLineNumbers)}
                name="mprint"
                size="small"
                color="warning"
                sx={{ ml: 0.5, mr: 0.5 }}
              />
            }
          />
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "rgba(255,255,255,0.25)", mx: 0.75, my: 0.5 }}
        />
        <Tooltip title="Show Chart">
          <IconButton
            size="small"
            onClick={() => setOpenModal(true)}
            sx={{
              color: fgColor,
              borderRadius: 3,
              mr: iconPadding,
              ml: iconPadding,
            }}
          >
            <BarChart />
          </IconButton>
        </Tooltip>
        <Tooltip title="Choose rules used to parse logs">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setOpenRulesMenu(true);
            }}
          >
            <SquareFoot />
          </IconButton>
        </Tooltip>
        <Tooltip title="View rules">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => setOpenRulesModal(true)}
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Extract SAS code (if possible)">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => extractSasCode()}
          >
            <Colorize />
          </IconButton>
        </Tooltip>
        <Tooltip title="Paste Clipboard as new contents of Log">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => pasteClipboard()}
          >
            <ContentPaste />
          </IconButton>
        </Tooltip>
        <Tooltip title="Email">
          <IconButton
            onClick={() => {
              const email =
                "mailto:qs_tech_prog@argenx.com?subject=Log Viewer: " +
                selection +
                "&body=You can open the log in the Log Viewer using this link: " +
                encodeURIComponent(href);
              console.log("email", email);
              window.open(email, "_blank");
            }}
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
          >
            <Email />
          </IconButton>
        </Tooltip>
        <Tooltip title="Refresh view by analysing the log again">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => setAnalyseAgain((prev) => !prev)}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "rgba(255,255,255,0.25)", mx: 0.75, my: 0.5 }}
        />
        <Snackbar
          open={openPopUp}
          onClose={() => setOpenPopUp(false)}
          autoHideDuration={3000}
          message={popUpMessage}
        />
        <Menu
          open={openRulesMenu}
          onClose={handleCloseRulesMenu}
          anchorEl={anchorEl}
        >
          {listOfRules &&
            listOfRules.length > 0 &&
            listOfRules.map((rule, id) => (
              <MenuItem
                key={id}
                onClick={() => handleCloseRulesMenu(rule.value)}
              >
                {rule.label}
              </MenuItem>
            ))}
        </Menu>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "rgba(255,255,255,0.25)", mx: 0.75, my: 0.5 }}
        />
        <Tooltip title="Page Down">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => {
              const clientHeight = logRef.current.clientHeight;
              logRef.current.scrollBy(0, clientHeight - 20);
            }}
          >
            <KeyboardDoubleArrowDown />
          </IconButton>
        </Tooltip>
        <Tooltip title="Page Up">
          <IconButton
            size="small"
            sx={{ color: fgColor, borderRadius: 3, mr: iconPadding }}
            onClick={() => {
              const clientHeight = logRef.current.clientHeight;
              logRef.current.scrollBy(0, -(clientHeight - 10));
            }}
          >
            <KeyboardDoubleArrowUp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next Interesting thing">
          <IconButton
            size="small"
            onClick={() => {
              const interesting = links.filter(
                (link) => link.interesting && link.lineNumber > currentLine
              );
              if (interesting.length > 0) {
                jumpTo(interesting[0].id);
                setCurrentLine(interesting[0].lineNumber);
              }
            }}
            sx={{
              borderRadius: 3,
              color: "yellow",
              mr: iconPadding,
            }}
          >
            <KeyboardDoubleArrowDown />
          </IconButton>
        </Tooltip>
        <Tooltip title="Previous Interesting thing">
          <IconButton
            size="small"
            sx={{
              borderRadius: 3,
              color: "yellow",
              mr: iconPadding,
            }}
            onClick={() => {
              const interesting = links.filter(
                (link) => link.interesting && link.lineNumber < currentLine
              );
              if (interesting.length > 0) {
                const last = interesting.pop();
                jumpTo(last.id);
                setCurrentLine(last.lineNumber);
              }
            }}
          >
            <KeyboardDoubleArrowUp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next Error">
          <IconButton
            size="small"
            sx={{ borderRadius: 3, color: "#fc4514", mr: iconPadding }}
            onClick={() => {
              const errors = links.filter(
                (link) =>
                  link.type === "ERROR" && link.lineNumber > currentLine
              );
              if (errors.length > 0) {
                jumpTo(errors[0].id);
                setCurrentLine(errors[0].lineNumber);
              }
            }}
          >
            <KeyboardDoubleArrowDown />
          </IconButton>
        </Tooltip>
        <Tooltip title="Previous Error">
          <IconButton
            size="small"
            sx={{ borderRadius: 3, color: "#fc4514", mr: iconPadding }}
            onClick={() => {
              const errors = links.filter(
                (link) =>
                  link.type === "ERROR" && link.lineNumber < currentLine
              );
              if (errors.length > 0) {
                const last = errors.pop();
                jumpTo(last.id);
                setCurrentLine(last.lineNumber);
              }
            }}
          >
            <KeyboardDoubleArrowUp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next Warning">
          <IconButton
            size="small"
            sx={{ borderRadius: 3, color: "#FFC300", mr: iconPadding }}
            onClick={() => {
              const warnings = links.filter(
                (link) =>
                  link.type === "WARN" && link.lineNumber > currentLine
              );
              if (warnings.length > 0) {
                jumpTo(warnings[0].id);
                setCurrentLine(warnings[0].lineNumber);
              }
            }}
          >
            <KeyboardDoubleArrowDown />
          </IconButton>
        </Tooltip>
        <Tooltip title="Previous Warning">
          <IconButton
            size="small"
            sx={{ borderRadius: 3, color: "#FFC300", mr: iconPadding }}
            onClick={() => {
              const warnings = links.filter(
                (link) =>
                  link.type === "WARN" && link.lineNumber < currentLine
              );
              if (warnings.length > 0) {
                const last = warnings.pop();
                jumpTo(last.id);
                setCurrentLine(last.lineNumber);
              }
            }}
          >
            <KeyboardDoubleArrowUp />
          </IconButton>
        </Tooltip>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "rgba(255,255,255,0.25)", mx: 0.75, my: 0.5 }}
        />
        <TextField
          label="Search (case-sensitive)"
          value={search}
          size={"small"}
          inputProps={{
            style: { fontSize: 12, height: "1.1em", color: "#1a1a2e" },
          }}
          InputLabelProps={{ style: { fontSize: 11, color: "#555" } }}
          onChange={(event) => setSearch(event.target.value)}
          inputRef={(input) => input && setSearchField(input)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              nextSearchItem();
              setTimeout(() => {
                searchField.focus();
              }, 100);
            }
          }}
          sx={{
            flexGrow: 1,
            mt: 0.6,
            mr: 1,
            ml: 1,
            mb: 0.5,
            backgroundColor: "rgba(255,255,255,0.92)",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
              "&:hover fieldset": { borderColor: "#fff" },
            },
          }}
        />
        <Tooltip title="Next search term">
          <IconButton
            size="small"
            color="secondary"
            sx={{ borderRadius: 3, mr: iconPadding }}
            onClick={nextSearchItem}
          >
            <KeyboardDoubleArrowDown />
          </IconButton>
        </Tooltip>
        <Tooltip title="Previous search term">
          <IconButton
            size="small"
            color="secondary"
            sx={{ borderRadius: 3, mr: iconPadding }}
            onClick={previousSearchTerm}
          >
            <KeyboardDoubleArrowUp />
          </IconButton>
        </Tooltip>{" "}
        <Tooltip title="Information about this screen">
          <IconButton
            size="small"
            onClick={() => setOpenInfo(true)}
            sx={{ borderRadius: 3, color: "white", mr: iconPadding }}
          >
            <Info />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
