"use client"

import { useState } from "react"
// Note: Changed paths for consistency with typical project setup
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { Progress } from "./ui/Progress"
import { Checkbox } from "./ui/Checkbox"
import { ComplaintAssignmentModal } from "./ComplaintAssignmentModal";


import { BulkActionsModal } from "./BulkActionsModal"            // Named Import
import { AdvancedFiltersModal } from "./AdvancedFiltersModal"      // Named Import
import { QuickStatusUpdateModal } from "./QuickStatusUpdateModal"  // Named Import

import {
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MapPin,
  Calendar,
  Filter,
  Search,
  Download,
  UserPlus,
  Settings2,
  MoreHorizontal,
  Zap,
} from "lucide-react"
import { Input } from "./ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu"

// --- Mock data (kept as provided) ---
const mockAllComplaints = [
  { id: "CMP-2024-001", category: "Road", description: "Large pothole on Main Street...", status: "In Progress", date: "2024-01-15", location: "Main Street, Block A", adminRemarks: "Work crew assigned", citizenName: "John Doe", citizenContact: "john@example.com", assignedTo: "Road Maintenance Team", priority: "High" },
  { id: "CMP-2024-002", category: "Water", description: "Water leakage in residential area...", status: "Resolved", date: "2024-01-10", location: "Residential Area, Sector 5", adminRemarks: "Pipe repaired", citizenName: "Jane Smith", citizenContact: "jane@example.com", assignedTo: "Water Department", priority: "Medium" },
  { id: "CMP-2024-003", category: "Electricity", description: "Street light not working...", status: "Pending", date: "2024-01-18", location: "Park Avenue, Near School", adminRemarks: "", citizenName: "Mike Johnson", citizenContact: "mike@example.com", assignedTo: "", priority: "High" },
  { id: "CMP-2024-004", category: "Garbage", description: "Garbage not collected...", status: "In Progress", date: "2024-01-12", location: "Green Valley, Block C", adminRemarks: "Collection team notified", citizenName: "Sarah Wilson", citizenContact: "sarah@example.com", assignedTo: "Sanitation Department", priority: "Medium" },
  { id: "CMP-2024-005", category: "Drainage", description: "Blocked drainage causing water logging...", status: "Resolved", date: "2024-01-08", location: "Market Street", adminRemarks: "Drainage cleaned", citizenName: "Robert Brown", citizenContact: "robert@example.com", assignedTo: "Public Works", priority: "Low" },
]

const categoryStats = [
  { category: "Road", count: 15, resolved: 8, pending: 4, inProgress: 3 },
  { category: "Water", count: 12, resolved: 9, pending: 2, inProgress: 1 },
  { category: "Electricity", count: 8, resolved: 5, pending: 2, inProgress: 1 },
  { category: "Garbage", count: 10, resolved: 6, pending: 1, inProgress: 3 },
  { category: "Drainage", count: 6, resolved: 4, pending: 1, inProgress: 1 },
]
// --- End Mock data ---

export function AdminDashboard({ activeSection }) {
  // --- State and Handlers (kept as provided) ---
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false)
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false)
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false)
  const [isQuickUpdateOpen, setIsQuickUpdateOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedComplaints, setSelectedComplaints] = useState([])
  const [advancedFilters, setAdvancedFilters] = useState({})

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800"
      case "In Progress": return "bg-yellow-100 text-yellow-800"
      case "Pending": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved": return <CheckCircle className="h-4 w-4" />
      case "In Progress": return <Clock className="h-4 w-4" />
      case "Pending": return <AlertCircle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  // Functions to handle modals, selection, filtering, etc.
  const openComplaintDetail = (complaint) => { setSelectedComplaint(complaint); setIsModalOpen(true) }
  const handleQuickStatusUpdate = (complaint) => { setSelectedComplaint(complaint); setIsQuickUpdateOpen(true) }
  const handleStatusUpdate = (complaintId, newStatus, remarks) => { console.log("Status updated:", { complaintId, newStatus, remarks }); setIsModalOpen(false); setIsQuickUpdateOpen(false) }
  const handleComplaintSelect = (complaintId, checked) => {
    if (checked) setSelectedComplaints([...selectedComplaints, complaintId])
    else setSelectedComplaints(selectedComplaints.filter((id) => id !== complaintId))
  }
  const handleSelectAll = (checked) => {
    if (checked) setSelectedComplaints(mockAllComplaints.map((c) => c.id))
    else setSelectedComplaints([])
  }
  const handleAssignComplaint = (complaint) => { setSelectedComplaint(complaint); setIsAssignmentModalOpen(true) }
  const handleComplaintAssignment = (complaintId, assignedTo, priority, notes) => { console.log("Complaint assigned:", { complaintId, assignedTo, priority, notes }); setIsAssignmentModalOpen(false) }
  const handleBulkUpdate = (action, data) => { console.log("Bulk update:", action, data); setIsBulkModalOpen(false); setSelectedComplaints([]) }
  const handleAdvancedFilters = (filters) => { setAdvancedFilters(filters); console.log("Advanced filters applied:", filters) }

  const filteredComplaints = mockAllComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.citizenName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || complaint.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesCategory = categoryFilter === "all" || complaint.category.toLowerCase() === categoryFilter

    let matchesAdvanced = true
    if (Object.keys(advancedFilters).length > 0) {
      if (advancedFilters.priority && complaint.priority !== advancedFilters.priority) matchesAdvanced = false
      if (advancedFilters.assignedTo && !complaint.assignedTo.includes(advancedFilters.assignedTo)) matchesAdvanced = false
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesAdvanced
  })
  // --- End State and Handlers ---


  if (activeSection !== "overview" && activeSection !== "reports") {
    // Optionally only render the main dashboard content on the 'overview' section
    // If your App.jsx always renders AdminDashboard, you might remove this check.
    return (
      <Card className="p-8">
        <h2 className="text-xl font-semibold">Admin Dashboard - {activeSection}</h2>
        <p className="text-muted-foreground">Select 'Overview' or 'Reports' in the navigation to see the content.</p>
      </Card>
    );
  }

  const totalComplaints = mockAllComplaints.length
  const resolvedCount = mockAllComplaints.filter(c => c.status === "Resolved").length
  const inProgressCount = mockAllComplaints.filter(c => c.status === "In Progress").length
  const pendingCount = mockAllComplaints.filter(c => c.status === "Pending").length
  const resolvedPercentage = totalComplaints > 0 ? Math.round((resolvedCount / totalComplaints) * 100) : 0

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Overview</h1>

      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComplaints}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedPercentage}%</div>
            <Progress value={resolvedPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">{resolvedCount} resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">{pendingCount} pending reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 new admins this week</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Main Table and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Complaints Management</CardTitle>
          <CardDescription>
            Manage and track all submitted public complaints. Showing {filteredComplaints.length} of {totalComplaints} complaints.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            {/* Search and Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, location, or name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoryStats.map(stat => (
                      <SelectItem key={stat.category} value={stat.category.toLowerCase()}>{stat.category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsAdvancedFiltersOpen(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" disabled={selectedComplaints.length === 0}>
                    <Zap className="h-4 w-4 mr-2" />
                    Bulk Actions ({selectedComplaints.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { setIsAssignmentModalOpen(true); setSelectedComplaint(null) }}>
                    <UserPlus className="h-4 w-4 mr-2" /> Bulk Assign
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsBulkModalOpen(true)}>
                    <Settings2 className="h-4 w-4 mr-2" /> Bulk Status Update
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="border rounded-md overflow-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr className="bg-muted/50 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="p-4 w-4">
                    <Checkbox
                      checked={selectedComplaints.length === mockAllComplaints.length && mockAllComplaints.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </th>
                  <th className="p-4">ID</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Location & Date</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 w-16">Priority</th>
                  <th className="p-4 w-12">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-muted/50">
                      <td className="p-4 w-4">
                        <Checkbox
                          checked={selectedComplaints.includes(complaint.id)}
                          onCheckedChange={(checked) => handleComplaintSelect(complaint.id, checked)}
                        />
                      </td>
                      <td className="p-4 text-sm font-medium cursor-pointer" onClick={() => openComplaintDetail(complaint)}>
                        {complaint.id}
                      </td>
                      <td className="p-4 text-sm font-medium">{complaint.category}</td>
                      <td className="p-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" /> {complaint.location}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" /> {complaint.date}
                        </div>
                      </td>
                      <td className="p-4 text-sm">{complaint.assignedTo || "Unassigned"}</td>
                      <td className="p-4 text-sm">
                        <Badge className={`${getStatusColor(complaint.status)} flex items-center justify-center gap-1`} variant="outline">
                          {getStatusIcon(complaint.status)} {complaint.status}
                        </Badge>
                      </td>
                      <td className="p-4 w-16 text-sm">
                        <Badge className={getPriorityColor(complaint.priority)} variant="outline">{complaint.priority}</Badge>
                      </td>
                      <td className="p-4 w-12 text-sm">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openComplaintDetail(complaint)}>
                              <FileText className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleQuickStatusUpdate(complaint)}>
                              <Zap className="h-4 w-4 mr-2" /> Quick Status Update
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignComplaint(complaint)}>
                              <UserPlus className="h-4 w-4 mr-2" /> Assign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-6 text-center text-muted-foreground">
                      No complaints found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 3. Category Breakdown (Optional, shows use of Progress) */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Resolution status by complaint category.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {categoryStats.map((stat) => {
            const resolvedPercent = Math.round((stat.resolved / stat.count) * 100)
            return (
              <div key={stat.category} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{stat.category} ({stat.count})</p>
                  <Progress value={resolvedPercent} className="h-2 w-full mt-1" />
                </div>
                <div className="text-sm ml-4 min-w-[100px] text-right">
                  <Badge variant="secondary">{resolvedPercent}% Resolved</Badge>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>


      {/* 4. Modals */}
      {/* Detail Modal (Placeholder for now) */}
      {/*
      {isModalOpen && (
        <ComplaintDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          complaint={selectedComplaint}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
      */}

      {isAssignmentModalOpen && (
        <ComplaintAssignmentModal
          isOpen={isAssignmentModalOpen}
          onClose={() => setIsAssignmentModalOpen(false)}
          complaint={selectedComplaint}
          onAssign={handleComplaintAssignment}
          selectedComplaints={selectedComplaints}
        />
      )}

      {isBulkModalOpen && (
        <BulkActionsModal
          isOpen={isBulkModalOpen}
          onClose={() => setIsBulkModalOpen(false)}
          selectedCount={selectedComplaints.length}
          onBulkUpdate={handleBulkUpdate}
        />
      )}

      {isAdvancedFiltersOpen && (
        <AdvancedFiltersModal
          isOpen={isAdvancedFiltersOpen}
          onClose={() => setIsAdvancedFiltersOpen(false)}
          onApplyFilters={handleAdvancedFilters}
        />
      )}
      
      {isQuickUpdateOpen && (
        <QuickStatusUpdateModal
          isOpen={isQuickUpdateOpen}
          onClose={() => setIsQuickUpdateOpen(false)}
          complaint={selectedComplaint}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}