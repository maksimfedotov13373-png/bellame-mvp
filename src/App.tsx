import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Check, Plus } from "lucide-react"
import {
  ZONES,
  ABSOLUTE_CONTRA,
  RELATIVE_CONTRA,
  PRE_CARE,
  AFTER_CARE,
  CONTACTS,
  SLOGAN,
  type PreCareItem,
} from "@/lib/data"

const EASE = [0.22, 1, 0.36, 1] as const

function useRise(delay: number) {
  const reduce = useReducedMotion()
  return riseProps(delay, reduce)
}

function riseProps(delay: number, reduce: boolean | null) {
  return {
    initial: reduce ? undefined : { opacity: 0, y: 28, filter: "blur(14px)" },
    whileInView: reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE, delay },
  }
}

function useStagger() {
  const reduce = useReducedMotion()
  return {
    initial: reduce ? undefined : { opacity: 0, y: 28, filter: "blur(14px)" },
    whileInView: reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE },
  }
}

function SectionHead({
  index,
  title,
  note,
}: {
  index: string
  title: string
  note?: string
}) {
  const s = useStagger()
  return (
    <div className="mb-10">
      <motion.div {...s} className="flex items-baseline gap-4">
        <span className="label text-faint">{index}</span>
        <h2>{title}</h2>
      </motion.div>
      {note && (
        <motion.p {...s} transition={{ ...s.transition, delay: 0.1 }} className="mt-4 text-soft">
          {note}
        </motion.p>
      )}
    </div>
  )
}

export default function App() {
  const [selectedZones, setSelectedZones] = useState<string[]>([])
  const reduce = useReducedMotion()

  const toggleZone = (id: string) =>
    setSelectedZones((p) => (p.includes(id) ? p.filter((z) => z !== id) : [...p, id]))

  const careVisible = (item: PreCareItem) => {
    if (selectedZones.length === 0) return true
    if (!item.noteZones) return true
    return item.noteZones.some((z) => selectedZones.includes(z))
  }

  const noteVisible = (item: PreCareItem) => {
    if (!item.note) return false
    if (selectedZones.length === 0) return true
    if (!item.noteZones) return true
    return item.noteZones.some((z) => selectedZones.includes(z))
  }

  const s = useStagger()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="hairline-b sticky top-0 z-50 bg-paper/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="font-display text-xl font-medium tracking-tight">Bella Me</span>
            <span className="label hidden text-faint sm:inline">Саратов / лазерная эпиляция</span>
          </a>
          <a href={CONTACTS.phoneHref} className="label hidden text-soft transition-colors hover:text-ink md:block">
            {CONTACTS.phone}
          </a>
          <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            <span className="btn__fill" />
            <span className="btn__label">
              Записаться
              <ArrowUpRight className="btn__arrow size-4" />
            </span>
          </a>
        </div>
      </header>

      <main className="pb-28 lg:pb-0">
        {/* Intro */}
        <section id="top" className="hairline-b">
          <div className="container-x py-20 md:py-28">
            <div className="max-w-3xl">
              <motion.p {...useRise(0)} className="label text-accent">
                Студия эпиляции — г. Саратов
              </motion.p>
              <motion.h1 {...useRise(0.1)} className="mt-6">
                Красота тела —<br />
                в&nbsp;гармонии с&nbsp;собой
              </motion.h1>
              <motion.p {...useRise(0.2)} className="mt-8 text-soft">
                Лазерная, восковая и&nbsp;сахарная эпиляция, массаж лица. Здесь собрано самое важное для
                подготовки к&nbsp;сеансу — противопоказания, правила и&nbsp;контакты.
              </motion.p>
              <motion.div {...useRise(0.3)} className="mt-10 flex flex-col gap-3 text-sm text-soft sm:flex-row sm:items-center sm:gap-6">
                <span>{CONTACTS.address}</span>
                <span className="hidden h-4 w-px bg-ink-faint/40 sm:block" />
                <span>{CONTACTS.hours}</span>
                <span className="hidden h-4 w-px bg-ink-faint/40 sm:block" />
                <span>Ответим за 15 минут</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Zones */}
        <section className="hairline-b">
          <div className="container-x py-16 md:py-20">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <motion.p {...useRise(0)} className="label text-faint">
                01 / Ваши зоны
              </motion.p>
              <motion.p {...useRise(0.08)} className="label text-soft">
                Подсказки подстроятся под выбор
              </motion.p>
            </div>
            <motion.div {...s} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {ZONES.map((z, i) => {
                const active = selectedZones.includes(z.id)
                return (
                  <motion.button
                    key={z.id}
                    type="button"
                    onClick={() => toggleZone(z.id)}
                    className={`group flex min-h-14 items-center justify-between gap-3 px-5 py-3 text-left transition-colors duration-300 ${
                      active ? "bg-ink text-paper" : "hairline hover:border-ink-faint"
                    }`}
                    initial={reduce ? undefined : { opacity: 0, y: 16, filter: "blur(8px)" }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.05 * i }}
                  >
                    <span>
                      <span className="block text-sm font-medium">{z.name}</span>
                      <span className={`mt-0.5 block text-xs ${active ? "text-paper/60" : "text-faint"}`}>
                        {z.note}
                      </span>
                    </span>
                    <span className={`flex size-5 shrink-0 items-center justify-center ${active ? "bg-accent" : "hairline"}`}>
                      {active ? (
                        <Check className="size-3.5 text-paper" strokeWidth={3} />
                      ) : (
                        <Plus className="size-3.5 text-faint transition-colors group-hover:text-ink" strokeWidth={2} />
                      )}
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Contraindications */}
        <section className="hairline-b">
          <div className="container-x py-16 md:py-20">
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <SectionHead
                  index="02 / Противопоказания"
                  title="Абсолютные"
                  note="Процедура не проводится"
                />
                <div>
                  {ABSOLUTE_CONTRA.map((c, i) => (
                    <motion.div key={c.id} className="hairline-t flex items-baseline gap-5 py-5" {...riseProps(0.05 * i, reduce)}>
                      <span className="label shrink-0 text-faint">0{i + 1}</span>
                      <p className="text-base leading-relaxed">{c.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHead
                  index="03 / Противопоказания"
                  title="Относительные"
                  note="Нужно уточнить у мастера"
                />
                <div>
                  {RELATIVE_CONTRA.map((c, i) => (
                    <motion.div key={c.id} className="hairline-t flex items-baseline gap-5 py-5" {...riseProps(0.05 * i, reduce)}>
                      <span className="label shrink-0 text-faint">0{i + 1}</span>
                      <p className="text-base leading-relaxed">{c.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div {...useRise(0.1)} className="bg-accent-tint mt-12 px-6 py-5">
              <p className="text-sm leading-relaxed text-ink">
                Есть сомнения? Сообщите мастеру при записи — он подскажет, что можно сделать в&nbsp;вашем случае.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Preparation */}
        <section className="hairline-b">
          <div className="container-x py-16 md:py-20">
            <SectionHead index="04 / Подготовка" title="Как подготовиться к сеансу" />
            <div>
              {PRE_CARE.map((item, i) => (
                <motion.div key={i} className="hairline-t py-6" {...riseProps(0.05 * i, reduce)}>
                  <div className="flex items-baseline gap-5">
                    <span className="label shrink-0 text-faint">0{i + 1}</span>
                    <div className="max-w-[60ch]">
                      <p className="text-base leading-relaxed">{item.text}</p>
                      {noteVisible(item) && careVisible(item) && (
                        <p className="mt-2 text-sm italic text-soft">{item.note}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* After care */}
        <section className="hairline-b">
          <div className="container-x py-16 md:py-20">
            <SectionHead index="05 / После сеанса" title="Как ухаживать за кожей после" />
            <div>
              {AFTER_CARE.map((item, i) => (
                <motion.div key={i} className="hairline-t py-6" {...riseProps(0.05 * i, reduce)}>
                  <div className="flex items-baseline gap-5">
                    <span className="label shrink-0 text-faint">0{i + 1}</span>
                    <p className="max-w-[60ch] text-base leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="hairline-b">
          <div className="container-x py-16 md:py-24">
            <SectionHead index="06 / Запись" title="Начните с сообщения" />
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-6">
                <a
                  href={CONTACTS.phoneHref}
                  className="font-display text-4xl font-medium tracking-tight transition-colors hover:text-accent md:text-5xl"
                >
                  {CONTACTS.phone}
                </a>
                <div className="flex flex-col gap-2 text-soft">
                  <p>
                    {CONTACTS.address}, {CONTACTS.addressDetail}
                  </p>
                  <p>{CONTACTS.hours}</p>
                  <p>
                    VK:{" "}
                    <a
                      href={CONTACTS.vk}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-hairline underline-offset-4 transition-colors hover:text-accent"
                    >
                      bella.me64
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4">
                <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  <span className="btn__fill" />
                  <span className="btn__label">
                    Записаться в WhatsApp
                    <ArrowUpRight className="btn__arrow size-4" />
                  </span>
                </a>
                <a href={CONTACTS.phoneHref} className="btn btn-outline">
                  <span className="btn__fill" />
                  <span className="btn__label">Позвонить в студию</span>
                </a>
                <span className="label text-faint">Ответим за 15 минут</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile sticky booking bar */}
      <div className="hairline-t fixed inset-x-0 bottom-0 z-40 bg-paper/95 backdrop-blur-md lg:hidden">
        <div className="container-x flex gap-3 py-3">
          <a href={CONTACTS.phoneHref} className="btn btn-outline flex-1">
            <span className="btn__fill" />
            <span className="btn__label">Позвонить</span>
          </a>
          <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid flex-1">
            <span className="btn__fill" />
            <span className="btn__label">Записаться</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="hairline-t">
        <div className="container-x flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl font-medium italic">{SLOGAN}</p>
          <div className="flex flex-col gap-2 text-sm text-faint">
            <span>Информация носит предварительный характер.</span>
            <span>Окончательное решение — со специалистом студии.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}