import React from "react";

export const ImageUpload = ({ item, onChange }) => {
  return (
    <div style={{ width: `${item?.width || 100}%` }}>
      <input
        type="file"
        accept="image/*"
        id={item.controlName + item.id}
        style={{}}
        onChange={(e) => onChange(item.id, e.target.files[0])}
      />
      <label htmlFor={item.controlName + item.id}>
        <i className="far fa-image"></i>
      </label>
    </div>
  );
};
