import React from "react";
import { Formik } from "formik";
import RenderItem from "./RenderItem";
import "../../form-preview.scss";
import axios from "axios";

const previewWindowStyle = {
  backgroundColor: "white",
  height: "81vh",
  overflowY: "scroll",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "800px",
  padding: "2rem",
};

const StepperFormPreview = (props) => {
  const { formLayoutComponents, screenType, defaultValues, formId } = props;

  const initialValues = { ...defaultValues }; // Populate default values based on the response object

  const validateForm = (values) => {
    const newErrors = {};

    formLayoutComponents.forEach((step) => {
      step.children.forEach((field) => {
        if (
          field.required &&
          (!values[field.id] || values[field.id].trim() === "")
        ) {
          newErrors[field.id] = `${field.labelName} is required`;
        }
      });
    });
    return newErrors;
  };

  const handleSubmit = async (value) => {
    await axios.post(`http://localhost:3000/form-entry/${formId}`, {
      data: value,
    });
  };

  const isMobile = screenType === "mobile";

  return (
    <>
      {formLayoutComponents.length > 0 ? (
        <div className="form-preview-container">
          <div
            style={{
              ...previewWindowStyle,
              width: isMobile ? "500px" : "initial",
            }}
            className="p-20"
          >
            <div className="main-form">
              <Formik
                initialValues={initialValues}
                validate={(values) => validateForm(values)}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValidating,
                  isSubmitting,
                }) => {
                  console.log("isSubmitting: ", isSubmitting, isValidating);
                  return (
                    <form onSubmit={handleSubmit} style={{ minWidth: "100%" }}>
                      {formLayoutComponents.map((component, index) => (
                        <div key={index}>
                          <div className="my-4">
                            <h4>{component.container.heading}</h4>
                            <p>{component.container.subHeading}</p>
                          </div>

                          {component.children.map((child) => (
                            <div key={child.id} className="my-4">
                              <h5>
                                {child.labelName + (child.required ? " *" : "")}
                              </h5>
                              {child.description !== "" ? (
                                <div className="mt-1">
                                  <p>{child.description}</p>
                                </div>
                              ) : null}
                              <RenderItem
                                item={child}
                                value={values[child.id]}
                                onChange={(fieldId, fieldValue) =>
                                  handleChange({
                                    target: { id: fieldId, value: fieldValue },
                                  })
                                }
                                error={
                                  errors[child.id] ? errors[child.id] : null
                                }
                              />
                              {/* {errors[child.id] && touched[child.id] && (
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  marginTop: "4px",
                                }}
                              >
                                {errors[child.id]}
                              </div>
                            )} */}
                            </div>
                          ))}

                          {/* Add a horizontal line between steps, except after the last step */}
                          {index < formLayoutComponents.length - 1 && (
                            <hr
                              style={{
                                margin: "2rem 0",
                                border: "none",
                                borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                              }}
                            />
                          )}
                        </div>
                      ))}

                      <div className="text-right">
                        <input
                          type="submit"
                          className="btn btn-primary btn-shadow m-t-20 m-r-10"
                          value="Submit"
                        />
                      </div>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-t-30">
          <p>You need to add Containers and Controls to see output here.</p>
        </div>
      )}
    </>
  );
};

export default StepperFormPreview;
