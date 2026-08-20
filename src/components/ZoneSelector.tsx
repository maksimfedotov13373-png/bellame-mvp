import { motion } from "framer-motion"
import { staggerContainer, fadeUp } from "@/lib/motion"
import type { Zone } from "@/lib/data"

interface ZoneSelectorProps {
  zones: Zone[]
  selected: string[]
  onToggle: (id: string) => void
}

export default function ZoneSelector({ zones, selected, onToggle }: ZoneSelectorProps) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {zones.map((z) => {
        const isSelected = selected.includes(z.id)
        return (
          <motion.button
            key={z.id}
            variants={fadeUp}
            type="button"
            onClick={() => onToggle(z.id)}
            className={`group flex flex-col items-center gap-2 rounded-2xl border-2 p-5 text-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-rose ${
              isSelected
                ? "border-rose bg-rose-light shadow-[0_8px_24px_rgba(196,160,138,0.2)]"
                : "border-border bg-white hover:-translate-y-1 hover:border-rose/50 hover:shadow-[0_8px_24px_rgba(196,160,138,0.08)]"
            }`}
          >
            <span className="text-3xl">{z.icon}</span>
            <span className={`text-sm font-semibold transition-colors ${isSelected ? "text-rose-dark" : "text-graphite"}`}>
              {z.name}
            </span>
          </motion.button>
        )
      })}
    </motion.div>
  )
}