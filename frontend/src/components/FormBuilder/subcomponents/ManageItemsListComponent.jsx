import React, { FC, useEffect, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { generateID } from "../../../utils/common";

const ManageItemsListComponent = ({
  items,
  addItemInList,
  deleteItemFromList,
  editIteminList,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [itemName, setItemName] = useState("");
  const [editItemId, setEditItemId] = useState(undefined);

  useEffect(() => {
    cancelEditing();
  }, [items]);

  const handleChange = (e) => {
    const { value } = e.target;
    setItemName(value);
  };

  const changeToEditMode = (item) => {
    setItemName(item.label);
    setEditItemId(item.id);
    setEditMode(true);
  };

  const onSubmit = () => {
    if (itemName.trim()) {
      const newItem = {
        id: editMode ? editItemId : generateID(),
        value: itemName.replace(" ", "__-"),
        label: itemName,
      };
      if (editMode) {
        editIteminList(newItem);
      } else {
        addItemInList(newItem);
      }
      cancelEditing();
    }
  };

  const cancelEditing = () => {
    setEditMode(false);
    setItemName("");
    setEditItemId(undefined);
  };

  return (
    <div>
      {/* Input for adding or editing item */}
      <TextField
        label="Item Name"
        name="newItem"
        value={itemName}
        onChange={handleChange}
        style={{ minWidth: "100%" }}
      />
      <input
        className="btn btn-light btn-shadow m-t-20 m-r-10"
        value={editMode ? "Edit Item" : "Add Item"}
        type="button"
        onClick={onSubmit}
      />
      {editMode && (
        <input
          className="btn btn-light btn-shadow m-t-20 m-r-10"
          value="Cancel"
          type="button"
          onClick={cancelEditing}
        />
      )}

      {/* List of existing items */}
      <List component="nav">
        {items?.map((item) => (
          <ListItem key={item.value}>
            <ListItemText primary={item.label} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => changeToEditMode(item)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteItemFromList(item)} edge="end">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ManageItemsListComponent;
