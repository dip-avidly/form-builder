import React from "react";

export const FileUpload = ({ item, onChange }) => {
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
        <i className="fas fa-cloud-upload-alt"></i>
      </label>
    </div>
  );
};
