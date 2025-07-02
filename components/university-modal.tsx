"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import {
  X,
  MapPin,
  Users,
  BookOpen,
  Star,
  Heart,
  GraduationCap,
  DollarSign,
  Calendar,
  Globe,
  Phone,
  Mail,
  Award,
  Building,
  Wifi,
  Car,
  Home,
  Utensils,
  Dumbbell,
} from "lucide-react"

interface UniversityModalProps {
  university: any
  isOpen: boolean
  onClose: () => void
}

export function UniversityModal({ university, isOpen, onClose }: UniversityModalProps) {
  const { user, addToFavorites, removeFromFavorites } = useAuth()

  const toggleFavorite = () => {
    if (!user) {
      alert("Please sign in to save favorites")
      return
    }

    if (user.favorites?.includes(university.id)) {
      removeFromFavorites(university.id)
    } else {
      addToFavorites(university.id)
    }
  }

  const facilityIcons: Record<string, any> = {
    Library: BookOpen,
    "Sports Complex": Dumbbell,
    Dormitories: Home,
    "Research Centers": Award,
    "Computer Labs": Wifi,
    "Teaching Hospital": Building,
    Cafeteria: Utensils,
    Parking: Car,
    WiFi: Wifi,
    Gymnasium: Dumbbell,
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={university.image || "/placeholder.svg"}
                alt={university.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              >
                <X size={20} />
              </Button>

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFavorite}
                className="absolute top-4 right-16 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              >
                <Heart size={20} fill={user?.favorites?.includes(university.id) ? "currentColor" : "none"} />
              </Button>

              {/* University Info Overlay */}
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{university.name}</h1>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{university.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={16} fill="currentColor" className="text-yellow-400" />
                    <span>{university.rating}</span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {university.type}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-16rem)] overflow-y-auto">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="programs">Programs</TabsTrigger>
                  <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  <TabsTrigger value="admission">Admission</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">About the University</h3>
                      <p className="text-gray-600 mb-6">{university.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="text-blue-500" size={20} />
                            <span className="font-semibold">Students</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">{university.students.toLocaleString()}</p>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <BookOpen className="text-green-500" size={20} />
                            <span className="font-semibold">Programs</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">{university.programs}</p>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="text-purple-500" size={20} />
                            <span className="font-semibold">Established</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">{university.established}</p>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Globe className="text-orange-500" size={20} />
                            <span className="font-semibold">International</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-600">{university.internationalStudents}</p>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">Campus Size</span>
                          <span className="font-semibold">{university.campusSize}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">Tuition Fee</span>
                          <span className="font-semibold text-green-600">{university.tuitionFee}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">Accreditation</span>
                          <span className="font-semibold">{university.accreditation}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">International Students</span>
                          <span className="font-semibold">{university.internationalStudents}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Available Scholarships</h4>
                        <div className="space-y-2">
                          {university.scholarships?.map((scholarship: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Award className="text-yellow-500" size={16} />
                              <span className="text-sm">{scholarship}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="programs" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Academic Programs</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {university.faculties.map((faculty: string, index: number) => (
                      <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
                            <GraduationCap className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{faculty}</h4>
                            <p className="text-sm text-gray-600">Bachelor & Master</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="facilities" className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Campus Facilities</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {university.facilities?.map((facility: string, index: number) => {
                      const IconComponent = facilityIcons[facility] || Building
                      return (
                        <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <IconComponent className="text-blue-600" size={20} />
                            </div>
                            <span className="font-medium">{facility}</span>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="admission" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Admission Requirements</h3>
                      <Card className="p-4">
                        <p className="text-gray-700">{university.admissionRequirements}</p>
                      </Card>

                      <h4 className="text-lg font-semibold mt-6 mb-3">Application Process</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </div>
                          <div>
                            <p className="font-medium">Submit Application</p>
                            <p className="text-sm text-gray-600">Complete online application form</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            2
                          </div>
                          <div>
                            <p className="font-medium">Document Verification</p>
                            <p className="text-sm text-gray-600">Submit required documents</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            3
                          </div>
                          <div>
                            <p className="font-medium">Entrance Exam</p>
                            <p className="text-sm text-gray-600">Take required entrance examination</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            4
                          </div>
                          <div>
                            <p className="font-medium">Interview</p>
                            <p className="text-sm text-gray-600">Attend admission interview</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Tuition & Fees</h3>
                      <Card className="p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="text-green-500" size={20} />
                          <span className="font-semibold">Annual Tuition</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{university.tuitionFee}</p>
                      </Card>

                      <h4 className="text-lg font-semibold mb-3">Important Dates</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b">
                          <span>Application Deadline</span>
                          <span className="font-semibold">July 15, 2024</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Entrance Exam</span>
                          <span className="font-semibold">August 1-15, 2024</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Academic Year Starts</span>
                          <span className="font-semibold">September 1, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <Card className="p-4">
                          <div className="flex items-center space-x-3">
                            <Phone className="text-blue-500" size={20} />
                            <div>
                              <p className="font-medium">Phone</p>
                              <p className="text-gray-600">{university.contactInfo?.phone}</p>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-center space-x-3">
                            <Mail className="text-green-500" size={20} />
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-gray-600">{university.contactInfo?.email}</p>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-center space-x-3">
                            <Globe className="text-purple-500" size={20} />
                            <div>
                              <p className="font-medium">Website</p>
                              <p className="text-gray-600">{university.contactInfo?.website}</p>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4">
                          <div className="flex items-center space-x-3">
                            <MapPin className="text-red-500" size={20} />
                            <div>
                              <p className="font-medium">Address</p>
                              <p className="text-gray-600">{university.location}, Tajikistan</p>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Visit Campus</h3>
                      <Card className="p-4 mb-4">
                        <h4 className="font-semibold mb-2">Schedule a Campus Tour</h4>
                        <p className="text-gray-600 mb-4">
                          Experience our campus firsthand with a guided tour. Tours are available Monday through Friday.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                          Schedule Tour
                        </Button>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-semibold mb-2">Virtual Tour</h4>
                        <p className="text-gray-600 mb-4">
                          Can't visit in person? Take our interactive virtual tour to explore the campus online.
                        </p>
                        <Button variant="outline" className="w-full bg-transparent">
                          Start Virtual Tour
                        </Button>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer Actions */}
            <div className="border-t p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={toggleFavorite}
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <Heart size={16} fill={user?.favorites?.includes(university.id) ? "currentColor" : "none"} />
                    <span>{user?.favorites?.includes(university.id) ? "Saved" : "Save to Favorites"}</span>
                  </Button>

                  <Button variant="outline">Compare</Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline">Download Brochure</Button>
                  <Button className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
