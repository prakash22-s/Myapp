import React, { useState } from "react";

export function Select({ children, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export const SelectTrigger = ({ children }) => (
  <div className="mb-1 text-sm font-medium text-gray-700">{children}</div>
);

export const SelectValue = ({ placeholder }) => (
  <span className="text-gray-400">{placeholder}</span>
);

export const SelectContent = ({ children }) => <>{children}</>;
