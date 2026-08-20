import { useCallback } from "react"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Quiz from "@/components/Quiz"
import Recommendations from "@/components/Recommendations"
import Reviews from "@/components/Reviews"
import StickyHeader from "@/components/StickyHeader"

export default function App() {
  const handleStart = useCallback(() => {
    setTimeout(() => {
      document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [])

  return (
    <div className="min-h-screen bg-cream text-graphite antialiased">
      <a href="#quiz" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-4 focus:font-semibold">
        Перейти к квизу
      </a>
      <StickyHeader />
      <Hero onStart={handleStart} />
      <About />
      <Quiz />
      <Recommendations />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  )
}