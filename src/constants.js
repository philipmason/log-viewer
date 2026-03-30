export const FG_COLOR = "#ffffff";
export const ROW_HEIGHT = 22;
export const INCREMENT = 0.25;
export const ICON_PADDING = 0.25;
export const LINE_VAR_OPTIONS = ["real", "obs"];

export const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: "12px",
    marginLeft: 3,
    background: "#c5e1c5",
    border: state.isFocused ? "1px solid #0000ff" : "2px solid #00ffff",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: "12px",
  }),
};

export const ColDefnRules = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "type", headerName: "type", width: 80, editable: true },
  { field: "ruleType", headerName: "ruleType", width: 80, editable: true },
  { field: "startswith", headerName: "startswith", width: 100, editable: true },
  { field: "regex", headerName: "regex", width: 400, editable: true },
  { field: "prefix", headerName: "prefix", width: 400, editable: true },
  { field: "suffix", headerName: "suffix", width: 90, editable: true },
  { field: "anchor", headerName: "anchor", width: 50, editable: true },
  { field: "linkColor", headerName: "linkColor", width: 50, editable: true },
  { field: "interesting", headerName: "interesting", width: 50, editable: true },
  { field: "substitute", headerName: "substitute", width: 50, editable: true },
];

export const ColDefnOutputs = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "lineNumber", headerName: "Line", width: 90 },
  { field: "link", headerName: "link", width: 90, hide: true },
  { field: "libname", headerName: "Libname", width: 90 },
  { field: "dataset", headerName: "dataset", width: 180 },
  { field: "obs", headerName: "# obs", width: 90 },
  { field: "vars", headerName: "# variables", width: 90 },
];

export const ColDefnInputs = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "lineNumber", headerName: "Line", width: 90 },
  { field: "link", headerName: "link", width: 90, hide: true },
  { field: "libname", headerName: "Libname", width: 90 },
  { field: "dataset", headerName: "dataset", width: 180 },
  { field: "obs", headerName: "# obs", width: 90 },
];

export const ColDefnFiles = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "lineNumber", headerName: "Line", width: 90 },
  { field: "link", headerName: "link", width: 90, hide: true },
  { field: "file", headerName: "File", width: 240, flex: 1 },
  { field: "size", headerName: "Size", width: 120 },
];

const secondsFormatter = (params) => {
  if (params.value == null) return "";
  return Number(params.value).toLocaleString();
};

export const ColDefnRealTime = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "lineNumber", headerName: "Line", width: 90 },
  { field: "link", headerName: "link", width: 90, hide: true },
  { field: "time", headerName: "Time", width: 90 },
  { field: "units", headerName: "Units", width: 90 },
  { field: "seconds", headerName: "Seconds", width: 90, valueFormatter: secondsFormatter },
];

export const ColDefnCpuTime = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "lineNumber", headerName: "Line", width: 90 },
  { field: "link", headerName: "link", width: 90, hide: true },
  { field: "time", headerName: "Time", width: 90 },
  { field: "units", headerName: "Units", width: 90 },
  { field: "seconds", headerName: "Seconds", width: 90, valueFormatter: secondsFormatter },
];

export const ColDefnMprint = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "show", headerName: "Show", width: 50, hide: true },
  { field: "name", headerName: "Macro name", width: 400, flex: 1 },
  { field: "lines", headerName: "Lines", width: 50 },
];

export const ColDefnMlogic = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "name", headerName: "Macro name", width: 400, flex: 1 },
  { field: "lines", headerName: "Lines", width: 50 },
];

export const ColDefnSymbolgen = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "name", headerName: "Macro variable name", width: 400, flex: 1 },
  { field: "lines", headerName: "Lines", width: 50 },
];
