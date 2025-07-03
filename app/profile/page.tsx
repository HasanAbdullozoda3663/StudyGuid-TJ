"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  User,
  Heart,
  BookOpen,
  Clock,
  Star,
  Trash2,
  Eye,
  Edit,
  Save,
  Camera,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Target,
  Award,
  Settings,
  Bell,
  Shield,
} from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  
  // Use actual user data instead of mock data
  const userProfile = {
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    phone: "+992 90 123-45-67", // Keep some default data for now
    location: "Dushanbe, Tajikistan",
    dateOfBirth: "1998-05-15",
    joinDate: "March 2024",
    bio: "Aspiring computer science student passionate about technology and innovation. Looking to study at top universities in Tajikistan.",
    interests: ["Technology", "Programming", "AI", "Mathematics"],
    completedAssessments: 3,
    profileImage: "/placeholder.svg?height=150&width=150",
    savedUniversities: [
      {
        id: 1,
        name: "Tajik Technical University",
        country: "Tajikistan",
        city: "Dushanbe",
        major: "Computer Science",
        savedDate: "2024-03-15",
        status: "Applied",
        image: "/placeholder.svg?height=100&width=150",
      },
      {
        id: 2,
        name: "Russian-Tajik University",
        country: "Tajikistan",
        city: "Dushanbe",
        major: "Information Technology",
        savedDate: "2024-03-10",
        status: "Interested",
        image: "/placeholder.svg?height=100&width=150",
      },
      {
        id: 3,
        name: "Tajik National University",
        country: "Tajikistan",
        city: "Dushanbe",
        major: "Mathematics",
        savedDate: "2024-03-08",
        status: "Considering",
        image: "/placeholder.svg?height=100&width=150",
      },
    ],
    favoriteMajors: [
      {
        id: 1,
        name: "Computer Science",
        confidence: 92,
        lastUpdated: "2024-03-15",
        category: "Technology",
        universities: 8,
      },
      {
        id: 2,
        name: "Information Technology",
        confidence: 87,
        lastUpdated: "2024-03-15",
        category: "Technology",
        universities: 6,
      },
      {
        id: 3,
        name: "Mathematics",
        confidence: 81,
        lastUpdated: "2024-03-15",
        category: "Sciences",
        universities: 9,
      },
    ],
    recentActivity: [
      {
        id: 1,
        action: "Completed Major Assessment",
        date: "2024-03-15",
        details: "Discovered 3 new major recommendations",
        type: "assessment",
      },
      {
        id: 2,
        action: "Saved University",
        date: "2024-03-15",
        details: "Added Tajik Technical University to favorites",
        type: "university",
      },
      {
        id: 3,
        action: "Compared Majors",
        date: "2024-03-14",
        details: "Computer Science vs Information Technology",
        type: "comparison",
      },
      {
        id: 4,
        action: "Updated Profile",
        date: "2024-03-13",
        details: "Added interests and bio information",
        type: "profile",
      },
    ],
    achievements: [
      { name: "First Assessment", description: "Completed your first major assessment", date: "2024-03-01" },
      { name: "University Explorer", description: "Saved 3 universities to favorites", date: "2024-03-10" },
      { name: "Active User", description: "Used the platform for 30 days", date: "2024-03-15" },
    ],
  }
  
  const [profileData, setProfileData] = useState(userProfile)
  const [editData, setEditData] = useState(userProfile)

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "universities", label: "Saved Universities", icon: Heart },
    { id: "majors", label: "Favorite Majors", icon: BookOpen },
    { id: "activity", label: "Recent Activity", icon: Clock },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const removeUniversity = (universityId: number) => {
    setProfileData({
      ...profileData,
      savedUniversities: profileData.savedUniversities.filter((u) => u.id !== universityId),
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800"
      case "Interested":
        return "bg-green-100 text-green-800"
      case "Considering":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "assessment":
        return <Target className="text-purple-500" size={16} />
      case "university":
        return <Heart className="text-red-500" size={16} />
      case "comparison":
        return <BookOpen className="text-blue-500" size={16} />
      case "profile":
        return <User className="text-green-500" size={16} />
      default:
        return <Clock className="text-gray-500" size={16} />
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-8 neumorphism">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Image */}
              <div className="relative">
                <motion.div
                  className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={profileData.profileImage || "/placeholder.svg"}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {isEditing && (
                  <Button size="sm" className="absolute bottom-0 right-0 rounded-full bg-green-600 hover:bg-green-700">
                    <Camera size={16} />
                  </Button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="text-2xl font-bold"
                    />
                    <Input
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                    <Input
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                    <Input
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    />
                    <Textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                      {profileData.name}
                    </h1>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                        <Mail size={16} />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                        <Phone size={16} />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600">
                        <MapPin size={16} />
                        <span>{profileData.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 max-w-2xl">{profileData.bio}</p>
                  </>
                )}

                {/* Interests */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {profileData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{profileData.completedAssessments}</div>
                    <div className="text-sm text-gray-600">Assessments</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{profileData.savedUniversities.length}</div>
                    <div className="text-sm text-gray-600">Universities</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{profileData.favoriteMajors.length}</div>
                    <div className="text-sm text-gray-600">Majors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{profileData.achievements.length}</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
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
                    <Button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                    >
                      <Save size={16} />
                      <span>Save</span>
                    </Button>
                  </div>
                )}
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Bell size={16} />
                  <span>Notifications</span>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 rounded-full px-6 py-3 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-600 to-red-600 text-white"
                    : "border-2 border-green-300 text-green-700 hover:bg-green-50"
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Activity Preview */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {profileData.recentActivity.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.details}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Stats */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Profile Completion</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">University Research</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Top Majors */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Top Major Matches</h3>
                  <div className="space-y-3">
                    {profileData.favoriteMajors.slice(0, 3).map((major) => (
                      <div key={major.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{major.name}</p>
                          <p className="text-sm text-gray-600">{major.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{major.confidence}%</div>
                          <div className="text-xs text-gray-500">match</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Member Since */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Member Since</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{profileData.joinDate}</div>
                    <p className="text-gray-600">Welcome to StudyGuid TJ!</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "universities" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.savedUniversities.map((university, index) => (
                <motion.div
                  key={university.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden neumorphism hover:shadow-xl transition-all duration-300">
                    <img
                      src={university.image || "/placeholder.svg"}
                      alt={university.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{university.name}</h3>
                        <Badge className={getStatusColor(university.status)}>{university.status}</Badge>
                      </div>

                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={14} className="mr-1" />
                        <span className="text-sm">{university.city}</span>
                      </div>

                      <Badge variant="secondary" className="mb-3">
                        {university.major}
                      </Badge>

                      <div className="text-sm text-gray-500 mb-4">
                        Saved on {new Date(university.savedDate).toLocaleDateString()}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeUniversity(university.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "majors" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.favoriteMajors.map((major, index) => (
                <motion.div
                  key={major.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 neumorphism hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{major.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-500 fill-current" size={16} />
                        <span className="font-semibold text-green-600">{major.confidence}%</span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="mb-4">
                      {major.category}
                    </Badge>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>AI Match Score</span>
                        <span>{major.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${major.confidence}%` }}
                          transition={{ delay: index * 0.2, duration: 1 }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span>{major.universities} universities offer this</span>
                      <span>Updated {new Date(major.lastUpdated).toLocaleDateString()}</span>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                      Explore Programs
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="max-w-3xl mx-auto space-y-4">
              {profileData.recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 neumorphism hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-red-100 flex items-center justify-center flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{activity.action}</h4>
                        <p className="text-gray-600 text-sm mb-2">{activity.details}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar size={12} />
                          <span>{new Date(activity.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 neumorphism hover:shadow-xl transition-all duration-300 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{achievement.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    <div className="text-xs text-gray-500">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Privacy Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Make profile public</span>
                        <Button variant="outline" size="sm">
                          Toggle
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Show activity to others</span>
                        <Button variant="outline" size="sm">
                          Toggle
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email notifications</span>
                        <Button variant="outline" size="sm">
                          Toggle
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">University updates</span>
                        <Button variant="outline" size="sm">
                          Toggle
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Account Actions</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Shield className="mr-2" size={16} />
                        Change Password
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="mr-2" size={16} />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
