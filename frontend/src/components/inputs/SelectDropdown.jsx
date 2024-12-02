import React from "react";

export const SelectDropdown = ({ item, value, onChange }) => {
  return (
    <div>
      <select
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
