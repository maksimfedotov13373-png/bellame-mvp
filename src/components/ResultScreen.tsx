import { motion } from "framer-motion"
import { MessageCircle, Phone, ArrowLeft, CheckCircle2, AlertTriangle, FileText } from "lucide-react"
import { CONTACTS, ZONES, PRE_CARE, AFTER_CARE, type ContraQuestion } from "@/lib/data"
import { staggerContainer, fadeUp } from "@/lib/motion"

interface ResultScreenProps {
  selectedZones: string[]
  contraAnswers: Record<string, boolean>
  questions: ContraQuestion[]
  onRestart: () => void
}

export default function ResultScreen({ selectedZones, contraAnswers, questions, onRestart }: ResultScreenProps) {
  const absoluteIssues = questions.filter((q) => q.absolute && contraAnswers[q.id] === false)
  const relativeIssues = questions.filter((q) => !q.absolute && contraAnswers[q.id] === false)
  const zoneNames = selectedZones.map((id) => ZONES.find((z) => z.id === id)?.name || id)

  const getRelevantCare = (items: { icon: string; text: string; zones?: string[] }[]) => {
    return items.filter((item) => !item.zones || item.zones.some((z) => selectedZones.includes(z)))
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <motion.span
          className="mb-4 inline-block rounded-full bg-lavender px-4 py-1.5 text-sm font-semibold text-purple-dark"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Результат
        </motion.span>
        <motion.h2
          className="mt-4 font-heading text-4xl font-bold text-graphite md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Ваша памятка
        </motion.h2>
      </div>

      {/* Selected zones */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-dark">Выбранные зоны</h3>
        <div className="flex flex-wrap gap-2">
          {zoneNames.map((name) => (
            <span key={name} className="rounded-full bg-purple/10 px-4 py-1.5 text-sm font-medium text-purple-dark">
              {name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Contraindication status */}
      {absoluteIssues.length > 0 ? (
        <motion.div
          className="rounded-2xl border border-amber-300/50 bg-amber-50/80 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-3 flex items-center gap-3">
            <AlertTriangle className="size-5 text-amber-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-700">Важно обсудить с администратором</h3>
          </div>
          <ul className="flex flex-col gap-2">
            {absoluteIssues.map((q) => (
              <li key={q.id} className="flex items-start gap-2 text-sm text-amber-800">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-500" />
                {q.detail}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-amber-600">
            Эти моменты не являются绝对ным противопоказанием, но требуют обязательной консультации со специалистом.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="rounded-2xl border border-green-300/50 bg-green-50/80 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-5 text-green-600" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-700">Основных ограничений не обнаружено</h3>
          </div>
          <p className="mt-2 text-sm text-green-700">
            Предварительно вы можете рассматривать процедуру. Для точной консультации рекомендуем уточнить у специалиста.
          </p>
        </motion.div>
      )}

      {relativeIssues.length > 0 && (
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="mb-3 flex items-center gap-3">
            <AlertTriangle className="size-5 text-purple" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-dark">Обратите внимание</h3>
          </div>
          <ul className="flex flex-col gap-2">
            {relativeIssues.map((q) => (
              <li key={q.id} className="flex items-start gap-2 text-sm text-graphite-soft">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-purple" />
                {q.detail}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Pre-care */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-4 flex items-center gap-3">
          <FileText className="size-5 text-purple" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-dark">Подготовка к процедуре</h3>
        </div>
        <motion.ul className="flex flex-col gap-3" variants={staggerContainer} initial="hidden" animate="visible">
          {getRelevantCare(PRE_CARE).map((item, i) => (
            <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-graphite-soft">
              <span className="mt-0.5 text-lg">{item.icon}</span>
              {item.text}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* After-care */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="mb-4 flex items-center gap-3">
          <CheckCircle2 className="size-5 text-purple" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-dark">После процедуры</h3>
        </div>
        <ul className="flex flex-col gap-3">
          {AFTER_CARE.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-graphite-soft">
              <span className="mt-0.5 text-lg">{item.icon}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="glass-strong rounded-3xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="mb-6 max-w-md mx-auto text-sm leading-relaxed text-graphite-soft">
          Для точной консультации и записи рекомендуем связаться со специалистом. Мастер подберёт параметры процедуры именно под вас.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple to-violet px-8 py-4 text-base font-bold text-white shadow-[0_16px_50px_rgba(123,94,167,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(123,94,167,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          >
            <MessageCircle className="size-4" />
            Написать в WhatsApp
          </a>
          <a
            href={CONTACTS.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold text-purple-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(123,94,167,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          >
            <Phone className="size-4" />
            Позвонить
          </a>
        </div>
      </motion.div>

      <div className="text-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-sm font-medium text-graphite-soft transition-colors hover:text-purple-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        >
          <ArrowLeft className="size-4" />
          Пройти заново
        </button>
      </div>
    </div>
  )
}