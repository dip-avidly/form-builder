import React from "react";

export const TextField = ({ item, value, onChange, error }) => {
  console.log("asdasd item.dataType: ", item.dataType, error);
  return (
    <div>
      <input
        type={"text"}
        placeholder={item.placeholder}
        value={value || ""}
        onChange={(e) => onChange(item.id, e.target.value)}
      />
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
