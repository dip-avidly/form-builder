import React from "react";

export const Toggle = ({ item, value, onChange, error }) => {
  return (
    <div>
      <label style={{ display: "inline-flex", alignItems: "center" }}>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            width: "60px",
            height: "34px",
          }}
        >
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(item.id, e.target.checked)}
            style={{
              opacity: 0,
              width: 0,
              height: 0,
            }}
          />
          <span
            style={{
              position: "absolute",
              cursor: "pointer",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: value ? "#2196F3" : "#ccc",
              transition: ".4s",
              borderRadius: "34px",
              "&:before": {
                position: "absolute",
                content: '""',
                height: "26px",
                width: "26px",
                left: value ? "4px" : "30px",
                bottom: "4px",
                backgroundColor: "white",
                transition: ".4s",
                borderRadius: "50%",
              },
            }}
          />
        </div>
        <span style={{ marginLeft: "10px" }}>{item?.placeholder}</span>
      </label>
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
