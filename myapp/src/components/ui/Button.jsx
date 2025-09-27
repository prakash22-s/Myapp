import React from "react";
import clsx from "clsx";

export function Button({ children, variant = "default", size = "md", className, ...props }) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "bg-transparent hover:bg-muted",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-background hover:bg-muted",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button className={clsx(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
