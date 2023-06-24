import React from "react";

type Props = {
  className?: string;
  size?: number;
};

export default function Loading({ className, size = 32 }: Props) {
  return (
    <div
      className={`spinner-border text-primary ${className}`}
      style={{ width: size, height: size }}
      role="status"
    >
      <span className="sr-only" />
    </div>
  );
}
