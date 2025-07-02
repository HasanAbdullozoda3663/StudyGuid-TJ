"use client"

import { useState } from "react"
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

const pendingApplications = [
  {
    id: "1",
    universityName: "International University of Tajikistan",
    email: "admin@iut.tj",
    location: "Dushanbe",
    description: "A new international university focusing on modern education and research in Central Asia.",
    submittedDate: "2024-01-15",
    status: "pending",
    contactPerson: "Dr. Ahmad Rahimov",
    phone: "+992 37 234-56-78",
    website: "www.iut.tj",
    programs: ["Computer Science", "Business Administration", "International Relations"],
    expectedStudents: 2000,
  },
  {
    id: "2",
    universityName: "Pamir Institute of Technology",
    email: "info@pit.tj",
    location: "Khorog",
    description:
      "Specialized technical institute serving the Gorno-Badakhshan region with focus on engineering and technology.",
    submittedDate: "2024-01-12",
    status: "pending",
    contactPerson: "Prof. Gulnora Nazarova",
    phone: "+992 35 222-33-44",
    website: "www.pit.tj",
    programs: ["Civil Engineering", "Electrical Engineering", "Computer Engineering"],
    expectedStudents: 800,
  },
  {
    id: "3",
    universityName: "Tajik-Chinese University",
    email: "contact@tcu.tj",
    location: "Dushanbe",
    description: "Joint educational institution promoting Chinese-Tajik educational cooperation and cultural exchange.",
    submittedDate: "2024-01-10",
    status: "pending",
    contactPerson: "Dr. Li Wei",
    phone: "+992 37 245-67-89",
    website: "www.tcu.tj",
    programs: ["Chinese Language", "Economics", "International Trade"],
    expectedStudents: 1500,
  },
]

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
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [applications, setApplications] = useState(pendingApplications)

  const handleApprove = (applicationId: string) => {
    setApplications(applications.filter((app) => app.id !== applicationId))
    alert("University application approved successfully!")
  }

  const handleReject = (applicationId: string) => {
    setApplications(applications.filter((app) => app.id !== applicationId))
    alert("University application rejected.")
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

            <div className="space-y-4">
              {applications.slice(0, 3).map((application) => (
                <motion.div
                  key={application.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{application.universityName}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <MapPin size={14} />
                        <span>{application.location}</span>
                        <Calendar size={14} className="ml-2" />
                        <span>{application.submittedDate}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-orange-600">
                      Pending
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{application.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {application.programs.slice(0, 2).map((program, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                      {application.programs.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{application.programs.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedApplication(application)}>
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => sendMessage(application.email)}>
                        <Mail size={14} />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(application.id)}
                      >
                        <CheckCircle size={14} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(application.id)}>
                        <XCircle size={14} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {applications.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">All Caught Up!</h3>
                <p className="text-gray-500">No pending applications at the moment.</p>
              </div>
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
