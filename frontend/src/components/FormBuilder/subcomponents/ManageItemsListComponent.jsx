import React, { useEffect, useState } from "react";
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
      <input
        type="text"
        placeholder="Item Name"
        name="newItem"
        value={itemName}
        onChange={handleChange}
        className="input"
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button
        className="btn btn-light btn-shadow m-t-10 m-r-10"
        onClick={onSubmit}
      >
        {editMode ? "Edit Item" : "Add Item"}
      </button>
      {editMode && (
        <button
          className="btn btn-light btn-shadow m-t-10 m-r-10"
          onClick={cancelEditing}
        >
          Cancel
        </button>
      )}

      {/* List of existing items */}
      <ul className="list">
        {items?.map((item) => (
          <li
            key={item.value}
            className="list-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <span>{item.label}</span>
            <div>
              <button
                className="btn btn-edit m-r-5"
                onClick={() => changeToEditMode(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => deleteItemFromList(item)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageItemsListComponent;
