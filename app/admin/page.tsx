"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Users,
  BookOpen,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  MapPin,
  Calendar,
  BarChart3,
  TrendingUp,
  UserCheck,
  Clock,
  AlertCircle,
  Globe,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const systemStats = {
  totalUniversities: 25,
  totalStudents: 125000,
  totalPrograms: 350,
  pendingApplications: 3,
  monthlyGrowth: 12,
  activeUsers: 15420,
  totalApplications: 2840,
  approvedThisMonth: 8,
}

const recentActivities = [
  {
    id: 1,
    action: "New university application",
    details: "International University of Tajikistan",
    time: "2 hours ago",
    type: "application",
  },
  { id: 2, action: "University approved", details: "Tajik Medical Institute", time: "1 day ago", type: "approval" },
  { id: 3, action: "New user registration", details: "150 new students registered", time: "2 days ago", type: "user" },
  { id: 4, action: "System update", details: "Platform maintenance completed", time: "3 days ago", type: "system" },
]

export default function AdminDashboard() {
  const { user } = useAuth()
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Fetch pending institutions from backend
  useEffect(() => {
    const fetchPending = async () => {
      setLoading(true)
      setError("")
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://127.0.0.1:8000/admin/institutions/pending", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Failed to fetch pending institutions")
        const data = await res.json()
        setApplications(data)
      } catch (err: any) {
        setError(err.message || "Error fetching data")
      } finally {
        setLoading(false)
      }
    }
    fetchPending()
  }, [])

  const handleApprove = async (userId: number) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://127.0.0.1:8000/admin/institutions/${userId}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to approve institution")
      setApplications(applications.filter((app) => app.id !== userId))
      alert("University application approved successfully!")
    } catch (err: any) {
      alert(err.message || "Error approving institution")
    }
  }

  const handleReject = async (userId: number) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://127.0.0.1:8000/admin/institutions/${userId}/reject`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Failed to reject institution")
      setApplications(applications.filter((app) => app.id !== userId))
      alert("University application rejected.")
    } catch (err: any) {
      alert(err.message || "Error rejecting institution")
    }
  }

  const sendMessage = (email: string) => {
    alert(`Opening email client to send message to ${email}`)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-gradient-to-r from-green-600 to-red-600 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to StudyGuid TJ Admin</h1>
          <p className="text-green-100">Manage universities, applications, and system analytics</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Universities</p>
              <p className="text-3xl font-bold text-blue-600">{systemStats.totalUniversities}</p>
            </div>
            <Building className="text-blue-500" size={40} />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="text-green-500 mr-1" size={16} />
            <span className="text-green-600">+{systemStats.monthlyGrowth}% this month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-green-600">{systemStats.totalStudents.toLocaleString()}</p>
            </div>
            <Users className="text-green-500" size={40} />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <UserCheck className="text-blue-500 mr-1" size={16} />
            <span className="text-blue-600">{systemStats.activeUsers.toLocaleString()} active users</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Programs</p>
              <p className="text-3xl font-bold text-purple-600">{systemStats.totalPrograms}</p>
            </div>
            <BookOpen className="text-purple-500" size={40} />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <BarChart3 className="text-purple-500 mr-1" size={16} />
            <span className="text-purple-600">Across all universities</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Applications</p>
              <p className="text-3xl font-bold text-orange-600">{systemStats.pendingApplications}</p>
            </div>
            <Clock className="text-orange-500" size={40} />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <AlertCircle className="text-orange-500 mr-1" size={16} />
            <span className="text-orange-600">Requires review</span>
          </div>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Applications */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Pending Applications</h2>
              <Badge variant="outline" className="text-orange-600 border-orange-300">
                {applications.length} Pending
              </Badge>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : applications.length === 0 ? (
              <div>No pending institution applications.</div>
            ) : (
              applications.map((app) => (
                <Card key={app.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-lg">{app.name}</div>
                    <div className="text-gray-600 text-sm">{app.email}</div>
                    <div className="text-gray-600 text-sm flex items-center"><MapPin size={14} className="mr-1" />{app.location}</div>
                    <div className="text-gray-600 text-sm mt-1">{app.description}</div>
                  </div>
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button onClick={() => handleApprove(app.id)} className="bg-green-600 hover:bg-green-700 text-white"><CheckCircle size={16} className="mr-1" />Approve</Button>
                    <Button onClick={() => handleReject(app.id)} className="bg-red-600 hover:bg-red-700 text-white"><XCircle size={16} className="mr-1" />Reject</Button>
                  </div>
                </Card>
              ))
            )}
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "application"
                        ? "bg-blue-100"
                        : activity.type === "approval"
                          ? "bg-green-100"
                          : activity.type === "user"
                            ? "bg-purple-100"
                            : "bg-gray-100"
                    }`}
                  >
                    {activity.type === "application" && <Building className="text-blue-600" size={16} />}
                    {activity.type === "approval" && <CheckCircle className="text-green-600" size={16} />}
                    {activity.type === "user" && <Users className="text-purple-600" size={16} />}
                    {activity.type === "system" && <Globe className="text-gray-600" size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Applications</span>
                <span className="font-semibold">{systemStats.totalApplications}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved This Month</span>
                <span className="font-semibold text-green-600">{systemStats.approvedThisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Universities</span>
                <span className="font-semibold">{systemStats.totalUniversities}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">System Uptime</span>
                <span className="font-semibold text-green-600">99.9%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedApplication(null)} />
          <motion.div
            className="relative bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedApplication.universityName}</h2>
              <Button variant="ghost" onClick={() => setSelectedApplication(null)}>
                ✕
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">University Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">{selectedApplication.location}</span>
                  </div>
                  <div>
                    <span className="font-medium">Website:</span>
                    <span className="ml-2">{selectedApplication.website}</span>
                  </div>
                  <div>
                    <span className="font-medium">Expected Students:</span>
                    <span className="ml-2">{selectedApplication.expectedStudents.toLocaleString()}</span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold mt-6 mb-3">Description</h4>
                <p className="text-gray-600">{selectedApplication.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Contact Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Contact Person:</span>
                    <span className="ml-2">{selectedApplication.contactPerson}</span>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <span className="ml-2">{selectedApplication.email}</span>
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>
                    <span className="ml-2">{selectedApplication.phone}</span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold mt-6 mb-3">Proposed Programs</h4>
                <div className="space-y-2">
                  {selectedApplication.programs.map((program: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="mr-2 mb-2">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
              <Button
                onClick={() => sendMessage(selectedApplication.email)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Mail size={16} />
                <span>Send Message</span>
              </Button>
              <Button
                onClick={() => {
                  handleReject(selectedApplication.id)
                  setSelectedApplication(null)
                }}
                variant="destructive"
                className="flex items-center space-x-2"
              >
                <XCircle size={16} />
                <span>Reject</span>
              </Button>
              <Button
                onClick={() => {
                  handleApprove(selectedApplication.id)
                  setSelectedApplication(null)
                }}
                className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
              >
                <CheckCircle size={16} />
                <span>Approve</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
