import React from "react";

export const TimeField = ({ item, value, onChange }) => {
  return (
    <div>
      <input
        type="time"
        value={value || ""}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
    </div>
  );
};
