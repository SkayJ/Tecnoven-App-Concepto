import React from "react";

export default function BrandMark({ className = "h-9 w-9" }) {
  return (
    <div
      className={`${className} overflow-hidden rounded-[10px] bg-white`}
      style={{ boxShadow: "none" }}
    >
      <img
        src="/img/TecnoVen.PNG"
        alt="Tecnoven logo"
        className="h-full w-full object-cover"
        style={{ filter: "none" }}
      />
    </div>
  );
}