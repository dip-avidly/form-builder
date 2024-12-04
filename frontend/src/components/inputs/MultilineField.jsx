import React from "react";

export const MultilineField = ({ item, value, onChange, error }) => {
  return (
    <div style={{ width: `${item?.width || 100}%` }}>
      <textarea
        placeholder={item.placeholder}
        rows={item.rows || 3}
        value={value || ""}
        style={{ width: `${item?.width || 100}%` }}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
