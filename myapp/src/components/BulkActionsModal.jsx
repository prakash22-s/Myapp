"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, Clock, AlertCircle, Users } from "lucide-react"

export function BulkActionsModal({ selectedComplaints, isOpen, onClose, onBulkUpdate }) {
  const [action, setAction] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [assignTo, setAssignTo] = useState("")
  const [priority, setPriority] = useState("")
  const [remarks, setRemarks] = useState("")

  const handleBulkUpdate = () => {
    const updateData = {
      status: newStatus,
      assignTo,
      priority,
      remarks,
      complaintIds: selectedComplaints.map(c => c.id),
    }
    onBulkUpdate(action, updateData)
    setAction("")
    setNewStatus("")
    setAssignTo("")
    setPriority("")
    setRemarks("")
  }

  const getStatusIcon = status => {
    switch (status) {
      case "Resolved":
        return React.createElement(CheckCircle, { className: "h-4 w-4 text-success" })
      case "In Progress":
        return React.createElement(Clock, { className: "h-4 w-4 text-warning" })
      case "Pending":
        return React.createElement(AlertCircle, { className: "h-4 w-4 text-destructive" })
      default:
        return null
    }
  }

  return React.createElement(
    Dialog,
    { open: isOpen, onOpenChange: onClose },
    React.createElement(
      DialogContent,
      { className: "max-w-2xl" },
      React.createElement(
        DialogHeader,
        null,
        React.createElement(DialogTitle, null, "Bulk Actions"),
        React.createElement(DialogDescription, null, `Apply actions to ${selectedComplaints.length} selected complaints`)
      ),
      React.createElement(
        "div",
        { className: "space-y-6" },

        // Selected Complaints Summary
        React.createElement(
          "div",
          { className: "bg-muted/50 p-4 rounded-lg" },
          React.createElement(
            "h4",
            { className: "font-medium mb-3 flex items-center gap-2" },
            React.createElement(Users, { className: "h-4 w-4" }),
            `Selected Complaints (${selectedComplaints.length})`
          ),
          React.createElement(
            "div",
            { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto" },
            selectedComplaints.map(complaint =>
              React.createElement(
                "div",
                { key: complaint.id, className: "flex items-center gap-2 text-sm" },
                React.createElement(Checkbox, { checked: true, disabled: true }),
                React.createElement("span", { className: "font-mono" }, complaint.id),
                React.createElement(Badge, { variant: "outline", className: "text-xs" }, complaint.category)
              )
            )
          )
        ),

        // Action Selection
        React.createElement(
          "div",
          { className: "space-y-2" },
          React.createElement(Label, null, "Select Action *"),
          React.createElement(
            Select,
            { value: action, onValueChange: setAction },
            React.createElement(
              SelectTrigger,
              null,
              React.createElement(SelectValue, { placeholder: "Choose bulk action" })
            ),
            React.createElement(
              SelectContent,
              null,
              React.createElement(SelectItem, { value: "update-status" }, "Update Status"),
              React.createElement(SelectItem, { value: "assign" }, "Assign to Officer"),
              React.createElement(SelectItem, { value: "set-priority" }, "Set Priority"),
              React.createElement(SelectItem, { value: "add-remarks" }, "Add Remarks")
            )
          )
        ),

        // Status Update
        action === "update-status" &&
          React.createElement(
            "div",
            { className: "space-y-2" },
            React.createElement(Label, null, "New Status *"),
            React.createElement(
              Select,
              { value: newStatus, onValueChange: setNewStatus },
              React.createElement(
                SelectTrigger,
                null,
                React.createElement(SelectValue, { placeholder: "Select new status" })
              ),
              React.createElement(
                SelectContent,
                null,
                React.createElement(
                  SelectItem,
                  { value: "Pending" },
                  React.createElement(
                    "div",
                    { className: "flex items-center gap-2" },
                    React.createElement(AlertCircle, { className: "h-4 w-4 text-destructive" }),
                    "Pending"
                  )
                ),
                React.createElement(
                  SelectItem,
                  { value: "In Progress" },
                  React.createElement(
                    "div",
                    { className: "flex items-center gap-2" },
                    React.createElement(Clock, { className: "h-4 w-4 text-warning" }),
                    "In Progress"
                  )
                ),
                React.createElement(
                  SelectItem,
                  { value: "Resolved" },
                  React.createElement(
                    "div",
                    { className: "flex items-center gap-2" },
                    React.createElement(CheckCircle, { className: "h-4 w-4 text-success" }),
                    "Resolved"
                  )
                )
              )
            )
          ),

        // Assignment
        action === "assign" &&
          React.createElement(
            "div",
            { className: "space-y-2" },
            React.createElement(Label, null, "Assign to Officer *"),
            React.createElement(
              Select,
              { value: assignTo, onValueChange: setAssignTo },
              React.createElement(
                SelectTrigger,
                null,
                React.createElement(SelectValue, { placeholder: "Select officer" })
              ),
              React.createElement(
                SelectContent,
                null,
                React.createElement(SelectItem, { value: "John Smith" }, "John Smith - Road Maintenance"),
                React.createElement(SelectItem, { value: "Mary Jones" }, "Mary Jones - Water Department"),
                React.createElement(SelectItem, { value: "David Brown" }, "David Brown - Sanitation"),
                React.createElement(SelectItem, { value: "Sarah Wilson" }, "Sarah Wilson - Public Works"),
                React.createElement(SelectItem, { value: "Mike Davis" }, "Mike Davis - Electrical")
              )
            )
          ),

        // Priority Setting
        action === "set-priority" &&
          React.createElement(
            "div",
            { className: "space-y-2" },
            React.createElement(Label, null, "Priority Level *"),
            React.createElement(
              Select,
              { value: priority, onValueChange: setPriority },
              React.createElement(
                SelectTrigger,
                null,
                React.createElement(SelectValue, { placeholder: "Select priority" })
              ),
              React.createElement(
                SelectContent,
                null,
                ["High", "Medium", "Low"].map(p =>
                  React.createElement(
                    SelectItem,
                    { key: p, value: p },
                    React.createElement(
                      "div",
                      { className: "flex items-center gap-2" },
                      React.createElement("div", {
                        className: `w-2 h-2 rounded-full ${
                          p === "High" ? "bg-destructive" : p === "Medium" ? "bg-warning" : "bg-success"
                        }`,
                      }),
                      p + " Priority"
                    )
                  )
                )
              )
            )
          ),

        // Remarks
        (action === "add-remarks" || action === "update-status") &&
          React.createElement(
            "div",
            { className: "space-y-2" },
            React.createElement(Label, null, `Remarks ${action === "update-status" ? "*" : "(Optional)"}`),
            React.createElement(Textarea, {
              placeholder: "Add remarks or notes for all selected complaints...",
              value: remarks,
              onChange: e => setRemarks(e.target.value),
              className: "min-h-[80px]"
            })
          ),

        // Preview
        action &&
          React.createElement(
            "div",
            { className: "bg-primary/10 border border-primary/20 p-4 rounded-lg" },
            React.createElement("h4", { className: "font-medium mb-2" }, "Action Preview"),
            React.createElement(
              "div",
              { className: "text-sm space-y-1" },
              React.createElement("p", null, React.createElement("strong", null, "Action:"), " ", action.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())),
              newStatus && React.createElement("p", null, React.createElement("strong", null, "New Status:"), " ", newStatus),
              assignTo && React.createElement("p", null, React.createElement("strong", null, "Assign to:"), " ", assignTo),
              priority && React.createElement("p", null, React.createElement("strong", null, "Priority:"), " ", priority),
              React.createElement("p", null, React.createElement("strong", null, "Affected Complaints:"), " ", selectedComplaints.length)
            )
          ),

        // Actions Buttons
        React.createElement(
          "div",
          { className: "flex gap-4 pt-4" },
          React.createElement(
            Button,
            {
              onClick: handleBulkUpdate,
              disabled:
                !action ||
                (action === "update-status" && (!newStatus || !remarks)) ||
                (action === "assign" && !assignTo) ||
                (action === "set-priority" && !priority),
              className: "flex-1"
            },
            `Apply to ${selectedComplaints.length} Complaints`
          ),
          React.createElement(Button, { variant: "outline", onClick: onClose }, "Cancel")
        )
      )
    )
  )
}
