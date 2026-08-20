import { motion } from "framer-motion"
import { ArrowLeft, MessageCircle, Phone } from "lucide-react"
import { CONTACTS } from "@/lib/data"

interface QuizResultProps {
  suitable: boolean
  recommendation: string
  procedure: string
  message: string
  onRestart: () => void
}

export default function QuizResult({ suitable, recommendation, procedure, message, onRestart }: QuizResultProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <motion.span
          className={`mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${
            suitable ? "bg-rose-light text-rose-dark" : "bg-sand text-graphite-soft"
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {suitable ? "Рекомендация" : "Обратите внимание"}
        </motion.span>

        <motion.h2
          className="mt-4 font-heading text-4xl font-semibold text-graphite md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {recommendation}
        </motion.h2>

        {procedure && (
          <motion.p
            className="mt-2 text-lg text-rose-dark font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {procedure}
          </motion.p>
        )}
      </div>

      <motion.div
        className="rounded-3xl border border-border bg-white p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="text-base leading-relaxed text-graphite-soft">{message}</p>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-white p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p className="max-w-md text-sm leading-relaxed text-graphite-soft">
          Запишитесь на консультацию — мастер подберёт параметры процедуры именно под вас.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-bold text-white shadow-[0_12px_36px_rgba(196,160,138,0.3)] transition-all hover:-translate-y-0.5 hover:bg-rose-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Написать в WhatsApp
          </a>
          <a
            href={CONTACTS.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-rose bg-white px-8 py-4 text-base font-semibold text-rose-dark transition-all hover:-translate-y-0.5 hover:bg-rose-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
          >
            <Phone className="size-4" aria-hidden="true" />
            Позвонить
          </a>
        </div>
      </motion.div>

      <div className="text-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-sm font-medium text-graphite-soft transition-colors hover:text-rose-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
        >
          <ArrowLeft className="size-4" />
          Пройти заново
        </button>
      </div>
    </div>
  )
}