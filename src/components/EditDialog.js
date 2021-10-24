import React, { useState } from "react";
import "./ToDo.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function EditDialog(props) {
  const { save, close, edit } = props;
  const [changedName, setChangedName] = useState("");

  const onChangeItem = (e) => {
    setChangedName(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      save(changedName);
      close();
    }
  };

  return (
    <div className="dialog">
      <Dialog
        fullWidth
        open={!!edit}
        onClose={close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="dialogTitle">
          Change<b>&nbsp;"&nbsp;{edit.name}&nbsp;"</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Type new ToDo.</b>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            onChange={onChangeItem}
            inputProps={{ onKeyDown }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => save(changedName)} color="primary">
            change
          </Button>
          <Button onClick={close} color="primary">
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDialog;
