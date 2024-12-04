import React from "react";

export const TextField = ({ item, value, onChange, error }) => {
  return (
    <div style={{ width: `${item?.width || 100}%` }}>
      <input
        type={"text"}
        style={{ width: `${item?.width || 100}%` }}
        placeholder={item.placeholder}
        value={value || ""}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
