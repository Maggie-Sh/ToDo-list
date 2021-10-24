import React, { useState } from "react";
import "./ToDo.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function RecycleBin(props) {
  const { removedList, clean } = props;
  const [openCleanDialog, setOpenCleanDialog] = useState(false);

  return (
    <>
      {!!removedList.length && (
        <div className="clean">
          <Button id="checkedid" onClick={() => setOpenCleanDialog(true)}>
            <b> Clean Recycle Bin</b>
          </Button>{" "}
        </div>
      )}
      {!!openCleanDialog && (
        <div>
          <Dialog
            open={!!openCleanDialog}
            onClose={() => setOpenCleanDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="dialogTitle" color="primary">
              Elements cannot be restored after deleting from Recycle Bin.
              <br /> Delete all?
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => (clean(), setOpenCleanDialog(false))}
                color="primary"
              >
                Delete
              </Button>
              <Button onClick={() => setOpenCleanDialog(false)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default RecycleBin;
