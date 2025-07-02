"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import {
  X,
  Plus,
  Users,
  BookOpen,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  Award,
  Building,
  Globe,
  GraduationCap,
  Search,
} from "lucide-react"

const availableUniversities = [
  {
    id: "1",
    name: "Tajik National University",
    location: "Dushanbe",
    type: "Public",
    established: 1948,
    students: 25000,
    programs: 45,
    tuitionFee: "$800-1200/year",
    rating: 4.5,
    faculties: ["Economics", "Law", "Philology", "History", "Mathematics", "Physics"],
    internationalStudents: 2500,
    campusSize: "Large",
    accreditation: "Ministry of Education and Science of Tajikistan",
  },
  {
    id: "2",
    name: "Avicenna Tajik State Medical University",
    location: "Dushanbe",
    type: "Public",
    established: 1939,
    students: 8000,
    programs: 12,
    tuitionFee: "$1500-2500/year",
    rating: 4.7,
    faculties: ["General Medicine", "Pediatrics", "Dentistry", "Pharmacy", "Public Health"],
    internationalStudents: 1200,
    campusSize: "Medium",
    accreditation: "WHO, Ministry of Health",
  },
  {
    id: "3",
    name: "Tajik Technical University",
    location: "Dushanbe",
    type: "Public",
    established: 1956,
    students: 15000,
    programs: 28,
    tuitionFee: "$1000-1800/year",
    rating: 4.3,
    faculties: [
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Computer Science",
      "Architecture",
    ],
    internationalStudents: 800,
    campusSize: "Large",
    accreditation: "Ministry of Education, Engineering Council",
  },
  {
    id: "4",
    name: "Russian-Tajik University",
    location: "Dushanbe",
    type: "Public",
    established: 1996,
    students: 6000,
    programs: 18,
    tuitionFee: "$1200-2000/year",
    rating: 4.4,
    faculties: ["Economics", "Law", "International Relations", "Journalism", "Information Technology"],
    internationalStudents: 500,
    campusSize: "Medium",
    accreditation: "Russian and Tajik Education Ministries",
  },
]

export default function ComparePage() {
  const { t } = useLanguage()
  const [selectedUniversities, setSelectedUniversities] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const addUniversity = (university: any) => {
    if (selectedUniversities.length < 4 && !selectedUniversities.find((u) => u.id === university.id)) {
      setSelectedUniversities([...selectedUniversities, university])
      setShowAddModal(false)
    }
  }

  const removeUniversity = (universityId: string) => {
    setSelectedUniversities(selectedUniversities.filter((u) => u.id !== universityId))
  }

  const filteredUniversities = availableUniversities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedUniversities.find((selected) => selected.id === uni.id),
  )

  const comparisonCategories = [
    { key: "location", label: "Location", icon: MapPin },
    { key: "type", label: "Type", icon: Building },
    { key: "established", label: "Established", icon: Calendar },
    { key: "students", label: "Total Students", icon: Users },
    { key: "programs", label: "Programs", icon: BookOpen },
    { key: "tuitionFee", label: "Tuition Fee", icon: DollarSign },
    { key: "rating", label: "Rating", icon: Star },
    { key: "internationalStudents", label: "International Students", icon: Globe },
    { key: "campusSize", label: "Campus Size", icon: Building },
    { key: "accreditation", label: "Accreditation", icon: Award },
  ]

  return (
    <div className="min-h-screen pt-20">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            Compare Universities
          </h1>
          <p className="text-gray-600 text-lg">
            Compare up to 4 universities side by side to make the best choice for your education
          </p>
        </motion.div>

        {/* Add Universities Section */}
        {selectedUniversities.length === 0 && (
          <motion.div className="text-center py-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <GraduationCap className="mx-auto text-gray-400 mb-6" size={80} />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">Start Your Comparison</h3>
            <p className="text-gray-500 mb-8">Add universities to compare their features, programs, and more</p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white px-8 py-4 text-lg rounded-full"
            >
              <Plus className="mr-2" size={20} />
              Add University
            </Button>
          </motion.div>
        )}

        {/* Selected Universities */}
        {selectedUniversities.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            {/* Add More Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Comparing {selectedUniversities.length} Universities</h2>
              {selectedUniversities.length < 4 && (
                <Button onClick={() => setShowAddModal(true)} variant="outline" className="flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Add University</span>
                </Button>
              )}
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* University Headers */}
                <div
                  className="grid gap-4 mb-6"
                  style={{ gridTemplateColumns: `200px repeat(${selectedUniversities.length}, 1fr)` }}
                >
                  <div></div>
                  {selectedUniversities.map((university) => (
                    <Card key={university.id} className="p-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUniversity(university.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </Button>
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-2">{university.name}</h3>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <Star className="text-yellow-500" size={16} fill="currentColor" />
                          <span className="text-sm font-medium">{university.rating}</span>
                        </div>
                        <Badge variant="secondary">{university.type}</Badge>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Comparison Rows */}
                <div className="space-y-4">
                  {comparisonCategories.map((category) => (
                    <motion.div
                      key={category.key}
                      className="grid gap-4"
                      style={{ gridTemplateColumns: `200px repeat(${selectedUniversities.length}, 1fr)` }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {/* Category Label */}
                      <div className="flex items-center space-x-2 py-4 px-4 bg-gray-50 rounded-lg">
                        <category.icon className="text-gray-600" size={20} />
                        <span className="font-medium text-gray-800">{category.label}</span>
                      </div>

                      {/* University Values */}
                      {selectedUniversities.map((university) => (
                        <Card
                          key={`${university.id}-${category.key}`}
                          className="p-4 flex items-center justify-center min-h-[60px]"
                        >
                          <div className="text-center">
                            {category.key === "faculties" ? (
                              <div className="space-y-1">
                                {university[category.key].slice(0, 2).map((faculty: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {faculty}
                                  </Badge>
                                ))}
                                {university[category.key].length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{university[category.key].length - 2} more
                                  </Badge>
                                )}
                              </div>
                            ) : category.key === "students" || category.key === "internationalStudents" ? (
                              <span className="font-semibold text-blue-600">
                                {university[category.key].toLocaleString()}
                              </span>
                            ) : category.key === "tuitionFee" ? (
                              <span className="font-semibold text-green-600">{university[category.key]}</span>
                            ) : category.key === "rating" ? (
                              <div className="flex items-center justify-center space-x-1">
                                <Star className="text-yellow-500" size={16} fill="currentColor" />
                                <span className="font-semibold">{university[category.key]}</span>
                              </div>
                            ) : (
                              <span className="font-medium">{university[category.key]}</span>
                            )}
                          </div>
                        </Card>
                      ))}
                    </motion.div>
                  ))}

                  {/* Faculties Row */}
                  <motion.div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `200px repeat(${selectedUniversities.length}, 1fr)` }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-2 py-4 px-4 bg-gray-50 rounded-lg">
                      <GraduationCap className="text-gray-600" size={20} />
                      <span className="font-medium text-gray-800">Faculties</span>
                    </div>

                    {selectedUniversities.map((university) => (
                      <Card key={`${university.id}-faculties`} className="p-4">
                        <div className="space-y-2">
                          {university.faculties.map((faculty: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                              {faculty}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => setSelectedUniversities([])}>
                    Clear All
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                    Download Comparison
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Add University Modal */}
        {showAddModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
            <motion.div
              className="relative bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Add University to Compare</h3>
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>
                  <X size={20} />
                </Button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* University List */}
              <div className="space-y-4">
                {filteredUniversities.map((university) => (
                  <Card
                    key={university.id}
                    className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => addUniversity(university)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-lg">{university.name}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{university.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={14} fill="currentColor" className="text-yellow-500" />
                            <span>{university.rating}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {university.type}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
                      >
                        <Plus size={16} className="mr-1" />
                        Add
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredUniversities.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No universities found matching your search.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
