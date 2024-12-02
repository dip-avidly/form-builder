import React from "react";

export const TimeField = ({ item, value, onChange }) => {
  return (
    <div>
      <input
        type="time"
        value={value || ""}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
    </div>
  );
};
