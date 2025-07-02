"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ru" | "tj"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.findMajor": "Find Major",
    "nav.universities": "Universities",
    "nav.compare": "Compare",
    "nav.profile": "Profile",
    "nav.signUp": "Sign Up",
    "nav.signIn": "Sign In",

    // Hero Section
    "hero.title": "StudyGaid TJ",
    "hero.subtitle": "Discover Your Future in Tajikistan",
    "hero.description": "Find your perfect university and major in Tajikistan with AI guidance",
    "hero.findMajor": "Find My Major",
    "hero.exploreUniversities": "Explore Universities",

    // Features
    "features.title": "Why Study in Tajikistan?",
    "features.ai.title": "AI-Powered Matching",
    "features.ai.description":
      "Our advanced AI analyzes your interests and goals to recommend perfect majors in Tajikistan",
    "features.universities.title": "Top Universities",
    "features.universities.description":
      "Explore leading universities in Tajikistan with detailed programs and requirements",
    "features.guidance.title": "Personalized Guidance",
    "features.guidance.description": "Get tailored recommendations for studying in Tajikistan based on your profile",
    "features.culture.title": "Rich Culture",
    "features.culture.description": "Experience the beautiful culture and heritage of Tajikistan while studying",

    // Stats
    "stats.universities": "Universities",
    "stats.majors": "Majors",
    "stats.cities": "Cities",
    "stats.successRate": "Success Rate",

    // About Tajikistan
    "about.title": "About Studying in Tajikistan",
    "about.description":
      "Tajikistan offers world-class education with affordable tuition fees, rich cultural heritage, and stunning natural beauty. Our universities provide quality education in various fields including engineering, medicine, economics, and humanities.",
    "about.advantages.title": "Advantages of Studying in Tajikistan",
    "about.advantages.affordable": "Affordable Education",
    "about.advantages.quality": "Quality Programs",
    "about.advantages.culture": "Rich Cultural Experience",
    "about.advantages.location": "Strategic Location",

    // Common
    "common.loading": "Loading...",
    "common.search": "Search...",
    "common.filter": "Filter",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.submit": "Submit",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.close": "Close",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.findMajor": "Найти Специальность",
    "nav.universities": "Университеты",
    "nav.compare": "Сравнить",
    "nav.profile": "Профиль",
    "nav.signUp": "Регистрация",
    "nav.signIn": "Войти",

    // Hero Section
    "hero.title": "StudyGaid TJ",
    "hero.subtitle": "Откройте Свое Будущее в Таджикистане",
    "hero.description": "Найдите идеальный университет и специальность в Таджикистане с помощью ИИ",
    "hero.findMajor": "Найти Специальность",
    "hero.exploreUniversities": "Изучить Университеты",

    // Features
    "features.title": "Почему Учиться в Таджикистане?",
    "features.ai.title": "ИИ Подбор",
    "features.ai.description":
      "Наш продвинутый ИИ анализирует ваши интересы и цели для рекомендации идеальных специальностей в Таджикистане",
    "features.universities.title": "Лучшие Университеты",
    "features.universities.description":
      "Изучите ведущие университеты Таджикистана с подробными программами и требованиями",
    "features.guidance.title": "Персональное Руководство",
    "features.guidance.description":
      "Получите индивидуальные рекомендации для обучения в Таджикистане на основе вашего профиля",
    "features.culture.title": "Богатая Культура",
    "features.culture.description": "Познайте прекрасную культуру и наследие Таджикистана во время учебы",

    // Stats
    "stats.universities": "Университетов",
    "stats.majors": "Специальностей",
    "stats.cities": "Городов",
    "stats.successRate": "Успешность",

    // About Tajikistan
    "about.title": "Об Обучении в Таджикистане",
    "about.description":
      "Таджикистан предлагает образование мирового класса с доступной платой за обучение, богатым культурным наследием и потрясающей природной красотой. Наши университеты предоставляют качественное образование в различных областях, включая инженерию, медицину, экономику и гуманитарные науки.",
    "about.advantages.title": "Преимущества Обучения в Таджикистане",
    "about.advantages.affordable": "Доступное Образование",
    "about.advantages.quality": "Качественные Программы",
    "about.advantages.culture": "Богатый Культурный Опыт",
    "about.advantages.location": "Стратегическое Расположение",

    // Common
    "common.loading": "Загрузка...",
    "common.search": "Поиск...",
    "common.filter": "Фильтр",
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.submit": "Отправить",
    "common.next": "Далее",
    "common.previous": "Назад",
    "common.close": "Закрыть",
  },
  tj: {
    // Navigation
    "nav.home": "Асосӣ",
    "nav.findMajor": "Ихтисос Ёфтан",
    "nav.universities": "Донишгоҳҳо",
    "nav.compare": "Муқоиса",
    "nav.profile": "Профил",
    "nav.signUp": "Бақайдгирӣ",
    "nav.signIn": "Ворид шудан",

    // Hero Section
    "hero.title": "StudyGaid TJ",
    "hero.subtitle": "Ояндаи Худро дар Тоҷикистон Кашф Кунед",
    "hero.description": "Донишгоҳ ва ихтисоси беҳтаринро дар Тоҷикистон бо роҳнамоии AI пайдо кунед",
    "hero.findMajor": "Ихтисоси Манро Ёбед",
    "hero.exploreUniversities": "Донишгоҳҳоро Омӯзед",

    // Features
    "features.title": "Чаро дар Тоҷикистон Таҳсил Кунем?",
    "features.ai.title": "Интихоби AI",
    "features.ai.description":
      "AI-и пешрафтаи мо манфиатҳо ва ҳадафҳои шуморо таҳлил мекунад то ихтисосҳои беҳтаринро дар Тоҷикистон тавсия диҳад",
    "features.universities.title": "Донишгоҳҳои Беҳтарин",
    "features.universities.description": "Донишгоҳҳои пешбари Тоҷикистонро бо барномаҳо ва талаботи муфассал омӯзед",
    "features.guidance.title": "Роҳнамоии Шахсӣ",
    "features.guidance.description": "Тавсияҳои фардиро барои таҳсил дар Тоҷикистон дар асоси профили худ гиред",
    "features.culture.title": "Фарҳанги Бой",
    "features.culture.description": "Фарҳанг ва мероси зебои Тоҷикистонро ҳангоми таҳсил эҳсос кунед",

    // Stats
    "stats.universities": "Донишгоҳҳо",
    "stats.majors": "Ихтисосҳо",
    "stats.cities": "Шаҳрҳо",
    "stats.successRate": "Муваффақият",

    // About Tajikistan
    "about.title": "Дар бораи Таҳсил дар Тоҷикистон",
    "about.description":
      "Тоҷикистон таҳсилоти дараҷаи ҷаҳонӣ бо шаҳрияи дастрас, мероси фарҳангии бой ва зебоии табиии ҳайратангезро пешниҳод мекунад. Донишгоҳҳои мо таҳсилоти сифатнокро дар соҳаҳои гуногун аз ҷумла муҳандисӣ, тиб, иқтисодиёт ва улуми гуманитарӣ пешниҳод мекунанд.",
    "about.advantages.title": "Бартариҳои Таҳсил дар Тоҷикистон",
    "about.advantages.affordable": "Таҳсилоти Дастрас",
    "about.advantages.quality": "Барномаҳои Сифатнок",
    "about.advantages.culture": "Таҷрибаи Фарҳангии Бой",
    "about.advantages.location": "Мавқеияти Стратегӣ",

    // Common
    "common.loading": "Бор шуда истодааст...",
    "common.search": "Ҷустуҷӯ...",
    "common.filter": "Филтр",
    "common.save": "Захира кардан",
    "common.cancel": "Бекор кардан",
    "common.submit": "Фиристодан",
    "common.next": "Навбатӣ",
    "common.previous": "Қаблӣ",
    "common.close": "Пӯшидан",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "ru", "tj"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
