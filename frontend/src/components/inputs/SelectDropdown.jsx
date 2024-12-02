import React from "react";

export const SelectDropdown = ({ item, value, onChange }) => {
  return (
    <div>
      <select
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        value={value || ""}
        onChange={(e) => onChange(item.id, e.target.value)}
      >
        {item.items?.map((i) => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </select>
    </div>
  );
};
