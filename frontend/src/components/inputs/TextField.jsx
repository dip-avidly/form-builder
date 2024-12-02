import React from "react";

export const TextField = ({ item, value, onChange, error }) => {
  console.log('error123123123: ', error);
  return (
    <div>
      <input
        type={item.dataType || "text"}
        placeholder={item.placeholder}
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