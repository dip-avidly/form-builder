import React, { useEffect, useRef } from "react";
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
import axios from "axios";
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
        <div style={{ width: `${item?.width || 100}%` }}>
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
      const signatureRef = useRef(null);
      const defaultSignature = value?.length > 0 ? value[0]?.url : undefined;

      // Set default signature image when component mounts
      useEffect(() => {
        defaultPublicUrl(defaultSignature);
      }, [defaultSignature]);

      const defaultPublicUrl = async (defaultSignature) => {
        if (signatureRef.current && defaultSignature) {
          const canvas = signatureRef.current.getCanvas(); // Get the raw canvas element
          const ctx = canvas.getContext("2d"); // Get the 2D context of the canvas
          const img = new Image();
          img.crossOrigin = "http://localhost:3000"; // Set cross-origin to anonymous
          if (defaultSignature) {
            const { data } = await axios.post(
              "http://localhost:3000/get-public-url",
              { url: defaultSignature }
            );
            img.src = data?.data; // URL of the image from S3
            img.onload = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear any existing signature
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the default image onto the canvas
            };
            img.onerror = (error) => {
              console.error("Image loading error:", error);
            };
          }
        }
      };

      return (
        <div style={{ width: `${item?.width || 100}%` }}>
          <SignatureCanvas
            ref={signatureRef}
            penColor="black"
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
              const canvas = signatureRef.current.getTrimmedCanvas();
              canvas.toBlob((blob) => {
                const signatureFile = new File(
                  [blob],
                  `${item.id}_signature.png`,
                  {
                    type: "image/png",
                  }
                );
                onChange(item.id, [signatureFile]);
              }, "image/png");
            }}
          />
          <button
            type="button"
            onClick={() => {
              signatureRef.current.clear();
              onChange(item.id, "");
            }}
          >
            Clear Signature
          </button>
          {error && (
            <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
          )}
        </div>
      );

    case FormControlNames.EMAIL:
      return <TextField {...props} />;
    case FormControlNames.PHONE:
      return <TextField {...props} />;

    case FormControlNames.MULTICHOICES:
      return <div>Multi-Choices Component Placeholder</div>;

    case FormControlNames.SCANCODE:
      return <div>Scan Code Component Placeholder</div>;

    case FormControlNames.VERIFIEDID:
      return <div>Verified ID Component Placeholder</div>;

    case FormControlNames.HTML:
      return <p></p>;

    default:
      return <div>Unknown Component</div>;
  }
};

export default RenderItem;
