import React from "react";
import { FormControlNames } from "../../../../utils/formBuilderUtils";
import SignatureCanvas from "react-signature-canvas";
const RenderItem = ({ item, value, onChange, error }) => {
  console.log("============", error);
  switch (item.controlName) {
    case FormControlNames.INPUTTEXTFIELD:
      return (
        <div>
          <input
            type={item.dataType || "text"}
            placeholder={item.placeholder}
            style={{
              width: "100%",
              padding: "10px",
              border: `1px solid ${error ? "red" : "#ccc"}`,
              borderRadius: "4px",
            }}
            value={value || ""}
            onChange={(e) => onChange(item.id, e.target.value)}
          />
          {error && (
            <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
          )}
        </div>
      );

    case FormControlNames.INPUTMULTILINE:
      return (
        <div>
          <textarea
            placeholder={item.placeholder}
            rows={item.rows || 3}
            style={{
              width: "100%",
              padding: "10px",
              border: `1px solid ${error ? "red" : "#ccc"}`,
              borderRadius: "4px",
            }}
            value={value || ""}
            onChange={(e) => onChange(item.id, e.target.value)}
          />
          {error && (
            <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
          )}
        </div>
      );

    case FormControlNames.CHECKBOX:
      return (
        <div style={{ margin: "10px 0" }}>
          <label>
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(item.id, e.target.checked)}
            />
            {item.placeholder}
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
                name={item.controlName + item.id}
                value={i.value}
                checked={value === i.value}
                onChange={(e) => onChange(item.id, e.target.value)}
              />
              {i.label}
            </label>
          ))}
          {error && (
            <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
          )}
        </div>
      );

    case FormControlNames.SELECTDROPDOWN:
      return (
        <div>
          <select
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            value={value || ""}
            onChange={(e) => onChange(item.id, e.target.value)}
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
            value={value || ""}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            onChange={(e) => onChange(item.id, e.target.value)}
          />
        </div>
      );

    case FormControlNames.TIMEFIELD:
      return (
        <div>
          <input
            type="time"
            value={value || ""}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            onChange={(e) => onChange(item.id, e.target.value)}
          />
        </div>
      );

    case FormControlNames.FILEUPLOAD:
      return (
        <div>
          <input
            type="file"
            id={item.controlName + item.id}
            style={{ display: "none" }}
            onChange={(e) => onChange(item.id, e.target.files[0])}
          />
          <label
            htmlFor={item.controlName + item.id}
            style={{
              display: "inline-block",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {item.controlName === FormControlNames.IMAGEUPLOAD ? (
              <i className="far fa-image"></i>
            ) : (
              <i className="fas fa-cloud-upload-alt"></i>
            )}
          </label>
        </div>
      );
    case FormControlNames.IMAGEUPLOAD:
      return (
        <div>
          <input
            type="file"
            id={item.controlName + item.id}
            style={{ display: "none" }}
            onChange={(e) => onChange(item.id, e.target.files[0])}
          />
          <label
            htmlFor={item.controlName + item.id}
            style={{
              display: "inline-block",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {item.controlName === FormControlNames.IMAGEUPLOAD ? (
              <i className="far fa-image"></i>
            ) : (
              <i className="fas fa-cloud-upload-alt"></i>
            )}
          </label>
        </div>
      );

    case FormControlNames.TOGGLE:
      return (
        <div>
          <label>
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(item.id, e.target.checked)}
            />
            <span style={{ marginLeft: "8px" }}>{item.placeholder}</span>
          </label>
        </div>
      );

    case FormControlNames.CHECKLIST:
      return (
        <div>
          {item.items?.map((i) => (
            <label key={i.value}>
              <input
                type="checkbox"
                checked={value?.includes(i.value)}
                onChange={(e) =>
                  onChange(
                    item.id,
                    e.target.checked
                      ? [...(value || []), i.value]
                      : value.filter((v) => v !== i.value)
                  )
                }
              />
              {i.label}
            </label>
          ))}
        </div>
      );

    case FormControlNames.SIGNATURE:
      // useEffect(() => {
      //   // Check if value is provided and the signatureRef is set
      //   if (value && item.signatureRef && item.signatureRef._sigPad) {
      //     const img = new Image();
      //     img.src = value;
      //     img.onload = () => {
      //       item.signatureRef._sigPad.fromDataURL(value); // Load base64 data if available
      //     };
      //   }
      // }, [value, item.signatureRef]); // Re-run if value or signatureRef changes

      return (
        <div>
          <SignatureCanvas
            ref={(ref) => (item.signatureRef = ref)} // Store ref for clearing or getting data
            penColor="black" // Customize pen color
            canvasProps={{
              width: 500,
              height: 200,
              className: "sigCanvas",
              style: {
                border: `1px solid ${error ? "red" : "#ccc"}`,
                borderRadius: "4px",
              },
            }}
            onEnd={() => {
              // Capture data on signature complete
              const signatureData = item.signatureRef
                .getTrimmedCanvas()
                .toDataURL("image/png");
              onChange(item.id, signatureData);
            }}
          />
          <button
            type="button"
            onClick={() => {
              item.signatureRef.clear(); // Clear signature
              onChange(item.id, ""); // Clear form value
            }}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: "#ff4d4f",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear Signature
          </button>
          {error && (
            <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
          )}
        </div>
      );

    case FormControlNames.MULTICHOICES:
      return <div>Multi-Choices Component Placeholder</div>;

    case FormControlNames.SCANCODE:
      return <div>Scan Code Component Placeholder</div>;

    case FormControlNames.VERIFIEDID:
      return <div>Verified ID Component Placeholder</div>;

    default:
      return <div>Unknown Component</div>;
  }
};

export default RenderItem;
