import React, { useEffect, useState } from "react";
import ManageItemsListComponent from "./ManageItemsListComponent";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import _ from "lodash";
// import useModalStrip from "../../../global-hooks/useModalStrip";

const textboxStyle = {
  minWidth: "100%",
  maxWidth: "100%",
  marginTop: 10,
};

const EditPropertiesComponent = ({
  selectedControl,
  selectControl,
  editControlProperties,
  editContainerProperties,
  formLayoutComponents,
  moveControlFromSide,
}) => {
  console.log("selectedControl2 342 34 234: ", selectedControl);
  const [updatedItem, setUpdatedItem] = useState({});
  const [isUpdatedItemRequired, setIsUpdatedItemRequired] = useState(false);
  const [moveControlObj, setMoveControlObj] = useState(null);
  const [controlsInContainer, setControlsInContainer] = useState(undefined);

  // const { showModalStrip } = useModalStrip();

  useEffect(() => {
    if (selectedControl) {
      if (selectedControl.items) {
        setUpdatedItem({
          ...selectedControl,
          items: JSON.parse(JSON.stringify(selectedControl.items)),
        });
      } else {
        setUpdatedItem({ ...selectedControl });
      }
      if ("required" in selectedControl) {
        setIsUpdatedItemRequired(selectedControl.required);
      }
    }
    setMoveControlObj(null);
    setControlsInContainer(undefined);
  }, [selectedControl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const addItemInList = (item) => {
    const newItems = _.cloneDeep(updatedItem.items || []);
    newItems.push(item);
    setUpdatedItem((prevState) => ({ ...prevState, items: newItems }));
  };

  const deleteItemFromList = (item) => {
    const newItems = updatedItem.items?.filter((i) => i.id !== item.id);
    setUpdatedItem((prevState) => ({ ...prevState, items: newItems }));
  };

  const editIteminList = (item) => {
    const newItems = _.cloneDeep(updatedItem.items || []);
    const index = newItems.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      newItems[index] = { ...newItems[index], ...item };
    }
    setUpdatedItem((prevState) => ({ ...prevState, items: newItems }));
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    if (name === "required") {
      setIsUpdatedItemRequired(checked);
    }
    setUpdatedItem((prevState) => ({ ...prevState, [name]: checked }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    editControlProperties(updatedItem);
  };

  const onContainerFormSubmit = (event) => {
    event.preventDefault();
    editContainerProperties(updatedItem);
  };

  const handleMoveControlSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "containerId") {
      const container = formLayoutComponents.find(
        (con) => con.container.id === value
      );
      const stepsInContainer = container ? container.children.length : 0;
      if (selectedControl.containerId === value) {
        setControlsInContainer(stepsInContainer - 1);
      } else {
        setControlsInContainer(stepsInContainer);
      }
    }
    setMoveControlObj((prev) => ({ ...prev, [name]: value }));
  };

  const getPositions = () => {
    return controlsInContainer !== undefined
      ? Array.from({ length: controlsInContainer + 1 }, (_, index) => (
          <MenuItem key={index} value={index}>
            {index + 1}
          </MenuItem>
        ))
      : null;
  };

  const onMoveControlFormSubmit = (e) => {
    e.preventDefault();
    // if (!moveControlObj?.containerId) {
    //   showModalStrip("danger", "You need to select Step first", 5000);
    //   return;
    // }
    moveControlFromSide(selectedControl, moveControlObj);
  };

  return (
    <>
      {selectedControl ? (
        <>
          {selectedControl.itemType === "container" ? (
            <div className="main-form">
              <form
                onSubmit={onContainerFormSubmit}
                style={{ minWidth: "100%" }}
              >
                <div className="main-form-title">Edit Container Properties</div>
                <div>
                  <TextField
                    label="Container Heading"
                    name="heading"
                    value={updatedItem.heading || ""}
                    onChange={handleChange}
                    style={textboxStyle}
                  />
                </div>
                <div>
                  <TextField
                    label="Container Sub-Heading"
                    name="subHeading"
                    value={updatedItem.subHeading || ""}
                    onChange={handleChange}
                    style={textboxStyle}
                  />
                </div>
                <input
                  type="submit"
                  value="Update Data"
                  className="btn btn-light btn-shadow m-t-20 m-r-10"
                />
                <input
                  type="button"
                  value="Cancel"
                  className="btn btn-light btn-shadow m-t-20 m-l-0"
                  onClick={() => selectControl(undefined)}
                />
              </form>
            </div>
          ) : (
            <>
              <div className="main-form">
                <form onSubmit={onFormSubmit} style={{ minWidth: "100%" }}>
                  <div className="main-form-title">Edit Field Properties</div>
                  <div>
                    <TextField
                      label="Field Label Name"
                      name="labelName"
                      value={updatedItem.labelName || ""}
                      onChange={handleChange}
                      style={textboxStyle}
                    />
                  </div>
                  {["INPUTTEXTFIELD", "INPUTMULTILINE", "CHECKBOX"].includes(
                    selectedControl.controlName
                  ) && (
                    <div>
                      <TextField
                        label="Field Placeholder"
                        name="placeholder"
                        value={updatedItem.placeholder || ""}
                        onChange={handleChange}
                        style={textboxStyle}
                      />
                    </div>
                  )}
                  <div>
                    <TextField
                      label="Field Description"
                      name="description"
                      value={updatedItem.description || ""}
                      onChange={handleChange}
                      multiline
                      style={textboxStyle}
                    />
                  </div>
                  <div className="m-t-20 p-l-0">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isUpdatedItemRequired}
                          name="required"
                          onChange={handleCheckChange}
                        />
                      }
                      label="Required"
                    />
                  </div>
                  {["RADIOGROUP", "SELECTDROPDOWN", "CHECKLIST"].includes(
                    selectedControl.controlName
                  ) && (
                    <>
                      <h6>List Items</h6>
                      <ManageItemsListComponent
                        addItemInList={addItemInList}
                        editIteminList={editIteminList}
                        deleteItemFromList={deleteItemFromList}
                        items={updatedItem.items || []}
                      />
                    </>
                  )}
                  <input
                    type="submit"
                    value="Update Data"
                    className="btn btn-light btn-shadow m-t-20 m-r-10"
                  />
                  <input
                    type="button"
                    value="Cancel"
                    className="btn btn-light btn-shadow m-t-20 m-l-0"
                    onClick={() => selectControl(undefined)}
                  />
                </form>
              </div>
              <div className="m-t-20"></div>
              {/* <div className="main-form">
                <form
                  onSubmit={onMoveControlFormSubmit}
                  style={{ minWidth: "100%" }}
                >
                  <div className="main-form-title">Move Control to Step</div>
                  <div>
                    <FormControl style={{ minWidth: "100%" }}>
                      <InputLabel>Step:</InputLabel>
                      <Select
                        name="containerId"
                        value={moveControlObj?.containerId || ""}
                        onChange={handleMoveControlSelectChange}
                      >
                        {formLayoutComponents.map((item, index) => (
                          <MenuItem
                            key={item.container.id}
                            value={item.container.id}
                          >
                            Step {index + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl style={{ minWidth: "100%" }}>
                      <InputLabel>Position:</InputLabel>
                      <Select
                        name="position"
                        value={moveControlObj?.position || ""}
                        onChange={handleMoveControlSelectChange}
                      >
                        {getPositions()}
                      </Select>
                    </FormControl>
                  </div>
                  <input
                    type="submit"
                    value="Move"
                    className="btn btn-light btn-shadow m-t-20 m-r-10"
                  />
                  <input
                    type="button"
                    value="Cancel"
                    className="btn btn-light btn-shadow m-t-20 m-l-0"
                    onClick={() => selectControl(undefined)}
                  />
                </form>
              </div> */}
            </>
          )}
        </>
      ) : (
        <>
          <h4>Edit Properties</h4>
          <div
            role="alert"
            className="m-t-30 alert alert-dark alert-dismissible"
          >
            <h4>Note!</h4>
            You need to select a form control to view the edit properties.
          </div>
        </>
      )}
    </>
  );
};

export default EditPropertiesComponent;
