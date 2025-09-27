"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Calendar, User, MessageSquare, Star, Camera } from "lucide-react"

// 🔥 Naam update kiya ComplaintAssignmentModal
export function ComplaintAssignmentModal({
  complaint,
  isOpen,
  onClose,
  userRole,
  onStatusUpdate,
  onFeedbackSubmit,
}) {
  const [newRemarks, setNewRemarks] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)

  if (!complaint) return null

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

  const statusHistory = complaint.statusHistory || [
    { status: "Submitted", date: complaint.date, remarks: "Complaint submitted by citizen" },
    ...(complaint.status !== "Pending"
      ? [{ status: "In Progress", date: "2024-01-16", remarks: "Assigned to maintenance team" }]
      : []),
    ...(complaint.status === "Resolved"
      ? [{ status: "Resolved", date: "2024-01-20", remarks: complaint.adminRemarks }]
      : []),
  ]

  const handleStatusUpdate = () => {
    if (onStatusUpdate && newStatus && newRemarks) {
      onStatusUpdate(complaint.id, newStatus, newRemarks)
      setNewStatus("")
      setNewRemarks("")
    }
  }

  const handleFeedbackSubmit = () => {
    if (onFeedbackSubmit && rating > 0) {
      onFeedbackSubmit(complaint.id, rating, feedback)
      setRating(0)
      setFeedback("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{complaint.id}</DialogTitle>
            <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
          </div>
          <DialogDescription>Complaint details and status tracking</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Submitted: {complaint.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{complaint.location}</span>
              </div>
              <Badge variant="outline">{complaint.category}</Badge>
            </div>

            {userRole === "admin" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{complaint.citizenName || "John Doe"}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Contact: {complaint.citizenContact || "john@example.com"}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              {complaint.description}
            </p>
          </div>

          {/* Images */}
          {complaint.images && complaint.images.length > 0 && (
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Attached Images
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {complaint.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Timeline */}
          <div>
            <h3 className="font-medium mb-4">Status Timeline</h3>
            <div className="space-y-4">
              {statusHistory.map((entry, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        entry.status === "Resolved"
                          ? "bg-success"
                          : entry.status === "In Progress"
                          ? "bg-warning"
                          : "bg-primary"
                      }`}
                    ></div>
                    {index < statusHistory.length - 1 && <div className="w-px h-8 bg-border mt-2"></div>}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{entry.status}</span>
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.remarks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Actions */}
          {userRole === "admin" && complaint.status !== "Resolved" && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-4">Update Status</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>New Status</Label>
                    <select
                      className="w-full mt-1 p-2 border border-border rounded-md bg-background"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">Select status</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Remarks</Label>
                  <Textarea
                    placeholder="Add remarks about the status update..."
                    value={newRemarks}
                    onChange={(e) => setNewRemarks(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleStatusUpdate} disabled={!newStatus || !newRemarks}>
                  Update Status
                </Button>
              </div>
            </div>
          )}

          {/* Citizen Feedback */}
          {userRole === "citizen" && complaint.status === "Resolved" && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Provide Feedback
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Rate the resolution (1-5 stars)</Label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-1 ${rating >= star ? "text-yellow-500" : "text-muted-foreground"}`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Additional Comments (Optional)</Label>
                  <Textarea
                    placeholder="Share your experience with the resolution..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleFeedbackSubmit} disabled={rating === 0}>
                  Submit Feedback
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
