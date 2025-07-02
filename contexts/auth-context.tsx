"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  type: "student" | "institution" | "admin"
  avatar?: string
  favorites?: string[]
  applications?: string[]
}

interface AuthContextType {
  user: User | null
  signIn: (user: User) => void
  signOut: () => void
  addToFavorites: (universityId: string) => void
  removeFromFavorites: (universityId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const signIn = (userData: User) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const addToFavorites = (universityId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        favorites: [...(user.favorites || []), universityId],
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  const removeFromFavorites = (universityId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        favorites: (user.favorites || []).filter((id) => id !== universityId),
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, addToFavorites, removeFromFavorites }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
