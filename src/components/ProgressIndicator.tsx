import { motion } from "framer-motion"

interface ProgressIndicatorProps {
  current: number
  total: number
  labels: string[]
}

export default function ProgressIndicator({ current, total, labels }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      {labels.map((label, i) => {
        const isActive = i + 1 === current
        const isDone = i + 1 < current
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isDone
                    ? "bg-purple text-white"
                    : isActive
                      ? "bg-gradient-to-r from-purple to-violet text-white shadow-[0_4px_20px_rgba(123,94,167,0.3)]"
                      : "bg-lavender text-purple-dark/40"
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {isDone ? (
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </motion.div>
              <span className={`hidden text-xs font-medium sm:block ${isActive ? "text-purple-dark" : "text-graphite-soft/50"}`}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div className="mx-1 h-px w-6 bg-lavender-deep sm:w-10" />
            )}
          </div>
        )
      })}
    </div>
  )
}