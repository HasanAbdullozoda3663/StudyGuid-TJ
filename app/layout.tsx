import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StudyGaid TJ - Study in Tajikistan",
  description: "Discover your perfect university and major in Tajikistan with AI guidance",
  generator: "Abdullozoda Hasan Saduullo",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            {children}
            <ChatbotWidget />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
