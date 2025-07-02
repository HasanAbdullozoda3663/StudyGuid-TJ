"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { User, Building, Mail, Lock, MapPin, FileText } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const { t } = useLanguage()
  const { signup } = useAuth()
  const [userType, setUserType] = useState<"student" | "university">("student")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    try {
      await signup({ ...formData, type: userType })
      alert(userType === "university" ? "Application submitted for review" : "Account created successfully")
    } catch (error) {
      alert("Error creating account")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              {t("nav.signUp")}
            </h1>
            <p className="text-gray-600">Join StudyGaid TJ community</p>
          </div>

          {/* User Type Selection */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setUserType("student")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                  userType === "student" ? "bg-white shadow-md text-green-600" : "text-gray-600 hover:text-green-600"
                }`}
              >
                <User size={20} />
                <span>Student</span>
              </button>
              <button
                onClick={() => setUserType("university")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                  userType === "university" ? "bg-white shadow-md text-red-600" : "text-gray-600 hover:text-red-600"
                }`}
              >
                <Building size={20} />
                <span>Institution</span>
              </button>
            </div>
          </div>

          <Card className="p-8 neumorphism">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="flex items-center space-x-2 mb-2">
                  <User size={16} />
                  <span>{userType === "university" ? "University Name" : "Full Name"}</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12"
                  placeholder={userType === "university" ? "Enter university name" : "Enter your full name"}
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center space-x-2 mb-2">
                  <Mail size={16} />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                  placeholder="Enter your email"
                />
              </div>

              {userType === "university" && (
                <div>
                  <Label htmlFor="location" className="flex items-center space-x-2 mb-2">
                    <MapPin size={16} />
                    <span>Location</span>
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="h-12"
                    placeholder="Enter university location"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="password" className="flex items-center space-x-2 mb-2">
                  <Lock size={16} />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="flex items-center space-x-2 mb-2">
                  <Lock size={16} />
                  <span>Confirm Password</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-12"
                  placeholder="Confirm your password"
                />
              </div>

              {userType === "university" && (
                <div>
                  <Label htmlFor="description" className="flex items-center space-x-2 mb-2">
                    <FileText size={16} />
                    <span>Description</span>
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[100px]"
                    placeholder="Describe your university..."
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white font-semibold"
              >
                {isSubmitting
                  ? "Creating Account..."
                  : userType === "university"
                    ? "Submit Application"
                    : "Create Account"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/signin" className="text-green-600 hover:text-green-700 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
