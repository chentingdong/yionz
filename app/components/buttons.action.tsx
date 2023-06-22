import { AiOutlineCloseCircle } from "react-icons/ai";
import React from "react";

type Props = {
  action: 'delete' | 'create';
  onClick: () => {};
  size?: 'bg' | 'md' | 'sm';
  className?: string;
};

export default function ActionButton({ onClick, action, size = 'md', className }: Props) {
  const sizeNumber = (size: string) => {
    switch (size) {
      default:
      case 'md':
        return 24;
      case 'lg':
        return 32;
      case 'sm':
        return 12;
    }
  };
  return (
    <button
      className={`btn btn-link px-1 py-0 ${className}`}
      onClick={onClick}
    >
      {action === 'delete' && <AiOutlineCloseCircle size={sizeNumber(size)} />}
    </button>
  );
}
