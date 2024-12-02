import React from "react";

export const TextField = ({ item, value, onChange, error }) => {
  return (
    <div>
      <input
        type={item.dataType || "text"}
        placeholder={item.placeholder}
        value={value || ""}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
