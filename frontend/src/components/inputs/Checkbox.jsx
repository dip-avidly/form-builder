import React from "react";

export const Checkbox = ({ item, value, onChange }) => {
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
};