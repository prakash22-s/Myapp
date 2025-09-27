import React, { useState, useRef, useEffect } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ open, children }) {
  if (!open) return null;
  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg z-10">
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
    >
      {children}
    </div>
  );
}
