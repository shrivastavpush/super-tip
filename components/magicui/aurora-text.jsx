"use client";

import React, { memo } from "react";

export const AuroraText = memo(({
  children,
  className = "",
  colors = ["#22c55e", "#16a34a", "#15803d", "#166534"],
  speed = 2
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]
      })`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${10 / speed}s`,
  };

  return (
    <h1 className={`relative inline-block text-center ${className}`}>
      <span className="sr-only">{children}</span>
      <span
        className="text-8xl font-extrabold relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
        style={gradientStyle}
        aria-hidden="true">
        {children}
      </span>
    </h1>
  );
});

AuroraText.displayName = "AuroraText";
