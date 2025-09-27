import { useState } from "react"
import { Navigation } from "./components/Navigation"
import { CitizenDashboard } from "./components/CitizenDashboard"
import { AdminDashboard } from "./components/AdminDashboard"
import { Button } from "./components/ui/Button" // make sure this exists
import { Badge } from "./components/ui/Badge"   // make sure this exists

export default function App() {
  const [userRole, setUserRole] = useState("citizen")
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background dark">
      <Navigation
        userRole={userRole}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold capitalize">
                {activeSection.replace("-", " ")}
              </h2>
              <Badge variant="outline" className="hidden sm:inline-flex">
                {userRole === "citizen" ? "Citizen View" : "Admin View"}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={userRole === "citizen" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setUserRole("citizen")
                  setActiveSection("dashboard")
                }}
              >
                Citizen
              </Button>
              <Button
                variant={userRole === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setUserRole("admin")
                  setActiveSection("overview")
                }}
              >
                Admin
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 lg:p-6">
          {userRole === "citizen" ? (
            <CitizenDashboard activeSection={activeSection} />
          ) : (
            <AdminDashboard activeSection={activeSection} />
          )}
        </main>
      </div>
    </div>
  )
}
