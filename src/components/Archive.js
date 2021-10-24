import React, { useState } from "react";
import "./ToDo.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function Archive(props) {
  const { archivedList, clean } = props;
  const [openCleanArchiveDialog, setOpenCleanArchiveDialog] = useState(false);
  return (
    <>
      {!!archivedList.length && (
        <div className="clean">
          <Button
            id="checkedid"
            onClick={() => setOpenCleanArchiveDialog(true)}
          >
            <b> Clean Archive</b>
          </Button>{" "}
        </div>
      )}
      {!!openCleanArchiveDialog && (
        <div>
          <Dialog
            open={!!openCleanArchiveDialog}
            onClose={() => setOpenCleanArchiveDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="dialogTitle" color="primary">
              Elements cannot be restored after deleting from Archive.
              <br /> Delete all?
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => (clean(), setOpenCleanArchiveDialog(false))}
                color="primary"
              >
                Delete
              </Button>
              <Button
                onClick={() => setOpenCleanArchiveDialog(false)}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default Archive;
