import React from "react";

export const RadioGroup = ({ item, value, onChange, error }) => {
  return (
    <div>
      {item.items?.map((i) => (
        <label key={i.value} style={{ marginRight: "10px" }}>
          <input
            type="radio"
            name={item.controlName + item.id}
            value={i.value}
            checked={value === i.value}
            onChange={(e) => onChange(item.id, e.target.value)}
          />
          {i.label}
        </label>
      ))}
      {error && (
        <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
      )}
    </div>
  );
};
