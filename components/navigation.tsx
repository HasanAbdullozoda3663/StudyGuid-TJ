"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Menu, X, Globe, User, LogOut, Settings, Heart, BookOpen, Building } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case "en":
        return "🇺🇸"
      case "ru":
        return "🇷🇺"
      case "tj":
        return "🇹🇯"
      default:
        return "🌐"
    }
  }

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case "en":
        return "English"
      case "ru":
        return "Русский"
      case "tj":
        return "Тоҷикӣ"
      default:
        return "Language"
    }
  }

  const getDashboardLink = () => {
    if (user?.type === "admin") return "/admin"
    if (user?.type === "institution") return "/institution/dashboard"
    return "/profile"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              StudyGuide TJ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/find-major" className="text-gray-700 hover:text-green-600 transition-colors">
              {t("nav.findMajor")}
            </Link>
            <Link href="/universities" className="text-gray-700 hover:text-green-600 transition-colors">
              {t("nav.universities")}
            </Link>
            <Link href="/compare" className="text-gray-700 hover:text-green-600 transition-colors">
              {t("nav.compare")}
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Globe size={16} />
                  <span>{getLanguageFlag(language)}</span>
                  <span className="text-sm">{getLanguageName(language)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")} className="flex items-center space-x-2">
                  <span>🇺🇸</span>
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ru")} className="flex items-center space-x-2">
                  <span>🇷🇺</span>
                  <span>Русский</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("tj")} className="flex items-center space-x-2">
                  <span>🇹🇯</span>
                  <span>Тоҷикӣ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span className="font-medium">{user.name}</span>
                    {user.type === "admin" && (
                      <Badge variant="destructive" className="text-xs">
                        Admin
                      </Badge>
                    )}
                    {user.type === "institution" && (
                      <Badge variant="secondary" className="text-xs">
                        Institution
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="flex items-center space-x-2">
                      {user.type === "admin" && <Settings size={16} />}
                      {user.type === "institution" && <Building size={16} />}
                      {user.type === "student" && <User size={16} />}
                      <span>
                        {user.type === "admin" && "Admin Dashboard"}
                        {user.type === "institution" && "Institution Dashboard"}
                        {user.type === "student" && t("nav.profile")}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  {user.type === "student" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/profile?tab=favorites" className="flex items-center space-x-2">
                          <Heart size={16} />
                          <span>Favorites</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile?tab=applications" className="flex items-center space-x-2">
                          <BookOpen size={16} />
                          <span>Applications</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center space-x-2 text-red-600">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/signin">
                  <Button variant="ghost">{t("nav.signIn")}</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                    {t("nav.signUp")}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
                {t("nav.home")}
              </Link>
              <Link href="/find-major" className="text-gray-700 hover:text-green-600 transition-colors">
                {t("nav.findMajor")}
              </Link>
              <Link href="/universities" className="text-gray-700 hover:text-green-600 transition-colors">
                {t("nav.universities")}
              </Link>
              <Link href="/compare" className="text-gray-700 hover:text-green-600 transition-colors">
                {t("nav.compare")}
              </Link>

              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Link
                    href={getDashboardLink()}
                    className="block text-gray-700 hover:text-green-600 transition-colors mb-2"
                  >
                    {user.type === "admin" && "Admin Dashboard"}
                    {user.type === "institution" && "Institution Dashboard"}
                    {user.type === "student" && t("nav.profile")}
                  </Link>
                  <Button onClick={handleSignOut} variant="ghost" className="text-red-600 p-0">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link href="/signin">
                    <Button variant="ghost" className="w-full justify-start">
                      {t("nav.signIn")}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                      {t("nav.signUp")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
