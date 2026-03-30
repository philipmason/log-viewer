import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

export default function InfoDialog({
  open,
  onClose,
}) {
  return (
    <Dialog fullWidth maxWidth="xl" onClose={onClose} open={open}>
      <DialogTitle>Info about this screen</DialogTitle>
      <DialogContent>
        <ul>
          <li>
            <a
              href="https://github.com/argenxQuantitativeSciences/logviewer"
              target="_blank"
              rel="noreferrer"
            >
              App source code
            </a>{" "}
            {" - "}code for this app is held on GitHub.
          </li>
          <li>
            <a
              href={`https://argenxbvba.sharepoint.com/sites/Biostatistics/_layouts/15/doc.aspx?sourcedoc={ca0a4288-847f-4f24-8829-c17c1611c347}`}
              target="_blank"
              rel="noreferrer"
            >
              Log Analysis at argenx
            </a>
            {" - "}this document gives an overview and explains what is
            available for viewing logs at argenx.
          </li>
          <li>
            <a
              href={`https://argenxbvba.sharepoint.com/sites/Biostatistics/_layouts/15/doc.aspx?sourcedoc=%7be15cda2c-7a82-4301-b1bf-8fbaec90b5b0%7d`}
              target="_blank"
              rel="noreferrer"
            >
              Log Viewer User Guide
            </a>
            {" - "}this document explains more about how to use this Log Viewer
            web application.
          </li>
          <li>
            <a
              href={`https://argenxbvba.sharepoint.com/:p:/r/sites/Biostatistics/Shared%20Documents/STAR%20processes/Checking%20your%20SAS%20log.pptx?d=w234104b39bfb408caaef918708059768&csf=1&web=1&e=xAb0I9`}
              target="_blank"
              rel="noreferrer"
            >
              Checking your SAS log
            </a>
            {" - "}take a look at this presentation that explains how log
            checking works with the log viewer or SAS macro which both use JSON
            files with rules defined.
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
