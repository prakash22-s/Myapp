"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Settings, Users, BarChart3, Menu, X } from "lucide-react"

export function Navigation({ userRole, activeSection, onSectionChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const citizenNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "new-complaint", label: "New Complaint", icon: FileText },
    { id: "my-complaints", label: "My Complaints", icon: FileText },
  ]

  const adminNavItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "complaints", label: "All Complaints", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const navItems = userRole === "citizen" ? citizenNavItems : adminNavItems

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">MC</span>
          </div>
          <div>
            <h1 className="font-semibold text-sm">Municipal Connect</h1>
            <p className="text-xs text-muted-foreground">
              {userRole === "citizen" ? "Citizen Portal" : "Admin Dashboard"}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-0 top-0 h-full w-72 bg-card border-r border-border p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">MC</span>
                </div>
                <span className="font-semibold">Municipal Connect</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    onSectionChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r border-border">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b border-border">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">MC</span>
            </div>
            <div>
              <h1 className="font-semibold">Municipal Connect</h1>
              <p className="text-sm text-muted-foreground">
                {userRole === "citizen" ? "Citizen Portal" : "Admin Dashboard"}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSectionChange(item.id)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{userRole === "citizen" ? "C" : "A"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userRole === "citizen" ? "Citizen User" : "Admin User"}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole === "citizen" ? "citizen@example.com" : "admin@municipal.gov"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
