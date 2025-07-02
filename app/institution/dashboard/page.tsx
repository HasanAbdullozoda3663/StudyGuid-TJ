"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  Users,
  BookOpen,
  Star,
  Edit,
  Save,
  Plus,
  Trash2,
  Eye,
  BarChart3,
  TrendingUp,
  Award,
  Camera,
} from "lucide-react"

const mockInstitutionData = {
  id: "inst_1",
  name: "Tajik National University",
  email: "admin@tnu.tj",
  location: "Dushanbe",
  type: "Public",
  established: 1948,
  description:
    "The oldest and largest university in Tajikistan, offering comprehensive education across multiple disciplines with a focus on academic excellence and research innovation.",
  website: "www.tnu.tj",
  phone: "+992 37 221-77-77",
  students: 25000,
  programs: 45,
  rating: 4.5,
  image: "/placeholder.svg?height=300&width=500",
  faculties: ["Economics", "Law", "Philology", "History", "Mathematics", "Physics", "Chemistry", "Biology"],
  tuitionFee: "$800-1200/year",
  campusSize: "Large",
  accreditation: "Ministry of Education and Science of Tajikistan",
  facilities: ["Library", "Sports Complex", "Dormitories", "Research Centers", "Computer Labs", "Medical Center"],
  admissionRequirements: "High school diploma, entrance exam, language proficiency test",
  scholarships: ["Merit-based scholarships", "Need-based aid", "International student grants"],
  internationalStudents: 2500,
  applicationStats: {
    totalApplications: 1250,
    acceptedApplications: 890,
    pendingApplications: 125,
    rejectedApplications: 235,
  },
  monthlyStats: [
    { month: "Jan", applications: 180, enrollments: 120 },
    { month: "Feb", applications: 220, enrollments: 150 },
    { month: "Mar", applications: 280, enrollments: 200 },
    { month: "Apr", applications: 320, enrollments: 240 },
    { month: "May", applications: 250, enrollments: 180 },
  ],
}

export default function InstitutionDashboard() {
  const { user } = useAuth()
  const [institutionData, setInstitutionData] = useState(mockInstitutionData)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(institutionData)
  const [newFaculty, setNewFaculty] = useState("")
  const [newFacility, setNewFacility] = useState("")

  const handleSave = () => {
    setInstitutionData(editData)
    setIsEditing(false)
    alert("Institution information updated successfully!")
  }

  const addFaculty = () => {
    if (newFaculty.trim()) {
      setEditData({
        ...editData,
        faculties: [...editData.faculties, newFaculty.trim()],
      })
      setNewFaculty("")
    }
  }

  const removeFaculty = (index: number) => {
    setEditData({
      ...editData,
      faculties: editData.faculties.filter((_, i) => i !== index),
    })
  }

  const addFacility = () => {
    if (newFacility.trim()) {
      setEditData({
        ...editData,
        facilities: [...editData.facilities, newFacility.trim()],
      })
      setNewFacility("")
    }
  }

  const removeFacility = (index: number) => {
    setEditData({
      ...editData,
      facilities: editData.facilities.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                Institution Dashboard
              </h1>
              <p className="text-gray-600">Manage your university profile and view analytics</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Eye size={16} />
                <span>Preview Public Profile</span>
              </Button>
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 flex items-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save Changes</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{institutionData.students.toLocaleString()}</p>
              </div>
              <Users className="text-blue-500" size={40} />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <span className="text-green-600">+12% this year</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Programs Offered</p>
                <p className="text-3xl font-bold text-green-600">{institutionData.programs}</p>
              </div>
              <BookOpen className="text-green-500" size={40} />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Award className="text-purple-500 mr-1" size={16} />
              <span className="text-purple-600">Across {institutionData.faculties.length} faculties</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-3xl font-bold text-purple-600">
                  {institutionData.applicationStats.totalApplications}
                </p>
              </div>
              <BarChart3 className="text-purple-500" size={40} />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-orange-600">{institutionData.applicationStats.pendingApplications} pending</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-3xl font-bold text-yellow-600">{institutionData.rating}</p>
              </div>
              <Star className="text-yellow-500" size={40} />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-600">Based on student reviews</span>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="programs">Programs & Faculties</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Basic Information */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">University Name</label>
                        {isEditing ? (
                          <Input
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{institutionData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        {isEditing ? (
                          <Input
                            value={editData.location}
                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{institutionData.location}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        {isEditing ? (
                          <select
                            value={editData.type}
                            onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 font-medium">{institutionData.type}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Established</label>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={editData.established}
                            onChange={(e) => setEditData({ ...editData, established: Number.parseInt(e.target.value) })}
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{institutionData.established}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        {isEditing ? (
                          <Input
                            value={editData.website}
                            onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{institutionData.website}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        {isEditing ? (
                          <Input
                            value={editData.phone}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{institutionData.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tuition Fee</label>
                        {isEditing ? (
                          <Input
                            value={editData.tuitionFee}
                            onChange={(e) => setEditData({ ...editData, tuitionFee: e.target.value })}
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{institutionData.tuitionFee}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Campus Size</label>
                        {isEditing ? (
                          <select
                            value={editData.campusSize}
                            onChange={(e) => setEditData({ ...editData, campusSize: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          >
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                          </select>
                        ) : (
                          <p className="text-gray-900 font-medium">{institutionData.campusSize}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      {isEditing ? (
                        <Textarea
                          value={editData.description}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-900">{institutionData.description}</p>
                      )}
                    </div>
                  </Card>

                  {/* Facilities */}
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Campus Facilities</h3>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {(isEditing ? editData.facilities : institutionData.facilities).map((facility, index) => (
                          <div key={index} className="flex items-center">
                            <Badge variant="secondary" className="mr-2">
                              {facility}
                            </Badge>
                            {isEditing && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFacility(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <Trash2 size={14} />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      {isEditing && (
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Add new facility"
                            value={newFacility}
                            onChange={(e) => setNewFacility(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addFacility()}
                          />
                          <Button onClick={addFacility} size="sm">
                            <Plus size={16} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Image and Quick Stats */}
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">University Image</h3>
                    <div className="relative">
                      <img
                        src={institutionData.image || "/placeholder.svg"}
                        alt={institutionData.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {isEditing && (
                        <Button size="sm" className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white">
                          <Camera size={16} />
                        </Button>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Students:</span>
                        <span className="font-semibold">{institutionData.students.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">International Students:</span>
                        <span className="font-semibold">{institutionData.internationalStudents.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Programs:</span>
                        <span className="font-semibold">{institutionData.programs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="text-yellow-500 mr-1" size={16} fill="currentColor" />
                          <span className="font-semibold">{institutionData.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Faculties and Programs</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(isEditing ? editData.faculties : institutionData.faculties).map((faculty, index) => (
                      <div key={index} className="flex items-center">
                        <Badge variant="outline" className="mr-2 px-3 py-1">
                          {faculty}
                        </Badge>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFaculty(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={14} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="flex space-x-2 mt-4">
                      <Input
                        placeholder="Add new faculty/program"
                        value={newFaculty}
                        onChange={(e) => setNewFaculty(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addFaculty()}
                      />
                      <Button onClick={addFaculty} size="sm">
                        <Plus size={16} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Admission Requirements</h4>
                  {isEditing ? (
                    <Textarea
                      value={editData.admissionRequirements}
                      onChange={(e) => setEditData({ ...editData, admissionRequirements: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700">{institutionData.admissionRequirements}</p>
                  )}
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">Available Scholarships</h4>
                  <div className="space-y-2">
                    {institutionData.scholarships.map((scholarship, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="text-yellow-500" size={16} />
                        <span>{scholarship}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {institutionData.applicationStats.totalApplications}
                    </div>
                    <div className="text-sm text-gray-600">Total Applications</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {institutionData.applicationStats.acceptedApplications}
                    </div>
                    <div className="text-sm text-gray-600">Accepted</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {institutionData.applicationStats.pendingApplications}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {institutionData.applicationStats.rejectedApplications}
                    </div>
                    <div className="text-sm text-gray-600">Rejected</div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Student Application #{1000 + i}</div>
                        <div className="text-sm text-gray-600">Computer Science Program</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-orange-600">
                          Pending
                        </Badge>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Monthly Applications</h3>
                  <div className="space-y-4">
                    {institutionData.monthlyStats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{stat.month} 2024</span>
                        <div className="flex space-x-4">
                          <span className="text-blue-600 font-medium">{stat.applications} applications</span>
                          <span className="text-green-600 font-medium">{stat.enrollments} enrollments</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Popular Programs</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Computer Science</span>
                      <span className="font-semibold">320 applications</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Economics</span>
                      <span className="font-semibold">280 applications</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Medicine</span>
                      <span className="font-semibold">250 applications</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Engineering</span>
                      <span className="font-semibold">220 applications</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
