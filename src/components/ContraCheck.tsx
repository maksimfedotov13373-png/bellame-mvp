import { motion } from "framer-motion"
import type { ContraQuestion } from "@/lib/data"

interface ContraCheckProps {
  questions: ContraQuestion[]
  answers: Record<string, boolean>
  onAnswer: (id: string, value: boolean) => void
  onNext: () => void
}

export default function ContraCheck({ questions, answers, onAnswer, onNext }: ContraCheckProps) {
  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === questions.length
  const hasAbsoluteIssue = questions.some((q) => q.absolute && answers[q.absolute] === false)

  return (
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <motion.span
          className="mb-4 inline-block rounded-full bg-lavender px-4 py-1.5 text-sm font-semibold text-purple-dark"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Шаг 2 из 3
        </motion.span>
        <motion.h2
          className="mt-4 font-heading text-4xl font-bold text-graphite md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Важные вопросы
        </motion.h2>
        <motion.p
          className="mt-3 text-base text-graphite-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Ответьте честно — это поможет подготовиться к процедуре
        </motion.p>
      </div>

      <div className="flex flex-col gap-4">
        {questions.map((q, i) => {
          const answer = answers[q.id]
          const isAnswered = answer !== undefined
          return (
            <motion.div
              key={q.id}
              className={`glass rounded-2xl p-6 transition-all duration-300 ${
                isAnswered ? (answer ? "ring-1 ring-green-300/50" : "ring-1 ring-amber-300/50") : ""
              }`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p className="text-base font-semibold text-graphite">{q.question}</p>
                  {isAnswered && !answer && (
                    <motion.p
                      className="mt-1 text-sm text-amber-600"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      {q.detail}
                    </motion.p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onAnswer(q.id, true)}
                    className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple ${
                      answer === true
                        ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                        : "glass hover:bg-green-50 text-graphite-soft"
                    }`}
                  >
                    Да
                  </button>
                  <button
                    type="button"
                    onClick={() => onAnswer(q.id, false)}
                    className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple ${
                      answer === false
                        ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                        : "glass hover:bg-amber-50 text-graphite-soft"
                    }`}
                  >
                    Нет
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {!allAnswered && (
          <p className="text-sm text-graphite-soft">
            Отвечено: {answeredCount} из {questions.length}
          </p>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!allAnswered}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple to-violet px-10 py-4 text-base font-bold text-white shadow-[0_16px_50px_rgba(123,94,167,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(123,94,167,0.4)] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        >
          Получить памятку
        </button>
      </motion.div>
    </div>
  )
}