import { motion } from "framer-motion"

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = (current / total) * 100

  return (
    <div className="flex items-center gap-3" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label={`Шаг ${current} из ${total}`}>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-sand">
        <motion.div
          className="h-full rounded-full bg-rose"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="text-xs font-medium text-graphite-soft" aria-hidden="true">
        {current}/{total}
      </span>
    </div>
  )
}