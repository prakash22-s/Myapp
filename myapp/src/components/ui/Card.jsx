// src/components/ui/Card.jsx
import React from "react";
import clsx from "clsx";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "bg-card text-card-foreground rounded-lg shadow-sm border border-border p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={clsx("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h2 className={clsx("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={clsx("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={clsx("mt-2", className)} {...props}>
      {children}
    </div>
  );
}
