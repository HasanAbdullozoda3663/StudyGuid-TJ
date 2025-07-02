"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import {
  Brain,
  Search,
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  BookOpen,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react"

const majors = [
  {
    id: "1",
    name: "Computer Science",
    category: "Technology",
    description: "Study algorithms, programming, software development, and computer systems",
    difficulty: "High",
    duration: "4 years",
    averageSalary: "$45,000-65,000",
    employmentRate: "95%",
    universities: 8,
    skills: ["Programming", "Problem Solving", "Mathematics", "Logic"],
    careerPaths: ["Software Developer", "Data Scientist", "System Administrator", "AI Engineer"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Medicine",
    category: "Healthcare",
    description: "Train to become a medical doctor and provide healthcare services",
    difficulty: "Very High",
    duration: "6 years",
    averageSalary: "$55,000-85,000",
    employmentRate: "98%",
    universities: 3,
    skills: ["Biology", "Chemistry", "Communication", "Critical Thinking"],
    careerPaths: ["General Practitioner", "Specialist Doctor", "Surgeon", "Medical Researcher"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Civil Engineering",
    category: "Engineering",
    description: "Design and construct infrastructure projects like roads, bridges, and buildings",
    difficulty: "High",
    duration: "4 years",
    averageSalary: "$40,000-60,000",
    employmentRate: "92%",
    universities: 5,
    skills: ["Mathematics", "Physics", "Design", "Project Management"],
    careerPaths: ["Structural Engineer", "Construction Manager", "Urban Planner", "Project Engineer"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Economics",
    category: "Business",
    description: "Study economic theory, financial markets, and business principles",
    difficulty: "Medium",
    duration: "4 years",
    averageSalary: "$35,000-55,000",
    employmentRate: "88%",
    universities: 12,
    skills: ["Mathematics", "Analysis", "Communication", "Research"],
    careerPaths: ["Economist", "Financial Analyst", "Business Consultant", "Policy Advisor"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    name: "International Relations",
    category: "Social Sciences",
    description: "Study global politics, diplomacy, and international affairs",
    difficulty: "Medium",
    duration: "4 years",
    averageSalary: "$30,000-50,000",
    employmentRate: "85%",
    universities: 6,
    skills: ["Languages", "Communication", "Research", "Cultural Awareness"],
    careerPaths: ["Diplomat", "International Consultant", "NGO Worker", "Journalist"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    name: "Agriculture",
    category: "Agriculture",
    description: "Learn modern farming techniques, crop management, and agricultural technology",
    difficulty: "Medium",
    duration: "4 years",
    averageSalary: "$25,000-40,000",
    employmentRate: "90%",
    universities: 4,
    skills: ["Biology", "Chemistry", "Technology", "Management"],
    careerPaths: ["Agricultural Engineer", "Farm Manager", "Agricultural Consultant", "Researcher"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "7",
    name: "Law",
    category: "Legal",
    description: "Study legal systems, jurisprudence, and legal practice",
    difficulty: "High",
    duration: "5 years",
    averageSalary: "$35,000-65,000",
    employmentRate: "87%",
    universities: 7,
    skills: ["Critical Thinking", "Communication", "Research", "Writing"],
    careerPaths: ["Lawyer", "Judge", "Legal Consultant", "Corporate Counsel"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "8",
    name: "Mathematics",
    category: "Sciences",
    description: "Study pure and applied mathematics, statistics, and mathematical modeling",
    difficulty: "High",
    duration: "4 years",
    averageSalary: "$30,000-50,000",
    employmentRate: "89%",
    universities: 9,
    skills: ["Logic", "Problem Solving", "Analysis", "Programming"],
    careerPaths: ["Mathematician", "Data Analyst", "Teacher", "Actuary"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "9",
    name: "Physics",
    category: "Sciences",
    description: "Explore the fundamental laws of nature and physical phenomena",
    difficulty: "Very High",
    duration: "4 years",
    averageSalary: "$35,000-55,000",
    employmentRate: "91%",
    universities: 6,
    skills: ["Mathematics", "Problem Solving", "Research", "Analysis"],
    careerPaths: ["Physicist", "Research Scientist", "Engineer", "Teacher"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "10",
    name: "Chemistry",
    category: "Sciences",
    description: "Study chemical processes, molecular structures, and chemical reactions",
    difficulty: "High",
    duration: "4 years",
    averageSalary: "$32,000-52,000",
    employmentRate: "88%",
    universities: 8,
    skills: ["Laboratory Skills", "Analysis", "Mathematics", "Research"],
    careerPaths: ["Chemist", "Laboratory Technician", "Quality Control", "Researcher"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "11",
    name: "Biology",
    category: "Sciences",
    description: "Study living organisms, ecosystems, and biological processes",
    difficulty: "Medium",
    duration: "4 years",
    averageSalary: "$28,000-45,000",
    employmentRate: "86%",
    universities: 10,
    skills: ["Research", "Laboratory Skills", "Analysis", "Communication"],
    careerPaths: ["Biologist", "Research Scientist", "Environmental Consultant", "Teacher"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "12",
    name: "History",
    category: "Humanities",
    description: "Study past events, cultures, and civilizations",
    difficulty: "Medium",
    duration: "4 years",
    averageSalary: "$25,000-40,000",
    employmentRate: "82%",
    universities: 11,
    skills: ["Research", "Writing", "Analysis", "Communication"],
    careerPaths: ["Historian", "Teacher", "Museum Curator", "Archivist"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "13",
    name: "Philology",
    category: "Humanities",
    description: "Study languages, literature, and linguistic structures",
    difficulty: "Medium",
    duration: "4 years",
    averageSalary: "$24,000-38,000",
    employmentRate: "84%",
    universities: 9,
    skills: ["Languages", "Writing", "Research", "Communication"],
    careerPaths: ["Translator", "Teacher", "Editor", "Linguist"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "14",
    name: "Journalism",
    category: "Media",
    description: "Learn news reporting, media production, and communication",
    difficulty: "Medium",
    duration: "4 years",
    averageSalary: "$26,000-42,000",
    employmentRate: "79%",
    universities: 5,
    skills: ["Writing", "Communication", "Research", "Technology"],
    careerPaths: ["Journalist", "Editor", "Media Producer", "Communications Specialist"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "15",
    name: "Architecture",
    category: "Design",
    description: "Design buildings, urban spaces, and architectural structures",
    difficulty: "High",
    duration: "5 years",
    averageSalary: "$38,000-58,000",
    employmentRate: "89%",
    universities: 3,
    skills: ["Design", "Mathematics", "Creativity", "Technology"],
    careerPaths: ["Architect", "Urban Planner", "Interior Designer", "Construction Manager"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "16",
    name: "Electrical Engineering",
    category: "Engineering",
    description: "Study electrical systems, electronics, and power generation",
    difficulty: "High",
    duration: "4 years",
    averageSalary: "$42,000-62,000",
    employmentRate: "94%",
    universities: 4,
    skills: ["Mathematics", "Physics", "Problem Solving", "Technology"],
    careerPaths: ["Electrical Engineer", "Electronics Engineer", "Power Systems Engineer", "Control Systems Engineer"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "17",
    name: "Mechanical Engineering",
    category: "Engineering",
    description: "Design and develop mechanical systems, machines, and engines",
    difficulty: "High",
    duration: "4 years",
    averageSalary: "$40,000-60,000",
    employmentRate: "93%",
    universities: 4,
    skills: ["Mathematics", "Physics", "Design", "Problem Solving"],
    careerPaths: ["Mechanical Engineer", "Design Engineer", "Manufacturing Engineer", "Automotive Engineer"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "18",
    name: "Information Technology",
    category: "Technology",
    description: "Manage computer systems, networks, and information security",
    difficulty: "Medium",
    duration: "4 years",
    averageSalary: "$38,000-58,000",
    employmentRate: "91%",
    universities: 6,
    skills: ["Technology", "Problem Solving", "Communication", "Security"],
    careerPaths: ["IT Specialist", "Network Administrator", "Cybersecurity Analyst", "Systems Analyst"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

const categories = [
  "All Categories",
  "Technology",
  "Healthcare",
  "Engineering",
  "Business",
  "Social Sciences",
  "Agriculture",
  "Legal",
  "Sciences",
  "Humanities",
  "Media",
  "Design",
]
const difficulties = ["All Levels", "Medium", "High", "Very High"]
const employmentRates = ["All Rates", "80%+", "85%+", "90%+", "95%+"]

export default function FindMajorPage() {
  const { t } = useLanguage()
  const [showAssessment, setShowAssessment] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")
  const [selectedEmploymentRate, setSelectedEmploymentRate] = useState("All Rates")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredMajors, setFilteredMajors] = useState(majors)

  // Assessment form state
  const [assessmentData, setAssessmentData] = useState({
    interests: "",
    strengths: "",
    careerGoals: "",
    workStyle: "",
    subjects: [] as string[],
  })

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAssessment(false)
    // Here you would typically process the assessment data with AI
    alert("Assessment completed! Showing recommended majors based on your profile.")
  }

  // Filter majors based on search and filters
  useState(() => {
    let filtered = majors

    if (searchTerm) {
      filtered = filtered.filter(
        (major) =>
          major.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          major.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          major.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((major) => major.category === selectedCategory)
    }

    if (selectedDifficulty !== "All Levels") {
      filtered = filtered.filter((major) => major.difficulty === selectedDifficulty)
    }

    if (selectedEmploymentRate !== "All Rates") {
      const rate = Number.parseInt(selectedEmploymentRate.replace("%+", ""))
      filtered = filtered.filter((major) => Number.parseInt(major.employmentRate.replace("%", "")) >= rate)
    }

    setFilteredMajors(filtered)
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedEmploymentRate])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "High":
        return "text-orange-600 bg-orange-100"
      case "Very High":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getEmploymentColor = (rate: string) => {
    const numRate = Number.parseInt(rate.replace("%", ""))
    if (numRate >= 95) return "text-green-600 bg-green-100"
    if (numRate >= 90) return "text-blue-600 bg-blue-100"
    if (numRate >= 85) return "text-yellow-600 bg-yellow-100"
    return "text-orange-600 bg-orange-100"
  }

  return (
    <div className="min-h-screen pt-20">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            Find Your Perfect Major
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the ideal academic program that matches your interests and career goals
          </p>
        </motion.div>

        {showAssessment ? (
          /* AI Assessment Form */
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 neumorphism">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="text-white" size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">AI-Powered Major Assessment</h2>
                <p className="text-gray-600">
                  Answer a few questions to get personalized major recommendations based on your profile
                </p>
              </div>

              <form onSubmit={handleAssessmentSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What are your main interests and hobbies?
                    </label>
                    <Textarea
                      placeholder="e.g., technology, helping people, solving problems, creative work..."
                      value={assessmentData.interests}
                      onChange={(e) => setAssessmentData({ ...assessmentData, interests: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What are your strongest skills and abilities?
                    </label>
                    <Textarea
                      placeholder="e.g., mathematics, communication, leadership, analytical thinking..."
                      value={assessmentData.strengths}
                      onChange={(e) => setAssessmentData({ ...assessmentData, strengths: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What are your career goals and aspirations?
                    </label>
                    <Textarea
                      placeholder="e.g., become a doctor, start a tech company, work in government..."
                      value={assessmentData.careerGoals}
                      onChange={(e) => setAssessmentData({ ...assessmentData, careerGoals: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What work environment do you prefer?
                    </label>
                    <Textarea
                      placeholder="e.g., office setting, outdoors, laboratory, working with people..."
                      value={assessmentData.workStyle}
                      onChange={(e) => setAssessmentData({ ...assessmentData, workStyle: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Which subjects did you enjoy most in school? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "Mathematics",
                      "Physics",
                      "Chemistry",
                      "Biology",
                      "History",
                      "Literature",
                      "Languages",
                      "Art",
                      "Economics",
                      "Geography",
                      "Computer Science",
                      "Physical Education",
                    ].map((subject) => (
                      <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={assessmentData.subjects.includes(subject)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setAssessmentData({
                                ...assessmentData,
                                subjects: [...assessmentData.subjects, subject],
                              })
                            } else {
                              setAssessmentData({
                                ...assessmentData,
                                subjects: assessmentData.subjects.filter((s) => s !== subject),
                              })
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowAssessment(false)} className="px-8">
                    Skip Assessment
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 px-8"
                  >
                    <Zap className="mr-2" size={16} />
                    Get My Recommendations
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        ) : (
          /* Major Listings */
          <div>
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
                    placeholder="Search majors, categories, or career paths..."
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
                <Button
                  onClick={() => setShowAssessment(true)}
                  className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 h-12"
                >
                  <Brain className="mr-2" size={16} />
                  Take Assessment
                </Button>
              </div>

              {showFilters && (
                <motion.div
                  className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {difficulties.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Rate</label>
                    <select
                      value={selectedEmploymentRate}
                      onChange={(e) => setSelectedEmploymentRate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {employmentRates.map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("All Categories")
                        setSelectedDifficulty("All Levels")
                        setSelectedEmploymentRate("All Rates")
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Results Count */}
            <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <p className="text-gray-600">
                Showing {filteredMajors.length} of {majors.length} majors
              </p>
            </motion.div>

            {/* Major Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMajors.map((major, index) => (
                <motion.div
                  key={major.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden neumorphism hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="relative">
                      <img
                        src={major.image || "/placeholder.svg"}
                        alt={major.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90">
                          {major.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${getDifficultyColor(major.difficulty)} border-0`}>{major.difficulty}</Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{major.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{major.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-blue-500" />
                          <span>{major.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp size={16} className="mr-2 text-green-500" />
                          <Badge className={`${getEmploymentColor(major.employmentRate)} border-0 text-xs`}>
                            {major.employmentRate}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <DollarSign size={16} className="mr-2 text-orange-500" />
                          <span className="text-xs">{major.averageSalary}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-2 text-purple-500" />
                          <span className="text-xs">{major.universities} universities</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-1">
                          {major.skills.slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {major.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{major.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Career Paths:</h4>
                        <div className="space-y-1">
                          {major.careerPaths.slice(0, 2).map((career, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-600">
                              <Target size={12} className="mr-1 text-green-500" />
                              {career}
                            </div>
                          ))}
                          {major.careerPaths.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{major.careerPaths.length - 2} more career options
                            </div>
                          )}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white">
                        <BookOpen className="mr-2" size={16} />
                        View Universities
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredMajors.length === 0 && (
              <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Lightbulb className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No majors found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
