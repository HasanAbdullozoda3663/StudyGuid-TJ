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
  signup: (data: any) => Promise<any>
  login: (email: string, password: string) => Promise<any>
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

  // --- Signup function ---
  const signup = async (data: any) => {
    const role = data.type === "university" ? "institution" : "student";
    const payload: any = {
      name: data.name,
      email: data.email,
      password: data.password,
      role,
    };
    if (role === "institution") {
      payload.location = data.location;
      payload.description = data.description;
    }
    const res = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("Registration failed");
    }
    return await res.json();
  };

  // --- Login function ---
  const login = async (email: string, password: string) => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: email, password }),
    });
    if (!res.ok) {
      throw new Error("Login failed");
    }
    const data = await res.json();
    // Optionally, fetch user profile after login
    const profileRes = await fetch("http://127.0.0.1:8000/profile", {
      headers: { Authorization: `Bearer ${data.access_token}` },
    });
    if (!profileRes.ok) {
      throw new Error("Failed to fetch user profile");
    }
    const userData = await profileRes.json();
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", data.access_token);
    return userData;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, addToFavorites, removeFromFavorites, signup, login }}>
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
