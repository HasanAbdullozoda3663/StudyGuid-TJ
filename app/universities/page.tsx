"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { UniversityModal } from "@/components/university-modal"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Search, MapPin, Users, BookOpen, Star, Heart, Filter, GraduationCap, DollarSign } from "lucide-react"

const tajikistanUniversities = [
  {
    id: "1",
    name: "Tajik Technical University",
    location: "Dushanbe",
    type: "Public",
    established: 1956,
    students: 15000,
    faculties: [
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Computer Science",
      "Architecture",
    ],
    tuitionFee: "$1000-1800/year",
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=300",
    description: "Premier technical university focusing on engineering and technology education.",
    programs: 28,
    internationalStudents: 800,
    campusSize: "Large",
    accreditation: "Ministry of Education, Engineering Council",
    facilities: ["Engineering Labs", "Workshop", "CAD Center", "Innovation Hub", "Technical Library"],
    admissionRequirements: "High school diploma with mathematics/physics, entrance exam",
    scholarships: ["Technical excellence awards", "Industry partnerships", "Research assistantships"],
    contactInfo: {
      phone: "+992 37 235-44-33",
      email: "info@ttu.tj",
      website: "www.ttu.tj",
    },
  },
  {
    id: "2",
    name: "Tajik National University",
    location: "Dushanbe",
    type: "Public",
    established: 1948,
    students: 25000,
    faculties: ["Economics", "Law", "Philology", "History", "Mathematics", "Physics"],
    tuitionFee: "$800-1200/year",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "The oldest and largest university in Tajikistan, offering comprehensive education across multiple disciplines.",
    programs: 45,
    internationalStudents: 2500,
    campusSize: "Large",
    accreditation: "Ministry of Education and Science of Tajikistan",
    facilities: ["Library", "Sports Complex", "Dormitories", "Research Centers", "Computer Labs"],
    admissionRequirements: "High school diploma, entrance exam, language proficiency",
    scholarships: ["Merit-based scholarships", "Need-based aid", "International student grants"],
    contactInfo: {
      phone: "+992 37 221-77-77",
      email: "info@tnu.tj",
      website: "www.tnu.tj",
    },
  },
  {
    id: "3",
    name: "Avicenna Tajik State Medical University",
    location: "Dushanbe",
    type: "Public",
    established: 1939,
    students: 8000,
    faculties: ["General Medicine", "Pediatrics", "Dentistry", "Pharmacy", "Public Health"],
    tuitionFee: "$1500-2500/year",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    description: "Leading medical university in Central Asia, training healthcare professionals for the region.",
    programs: 12,
    internationalStudents: 1200,
    campusSize: "Medium",
    accreditation: "WHO, Ministry of Health",
    facilities: ["Teaching Hospital", "Anatomy Museum", "Research Labs", "Medical Library", "Simulation Center"],
    admissionRequirements: "High school diploma with science background, entrance exam, medical fitness",
    scholarships: ["Government scholarships", "WHO fellowships", "Merit awards"],
    contactInfo: {
      phone: "+992 37 224-55-66",
      email: "admission@avicenna.tj",
      website: "www.avicenna.tj",
    },
  },
  {
    id: "4",
    name: "Russian-Tajik University",
    location: "Dushanbe",
    type: "Public",
    established: 1996,
    students: 6000,
    faculties: ["Economics", "Law", "International Relations", "Journalism", "Information Technology"],
    tuitionFee: "$1200-2000/year",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=300",
    description: "Bilingual university offering education in Russian and Tajik languages with international standards.",
    programs: 18,
    internationalStudents: 500,
    campusSize: "Medium",
    accreditation: "Russian and Tajik Education Ministries",
    facilities: ["Modern Classrooms", "Language Labs", "Conference Hall", "Digital Library", "Student Center"],
    admissionRequirements: "High school diploma, language proficiency test, entrance exam",
    scholarships: ["Russian government scholarships", "Academic excellence awards"],
    contactInfo: {
      phone: "+992 37 227-88-99",
      email: "admission@rtu.tj",
      website: "www.rtu.tj",
    },
  },
  {
    id: "5",
    name: "Tajik Agrarian University",
    location: "Dushanbe",
    type: "Public",
    established: 1931,
    students: 12000,
    faculties: ["Agronomy", "Veterinary Medicine", "Agricultural Engineering", "Food Technology", "Economics"],
    tuitionFee: "$600-1000/year",
    rating: 4.1,
    image: "/placeholder.svg?height=200&width=300",
    description: "Specialized university focusing on agricultural sciences and rural development.",
    programs: 22,
    internationalStudents: 300,
    campusSize: "Large",
    accreditation: "Ministry of Agriculture",
    facilities: ["Experimental Farm", "Veterinary Clinic", "Greenhouses", "Food Processing Lab", "Agricultural Museum"],
    admissionRequirements: "High school diploma, basic science knowledge, entrance exam",
    scholarships: ["Agricultural development grants", "Rural student support"],
    contactInfo: {
      phone: "+992 37 234-66-77",
      email: "info@tau.tj",
      website: "www.tau.tj",
    },
  },
  {
    id: "6",
    name: "Khujand State University",
    location: "Khujand",
    type: "Public",
    established: 1932,
    students: 18000,
    faculties: ["Philology", "History", "Mathematics", "Chemistry", "Biology", "Geography"],
    tuitionFee: "$700-1100/year",
    rating: 4.2,
    image: "/placeholder.svg?height=200&width=300",
    description: "Major regional university in northern Tajikistan serving the Sughd province.",
    programs: 35,
    internationalStudents: 400,
    campusSize: "Large",
    accreditation: "Ministry of Education",
    facilities: ["Central Library", "Science Labs", "Cultural Center", "Sports Facilities", "Student Dormitories"],
    admissionRequirements: "High school diploma, entrance exam, regional preference",
    scholarships: ["Regional development scholarships", "Academic merit awards"],
    contactInfo: {
      phone: "+992 34 226-55-44",
      email: "admission@ksu.tj",
      website: "www.ksu.tj",
    },
  },
]

const cities = ["All Cities", "Dushanbe", "Khujand", "Kulob", "Qurghonteppa", "Istaravshan"]
const types = ["All Types", "Public", "Private"]
const faculties = [
  "All Faculties",
  "Engineering",
  "Medicine",
  "Economics",
  "Law",
  "Agriculture",
  "Education",
  "Sciences",
]

export default function UniversitiesPage() {
  const { t } = useLanguage()
  const { user, addToFavorites, removeFromFavorites } = useAuth()
  const [universities, setUniversities] = useState(tajikistanUniversities)
  const [filteredUniversities, setFilteredUniversities] = useState(tajikistanUniversities)
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedFaculty, setSelectedFaculty] = useState("All Faculties")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = universities

    if (searchTerm) {
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          uni.faculties.some((faculty) => faculty.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCity !== "All Cities") {
      filtered = filtered.filter((uni) => uni.location === selectedCity)
    }

    if (selectedType !== "All Types") {
      filtered = filtered.filter((uni) => uni.type === selectedType)
    }

    if (selectedFaculty !== "All Faculties") {
      filtered = filtered.filter((uni) =>
        uni.faculties.some((faculty) => faculty.toLowerCase().includes(selectedFaculty.toLowerCase())),
      )
    }

    setFilteredUniversities(filtered)
  }, [searchTerm, selectedCity, selectedType, selectedFaculty, universities])

  const toggleFavorite = (universityId: string) => {
    if (!user) {
      alert("Please sign in to save favorites")
      return
    }

    if (user.favorites?.includes(universityId)) {
      removeFromFavorites(universityId)
    } else {
      addToFavorites(universityId)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            Universities in Tajikistan
          </h1>
          <p className="text-gray-600 text-lg">
            Discover top universities and educational institutions across Tajikistan
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search universities, cities, or programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 h-12"
            >
              <Filter size={20} />
              <span>Filters</span>
            </Button>
          </div>

          {showFilters && (
            <motion.div
              className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Faculty</label>
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {faculties.map((faculty) => (
                    <option key={faculty} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <p className="text-gray-600">
            Showing {filteredUniversities.length} of {universities.length} universities
          </p>
        </motion.div>

        {/* Universities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((university, index) => (
            <motion.div
              key={university.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden neumorphism hover:shadow-2xl transition-all duration-300 h-full">
                <div className="relative">
                  <img
                    src={university.image || "/placeholder.svg"}
                    alt={university.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Badge variant="secondary" className="bg-white/90">
                      {university.type}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleFavorite(university.id)}
                      className={`bg-white/90 hover:bg-white ${
                        user?.favorites?.includes(university.id) ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      <Heart size={16} fill={user?.favorites?.includes(university.id) ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded">
                      <Star className="text-yellow-500" size={16} fill="currentColor" />
                      <span className="text-sm font-medium">{university.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{university.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{university.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{university.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-blue-500" />
                      <span>{university.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-2 text-green-500" />
                      <span>{university.programs} programs</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap size={16} className="mr-2 text-purple-500" />
                      <span>Est. {university.established}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={16} className="mr-2 text-orange-500" />
                      <span className="text-xs">{university.tuitionFee}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {university.faculties.slice(0, 3).map((faculty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {faculty}
                        </Badge>
                      ))}
                      {university.faculties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{university.faculties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedUniversity(university)}
                    className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GraduationCap className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No universities found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </motion.div>
        )}
      </div>

      {/* University Modal */}
      {selectedUniversity && (
        <UniversityModal
          university={selectedUniversity}
          isOpen={!!selectedUniversity}
          onClose={() => setSelectedUniversity(null)}
        />
      )}
    </div>
  )
}
