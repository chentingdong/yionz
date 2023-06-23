"use client";

import { AiFillCloseCircle, AiFillPlusCircle } from "react-icons/ai";

import Loading from "./loading";
import React from "react";

type Props = {
  action: "delete" | "create";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  size?: "lg" | "md" | "sm";
  title?: string;
  className?: string;
  loading?: boolean;
};

export default function ActionButton({
  onClick,
  action,
  size,
  loading,
  title,
  className,
}: Props) {
  const sizeNumber = (size?: string) => {
    switch (size) {
      default:
      case "md":
        return 24;
      case "lg":
        return 32;
      case "sm":
        return 18;
    }
  };
  return (
    <button
      className={`btn btn-link rounded-circle p-0 ${className}`}
      onClick={onClick}
      title={title}
    >
      {loading && <Loading size={sizeNumber(size)} />}
      {!loading && action === "delete" && (
        <AiFillCloseCircle size={sizeNumber(size)} className="rounded-circle " />
      )}
      {!loading && action === "create" && (
        <AiFillPlusCircle size={sizeNumber(size)} className="rounded-circle " />
      )}
    </button>
  );
}
