import React from "react";

export const Checkbox = ({ item, value, onChange, error }) => {
  return (
    <div style={{ margin: "10px 0", width: `${item?.width || 100}%` }}>
      <label>
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(item.id, e.target.checked)}
        />
        {item.placeholder}
      </label>
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
