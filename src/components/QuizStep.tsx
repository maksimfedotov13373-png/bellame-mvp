import { motion } from "framer-motion"
import { staggerContainer, fadeUp } from "@/lib/motion"

interface QuizStepProps {
  title: string
  subtitle?: string
  options: { label: string; icon: string; value: string }[]
  onSelect: (value: string) => void
  multi?: boolean
  selected?: string[]
  onToggle?: (value: string) => void
}

export default function QuizStep({ title, subtitle, options, onSelect, multi, selected = [], onToggle }: QuizStepProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <motion.h2
          className="font-heading text-4xl font-semibold text-graphite md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="mt-3 text-base text-graphite-soft"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value)
          return (
            <motion.button
              key={opt.value}
              variants={fadeUp}
              type="button"
              onClick={() => multi && onToggle ? onToggle(opt.value) : onSelect(opt.value)}
              className={`group flex items-center gap-4 rounded-2xl border-2 p-6 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-rose ${
                isSelected
                  ? "border-rose bg-rose-light shadow-[0_8px_24px_rgba(196,160,138,0.2)]"
                  : "border-border bg-white hover:-translate-y-1 hover:border-rose/50 hover:shadow-[0_16px_48px_rgba(196,160,138,0.08)]"
              }`}
            >
              <span className={`flex size-12 items-center justify-center rounded-xl text-2xl transition-colors duration-300 ${
                isSelected ? "bg-rose text-white" : "bg-rose-light group-hover:bg-rose group-hover:text-white"
              }`}>
                {opt.icon}
              </span>
              <span className={`font-heading text-xl font-semibold transition-colors ${isSelected ? "text-rose-dark" : "text-graphite group-hover:text-rose-dark"}`}>
                {opt.label}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}