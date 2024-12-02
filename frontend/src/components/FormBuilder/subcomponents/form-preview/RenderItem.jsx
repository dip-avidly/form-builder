import React from "react";
import { FormControlNames } from "../../../../utils/formBuilderUtils";
import SignatureCanvas from "react-signature-canvas";
import { TextField } from "../../../inputs/TextField";
import { MultilineField } from "../../../inputs/MultilineField";
import { Checkbox } from "../../../inputs/Checkbox";
import { RadioGroup } from "../../../inputs/RadioGroup";
import { SelectDropdown } from "../../../inputs/SelectDropdown";
import { DateField } from "../../../inputs/DateField";
import { TimeField } from "../../../inputs/TimeField";
import { FileUpload } from "../../../inputs/FileUpload";
import { ImageUpload } from "../../../inputs/ImageUpload";
import { Toggle } from "../../../inputs/Toggle";
const RenderItem = (props) => {
  const { item, value, onChange, error } = props;
  switch (item.controlName) {
    case FormControlNames.INPUTTEXTFIELD:
      return <TextField {...props} />;

    case FormControlNames.INPUTMULTILINE:
      return <MultilineField {...props} />;

    case FormControlNames.CHECKBOX:
      return <Checkbox {...props} />;

    case FormControlNames.RADIOGROUP:
      return <RadioGroup {...props} />;

    case FormControlNames.SELECTDROPDOWN:
      return <SelectDropdown {...props} />;

    case FormControlNames.DATEFIELD:
      return <DateField {...props} />;

    case FormControlNames.TIMEFIELD:
      return <TimeField {...props} />;

    case FormControlNames.FILEUPLOAD:
      return <FileUpload {...props} />;
    case FormControlNames.IMAGEUPLOAD:
      return <ImageUpload {...props} />;

    case FormControlNames.TOGGLE:
      return <Toggle {...props} />;

    case FormControlNames.CHECKLIST:
      return (
        <div>
          {item.items?.map((i) => (
            <label key={i.value}>
              <input
                type="checkbox"
                checked={(value || "").split(",").includes(i.value)} // Split the string to check if the value is selected
                onChange={(e) => {
                  const currentValues = (value || "").split(","); // Convert the string to an array
                  const updatedValues = e.target.checked
                    ? [...currentValues, i.value] // Add the new value if checked
                    : currentValues.filter((v) => v !== i.value); // Remove the value if unchecked
                  onChange(item.id, updatedValues.join(",")); // Convert the array back to a comma-separated string
                }}
              />
              {i.label}
            </label>
          ))}
          {error && (
            <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
          )}
        </div>
      );
    case FormControlNames.SIGNATURE:
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
