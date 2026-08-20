import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import HeroFlow from "@/components/HeroFlow"
import ZonePicker from "@/components/ZonePicker"
import ContraCheck from "@/components/ContraCheck"
import ResultScreen from "@/components/ResultScreen"
import ProgressIndicator from "@/components/ProgressIndicator"
import { ZONES, CONTRA_QUESTIONS } from "@/lib/data"

type Step = "hero" | "zones" | "contra" | "result"

const STEP_LABELS = ["Зоны", "Вопросы", "Результат"]

const pageVariants = {
  enter: { opacity: 0, x: 60, filter: "blur(4px)" },
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -60, filter: "blur(4px)" },
}

const pageTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
}

export default function App() {
  const [step, setStep] = useState<Step>("hero")
  const [selectedZones, setSelectedZones] = useState<string[]>([])
  const [contraAnswers, setContraAnswers] = useState<Record<string, boolean>>({})

  const handleToggleZone = useCallback((id: string) => {
    setSelectedZones((prev) => prev.includes(id) ? prev.filter((z) => z !== id) : [...prev, id])
  }, [])

  const handleContraAnswer = useCallback((id: string, value: boolean) => {
    setContraAnswers((prev) => ({ ...prev, [id]: value }))
  }, [])

  const handleRestart = useCallback(() => {
    setStep("hero")
    setSelectedZones([])
    setContraAnswers({})
  }, [])

  const progressStep = step === "zones" ? 1 : step === "contra" ? 2 : step === "result" ? 3 : 0

  return (
    <div className="min-h-screen bg-cream text-graphite antialiased">
      {/* Background decoration - always visible */}
      <div className="fixed inset-0 pointer-events-none gradient-mesh" aria-hidden="true" />

      {/* Sticky progress bar - visible during quiz */}
      {step !== "hero" && (
        <motion.div
          className="fixed top-0 right-0 left-0 z-50 glass-strong border-b border-white/30"
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-x flex h-14 items-center justify-between">
            <a href="#" className="font-heading text-lg font-bold text-purple-dark" onClick={handleRestart}>
              Bella Me
            </a>
            <ProgressIndicator current={progressStep} total={3} labels={STEP_LABELS} />
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className={step !== "hero" ? "pt-14" : ""}>
        <AnimatePresence mode="wait">
          {step === "hero" && (
            <motion.div key="hero" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={pageTransition}>
              <HeroFlow onStart={() => setStep("zones")} />
            </motion.div>
          )}

          {step === "zones" && (
            <motion.div key="zones" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={pageTransition}>
              <section className="min-h-screen py-20 md:py-28">
                <div className="container-x">
                  <ZonePicker
                    zones={ZONES}
                    selected={selectedZones}
                    onToggle={handleToggleZone}
                    onNext={() => setStep("contra")}
                  />
                </div>
              </section>
            </motion.div>
          )}

          {step === "contra" && (
            <motion.div key="contra" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={pageTransition}>
              <section className="min-h-screen py-20 md:py-28">
                <div className="container-x mx-auto max-w-3xl">
                  <ContraCheck
                    questions={CONTRA_QUESTIONS}
                    answers={contraAnswers}
                    onAnswer={handleContraAnswer}
                    onNext={() => setStep("result")}
                  />
                </div>
              </section>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div key="result" variants={pageVariants} initial="enter" animate="center" exit="exit" transition={pageTransition}>
              <section className="min-h-screen py-20 md:py-28">
                <div className="container-x mx-auto max-w-3xl">
                  <ResultScreen
                    selectedZones={selectedZones}
                    contraAnswers={contraAnswers}
                    questions={CONTRA_QUESTIONS}
                    onRestart={handleRestart}
                  />
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer - only on hero */}
      {step === "hero" && (
        <footer className="border-t border-border/50 py-8">
          <div className="container-x flex flex-col items-center gap-3 text-center">
            <span className="font-heading text-lg font-bold text-purple-dark">Bella Me</span>
            <p className="text-xs text-graphite-soft">Студия лазерной эпиляции, Саратов</p>
          </div>
        </footer>
      )}
    </div>
  )
}