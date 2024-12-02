import React from "react";

export const DateField = ({ item, value, onChange, error }) => {
  return (
    <div>
      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
