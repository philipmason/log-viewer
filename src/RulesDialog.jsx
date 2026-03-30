import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { ROW_HEIGHT, ColDefnRules } from "./constants";

export default function RulesDialog({
  open,
  onClose,
  rules,
  setRules,
  mode,
}) {
  const [localRows, setLocalRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Sync local rows from props when dialog opens or rules change
  useEffect(() => {
    if (open && rules) {
      setLocalRows(rules.map((rule, id) => ({ id, ...rule })));
    }
  }, [open, rules]);

  const processRowUpdate = useCallback((newRow) => {
    setLocalRows((prev) =>
      prev.map((row) => (row.id === newRow.id ? newRow : row))
    );
    return newRow;
  }, []);

  const handleAddRow = () => {
    const newId =
      localRows.length > 0 ? Math.max(...localRows.map((r) => r.id)) + 1 : 0;
    setLocalRows((prev) => [
      ...prev,
      {
        id: newId,
        type: "",
        ruleType: "regex",
        startswith: "",
        regex: "",
        prefix: "",
        suffix: "",
        anchor: false,
        linkColor: "",
        interesting: false,
        substitute: false,
      },
    ]);
  };

  const handleDeleteRows = () => {
    setLocalRows((prev) =>
      prev
        .filter((row) => !selectedRows.includes(row.id))
        .map((row, idx) => ({ ...row, id: idx }))
    );
    setSelectedRows([]);
  };

  const handleSave = () => {
    // Strip the id field before saving
    const rulesData = localRows.map(({ id, ...rest }) => rest);
    // Update App state
    setRules(rulesData);
    // Download as JSON file
    const blob = new Blob([JSON.stringify(rulesData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rules.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}
      PaperProps={{ sx: { display: "flex", flexDirection: "column", overflow: "hidden" } }}
    >
      <DialogTitle>Rules Admin</DialogTitle>
      <DialogContent sx={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {localRows && (
          <DataGridPro
            rows={localRows}
            rowHeight={ROW_HEIGHT}
            columns={ColDefnRules}
            density="compact"
            hideFooter={true}
            checkboxSelection
            onSelectionModelChange={(ids) => setSelectedRows(ids)}
            selectionModel={selectedRows}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
            sx={{
              flex: 1,
              fontWeight: "fontSize=5",
              fontSize: "0.7em",
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleDeleteRows}
          disabled={selectedRows.length === 0}
          color="error"
        >
          Delete Selected ({selectedRows.length})
        </Button>
        <Button onClick={handleAddRow}>Add Rule</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
