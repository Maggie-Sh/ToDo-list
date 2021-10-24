import React from "react";
import "./ToDo.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

function RemoveDialog(props) {
  const { close, remove, save } = props;

  return (
    <div>
      <Dialog
        // fullWidth
        open={!!remove}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          Remove <b>"&nbsp;{remove.name}&nbsp;"</b> to Recycle Bin?
        </DialogTitle>
        <DialogActions>
          <Button onClick={save} color="primary">
            remove
          </Button>
          <Button onClick={close} color="primary" autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RemoveDialog;
