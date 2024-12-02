import React from "react";

export const MultilineField = ({ item, value, onChange, error }) => {
  return (
    <div>
      <textarea
        placeholder={item.placeholder}
        rows={item.rows || 3}
        style={{
          width: "100%",
          padding: "10px",
          border: `1px solid ${error ? "red" : "#ccc"}`,
          borderRadius: "4px",
        }}
        value={value || ""}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
      {error && (
        <div style={{ color: "red", fontSize: "12px" }}>{error}</div>
      )}
    </div>
  );
};
