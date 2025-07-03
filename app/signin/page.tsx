"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Eye, EyeOff, Mail, Lock, Building, User, GraduationCap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const { t } = useLanguage()
  const { login } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Student login form
  const [studentForm, setStudentForm] = useState({
    email: "",
    password: "",
  })

  // Institution login form
  const [institutionForm, setInstitutionForm] = useState({
    email: "",
    password: "",
  })

  // Admin login form
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
  })

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const userData = await login(studentForm.email, studentForm.password)
      if (userData.role === "student") {
        router.push("/profile")
      } else {
        setError("Invalid account type. Please use the correct login tab.")
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstitutionLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const userData = await login(institutionForm.email, institutionForm.password)
      if (userData.role === "institution") {
        if (userData.status === "pending") {
          setError("Your account is pending approval. Please contact the administrator.")
        } else if (userData.status === "rejected") {
          setError("Your account has been rejected. Please contact the administrator.")
        } else {
          router.push("/institution/dashboard")
        }
      } else {
        setError("Invalid account type. Please use the correct login tab.")
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const userData = await login(adminForm.email, adminForm.password)
      if (userData.role === "admin") {
        router.push("/admin")
      } else {
        setError("Invalid account type. Please use the correct login tab.")
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-red-50">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <motion.div className="max-w-md mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Sign In to StudyGuid TJ
            </h1>
            <p className="text-gray-600">Choose your account type to continue</p>
          </div>

          <Card className="p-6 neumorphism">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student" className="flex items-center space-x-2">
                  <User size={16} />
                  <span>Student</span>
                </TabsTrigger>
                <TabsTrigger value="institution" className="flex items-center space-x-2">
                  <Building size={16} />
                  <span>Institution</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center space-x-2">
                  <GraduationCap size={16} />
                  <span>Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="mt-6">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="student-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="student-email"
                        type="email"
                        placeholder="student@example.com"
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="student-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="student-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In as Student"}
                  </Button>

                  <div className="text-center text-sm text-gray-600">Use your registered student credentials</div>
                </form>
              </TabsContent>

              <TabsContent value="institution" className="mt-6">
                <form onSubmit={handleInstitutionLogin} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="institution-email">Institution Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="institution-email"
                        type="email"
                        placeholder="admin@university.tj"
                        value={institutionForm.email}
                        onChange={(e) => setInstitutionForm({ ...institutionForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="institution-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="institution-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={institutionForm.password}
                        onChange={(e) => setInstitutionForm({ ...institutionForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In as Institution"}
                  </Button>

                  <div className="text-center text-sm text-gray-600">Use your approved institution credentials</div>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@studygaid.tj"
                        value={adminForm.email}
                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={adminForm.password}
                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In as Admin"}
                  </Button>

                  <div className="text-center text-sm text-gray-600">Use your admin credentials</div>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-green-600 hover:text-green-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
