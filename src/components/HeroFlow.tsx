import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

interface HeroFlowProps {
  onStart: () => void
}

export default function HeroFlow({ onStart }: HeroFlowProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden gradient-mesh">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-20 left-[10%] size-72 rounded-full bg-purple/5 blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-[15%] size-96 rounded-full bg-violet/5 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-lavender/20 blur-[150px] animate-pulse-soft" />
      </div>

      <div className="relative z-10 container-x flex flex-col items-center gap-10 text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-medium text-purple-dark"
        >
          <Sparkles className="size-4" />
          Студия лазерной эпиляции
        </motion.div>

        <motion.h1
          className="max-w-4xl font-heading text-5xl font-bold leading-[1.05] tracking-tight text-graphite md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Подготовьтесь к процедуре{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-purple to-violet bg-clip-text text-transparent">
              за пару минут
            </span>
            <motion.span
              className="absolute bottom-1 left-0 h-3 w-full bg-lavender/60 -z-0 rounded-sm"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="max-w-xl text-lg leading-relaxed text-graphite-soft md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Выберите зоны, ответьте на несколько вопросов и получите персональную памятку перед сеансом.
        </motion.p>

        <motion.button
          type="button"
          onClick={onStart}
          className="group relative mt-4 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple to-violet px-12 py-6 text-lg font-bold text-white shadow-[0_24px_80px_rgba(123,94,167,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_32px_100px_rgba(123,94,167,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-dark to-purple opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative z-10 flex items-center gap-3">
            Начать
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.button>

        <motion.p
          className="text-sm text-graphite-soft/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Это предварительная информация. Для точной консультации рекомендуем уточнить у специалиста.
        </motion.p>
      </div>
    </section>
  )
}