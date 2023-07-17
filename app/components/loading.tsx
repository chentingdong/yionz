import React from "react";
import Skeleton from 'react-loading-skeleton'

type Props = {
  className?: string;
  size?: number;
};

export function Loading({ className, size = 32 }: Props) {
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

export function LoadingPage() {
  // You can add any UI inside Loading, including a Skeleton.
  return <Skeleton className='position-absolute' style={{top: 0}}/>
}