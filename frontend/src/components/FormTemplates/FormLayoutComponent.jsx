import React from "react";
// import { TemplateType } from "../../types/FormTemplateTypes";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { FormPublishStatus } from "../../utils/formBuilderUtils";
// import { IconButton } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import { deleteTemplate } from "../../redux/entities/formBuilderEntity";

const newFormLayout = {
  border: "1px dashed",
  width: "150px",
  height: "150px",
  fontSize: "2.7rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "9px",
};

const FormLayoutComponent = (props) => {


  const navigate = useNavigate();
  const { template, createdFormLayout, setOpenDialog } = props;

  return (
    <>
      <div className="col">
        <div
          className={`${
            createdFormLayout ? "created-form-layout" : "new-form-layout"
          } d-flex flex-column`}
        >
          <div style={{ width: "150px", height: "100%" }}>
            <div
              style={
                createdFormLayout
                  ? {
                      ...newFormLayout,
                      width: "100%",
                      border: "1px solid",
                    }
                  : newFormLayout
              }
              onClick={() => {
                if (createdFormLayout && template) {
                  navigate(`/formbuilder/${template.id}`);
                } else {
                  if (setOpenDialog) {
                    setOpenDialog(true);
                  }
                }
              }}
            >
              <i
                className={`fas ${
                  createdFormLayout ? "fa-journal-whills" : "fa-plus"
                }`}
              ></i>
            </div>
          </div>
          <h5
            className={`text-center mt-3 ${
              template && template.publishStatus === FormPublishStatus.PUBLISHED
                ? "text-success"
                : ""
            }`}
          >
            {createdFormLayout
              ? (template).formName
              : "Blank Form"}
          </h5>
          {/* {createdFormLayout ? (
            <>
              <IconButton aria-label="delete" onClick={()=>{
                if(confirm('Are you sure you want to delete the template?')){
                  dispatch(deleteTemplate(template?.id));
                }
              }}>
                <DeleteIcon />
              </IconButton>
            </>
          ) : null} */}
        </div>
      </div>
    </>
  );
};

export default FormLayoutComponent;
