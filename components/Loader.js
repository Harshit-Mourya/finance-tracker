"use client";

import { Loader2 } from "lucide-react";

export default function Loader({ size = 24, className = "" }) {
  return (
    <div className="w-screen h-[50vh] flex justify-center items-center py-6">
      <Loader2
        className={`animate-spin text-gray-400 ${className}`}
        size={size}
      />
    </div>
  );
}
