import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateID } from "../../utils/common";
import axios from "axios";

const textboxStyle = {
  minWidth: "100%",
  maxWidth: "100%",
  marginTop: "20px",
};

const dialogStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  width: "80%",
  maxWidth: "800px",
  zIndex: 1000,
};

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
};

const NewFormDialogComponent = (props) => {
  const navigate = useNavigate();

  const [creatingForm, setCreatingForm] = useState(false);

  const [newFormData, setNewFormData] = useState({
    formName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newFormData.formName === "") {
      // showModalStrip("danger", "Form name cannot be empty", 5000);
      return;
    }
    setCreatingForm(true);
    try {
      const template = {
        id: generateID(),
        formName: newFormData.formName,
        createdAt: new Date(),
        creator: "Test User",
        formLayoutComponents: [],
        lastPublishedAt: 0,
        publishHistory: [],
        publishStatus: "draft",
        updatedAt: 0,
      };
      const {data:data} = await axios.post("http://localhost:3000/create-forms", {name:newFormData.formName});
      
      navigate(`/formbuilder/${data?.data?._id}`);
    } catch (ex) {
      // showModalStrip("danger", "Error occurred while creating a new Form", 5000);
    }
  };

  if (!props.openDialog) return null;

  return (
    <>
      <div style={backdropStyle} onClick={() => props.setOpenDialog(false)} />
      <div style={dialogStyle}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <span
            style={{ padding: "9px", cursor: "pointer" }}
            onClick={() => props.setOpenDialog(false)}
          >
            <i className="fas fa-arrow-left"></i>
          </span>
          <span
            style={{ padding: "9px", cursor: "pointer" }}
            onClick={() => props.setOpenDialog(false)}
          >
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="p-4" style={{ minHeight: "500px" }}>
          <div
            style={{
              maxWidth: "360px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h4>Enter the following details:</h4>
            <form onSubmit={handleFormSubmit} style={{ minWidth: "100%" }}>
              <div>
                <label htmlFor="formName">Form Name</label>
                <input
                  type="text"
                  id="formName"
                  name="formName"
                  value={newFormData.formName}
                  onChange={handleInputChange}
                  style={textboxStyle}
                  placeholder="Enter form name"
                />
              </div>
              <button
                className="btn btn-light btn-shadow m-t-20 m-r-10"
                type="submit"
                disabled={creatingForm}
              >
                {creatingForm ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading
                  </>
                ) : (
                  "Create Form"
                )}
              </button>
              <input
                type="button"
                className="btn btn-light btn-shadow m-t-20 m-l-0"
                value="Cancel"
                disabled={creatingForm}
                onClick={() => props.setOpenDialog(false)}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewFormDialogComponent;
