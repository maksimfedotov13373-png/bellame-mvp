import { motion } from "framer-motion"
import { staggerContainer, scaleIn } from "@/lib/motion"
import type { Zone } from "@/lib/data"

interface ZonePickerProps {
  zones: Zone[]
  selected: string[]
  onToggle: (id: string) => void
  onNext: () => void
}

export default function ZonePicker({ zones, selected, onToggle, onNext }: ZonePickerProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <motion.span
          className="mb-4 inline-block rounded-full bg-lavender px-4 py-1.5 text-sm font-semibold text-purple-dark"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Шаг 1 из 3
        </motion.span>
        <motion.h2
          className="mt-4 font-heading text-4xl font-bold text-graphite md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Какие зоны вас интересуют?
        </motion.h2>
        <motion.p
          className="mt-3 text-base text-graphite-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Можно выбрать несколько
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {zones.map((z) => {
          const isSelected = selected.includes(z.id)
          return (
            <motion.button
              key={z.id}
              variants={scaleIn}
              type="button"
              onClick={() => onToggle(z.id)}
              className={`group relative flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple ${
                isSelected
                  ? "glass-strong shadow-[0_12px_40px_rgba(123,94,167,0.2)] ring-2 ring-purple/40"
                  : "glass hover:shadow-[0_8px_30px_rgba(123,94,167,0.1)] hover:-translate-y-1"
              }`}
            >
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/10 to-violet/5"
                  layoutId="zone-glow"
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10 text-4xl">{z.icon}</span>
              <span className={`relative z-10 text-sm font-semibold transition-colors ${isSelected ? "text-purple-dark" : "text-graphite"}`}>
                {z.name}
              </span>
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 size-5 rounded-full bg-purple flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </motion.div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          type="button"
          onClick={onNext}
          disabled={selected.length === 0}
          className="relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple to-violet px-10 py-4 text-base font-bold text-white shadow-[0_16px_50px_rgba(123,94,167,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(123,94,167,0.4)] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        >
          Далее
        </button>
      </motion.div>
    </div>
  )
}