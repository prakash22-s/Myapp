"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/Dialog";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react"

export function QuickStatusUpdateModal({ complaint, isOpen, onClose, onUpdate }) {
  const [newStatus, setNewStatus] = useState("")
  const [remarks, setRemarks] = useState("")

  if (!complaint) return null

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-warning" />
      case "Pending":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
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

  const getNextStatuses = (currentStatus) => {
    switch (currentStatus) {
      case "Pending":
        return ["In Progress", "Resolved"]
      case "In Progress":
        return ["Resolved", "Pending"]
      case "Resolved":
        return ["In Progress", "Pending"]
      default:
        return ["Pending", "In Progress", "Resolved"]
    }
  }

  const getStatusDescription = (status) => {
    switch (status) {
      case "Pending":
        return "Complaint is waiting to be assigned or reviewed"
      case "In Progress":
        return "Work has started on resolving this complaint"
      case "Resolved":
        return "Complaint has been successfully resolved"
      default:
        return ""
    }
  }

  const getRecommendedRemarks = (fromStatus, toStatus) => {
    if (fromStatus === "Pending" && toStatus === "In Progress") {
      return "Work has been assigned and is now in progress."
    }
    if (toStatus === "Resolved") {
      return "Issue has been resolved. Please verify the solution."
    }
    if (toStatus === "Pending") {
      return "Additional information or resources needed before proceeding."
    }
    return ""
  }

  const handleUpdate = () => {
    if (newStatus && remarks) {
      onUpdate(complaint.id, newStatus, remarks)
      setNewStatus("")
      setRemarks("")
    }
  }

  const handleQuickRemarks = (template) => {
    setRemarks(template)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Quick Status Update</DialogTitle>
          <DialogDescription>Update the status of {complaint.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{complaint.id}</h3>
              <Badge variant="outline">{complaint.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{complaint.location}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Current Status:</span>
              <Badge className={getStatusColor(complaint.status)}>
                {getStatusIcon(complaint.status)}
                <span className="ml-1">{complaint.status}</span>
              </Badge>
            </div>
          </div>

          {/* Status Update */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>New Status *</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {getNextStatuses(complaint.status).map((status) => (
                    <SelectItem key={status} value={status}>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(status)}
                        <div>
                          <div className="font-medium">{status}</div>
                          <div className="text-xs text-muted-foreground">{getStatusDescription(status)}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Change Preview */}
            {newStatus && (
              <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(complaint.status)} variant="outline">
                    {complaint.status}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className={getStatusColor(newStatus)}>{newStatus}</Badge>
                </div>
              </div>
            )}

            {/* Remarks */}
            <div className="space-y-2">
              <Label>Update Remarks *</Label>
              <Textarea
                placeholder="Describe the status change and any relevant details..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="min-h-[100px]"
              />

              {/* Quick Remarks Templates */}
              {newStatus && (
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Quick Templates:</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickRemarks(getRecommendedRemarks(complaint.status, newStatus))}
                    >
                      Use Recommended
                    </Button>
                    {newStatus === "In Progress" && (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickRemarks("Team has been assigned and work will begin shortly.")}
                        >
                          Team Assigned
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickRemarks("Site inspection completed. Repair work scheduled.")}
                        >
                          Inspection Done
                        </Button>
                      </>
                    )}
                    {newStatus === "Resolved" && (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickRemarks("Issue has been resolved. Work completed successfully.")}
                        >
                          Work Completed
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickRemarks("Problem fixed. Please verify and provide feedback.")}
                        >
                          Please Verify
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button onClick={handleUpdate} disabled={!newStatus || !remarks} className="flex-1">
              Update Status
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
