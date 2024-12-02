import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { FormPublishStatus } from "../../utils/formBuilderUtils";

const FormLayoutComponent = (props) => {
  const navigate = useNavigate();
  const { template, createdFormLayout, setOpenDialog, template_id } = props;

  return (
    <>
      <div
        className={`singleFormWrap ${
          createdFormLayout ? "created-form-layout" : "new-form-layout"
        } `}
      >
        <div
          onClick={() => {
            if (setOpenDialog) {
              setOpenDialog(true);
            }
          }}
        >
          <div className="formDetail">
            {createdFormLayout ? (
              <h3 className="title">Form name : {template.formName}</h3>
            ) : (
              <h3 onClick={() => setOpenDialog(true)} className="nameAction">
                + Create Form
              </h3>
            )}

            {template_id ? (
              <>
                <h3
                  onClick={() => navigate(`/${template_id}/formpreview`)}
                  className="nameAction"
                >
                  Preview Form
                  <svg
                    fill="#000000"
                    height="20px"
                    width="50px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xml:space="preserve"
                  >
                    <path
                      id="XMLID_27_"
                      d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
               s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
               c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
                    />
                  </svg>
                </h3>
                <h3
                  onClick={() => navigate(`/formbuilder/${template_id}`)}
                  className="nameAction"
                >
                  Edit Form
                  <svg
                    fill="#000000"
                    height="20px"
                    width="50px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xml:space="preserve"
                  >
                    <path
                      id="XMLID_27_"
                      d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
               s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
               c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
                    />
                  </svg>
                </h3>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayoutComponent;
