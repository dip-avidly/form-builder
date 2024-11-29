import React from "react";
import { useDrop } from "react-dnd";
import {
  FormContainerList,
  FormItemTypes,
} from "../../../utils/formBuilderUtils";
import ControlViewComponent from "./ControlViewComponent";
import "../unified-styles.scss";

const DropContainerComponent = (props) => {
  const {
    accept,
    layout,
    childrenComponents,
    index,
    deleteContainer,
    deleteControl,
    selectControl,
    selectedControl,
    handleItemAdded,
    moveControl,
  } = props;

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: accept,
    drop: () => layout,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor =
    accept && accept === FormItemTypes.CONTROL
      ? "rgba(0,0,0,0)"
      : "rgba(0,0,0,0.1)";
  let borderColor = "rgba(0,0,0,0.1)";
  // const borderBase = "1px solid";
  // let border;
  if (isActive) {
    backgroundColor = "rgba(46,212,182,0.4)";
  } else if (canDrop) {
    backgroundColor = "rgba(255,178,15,0.7)";
  }

  // if (accept === FormItemTypes.CONTROL) {
  //   border = borderBase + " " + borderColor;
  // }

  // Change border Color
  if (
    selectedControl &&
    selectedControl.itemType === layout?.itemType &&
    selectedControl.id === layout.id
  ) {
    borderColor = "rgb(255, 193, 7)";
  }

  const handleDeleteContainer = (event) => {
    if (deleteContainer) {
      deleteContainer(layout?.id);
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    }
  };

  return (
    <>
      <div
        className="col-12 container-drop"
        ref={drop}
        style={{
          backgroundColor,
          borderRadius: "10px",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        {accept === FormItemTypes.CONTAINER ? (
          <>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "90px" }}
            >
              <button
                onClick={() => {
                  if (handleItemAdded) {
                    handleItemAdded({ ...FormContainerList[0] });
                  }
                }}
              >
                <span style={{ marginRight: "9px" }}>
                  <i className="fa fa-plus"></i>
                </span>
                <span>Add a workflow step</span>
              </button>
            </div>
          </>
        ) : null}

        {accept === FormItemTypes.CONTROL ? (
          <>
            <div
              onClick={() => {
                if (selectControl) {
                  selectControl(layout);
                }
              }}
              className="container-header d-flex justify-content-between py-3 mb-3"
            >
              <div className="container-actions" style={{ fontSize: "1.1rem" }}>
                <span onClick={handleDeleteContainer}>delete</span>
              </div>
            </div>
            <h4>{layout?.heading}</h4>
            <p>{layout?.subHeading}</p>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ minHeight: "20vh", position: "relative" }}
            >
              {childrenComponents?.length === 0 ? (
                <>
                  <div>
                    <span style={{ marginRight: "9px" }}>
                      <i className="fa fa-plus"></i>
                    </span>
                    <span>Drop Field</span>
                  </div>
                </>
              ) : (
                <>
                  {childrenComponents?.map((component, ind) => {
                    return (
                      <ControlViewComponent
                        key={component.id}
                        item={component}
                        deleteControl={(controlId, containerId) => {
                          if (deleteControl) {
                            deleteControl(controlId, containerId);
                          }
                        }}
                        selectControl={(layout) => {
                          if (selectControl) {
                            selectControl(layout);
                          }
                        }}
                        selectedControl={selectedControl}
                        containerId={layout?.id}
                        index={ind}
                        moveControl={(
                          item,
                          dragIndex,
                          hoverIndex,
                          containerId
                        ) => {
                          if (moveControl) {
                            moveControl(
                              item,
                              dragIndex,
                              hoverIndex,
                              containerId
                            );
                          }
                        }}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default DropContainerComponent;
