import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Check } from "lucide-react"
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

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: EASE, delay },
})

function useStagger() {
  const reduce = useReducedMotion()
  return {
    initial: reduce ? undefined : { opacity: 0, y: 28, filter: "blur(14px)" },
    whileInView: reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE },
  }
}

function SectionHeader({ index, title, note }: { index: string; title: string; note?: string }) {
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
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const reduce = useReducedMotion()

  const toggleZone = (id: string) =>
    setSelectedZones((p) => (p.includes(id) ? p.filter((z) => z !== id) : [...p, id]))

  const toggleCheck = (id: string) =>
    setChecks((p) => ({ ...p, [id]: !p[id] }))

  const anyAbsolute = ABSOLUTE_CONTRA.some((c) => checks[c.id] === false)

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

  const nav = [
    { href: "#contra", label: "Противопоказания" },
    { href: "#prepare", label: "Подготовка" },
    { href: "#after", label: "После сеанса" },
    { href: "#book", label: "Запись" },
  ]

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
          <nav className="hidden items-center gap-7 md:flex">
            {nav.slice(0, 3).map((n) => (
              <a key={n.href} href={n.href} className="label text-soft transition-colors hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            <span className="btn__fill" />
            <span className="btn__label">
              Записаться в WhatsApp
              <ArrowUpRight className="btn__arrow size-4" />
            </span>
          </a>
        </div>
      </header>

      {/* Intro */}
      <section id="top" className="hairline-b">
        <div className="container-x py-24 md:py-32">
          <div className="max-w-4xl">
            <motion.p {...rise(0)} className="label text-accent">
              Студия эпиляции — г. Саратов
            </motion.p>
            <motion.h1 {...rise(0.1)} className="mt-6">
              Красота тела —<br />
              в&nbsp;гармонии с&nbsp;собой
            </motion.h1>
            <motion.p {...rise(0.2)} className="mt-8 text-soft">
              Лазерная, восковая и&nbsp;сахарная эпиляция, массаж лица. Подготовьтесь к&nbsp;сеансу за&nbsp;пару минут —
              проверьте противопоказания и&nbsp;запомните рекомендации.
            </motion.p>
            <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#book" className="btn btn-solid">
                <span className="btn__fill" />
                <span className="btn__label">
                  Выбрать зону и записаться
                  <ArrowUpRight className="btn__arrow size-4" />
                </span>
              </a>
              <span className="label text-faint">Ответим за 15 минут / с 9:00 до 20:00</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zones strip */}
      <section id="zones" className="hairline-b">
        <div className="container-x py-16 md:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <motion.p {...rise(0)} className="label text-faint">
              01 / Ваши зоны
            </motion.p>
            <motion.p {...rise(0.08)} className="label text-soft">
              Подсказки подстроятся под выбор
            </motion.p>
          </div>
          <motion.div {...s} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {ZONES.map((z, i) => {
              const active = selectedZones.includes(z.id)
              return (
                <motion.button
                  key={z.id}
                  type="button"
                  onClick={() => toggleZone(z.id)}
                  className={`flex min-h-11 items-center gap-3 border-b py-2 text-left transition-colors ${
                    active ? "border-ink" : "border-transparent hover:border-ink-faint"
                  }`}
                  initial={reduce ? undefined : { opacity: 0, y: 16, filter: "blur(8px)" }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.05 * i }}
                >
                  <span className={`text-sm font-medium ${active ? "text-ink" : "text-soft"}`}>{z.name}</span>
                  <span className="text-faint text-xs">{z.note}</span>
                  <span
                    className={`flex size-4 items-center justify-center rounded-full transition-colors ${
                      active ? "bg-accent" : "hairline"
                    }`}
                  >
                    {active && <Check className="size-3 text-paper" strokeWidth={3} />}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Main two-column */}
      <div className="container-x grid gap-12 py-20 lg:grid-cols-[220px_1fr] lg:gap-20">
        {/* Rail nav */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 flex flex-col">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="label py-3 text-faint transition-colors hover:text-ink"
              >
                {n.label}
              </a>
            ))}
            <p className="label mt-8 text-faint">{CONTACTS.hours}</p>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          {/* Contraindications */}
          <section id="contra" className="scroll-mt-24">
            <SectionHeader
              index="02 / Противопоказания"
              title="Проверьте себя перед сеансом"
              note="Отметьте пункты, которые про вас. Всё, что отмечено, — повод сказать мастеру при записи."
            />

            <div className="mb-12">
              <motion.p {...rise(0)} className="label mb-4 text-accent">
                Абсолютные — процедура не проводится
              </motion.p>
              <div>
                {ABSOLUTE_CONTRA.map((c, i) => {
                  const checked = checks[c.id] === false
                  return (
                    <motion.button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCheck(c.id)}
                      className="hairline-t flex w-full items-start gap-5 py-5 text-left"
                      {...rise(0.04 * i)}
                    >
                      <span
                        className={`mt-1 flex size-5 shrink-0 items-center justify-center border transition-colors ${
                          checked ? "border-accent bg-accent" : "border-ink-faint"
                        }`}
                      >
                        {checked && <Check className="size-3.5 text-paper" strokeWidth={3} />}
                      </span>
                      <span className={`text-base leading-relaxed ${checked ? "text-accent" : "text-ink"}`}>
                        {c.text}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="mb-12">
              <motion.p {...rise(0)} className="label mb-4 text-faint">
                Относительные — нужно уточнить у мастера
              </motion.p>
              <div>
                {RELATIVE_CONTRA.map((c, i) => {
                  const checked = checks[c.id] === false
                  return (
                    <motion.button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCheck(c.id)}
                      className="hairline-t flex w-full items-start gap-5 py-5 text-left"
                      {...rise(0.04 * i)}
                    >
                      <span
                        className={`mt-1 flex size-5 shrink-0 items-center justify-center border transition-colors ${
                          checked ? "border-accent bg-accent" : "border-ink-faint"
                        }`}
                      >
                        {checked && <Check className="size-3.5 text-paper" strokeWidth={3} />}
                      </span>
                      <span className={`text-base leading-relaxed ${checked ? "text-accent" : "text-ink"}`}>
                        {c.text}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {anyAbsolute && (
              <motion.div
                className="bg-accent-tint px-6 py-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="text-ink">
                  Вы отметили пункты из абсолютных противопоказаний. Обязательно сообщите о&nbsp;них мастеру —
                  вместе решите, что можно сделать.
                </p>
              </motion.div>
            )}
          </section>

          {/* Preparation */}
          <section id="prepare" className="scroll-mt-24 pt-24">
            <SectionHeader
              index="03 / Подготовка"
              title="Как подготовиться к сеансу"
            />
            <div>
              {PRE_CARE.map((item, i) => (
                <motion.div key={i} className="hairline-t py-6" {...rise(0.05 * i)}>
                  <div className="flex items-baseline gap-5">
                    <span className="label text-faint">0{i + 1}</span>
                    <div className="max-w-[60ch]">
                      <p className="text-base leading-relaxed">{item.text}</p>
                      {noteVisible(item) && (
                        <p className="mt-2 text-sm italic text-soft">{item.note}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* After care */}
          <section id="after" className="scroll-mt-24 pt-24">
            <SectionHeader
              index="04 / После сеанса"
              title="Как ухаживать за кожей после"
            />
            <div>
              {AFTER_CARE.map((item, i) => (
                <motion.div key={i} className="hairline-t py-6" {...rise(0.05 * i)}>
                  <div className="flex items-baseline gap-5">
                    <span className="label text-faint">0{i + 1}</span>
                    <p className="max-w-[60ch] text-base leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Booking */}
          <section id="book" className="scroll-mt-24 pt-24">
            <div className="hairline-t pt-12">
              <SectionHeader index="05 / Запись" title="Начните с сообщения" />
              <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-6">
                  <a
                    href={CONTACTS.phoneHref}
                    className="font-display text-4xl font-medium tracking-tight transition-colors hover:text-accent md:text-6xl"
                  >
                    {CONTACTS.phone}
                  </a>
                  <div className="flex flex-col gap-3 text-soft">
                    <p>{CONTACTS.address}, {CONTACTS.addressDetail}</p>
                    <p>{CONTACTS.hours}</p>
                    <p>
                      VK: <a href={CONTACTS.vk} target="_blank" rel="noopener noreferrer" className="underline decoration-hairline underline-offset-4 transition-colors hover:text-accent">bella.me64</a>
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