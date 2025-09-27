import React from "react";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`w-full p-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
}
