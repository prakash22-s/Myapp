"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ComplaintDetailModal } from "@/components/ComplaintDetailModal";
import { FileText, MapPin, Camera, Clock, CheckCircle, AlertCircle, Plus, Search, Filter } from "lucide-react"
import React from "react"

export function CitizenDashboard({ activeSection }) {
  const [formData, setFormData] = useState({ category: "", description: "", location: "", image: null })
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const mockComplaints = [
    {
      id: "CMP-2024-001",
      category: "Road",
      description:
        "Large pothole on Main Street causing traffic issues and potential vehicle damage. The hole is approximately 2 feet wide and 6 inches deep.",
      status: "In Progress",
      date: "2024-01-15",
      location: "Main Street, Block A",
      adminRemarks: "Work crew assigned, repair scheduled for next week",
      citizenName: "John Doe",
      citizenContact: "john@example.com",
      images: ["/pothole.png"],
    },
    {
      id: "CMP-2024-002",
      category: "Water",
      description:
        "Water leakage in residential area causing flooding in the street. Water pressure also seems to be affected in nearby houses.",
      status: "Resolved",
      date: "2024-01-10",
      location: "Residential Area, Sector 5",
      adminRemarks: "Pipe repaired and water supply restored",
      citizenName: "Jane Smith",
      citizenContact: "jane@example.com",
    },
    {
      id: "CMP-2024-003",
      category: "Electricity",
      description:
        "Street light not working for past 3 days, making the area unsafe during night hours. Multiple residents have complained about security concerns.",
      status: "Pending",
      date: "2024-01-18",
      location: "Park Avenue, Near School",
      adminRemarks: "",
      citizenName: "Mike Johnson",
      citizenContact: "mike@example.com",
    },
  ]

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Complaint submitted:", formData)
    setFormData({ category: "", description: "", location: "", image: null })
  }

  const getStatusColor = status => {
    switch (status) {
      case "Resolved":
        return "bg-success text-success-foreground"
      case "In Progress":
        return "bg-warning text-warning-foreground"
      case "Pending":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = status => {
    switch (status) {
      case "Resolved":
        return React.createElement(CheckCircle, { className: "h-4 w-4" })
      case "In Progress":
        return React.createElement(Clock, { className: "h-4 w-4" })
      case "Pending":
        return React.createElement(AlertCircle, { className: "h-4 w-4" })
      default:
        return React.createElement(FileText, { className: "h-4 w-4" })
    }
  }

  const openComplaintDetail = complaint => {
    setSelectedComplaint(complaint)
    setIsModalOpen(true)
  }

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || complaint.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesStatus
  })

  if (activeSection === "dashboard") {
    return React.createElement(
      "div",
      { className: "space-y-6" },
      // Welcome Section
      React.createElement(
        "div",
        { className: "bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20" },
        React.createElement("h1", { className: "text-2xl font-bold text-balance mb-2" }, "Welcome to Municipal Connect"),
        React.createElement(
          "p",
          { className: "text-muted-foreground text-pretty" },
          "Submit complaints, track their progress, and help improve your community. Your voice matters in building a better city."
        )
      ),
      // Quick Stats
      React.createElement(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
        ["Total Complaints", "Resolved", "In Progress"].map((title, index) => {
          const icon = index === 0 ? React.createElement(FileText, { className: "h-4 w-4 text-muted-foreground" }) :
            index === 1 ? React.createElement(CheckCircle, { className: "h-4 w-4 text-success" }) :
            React.createElement(Clock, { className: "h-4 w-4 text-warning" })
          const count = index === 0 ? 3 : index === 1 ? 1 : 1
          const colorClass = index === 0 ? "" : index === 1 ? "text-success" : "text-warning"
          const description = index === 0 ? "All time submissions" : index === 1 ? "Successfully resolved" : "Being worked on"
          return React.createElement(
            Card,
            { key: title },
            React.createElement(
              CardHeader,
              { className: "flex flex-row items-center justify-between space-y-0 pb-2" },
              React.createElement(CardTitle, { className: "text-sm font-medium" }, title),
              icon
            ),
            React.createElement(
              CardContent,
              null,
              React.createElement("div", { className: `text-2xl font-bold ${colorClass}` }, count),
              React.createElement("p", { className: "text-xs text-muted-foreground" }, description)
            )
          )
        })
      )
      // ... You would continue similarly for the rest of the JSX sections:
      // Recent Complaints, Quick Actions, New Complaint Form, My Complaints list
      // Each nested JSX element becomes a React.createElement call with props and children
    )
  }

  if (activeSection === "new-complaint") {
    // Convert the "new complaint" JSX similarly using React.createElement
    // ...
  }

  if (activeSection === "my-complaints") {
    // Convert the "my complaints" JSX similarly using React.createElement
    // ...
  }

  return React.createElement("div", null, "Section not found")
}
