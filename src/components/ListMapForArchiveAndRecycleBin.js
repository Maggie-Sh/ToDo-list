import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./ToDo.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ButtonGroup } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";

function ListMapForArchiveAndRecycleBin(props) {
  const { mapingList, restore, onDelete } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <>
      {mapingList.map((item) => (
        <div className="mainList">
          <TextField
            className="list"
            key={item.id}
            value={item.name}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <ButtonGroup>
            <Button
              id="editIcon"
              variant="contained"
              color="primary"
              startIcon={<RestoreIcon />}
              onClick={() => restore(item)}
            ></Button>
            <Button
              id="deleteIcon"
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              onClick={() => setOpenDeleteDialog(true)}
            ></Button>
          </ButtonGroup>
          <Dialog
            // fullWidth
            open={!!openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="dialogTitle">
              Element cannot be restored after deleting.
              <br />
              Delete <b>"&nbsp;{item.name}&nbsp;"</b> ?
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => (onDelete(item), setOpenDeleteDialog(false))}
                color="primary"
              >
                delete
              </Button>
              <Button
                onClick={() => setOpenDeleteDialog(false)}
                color="primary"
                autoFocus
              >
                cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}{" "}
    </>
  );
}

export default ListMapForArchiveAndRecycleBin;
