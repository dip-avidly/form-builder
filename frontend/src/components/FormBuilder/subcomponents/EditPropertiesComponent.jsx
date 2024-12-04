import React, { useEffect, useState } from "react";
import ManageItemsListComponent from "./ManageItemsListComponent";
import _ from "lodash";

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
  console.log("updatedItem123123123: ", updatedItem);
  const [isUpdatedItemRequired, setIsUpdatedItemRequired] = useState(false);
  const [moveControlObj, setMoveControlObj] = useState(null);
  const [controlsInContainer, setControlsInContainer] = useState(undefined);

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
    console.log("name, value: ", name, value);
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
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    console.log("name, value: ", name, checked);
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
          <option key={index} value={index}>
            {index + 1}
          </option>
        ))
      : null;
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
                  <label>
                    Container Heading:
                    <input
                      type="text"
                      name="heading"
                      value={updatedItem.heading || ""}
                      onChange={handleChange}
                      style={textboxStyle}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Container Sub-Heading:
                    <input
                      type="text"
                      name="subHeading"
                      value={updatedItem.subHeading || ""}
                      onChange={handleChange}
                      style={textboxStyle}
                    />
                  </label>
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
                  <p className="main-form-title">Edit Field Properties</p>
                  {/* Edit Label  */}
                  <div>
                    <label>
                      Field Label Name:
                      <input
                        type="text"
                        name="labelName"
                        value={updatedItem.labelName || ""}
                        onChange={handleChange}
                        style={textboxStyle}
                      />
                    </label>
                  </div>
                  {/* Description */}
                  <div>
                    <label>
                      Field Description:
                      <textarea
                        name="description"
                        value={updatedItem.description || ""}
                        onChange={handleChange}
                        style={textboxStyle}
                      />
                    </label>
                  </div>
                  {/* Required */}
                  <div className="m-t-20 p-l-0">
                    <label>
                      <input
                        type="checkbox"
                        checked={isUpdatedItemRequired}
                        name="required"
                        onChange={handleCheckChange}
                      />
                      Required
                    </label>
                  </div>
                  {/* Placeholder */}
                  {["INPUTTEXTFIELD", "INPUTMULTILINE", "CHECKBOX"].includes(
                    selectedControl.controlName
                  ) && (
                    <div>
                      <label>
                        Field Placeholder:
                        <input
                          type="text"
                          name="placeholder"
                          value={updatedItem.placeholder || ""}
                          onChange={handleChange}
                          style={textboxStyle}
                        />
                      </label>
                    </div>
                  )}

                  {/* List Items */}

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
                  {/* Min date Max data */}

                  {["DATEFIELD"].includes(selectedControl.controlName) && (
                    <>
                      <div>
                        <label>
                          Min Date:
                          <input
                            type="date"
                            name="min"
                            value={updatedItem?.min || ""}
                            onChange={handleChange}
                            style={textboxStyle}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Max Date:
                          <input
                            type="date"
                            name="max"
                            value={updatedItem?.max || ""}
                            onChange={handleChange}
                            style={textboxStyle}
                          />
                        </label>
                      </div>
                    </>
                  )}

                  {/* Min Max Characters */}
                  {["INPUTMULTILINE"].includes(selectedControl.controlName) && (
                    <>
                      <div>
                        <label>
                          Min Character:
                          <input
                            type="text"
                            name="min"
                            value={updatedItem?.min || ""}
                            onChange={handleChange}
                            style={textboxStyle}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Max Character :
                          <input
                            type="text"
                            name="max"
                            value={updatedItem.max || ""}
                            onChange={handleChange}
                            style={textboxStyle}
                          />
                        </label>
                      </div>
                    </>
                  )}
                  {["FILEUPLOAD"].includes(selectedControl.controlName) && (
                    <>
                      <div>
                        <label>
                          Max file allowence :
                          <input
                            type="number"
                            name="maxFile"
                            value={updatedItem?.maxFile || 1}
                            onChange={handleChange}
                            style={textboxStyle}
                            min={1}
                            max={10}
                            defaultValue={updatedItem?.maxFile || 1}
                          />
                          Max size allowence :
                          <input
                            type="number"
                            name="maxSize"
                            value={updatedItem?.maxSize || 2}
                            onChange={handleChange}
                            style={textboxStyle}
                            max={10}
                            defaultValue={updatedItem?.maxSize || 2}
                          />
                        </label>
                      </div>
                    </>
                  )}
                  {/* Width */}
                  <div>
                    <label>
                      Width :
                      <input
                        type="number"
                        name="width"
                        min={0}
                        max={100}
                        defaultValue={updatedItem?.width || 100}
                        value={updatedItem?.width || 100}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Hide Label :
                      <input
                        type="checkbox"
                        name="hideLabel"
                        className="toggle-switch"
                        // defaultValue={updatedItem?.hideLabel || false}
                        checked={updatedItem?.hideLabel}
                        onChange={handleSwitchChange}
                      />
                    </label>
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
              <div className="m-t-20"></div>
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
