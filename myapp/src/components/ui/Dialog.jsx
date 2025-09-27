import React from "react"

export function Dialog({ open, onClose, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>
}

export function DialogContent({ children }) {
  return <div className="mt-2">{children}</div>
}
