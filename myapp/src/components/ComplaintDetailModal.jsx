"use client"

import { useState } from "react"
import { MapPin, Calendar, User, MessageSquare, Star, Camera } from "lucide-react"

export function ComplaintDetailModal({
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

  if (!complaint || !isOpen) return null

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "badge-success"
      case "In Progress":
        return "badge-warning"
      case "Pending":
        return "badge-destructive"
      default:
        return "badge-muted"
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
    <div className={`modal ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">{complaint.id}</h2>
          <span className={`badge ${getStatusColor(complaint.status)}`}>{complaint.status}</span>
        </div>

        {/* Basic Info */}
        <div className="card mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Submitted: {complaint.date}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{complaint.location}</span>
          </div>
          <span className="badge badge-muted">{complaint.category}</span>

          {userRole === "admin" && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{complaint.citizenName || "John Doe"}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Contact: {complaint.citizenContact || "john@example.com"}
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="card mb-4">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-sm text-muted-foreground">{complaint.description}</p>
        </div>

        {/* Images */}
        {complaint.images && complaint.images.length > 0 && (
          <div className="card mb-4">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Camera className="h-4 w-4" /> Attached Images
            </h3>
            <div className="flex flex-wrap gap-2">
              {complaint.images.map((img, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-lg flex items-center justify-center p-4 w-24 h-24"
                >
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <div className="card mb-4">
          <h3 className="font-medium mb-2">Status Timeline</h3>
          <div className="timeline">
            {statusHistory.map((entry, idx) => (
              <div key={idx} className="timeline-item">
                <div className="flex flex-col items-center">
                  <div
                    className={`timeline-marker ${
                      entry.status === "Resolved"
                        ? "timeline-resolved"
                        : entry.status === "In Progress"
                        ? "timeline-inprogress"
                        : "timeline-pending"
                    }`}
                  ></div>
                  {idx < statusHistory.length - 1 && <div className="timeline-vertical"></div>}
                </div>
                <div>
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
          <div className="card mb-4">
            <h3 className="font-medium mb-2">Update Status</h3>
            <div className="mb-2">
              <label>New Status</label>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="mb-2">
              <label>Remarks</label>
              <textarea
                placeholder="Add remarks..."
                value={newRemarks}
                onChange={(e) => setNewRemarks(e.target.value)}
              />
            </div>
            <button className="btn" onClick={handleStatusUpdate} disabled={!newStatus || !newRemarks}>
              Update Status
            </button>
          </div>
        )}

        {/* Citizen Feedback */}
        {userRole === "citizen" && complaint.status === "Resolved" && (
          <div className="card">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Provide Feedback
            </h3>
            <div className="mb-2">
              <label>Rate the resolution</label>
              <div className="star-rating flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={rating >= star ? "active" : ""}
                  >
                    <Star />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <label>Additional Comments</label>
              <textarea
                placeholder="Share your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <button className="btn" onClick={handleFeedbackSubmit} disabled={rating === 0}>
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
