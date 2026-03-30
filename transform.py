#!/usr/bin/env python3
"""Transform App.jsx to use extracted components."""

with open('src/App.jsx', 'r') as f:
    lines = f.readlines()

# === SECTION 1: New imports (replace lines 1 through the LicenseInfo line) ===
# Find where the old imports end (LicenseInfo.setLicenseKey line + closing paren + semicolon)
license_end = None
for i, line in enumerate(lines):
    if 'LicenseInfo.setLicenseKey(' in line:
        # Find the closing );
        for j in range(i, min(i+5, len(lines))):
            if lines[j].strip().endswith(');'):
                license_end = j + 1
                break
        break

print(f"License line ends at line {license_end}")

new_imports = '''import React, { useState, useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import { LicenseInfo } from "@mui/x-data-grid-pro";

import { getDir, getVersions, xmlToJson } from "./utility";
import { Fireworks } from "@fireworks-js/react";

import "./App.css";
import defaultRules from "./rules.json";
import requiredRules from "./required-rules.json";

import AppToolbar from "./AppToolbar";
import ProgressIndicators from "./ProgressIndicators";
import LeftPanel from "./LeftPanel";
import LogContentPanel from "./LogContentPanel";
import ChartDialog from "./ChartDialog";
import RulesDialog from "./RulesDialog";
import InfoDialog from "./InfoDialog";
import { selectStyles } from "./constants";

LicenseInfo.setLicenseKey(
  "a223b56d60901267734e67150910e406Tz0xMTU2MDYsRT0xNzg0ODUxMTk5MDAwLFM9cHJvLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI="
);

'''

# === SECTION 2: Find and remove selectStyles block ===
# Find "    selectStyles = {" and its closing "},"
select_styles_start = None
select_styles_end = None
for i in range(license_end, len(lines)):
    if lines[i].strip().startswith('selectStyles = {'):
        select_styles_start = i
        # Find the matching closing },
        brace_count = 0
        for j in range(i, len(lines)):
            brace_count += lines[j].count('{') - lines[j].count('}')
            if brace_count == 0:
                select_styles_end = j + 1
                break
        break

print(f"selectStyles: lines {select_styles_start+1} to {select_styles_end}")

# === SECTION 3: Find and remove ColDefn blocks ===
# We need to remove ColDefnRules, ColDefnOutputs, ColDefnInputs, ColDefnFiles,
# ColDefnRealTime, ColDefnCpuTime, ColDefnMprint, ColDefnMlogic, ColDefnSymbolgen
# But keep the state declarations between them
coldefn_ranges = []
for i in range(license_end, len(lines)):
    stripped = lines[i].strip()
    if stripped.startswith('ColDefn') and '= [' in stripped:
        start = i
        # Find closing ],
        for j in range(i, len(lines)):
            if lines[j].strip().endswith('],') or lines[j].strip().endswith(']'):
                end = j + 1
                coldefn_ranges.append((start, end))
                print(f"ColDefn block: lines {start+1} to {end}")
                break

# === SECTION 4: Find the main return block ===
return_start = None
for i in range(len(lines)):
    if lines[i].rstrip() == '  return (' and i > 1000:
        return_start = i
        break

# Find closing ");}" - the return ends with "  );" then "}" then blank then "export default App;"
return_end = None
for i in range(len(lines)-1, return_start, -1):
    if lines[i].strip() == 'export default App;':
        # Go back to find the closing }
        for j in range(i-1, return_start, -1):
            if lines[j].strip() == '}':
                return_end = j  # The } that closes function App()
                break
        break

print(f"Return block: lines {return_start+1} to {return_end+1}")

new_return = '''  return (
    <Box>
      <AppToolbar
        leftPanelWidth={leftPanelWidth} setLeftPanelWidth={setLeftPanelWidth}
        rightPanelWidth={rightPanelWidth} setRightPanelWidth={setRightPanelWidth}
        fontSize={fontSize} setFontSize={setFontSize}
        selection={selection}
        showSource={showSource} setShowSource={setShowSource}
        showMacroLines={showMacroLines} setshowMacroLines={setshowMacroLines}
        showLineNumbers={showLineNumbers} setshowLineNumbers={setshowLineNumbers}
        setAnalyseAgain={setAnalyseAgain}
        setOpenModal={setOpenModal} setOpenRulesModal={setOpenRulesModal}
        extractSasCode={extractSasCode} pasteClipboard={pasteClipboard}
        href={href}
        verticalSplit={verticalSplit} setVerticalSplit={setVerticalSplit}
        logRef={logRef}
        links={links} currentLine={currentLine} setCurrentLine={setCurrentLine} jumpTo={jumpTo}
        search={search} setSearch={setSearch} searchField={searchField} setSearchField={setSearchField}
        nextSearchItem={nextSearchItem} previousSearchTerm={previousSearchTerm}
        setOpenInfo={setOpenInfo}
        openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} popUpMessage={popUpMessage}
        openRulesMenu={openRulesMenu} setOpenRulesMenu={setOpenRulesMenu}
        anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleCloseRulesMenu={handleCloseRulesMenu}
        listOfRules={listOfRules}
        openInNewTab={openInNewTab}
      />
      <ProgressIndicators
        isFetchingFile={isFetchingFile}
        isProcessingLog={isProcessingLog}
        processingProgress={processingProgress}
      />
      {ref?.current?.isRunning && (
        <Fireworks
          ref={ref}
          options={{ opacity: 0.5 }}
          style={{ top: 0, left: 0, width: "100%", height: "100%", position: "fixed" }}
        />
      )}
      <Grid container spacing={1}>
        <LeftPanel
          leftPanelWidth={leftPanelWidth} rightPanelWidth={rightPanelWidth}
          windowDimension={windowDimension}
          logDirectory={logDirectory} setLogDirectory={setLogDirectory}
          mode={mode} readLocalFiles={readLocalFiles} setLogText={setLogText}
          setWaitGetDir={setWaitGetDir} getLogWebDav={getLogWebDav}
          processDirectory={processDirectory} waitGetDir={waitGetDir} waitSelectLog={waitSelectLog}
          listOfLogs={listOfLogs} selectedLog={selectedLog} selectLog={selectLog}
          selection={selection} setSelection={setSelection}
          handleNewLog={handleNewLog} getLogVersions={getLogVersions}
          program={program} submitted={submitted} submitEnd={submitEnd} nLines={nLines}
          uniqueTypes={uniqueTypes} badgeCount={badgeCount} check={check} changeCheck={changeCheck}
          links={links} showLineNumbers={showLineNumbers} zeroPad={zeroPad} logRef={logRef}
          fontSize={fontSize} verticalSplit={verticalSplit}
          tabValue={tabValue} changeTabValue={changeTabValue}
          outputs={outputs} inputs={inputs} files={files}
          realTime={realTime} cpuTime={cpuTime}
          mprint={mprint} mlogic={mlogic} symbolgen={symbolgen}
          selectionModel={selectionModel} setSelectionModel={setSelectionModel}
        />
        <LogContentPanel
          rightPanelWidth={rightPanelWidth}
          dirListing={dirListing}
          logText={logText}
          fontSize={fontSize}
          windowDimension={windowDimension}
          verticalSplit={verticalSplit}
          logRef={logRef}
          listOfDirs={listOfDirs}
          logDirectory={logDirectory}
          setLogDirectory={setLogDirectory}
          processDirectory={processDirectory}
        />
      </Grid>
      <ChartDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        chart={chart} scale={scale} setScale={setScale}
        useMaxWidth={useMaxWidth}
        windowDimension={windowDimension}
        mermaidInfo={mermaidInfo}
      />
      <RulesDialog
        open={openRulesModal}
        onClose={handleCloseRulesModal}
        rules={rules}
        windowDimension={windowDimension}
      />
      <InfoDialog
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        direction={direction} setDirection={setDirection}
        lineVar={lineVar} setLineVar={setLineVar}
      />
    </Box>
  );
}

export default App;
'''

# === Build the new file ===
# Collect ranges to remove (0-indexed line numbers)
remove_ranges = []

# selectStyles block
if select_styles_start is not None:
    remove_ranges.append((select_styles_start, select_styles_end))

# ColDefn blocks
for start, end in coldefn_ranges:
    remove_ranges.append((start, end))

# Sort by start position
remove_ranges.sort()
print(f"\nRanges to remove: {[(s+1, e) for s, e in remove_ranges]}")

# Build set of lines to skip
skip_lines = set()
for start, end in remove_ranges:
    for i in range(start, end):
        skip_lines.add(i)

# Build new file
output_lines = []

# Part 1: New imports
output_lines.append(new_imports)

# Part 2: Function body (from after license to before return), skipping removed blocks
for i in range(license_end, return_start):
    if i not in skip_lines:
        output_lines.append(lines[i])

# Part 3: New return block
output_lines.append(new_return)

# Write the new file
with open('src/App.jsx', 'w') as f:
    f.write(''.join(output_lines))

# Count lines
with open('src/App.jsx', 'r') as f:
    new_lines = f.readlines()
print(f"\nNew file has {len(new_lines)} lines (was {len(lines)})")
