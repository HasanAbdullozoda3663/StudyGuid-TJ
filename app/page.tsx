"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { GraduationCap, Brain, Globe, Target, Sparkles, Mountain, BookOpen, Users, Heart } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Tajikistan Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Tajikistan-inspired gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-red-600/10 to-yellow-600/10" />

        {/* Animated Background Elements - Tajikistan themed */}
        <motion.div
          className="absolute top-20 left-10 text-green-300/30"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
          }}
        >
          <Mountain size={60} />
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 text-red-300/30"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <GraduationCap size={80} />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-20 text-yellow-300/30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        >
          <BookOpen size={70} />
        </motion.div>

        <div className="container mx-auto px-4 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-green-600 via-red-600 to-yellow-600 bg-clip-text text-transparent mb-6"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.h2
              className="text-3xl md:text-4xl text-gray-800 mb-4 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t("hero.subtitle")}
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/find-major">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow-effect"
                >
                  <Sparkles className="mr-2" />
                  {t("hero.findMajor")}
                </Button>
              </Link>

              <Link href="/universities">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                >
                  <Globe className="mr-2" />
                  {t("hero.exploreUniversities")}
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Users className="mr-2" />
                  {t("nav.signUp")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Tajikistan Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600/5 to-red-600/5">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              {t("about.title")}
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">{t("about.description")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Heart, title: t("about.advantages.affordable"), color: "text-green-600" },
              { icon: Target, title: t("about.advantages.quality"), color: "text-red-600" },
              { icon: Mountain, title: t("about.advantages.culture"), color: "text-yellow-600" },
              { icon: Globe, title: t("about.advantages.location"), color: "text-blue-600" },
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 text-center neumorphism hover:shadow-xl transition-all duration-300">
                  <advantage.icon className={`mx-auto mb-4 ${advantage.color}`} size={48} />
                  <h3 className="font-semibold text-gray-800">{advantage.title}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("features.title")}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: t("features.ai.title"),
                description: t("features.ai.description"),
                gradient: "from-green-500 to-green-600",
              },
              {
                icon: GraduationCap,
                title: t("features.universities.title"),
                description: t("features.universities.description"),
                gradient: "from-red-500 to-red-600",
              },
              {
                icon: Target,
                title: t("features.guidance.title"),
                description: t("features.guidance.description"),
                gradient: "from-yellow-500 to-yellow-600",
              },
              {
                icon: Mountain,
                title: t("features.culture.title"),
                description: t("features.culture.description"),
                gradient: "from-blue-500 to-blue-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-8 text-center neumorphism hover:shadow-2xl transition-all duration-300 h-full">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600/10 to-red-600/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "25+", label: t("stats.universities") },
              { number: "150+", label: t("stats.majors") },
              { number: "8+", label: t("stats.cities") },
              { number: "98%", label: t("stats.successRate") },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.h3
                  className="text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
