import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TextField from "@material-ui/core/TextField";
import "./ToDo.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { ButtonGroup } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditDialog from "./EditDialog.js";
import RemoveDialog from "./RemoveDialog.js";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Archive from "./Archive.js";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import SearchIcon from "@material-ui/icons/Search";
import FormatListBulletedRoundedIcon from "@material-ui/icons/FormatListBulletedRounded";
import ListMap from "./ListMap";
import ListMapForArchiveAndRecycleBin from "./ListMapForArchiveAndRecycleBin";
import RecycleBin from "./RecycleBin";

function List() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(null);
  const [remove, setRemove] = useState(null);
  const [removedList, setRemovedList] = useState([]);
  const [isShowRecycleBin, setIsShowRecycleBin] = useState(false);
  const [isShowList, setIsShowList] = useState(true);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchRemovedList, setSearchRemovedList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [openHandleCheckDialog, setOpenHandleCheckDialog] = useState(false);
  const [openArchive, setOpenArchive] = useState(false);
  const [archivedList, setArchivedList] = useState([]);
  const [searchArchivedList, setSearchArchivedList] = useState([]);

  const addItem = () => {
    const item = {
      id: uuidv4(),
      name: value,
      check: false,
    };
    if (value.trim()) {
      setList([...list, item]);
    }
    setValue("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(searchList);
  };

  useEffect(() => {
    if (isShowList) {
      setSearchList(list.filter((item) => item.name.includes(search)));
    }
    if (isShowRecycleBin) {
      setSearchRemovedList(
        removedList.filter((item) => item.name.includes(search))
      );
    }
    if (openArchive) {
      setSearchArchivedList(
        archivedList.filter((item) => item.name.includes(search))
      );
    }
  }, [
    search,
    list,
    removedList,
    archivedList,
    isShowList,
    isShowRecycleBin,
    openArchive,
  ]);

  const onEdit = (editedItemId) => {
    setEdit(list.find((item) => item.id === editedItemId));
  };

  const closeEditDialog = () => {
    setEdit(null);
  };

  const saveEditDialog = (changedName) => {
    if (changedName.trim()) {
      setList(
        list.map((item) => {
          if (item.id === edit.id) {
            return {
              ...item,
              name: changedName,
            };
          }
          return item;
        })
      );
    }
    setEdit(null);
  };

  const onRemove = (removedItemId) => {
    setRemove(list.find((item) => item.id === removedItemId));
  };
  const closeRemoveDialog = () => {
    setRemove(null);
  };
  const removeToRecycleBin = () => {
    setRemovedList([...removedList, remove]);
    setList(list.filter((item) => item.id !== remove.id));
    setRemove(null);
    console.log(removedList);
  };

  const onCleanRecycleBin = () => {
    setRemovedList([]);
  };

  const onRestoreItem = (restoredItem) => {
    const item = { ...restoredItem, check: false };
    setList([...list, item]);
    setRemovedList(removedList.filter((item) => item.id !== restoredItem.id));
  };

  const onDeleteFromRecycleBin = (deletedItem) => {
    setRemovedList(removedList.filter((item) => item.id !== deletedItem.id));
  };

  const deleteFromArchive = (deletedItem) => {
    setArchivedList(archivedList.filter((item) => item.id !== deletedItem.id));
  };
  const restoreItemFromArchive = (restoredItem) => {
    const item = { ...restoredItem, check: false };
    setList([...list, item]);
    setArchivedList(archivedList.filter((item) => item.id !== restoredItem.id));
  };

  const cleanArchive = () => {
    setArchivedList([]);
  };

  const onCheck = (checkingItem) => {
    const checking = !checkingItem.check;
    setList(
      list.map((item) => {
        if (item.id === checkingItem.id) {
          return { ...item, check: checking };
        }
        return item;
      })
    );
    console.log(checkedList);
  };

  useEffect(() => {
    setCheckedList(list.filter((item) => item.check === true));
  }, [setCheckedList, list]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }
  };

  const moveCheckedItemsToArchive = () => {
    setArchivedList([...archivedList, ...checkedList]);
    setList(list.filter((item) => item.check === false));
    setCheckedList([]);
    setOpenHandleCheckDialog(false);
  };
  const moveCheckedItemsToRecycle = () => {
    setRemovedList([...removedList, ...checkedList]);
    setCheckedList([]);
    setList(list.filter((item) => item.check === false));
    setOpenHandleCheckDialog(false);
  };

  return (
    <>
      <div>
        <h3>ToDo List</h3>
        <ButtonGroup
          id="menuBtn"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="text"
        >
          <Button startIcon={<SearchIcon />}>search&nbsp;&nbsp;</Button>
          <Button
            className="btnGroup"
            startIcon={<FormatListBulletedRoundedIcon />}
            onClick={() => (
              setIsShowList(true),
              setOpenArchive(false),
              setIsShowRecycleBin(false)
            )}
          >
            My List
          </Button>
          <Button
            className="btnGroup"
            startIcon={<LibraryBooksOutlinedIcon />}
            onClick={() => (
              setOpenArchive(true),
              setIsShowList(false),
              setIsShowRecycleBin(false)
            )}
          >
            archive
          </Button>
          <Button
            className="btnGroup"
            startIcon={<DeleteIcon />}
            onClick={() => (
              setIsShowRecycleBin(true),
              setSearch(""),
              setIsShowList(false),
              setOpenArchive(false)
            )}
          >
            {" "}
            Recycle Bin
          </Button>
        </ButtonGroup>{" "}
      </div>

      <div className="search">
        <TextField
          id="search"
          className="btnGroup"
          value={search}
          inputProps={{ "aria-label": "naked" }}
          onChange={handleSearch}
        ></TextField>
      </div>

      {!!isShowList && (
        <h2 className="bin" id="myList">
          My List
        </h2>
      )}

      {!!isShowList && (
        <div id="add">
          <TextField
            id="addField"
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputProps={{ onKeyDown }}
          ></TextField>
          <Button
            id="addBtn"
            size="large"
            startIcon={<AddIcon />}
            onClick={addItem}
          >
            add
          </Button>
        </div>
      )}

      {!!isShowList && (
        <div className="scrollA">
          {!search.length ? (
            <ListMap
              mapingList={list}
              onEdit={onEdit}
              onRemove={onRemove}
              onCheck={onCheck}
            />
          ) : (
            <ListMap
              mapingList={searchList}
              onCheck={onCheck}
              // search={search}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          )}
        </div>
      )}

      {!!isShowList && !!list.length && (
        <div className="checked">
          {" "}
          <Button
            id="checkedid"
            startIcon={<CheckRoundedIcon />}
            variant="outlined"
            onClick={() => {
              if (checkedList.length) {
                setOpenHandleCheckDialog(true);
              }
            }}
          >
            <b>{checkedList.length} checked items</b>
          </Button>
        </div>
      )}

      {!!edit && (
        <EditDialog edit={edit} close={closeEditDialog} save={saveEditDialog} />
      )}

      {!!remove && (
        <RemoveDialog
          remove={remove}
          close={closeRemoveDialog}
          save={removeToRecycleBin}
        />
      )}

      {!!openHandleCheckDialog && (
        <div>
          <Dialog
            open={!!openHandleCheckDialog}
            onClose={() => setOpenHandleCheckDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="dialogTitle" color="primary">
              Number of checked items: <b>{checkedList.length}</b>
            </DialogTitle>
            <DialogActions>
              <Button onClick={moveCheckedItemsToArchive} color="primary">
                Move to Archive
              </Button>
              <Button
                onClick={moveCheckedItemsToRecycle}
                color="primary"
                autoFocus
              >
                Move to Recycle Bin
              </Button>
              <Button
                onClick={() => setOpenHandleCheckDialog(false)}
                color="primary"
              >
                cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {!!isShowRecycleBin && (
        <>
          <h2 className="bin">Recycle Bin</h2>
          <div className="scroll">
            {!search.length ? (
              <ListMapForArchiveAndRecycleBin
                mapingList={removedList}
                restore={onRestoreItem}
                onDelete={onDeleteFromRecycleBin}
              />
            ) : (
              <ListMapForArchiveAndRecycleBin
                mapingList={searchRemovedList}
                restore={onRestoreItem}
                onDelete={onDeleteFromRecycleBin}
              />
            )}{" "}
          </div>
          <RecycleBin removedList={removedList} clean={onCleanRecycleBin} />
        </>
      )}

      {!!openArchive && (
        <>
          <h2 className="bin">Archive</h2>
          <div className="scroll">
            {!search.length ? (
              <ListMapForArchiveAndRecycleBin
                mapingList={archivedList}
                onDelete={deleteFromArchive}
                restore={restoreItemFromArchive}
              />
            ) : (
              <ListMapForArchiveAndRecycleBin
                mapingList={searchArchivedList}
                onDelete={deleteFromArchive}
                restore={restoreItemFromArchive}
              />
            )}
          </div>

          <Archive archivedList={archivedList} clean={cleanArchive} />
        </>
      )}
    </>
  );
}

export default List;
