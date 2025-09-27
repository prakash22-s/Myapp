import React from "react";
import clsx from "clsx";

export function Badge({ children, variant = "default", className, ...props }) {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold";

  const variants = {
    default: "bg-muted text-muted-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    outline: "border border-border text-foreground",
  };

  return (
    <span className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
