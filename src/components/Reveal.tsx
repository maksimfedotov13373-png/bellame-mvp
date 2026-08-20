import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}