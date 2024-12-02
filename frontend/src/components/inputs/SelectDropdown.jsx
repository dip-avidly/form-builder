import React from "react";

export const SelectDropdown = ({ item, value, onChange, error }) => {
  return (
    <div>
      <select
        value={value || ""}
        defaultValue={value || undefined}
        is
        onChange={(e) => onChange(item.id, e.target.value)}
      >
        <option key={0} value={undefined}>
          Please select {item?.labelName}
        </option>
        {item.items?.map((i) => (
          <option key={i.value} value={i.value}>
            {i.label}
          </option>
        ))}
      </select>
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
