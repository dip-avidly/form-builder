import React from "react";

export const DateField = ({ item, value, onChange, error }) => {
  return (
    <div style={{ width: `${item?.width || 100}%` }}>
      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(item.id, e.target.value)}
        min={item?.min}
        max={item?.max}
      />
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
