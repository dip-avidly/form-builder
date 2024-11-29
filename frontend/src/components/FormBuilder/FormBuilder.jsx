import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropContainerComponent from "./subcomponents/DropContainerComponent";
import EditPropertiesComponent from "./subcomponents/EditPropertiesComponent";
import LeftSidebar from "./LeftSidebar";
import useFormBuilder from "./hooks/useFormBuilder";
import useFormPreview from "./hooks/useFormPreview";
import FormPreview from "./subcomponents/FormPreview";
import { useNavigate } from "react-router-dom";
import "./unified-styles.scss";
import { FormItemTypes } from "../../utils/formBuilderUtils";

const FormBuilder = (props) => {
  const {
    handleItemAdded,
    saveForm,
    deleteContainer,
    deleteControl,
    editContainerProperties,
    editControlProperties,
    moveControl,
    moveControlFromSide,
    selectControl,
    selectedTemplate,
    formLayoutComponents,
    selectedControl,
  } = useFormBuilder({ template: props.template });

  const { showPreview, openPreviewDrawer, closePreviewDrawer } =
    useFormPreview();

  const navigate = useNavigate();
  const classes = {
    textField: {
      minWidth: "100%",
      maxWidth: "100%",
    },
    sidebarHeight: {
      height: "calc(100vh - 63px);",
      overflowY: "auto",
    },
  };

  return (
    <>
      {!false ? (
        <>
          <DndProvider backend={HTML5Backend}>
            <div className="form-builder-container">
              <div className="left-sidebar">
                <LeftSidebar
                  handleItemAdded={handleItemAdded}
                  formLayoutComponents={formLayoutComponents}
                />
              </div>
              <div className="main-content">
                <div className="form-content">
                  <div className="content-header">
                    <h4 className="form-title">{selectedTemplate?.formName}</h4>
                    <div className="action-buttons">
                      <button onClick={() => navigate("/")} className="btn">
                        Cancel
                      </button>
                      <button onClick={saveForm} className="btn btn-primary">
                        Save
                      </button>
                      <button
                        onClick={() => openPreviewDrawer()}
                        className="btn"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                  <div
                    className="p-20"
                    style={{
                      overflowY: "auto",
                      height: "calc(100vh - 180px)",
                    }}
                  >
                    <div className="row mb-5 AllLayout">
                      {formLayoutComponents.map((layout, ind) => {
                        return (
                          <DropContainerComponent
                            key={layout.container.id}
                            index={ind}
                            layout={layout.container}
                            selectedControl={selectedControl}
                            childrenComponents={layout.children}
                            deleteContainer={deleteContainer}
                            deleteControl={deleteControl}
                            selectControl={selectControl}
                            accept={FormItemTypes.CONTROL}
                            moveControl={moveControl}
                          />
                        );
                      })}
                    </div>
                    <div className="row mb-5 NewStep">
                      <DropContainerComponent
                        accept={FormItemTypes.CONTAINER}
                        name={"Parent Component"}
                        handleItemAdded={handleItemAdded}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="edit-properties">
                <EditPropertiesComponent
                  selectedControl={selectedControl}
                  selectControl={selectControl}
                  formLayoutComponents={formLayoutComponents}
                  moveControlFromSide={moveControlFromSide}
                  editContainerProperties={editContainerProperties}
                  editControlProperties={editControlProperties}
                />
              </div>
            </div>
            {/* </div> */}
            {/* Preview Drawer */}
            <FormPreview
              screenType="mobile"
              showPreview={showPreview}
              formLayoutComponents={formLayoutComponents}
              closePreviewDrawer={closePreviewDrawer}
            />
          </DndProvider>
        </>
      ) : (
        <>
          <div className="wrapper mt-5">
            <p className="text-center">
              Form Builder is only supported on desktop devices for now. Please
              switch to a desktop device.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default FormBuilder;
