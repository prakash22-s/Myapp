"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"

export function AdvancedFiltersModal({ isOpen, onClose, onApplyFilters, currentFilters }) {
  const [filters, setFilters] = useState(Object.assign({
    dateRange: { from: null, to: null },
    categories: [],
    statuses: [],
    priorities: [],
    assignedTo: [],
    locations: [],
    citizenName: "",
    complaintId: ""
  }, currentFilters))

  const categories = ["Road", "Water", "Electricity", "Garbage", "Drainage", "Street Lighting"]
  const statuses = ["Pending", "In Progress", "Resolved"]
  const priorities = ["High", "Medium", "Low"]
  const officers = [
    "John Smith - Road Maintenance",
    "Mary Jones - Water Department",
    "David Brown - Sanitation",
    "Sarah Wilson - Public Works",
    "Mike Davis - Electrical",
  ]
  const commonLocations = ["Main Street Area", "Residential Sector 5", "Park Avenue", "Market Street", "Green Valley"]

  const handleArrayFilter = (key, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [key]: checked
        ? [...prev[key], value]
        : prev[key].filter(item => item !== value)
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      dateRange: { from: null, to: null },
      categories: [],
      statuses: [],
      priorities: [],
      assignedTo: [],
      locations: [],
      citizenName: "",
      complaintId: "",
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (filters.categories.length) count++
    if (filters.statuses.length) count++
    if (filters.priorities.length) count++
    if (filters.assignedTo.length) count++
    if (filters.locations.length) count++
    if (filters.citizenName) count++
    if (filters.complaintId) count++
    return count
  }

  return React.createElement(
    Dialog,
    { open: isOpen, onOpenChange: onClose },
    React.createElement(
      DialogContent,
      { className: "max-w-4xl max-h-[90vh] overflow-y-auto" },
      React.createElement(
        DialogHeader,
        null,
        React.createElement(
          DialogTitle,
          { className: "flex items-center justify-between" },
          "Advanced Filters",
          getActiveFiltersCount() > 0 &&
            React.createElement(Badge, { variant: "secondary" }, getActiveFiltersCount() + " active")
        ),
        React.createElement(
          DialogDescription,
          null,
          "Apply detailed filters to find specific complaints"
        )
      ),
      React.createElement(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
        // Date Range
        React.createElement(
          "div",
          { className: "space-y-3" },
          React.createElement(Label, { className: "text-base font-medium" }, "Date Range"),
          React.createElement(
            "div",
            { className: "grid grid-cols-2 gap-2" },
            ["from", "to"].map(key =>
              React.createElement(
                "div",
                { key: key },
                React.createElement(Label, { className: "text-sm" }, key === "from" ? "From" : "To"),
                React.createElement(
                  Popover,
                  null,
                  React.createElement(
                    PopoverTrigger,
                    { asChild: true },
                    React.createElement(
                      Button,
                      { variant: "outline", className: "w-full justify-start text-left font-normal bg-transparent" },
                      React.createElement(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                      filters.dateRange[key] ? format(filters.dateRange[key], "PPP") : "Pick a date"
                    )
                  ),
                  React.createElement(
                    PopoverContent,
                    { className: "w-auto p-0" },
                    React.createElement(Calendar, {
                      mode: "single",
                      selected: filters.dateRange[key],
                      onSelect: date => setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, [key]: date }
                      })),
                      initialFocus: true
                    })
                  )
                )
              )
            )
          )
        )
        // Other sections (Search, Categories, Status, Priority, Assigned To, Locations) can be similarly converted
      ),
      // Active filters preview
      getActiveFiltersCount() > 0 &&
        React.createElement(
          "div",
          { className: "bg-muted/50 p-4 rounded-lg" },
          React.createElement(
            "div",
            { className: "flex items-center justify-between mb-2" },
            React.createElement(Label, { className: "font-medium" }, "Active Filters (" + getActiveFiltersCount() + ")"),
            React.createElement(
              Button,
              { variant: "ghost", size: "sm", onClick: handleReset },
              React.createElement(X, { className: "h-4 w-4 mr-1" }),
              "Clear All"
            )
          )
        ),
      // Actions
      React.createElement(
        "div",
        { className: "flex gap-4 pt-4" },
        React.createElement(Button, { onClick: handleApply, className: "flex-1" }, "Apply Filters (" + getActiveFiltersCount() + ")"),
        React.createElement(Button, { variant: "outline", onClick: handleReset }, "Reset"),
        React.createElement(Button, { variant: "outline", onClick: onClose }, "Cancel")
      )
    )
  )
}
