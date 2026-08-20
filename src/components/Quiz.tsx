import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ProgressBar from "./ProgressBar"
import ZoneSelector from "./ZoneSelector"
import QuizStep from "./QuizStep"
import QuizResult from "./QuizResult"
import { ZONES } from "@/lib/data"
import { getResult, type QuizAnswers } from "@/lib/quiz"

const STEPS = [
  { id: "zones", title: "Какие зоны вас интересуют?", subtitle: "Можно выбрать несколько" },
  { id: "type", title: "Какой тип процедуры?", subtitle: "Если не уверены — выберите «Не знаю»" },
  { id: "experience", title: "Были ли процедуры раньше?", subtitle: "" },
]

const TYPE_OPTIONS = [
  { label: "Лазерная эпиляция", icon: "💡", value: "laser" },
  { label: "Воск / сахар", icon: "🍯", value: "wax" },
  { label: "Не знаю — подберите", icon: "✨", value: "unknown" },
]

const EXPERIENCE_OPTIONS = [
  { label: "Да, регулярно", icon: "🔄", value: "regular" },
  { label: "Было один раз", icon: "🕐", value: "once" },
  { label: "Нет, первый раз", icon: "🆕", value: "first" },
]

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({ zones: [], type: "", experience: "" })
  const [result, setResult] = useState<ReturnType<typeof getResult> | null>(null)

  const handleToggleZone = (id: string) => {
    setAnswers((prev) => ({
      ...prev,
      zones: prev.zones.includes(id) ? prev.zones.filter((z) => z !== id) : [...prev.zones, id],
    }))
  }

  const handleSelectType = (value: string) => {
    const next = { ...answers, type: value }
    setAnswers(next)
    setStep(2)
  }

  const handleSelectExperience = (value: string) => {
    const final = { ...answers, experience: value }
    setAnswers(final)
    setResult(getResult(final))
  }

  const handleRestart = () => {
    setStep(0)
    setAnswers({ zones: [], type: "", experience: "" })
    setResult(null)
  }

  const handleZonesNext = () => {
    if (answers.zones.length > 0) setStep(1)
  }

  return (
    <section id="quiz" className="scroll-mt-16 py-20 md:py-28">
      <div className="container-x mx-auto max-w-3xl">
        <div className="mb-8">
          <ProgressBar current={result ? 3 : step + 1} total={3} />
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div key="result" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <QuizResult {...result} onRestart={handleRestart} />
            </motion.div>
          ) : step === 0 ? (
            <motion.div key="zones" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-col gap-8">
                <div className="text-center">
                  <motion.h2
                    className="font-heading text-4xl font-semibold text-graphite md:text-5xl"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {STEPS[0].title}
                  </motion.h2>
                  <motion.p
                    className="mt-3 text-base text-graphite-soft"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {STEPS[0].subtitle}
                  </motion.p>
                </div>
                <ZoneSelector zones={ZONES} selected={answers.zones} onToggle={handleToggleZone} />
                <motion.button
                  type="button"
                  onClick={handleZonesNext}
                  disabled={answers.zones.length === 0}
                  className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-rose-dark disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Далее
                </motion.button>
              </div>
            </motion.div>
          ) : step === 1 ? (
            <motion.div key="type" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <QuizStep
                title={STEPS[1].title}
                subtitle={STEPS[1].subtitle}
                options={TYPE_OPTIONS}
                onSelect={handleSelectType}
              />
            </motion.div>
          ) : (
            <motion.div key="experience" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <QuizStep
                title={STEPS[2].title}
                subtitle={STEPS[2].subtitle}
                options={EXPERIENCE_OPTIONS}
                onSelect={handleSelectExperience}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}