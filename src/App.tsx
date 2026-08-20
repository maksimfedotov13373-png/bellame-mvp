import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Shield, Sparkles, Phone, MessageCircle, MapPin, Clock } from "lucide-react"
import {
  ZONES,
  ABSOLUTE_CONTRA,
  RELATIVE_CONTRA,
  PRE_CARE,
  AFTER_CARE,
  CONTACTS,
  SLOGAN,
} from "@/lib/data"

type Tab = "contra" | "precare" | "aftercare"

export default function App() {
  const [tab, setTab] = useState<Tab>("contra")
  const [selectedZones, setSelectedZones] = useState<string[]>([])
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  const toggleZone = (id: string) =>
    setSelectedZones((p) => (p.includes(id) ? p.filter((z) => z !== id) : [...p, id]))

  const toggleCheck = (id: string) =>
    setChecks((p) => ({ ...p, [id]: !p[id] }))

  const allAbsolute = ABSOLUTE_CONTRA.every((c) => checks[c.id] === false)

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "contra", label: "Противопоказания", icon: <Shield className="size-4" /> },
    { id: "precare", label: "До процедуры", icon: <Sparkles className="size-4" /> },
    { id: "aftercare", label: "После процедуры", icon: <Sparkles className="size-4" /> },
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/30">
        <div className="container-x flex h-16 items-center justify-between">
          <span className="font-heading text-2xl font-bold text-purple-dark">Bella Me</span>
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple to-violet px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_30px_rgba(123,94,167,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(123,94,167,0.4)]"
          >
            <MessageCircle className="size-4" />
            Записаться
          </a>
        </div>
      </header>

      <main className="container-x mx-auto max-w-5xl py-8 pb-24">
        {/* Zone picker */}
        <section className="mb-10">
          <h2 className="mb-2 font-heading text-3xl font-bold text-graphite md:text-4xl">
            Какие зоны вас интересуют?
          </h2>
          <p className="mb-6 text-sm text-graphite-soft">Выберите — покажем релевантные рекомендации</p>
          <div className="flex flex-wrap gap-3">
            {ZONES.map((z) => {
              const active = selectedZones.includes(z.id)
              return (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => toggleZone(z.id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-purple to-violet text-white shadow-[0_6px_20px_rgba(123,94,167,0.3)]"
                      : "glass text-graphite hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(123,94,167,0.1)]"
                  }`}
                >
                  {z.name}
                  {z.note && <span className="ml-1 text-xs opacity-70">{z.note}</span>}
                </button>
              )
            })}
          </div>
        </section>

        {/* Tabs */}
        <nav className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                tab === t.id
                  ? "bg-purple text-white shadow-[0_4px_15px_rgba(123,94,167,0.3)]"
                  : "glass text-graphite-soft hover:text-graphite"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === "contra" && (
            <motion.div
              key="contra"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {/* Absolute */}
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-red-100">
                    <span className="text-sm">⛔</span>
                  </div>
                  <h3 className="text-lg font-bold text-graphite">Абсолютные</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ABSOLUTE_CONTRA.map((c) => {
                    const checked = checks[c.id] === false
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleCheck(c.id)}
                        className={`flex items-start gap-3 rounded-xl p-4 text-left transition-all ${
                          checked
                            ? "bg-amber-50 ring-1 ring-amber-300"
                            : "glass hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(123,94,167,0.08)]"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                            checked ? "border-amber-400 bg-amber-400" : "border-lavender-deep"
                          }`}
                        >
                          {checked && (
                            <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm ${checked ? "text-amber-700" : "text-graphite"}`}>
                          {c.text}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Relative */}
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-sm">⚠️</span>
                  </div>
                  <h3 className="text-lg font-bold text-graphite">Относительные</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {RELATIVE_CONTRA.map((c) => {
                    const checked = checks[c.id] === false
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleCheck(c.id)}
                        className={`flex items-start gap-3 rounded-xl p-4 text-left transition-all ${
                          checked
                            ? "bg-amber-50 ring-1 ring-amber-300"
                            : "glass hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(123,94,167,0.08)]"
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                            checked ? "border-amber-400 bg-amber-400" : "border-lavender-deep"
                          }`}
                        >
                          {checked && (
                            <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm ${checked ? "text-amber-700" : "text-graphite"}`}>
                          {c.text}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="glass-strong rounded-2xl p-6">
                <p className="text-sm text-graphite-soft">
                  Если у вас есть сомнения — обязательно проконсультируйтесь с мастером перед процедурой.
                </p>
                <p className="mt-2 text-sm font-bold text-purple-dark">
                  Ваша безопасность — наш приоритет ♥
                </p>
              </div>
            </motion.div>
          )}

          {tab === "precare" && (
            <motion.div
              key="precare"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-purple/10">
                  <span className="text-sm">📋</span>
                </div>
                <h3 className="text-lg font-bold text-graphite">Рекомендации перед сеансом</h3>
              </div>
              <div className="flex flex-col gap-3">
                {PRE_CARE.map((item, i) => (
                  <div key={i} className="glass rounded-xl p-5">
                    <p className="text-sm text-graphite">{item.text}</p>
                    {item.note && (
                      <p className="mt-1 text-xs italic text-graphite-soft">* {item.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "aftercare" && (
            <motion.div
              key="aftercare"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-purple/10">
                  <span className="text-sm">✅</span>
                </div>
                <h3 className="text-lg font-bold text-graphite">Рекомендации после сеанса</h3>
              </div>
              <div className="flex flex-col gap-3">
                {AFTER_CARE.map((item, i) => (
                  <div key={i} className="glass rounded-xl p-5">
                    <p className="text-sm text-graphite">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact block */}
        <section className="mt-12 glass-strong rounded-3xl p-8">
          <h2 className="mb-6 font-heading text-2xl font-bold text-graphite">Контакты</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <a
                href={CONTACTS.phoneHref}
                className="flex items-center gap-3 text-sm text-graphite transition-colors hover:text-purple-dark"
              >
                <Phone className="size-4 shrink-0 text-purple" />
                {CONTACTS.phone}
              </a>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-graphite transition-colors hover:text-purple-dark"
              >
                <MessageCircle className="size-4 shrink-0 text-purple" />
                WhatsApp
              </a>
              <div className="flex items-center gap-3 text-sm text-graphite">
                <MapPin className="size-4 shrink-0 text-purple" />
                <div>
                  <span>{CONTACTS.address}</span>
                  <br />
                  <span className="text-xs text-graphite-soft">{CONTACTS.addressDetail}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-graphite">
                <Clock className="size-4 shrink-0 text-purple" />
                {CONTACTS.hours}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple to-violet px-8 py-4 text-base font-bold text-white shadow-[0_16px_50px_rgba(123,94,167,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(123,94,167,0.4)]"
              >
                <MessageCircle className="size-4" />
                Написать в WhatsApp
              </a>
              <a
                href={CONTACTS.phoneHref}
                className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold text-purple-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(123,94,167,0.1)]"
              >
                <Phone className="size-4" />
                Позвонить
              </a>
            </div>
          </div>
        </section>

        {/* Slogan */}
        <p className="mt-10 text-center font-heading text-xl italic text-graphite-soft">
          {SLOGAN}
        </p>
      </main>
    </div>
  )
}