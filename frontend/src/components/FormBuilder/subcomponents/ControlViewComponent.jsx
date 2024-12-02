import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  FormControlNames,
  FormItemTypes,
} from "../../../utils/formBuilderUtils";

const selectedColor = "var(--primary)";
const nonSelectedColor = "rgba(0,0,0,0.1)";

const renderItem = (item) => {
  switch (item.controlName) {
    case FormControlNames.INPUTTEXTFIELD:
      return (
        <div>
          <input
            type={item.dataType || "text"}
            placeholder={item.placeholder}
            className="form-control"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled
          />
        </div>
      );

    case FormControlNames.INPUTMULTILINE:
      return (
        <div>
          <textarea
            placeholder={item.placeholder}
            rows={item.rows || 3}
            className="form-control"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled
          />
        </div>
      );

    case FormControlNames.CHECKBOX:
      return (
        <div style={{ margin: "10px 0" }}>
          <label>
            <input type="checkbox" disabled />
            <span style={{ marginLeft: "8px" }}>{item.placeholder}</span>
          </label>
        </div>
      );

    case FormControlNames.RADIOGROUP:
      return (
        <div>
          {item.items?.map((i) => (
            <label key={i.value} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name={`${item.controlName}${item.id}`}
                value={i.value}
                disabled
              />
              {i.label}
            </label>
          ))}
        </div>
      );

    case FormControlNames.SELECTDROPDOWN:
      return (
        <div>
          <select
            className="form-control"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled
          >
            {item.items?.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      );

    case FormControlNames.DATEFIELD:
      return (
        <div>
          <input
            type="date"
            className="form-control"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled
          />
        </div>
      );

    case FormControlNames.TIMEFIELD:
      return (
        <div>
          <input
            type="time"
            className="form-control"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled
          />
        </div>
      );

    case FormControlNames.FILEUPLOAD:
    case FormControlNames.IMAGEUPLOAD:
    case FormControlNames.SCANCODE:
      return (
        <div>
          <input
            type="file"
            id={`${item.controlName}${item.id}`}
            style={{ display: "none" }}
            disabled
          />
          <label
            htmlFor={`${item.controlName}${item.id}`}
            style={{
              display: "inline-block",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "4px",
              cursor: "not-allowed",
            }}
          >
            <i className="fas fa-cloud-upload-alt"></i>
          </label>
        </div>
      );

    case FormControlNames.SIGNATURE:
      return (
        <div className="signature-wrapper" style={{ textAlign: "center" }}>
          <label>
            <span style={{ fontStyle: "italic", color: "#888" }}>
              Sign Here
            </span>
          </label>
        </div>
      );

    case FormControlNames.TOGGLE:
      return (
        <div>
          <label>
            <input
              type="checkbox"
              className="toggle-switch"
              disabled
              style={{ marginRight: "10px" }}
            />
            {item.placeholder}
          </label>
        </div>
      );

    case FormControlNames.CHECKLIST:
      return (
        <div>
          {item.items?.map((i) => (
            <label key={i.value} style={{ display: "block", margin: "5px 0" }}>
              <input type="checkbox" disabled />
              <span style={{ marginLeft: "8px" }}>{i.label}</span>
            </label>
          ))}
        </div>
      );

    case FormControlNames.EMAIL:
      return (
        <div>
          <input
            type={item.dataType || "text"}
            placeholder={item.placeholder}
            className="form-control"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled
          />
        </div>
      );

    case FormControlNames.PHONE:
      return (
        <div>
          <input
            type={item.dataType || "text"}
            placeholder={item.placeholder}
            className="form-control"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            disabled
          />
        </div>
      );

    case FormControlNames.HTML:
      return <></>;

    default:
      return <div style={{ color: "red" }}>Unknown Control</div>;
  }
};

function ControlViewComponent(props) {
  const {
    item,
    deleteControl,
    containerId,
    selectControl,
    selectedControl,
    index,
    moveControl,
  } = props;

  // Style for the control wrapper
  let wrapperStyle = {
    border: `1px solid ${nonSelectedColor}`,
    borderRadius: "9px",
    marginBottom: "20px",
    backgroundColor: "white",
    cursor: "pointer",
    boxShadow: "0 9px 90px #efefef",
  };

  if (
    selectedControl &&
    item.id === selectedControl.id &&
    item.type === selectedControl.type
  ) {
    wrapperStyle.border = `2px solid ${selectedColor}`;
  }

  const handleDeleteControl = (event) => {
    deleteControl(item.id, containerId);
    if (event.stopPropagation) event.stopPropagation();
  };

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: FormItemTypes.CONTROL,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(draggedItem, monitor) {
      if (!ref.current) return;

      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      console.log("first", hoverClientY);
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveControl(draggedItem, dragIndex, hoverIndex, containerId);
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: FormItemTypes.CONTROL,
    item: () => ({ ...item, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref)); // Combine drag and drop refs

  const opacity = isDragging ? 0 : 1; // Make the dragged item semi-transparent

  return (
    <div
      ref={ref}
      className="control-wrapper"
      style={{ ...wrapperStyle, opacity }}
      onClick={() => selectControl(item)}
      data-handler-id={handlerId} // For debugging and identification
    >
      <div className="control-header">
        <h5>{item.labelName + (item.required ? " *" : "")}</h5>
        <div className="control-actions">
          <span style={{ cursor: "grab" }}>Move Icon</span>
          <span onClick={handleDeleteControl}>Delete</span>
        </div>
      </div>
      {item.description && <p>{item.description}</p>}
      <div className="control-content">{renderItem(item)}</div>
    </div>
  );
}

export default ControlViewComponent;
