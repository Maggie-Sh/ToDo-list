import React from "react";
import TextField from "@material-ui/core/TextField";
import "./ToDo.css";
import Button from "@material-ui/core/Button";
import { ButtonGroup } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";

function ListMap(props) {
  const { mapingList, onEdit, onRemove, onCheck } = props;

  return (
    <>
      {mapingList.map((item) => (
        <div className="mainList" key={item.id + item.id}>
          <Checkbox
            checked={!!item.check}
            onChange={() => onCheck(item)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <TextField
            className={!item.check ? "list" : "checkList"}
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
              startIcon={<EditIcon />}
              onClick={() => onEdit(item.id)}
            ></Button>
            <Button
              id="deleteIcon"
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              onClick={() => onRemove(item.id)}
            ></Button>
          </ButtonGroup>
        </div>
      ))}
    </>
  );
}

export default ListMap;
