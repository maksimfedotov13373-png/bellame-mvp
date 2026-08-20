import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CONTACTS } from "@/lib/data"

interface HeroProps {
  onStart: () => void
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#FAFAF8_0%,#F5F3F0_40%,#E8E4DF_80%,#C4A08A15_100%)]" aria-hidden="true" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose/5 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-rose/3 blur-3xl" aria-hidden="true" />

      <div className="relative container-x flex flex-col items-start gap-8 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/70 px-4 py-1.5 text-sm font-medium text-rose-dark backdrop-blur"
        >
          <span className="size-2 rounded-full bg-rose animate-pulse" />
          Студия эпиляции, Саратов
        </motion.div>

        <motion.h1
          className="max-w-3xl font-heading text-5xl font-semibold leading-[1.1] tracking-tight text-graphite md:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Нежность, к которой{" "}
          <span className="relative inline-block text-rose">
            хочется прикасаться
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 320 8" fill="none" aria-hidden="true">
              <motion.path
                d="M3 5 Q 160 -2 317 5"
                stroke="#C4A08A"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          className="max-w-lg text-lg leading-relaxed text-graphite-soft md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Лазерная эпиляция, воск, массаж лица. Подберём процедуру под ваш тип кожи и запишем на удобное время.
        </motion.p>

        <motion.button
          type="button"
          onClick={onStart}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-rose px-10 py-5 text-lg font-bold text-white shadow-[0_20px_60px_rgba(196,160,138,0.35)] transition-all hover:-translate-y-0.5 hover:bg-rose-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          Подобрать процедуру
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </motion.button>

        <motion.a
          href={CONTACTS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-rose/40 bg-white/60 px-7 py-3.5 text-base font-semibold text-graphite backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_24px_rgba(196,160,138,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          Записаться в WhatsApp
        </motion.a>

        <motion.div
          className="flex flex-wrap items-center gap-4 text-sm text-graphite-soft sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-rose" />
            Без выходных
          </span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-graphite-soft" />
            Вход со двора
          </span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-rose" />
            22 отзыва на Avito
          </span>
        </motion.div>
      </div>
    </section>
  )
}