import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import RenderItem from "./RenderItem";
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
  const generateValidationSchema = (formLayoutComponents) => {
    const schema = {};

    formLayoutComponents.forEach((step) => {
      step.children.forEach((field) => {
        if (field.required) {
          schema[field.id] = Yup.string()
            .trim()
            .required(`${field.labelName} is required`);
        } else if (field.type === "email") {
          schema[field.id] = Yup.string()
            .email("Invalid email address")
            .nullable();
        } else if (field.type === "number") {
          schema[field.id] = Yup.number()
            .typeError(`${field.labelName} must be a number`)
            .nullable();
        } else {
          schema[field.id] = Yup.string().nullable();
        }
      });
    });
    return Yup.object().shape(schema);
  };

  const handleSubmit = async (value) => {
    await axios.post(`http://localhost:3000/form-entry/${formId}`, {
      data: value,
    });
  };

  const isMobile = screenType === "mobile";

  const validationSchema = generateValidationSchema(formLayoutComponents); // Generate the schema dynamically

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
                validationSchema={validationSchema} // Use the generated Yup validation schema here
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => {
                  console.log("errors: ", errors);
                  return (
                    <form onSubmit={handleSubmit} style={{ minWidth: "100%" }}>
                      {formLayoutComponents.map((component, index) => (
                        <div key={index}>
                          <div className="my-4">
                            <h4>{component.container.heading}</h4>
                            <p>{component.container.subHeading}</p>
                          </div>

                          {component.children.map((child) => (
                            <div
                              key={child.id}
                              className="my-4 SingleComponent"
                            >
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
                          disabled={isSubmitting} // Disable submit button while submitting
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
