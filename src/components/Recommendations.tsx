import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { AFTERCARE } from "@/lib/data"
import Reveal from "./Reveal"

export default function Recommendations() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="scroll-mt-16 bg-cream-deep py-20 md:py-28">
      <div className="container-x mx-auto max-w-3xl">
        <Reveal className="text-center">
          <span className="rounded-full bg-rose-light px-4 py-1.5 text-sm font-semibold text-rose-dark">
            Рекомендации
          </span>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-graphite md:text-5xl">
            Подготовка к процедуре
          </h2>
          <p className="mt-3 text-base text-graphite-soft">
            Что важно знать до и после сеанса
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {AFTERCARE.map((section, i) => (
            <Reveal key={section.title} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl border border-border bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-rose"
                >
                  <span className="font-heading text-xl font-semibold text-graphite">{section.title}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="size-5 text-graphite-soft" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col gap-3 px-6 pb-6">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-graphite-soft">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}