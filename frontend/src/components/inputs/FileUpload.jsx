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
      <label htmlFor={item.controlName + item.id}>
        <i className="fas fa-cloud-upload-alt"></i>
      </label>
    </div>
  );
};
