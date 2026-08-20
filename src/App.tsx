import { useState, useMemo } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ArrowRight, Phone, MessageCircle, MapPin, Clock, Menu, X, Check } from "lucide-react"
import {
  ZONES,
  ABSOLUTE_CONTRA,
  RELATIVE_CONTRA,
  PRE_CARE,
  AFTER_CARE,
  CONTACTS,
  SLOGAN,
} from "@/lib/data"

const EASE = [0.22, 1, 0.36, 1] as const

function rise(delay: number, reduce: boolean | null) {
  return {
    initial: reduce ? undefined : { opacity: 0, y: 28, filter: "blur(14px)" },
    whileInView: reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-60px" },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE, delay },
  }
}

const services = [
  { name: "Лазерная эпиляция", price: "от 500 ₽", desc: "Лазер последнего поколения — эффективно и безопасно для всех зон. Результат уже после первого сеанса." },
  { name: "Восковая эпиляция", price: "от 400 ₽", desc: "Классический метод для быстрого результата. Подходит для всех зон тела." },
  { name: "Сахарная эпиляция", price: "от 400 ₽", desc: "Натуральный состав, мягкое удаление. Идеально для чувствительной кожи." },
  { name: "Массаж лица", price: "800 ₽", desc: "Антивозрастной массаж — подтяжка, контур, сияние кожи." },
  { name: "Барофорез", price: "2 500 ₽", desc: "Интенсивное увлажнение и питание кожи с помощью давления воздуха." },
  { name: "АЦ Программа Липолитик", price: "2 500 ₽", desc: "Инъекционная липолитика — коррекция фигуры, уменьшение объёмов." },
]

const CHECKER_QUESTIONS = [
  { id: "age", text: "Вам уже есть 18 лет?", blockIf: true },
  { id: "pregnancy", text: "Есть беременность или период лактации?", blockIf: false },
  { id: "skin", text: "Есть кожные заболевания, герпес или судороги?", blockIf: false },
]

export default function App() {
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [checkerStep, setCheckerStep] = useState(0)
  const [selectedZones, setSelectedZones] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const r = (delay: number) => rise(delay, reduce)

  const toggleZone = (id: string) =>
    setSelectedZones((prev) => (prev.includes(id) ? prev.filter((z) => z !== id) : [...prev, id]))

  const answerQuestion = (id: string, value: boolean) =>
    setAnswers((prev) => ({ ...prev, [id]: value }))

  const checkerResult = useMemo(() => {
    if (checkerStep !== 3) return null
    const blocked = CHECKER_QUESTIONS.some((q) => answers[q.id] === q.blockIf)
    const relevantPre = PRE_CARE.filter(
      (item) => !item.zones || item.zones.some((z) => selectedZones.includes(z)),
    )
    return { blocked, relevantPre }
  }, [checkerStep, answers, selectedZones])

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-6 hairline-b">
          <a href="#top" className="font-display text-xl tracking-tight">Bella Me</a>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#services" className="label text-soft transition-colors hover:text-ink">Услуги</a>
            <a href="#about" className="label text-soft transition-colors hover:text-ink">О нас</a>
            <a href="#prep" className="label text-soft transition-colors hover:text-ink">Подготовка</a>
            <a href="#contact" className="label text-soft transition-colors hover:text-ink">Контакты</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid hidden md:inline-flex">
              <span className="btn__fill" />
              <span className="btn__label">
                Записаться
                <ArrowUpRight className="btn__arrow size-4" />
              </span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex size-10 items-center justify-center md:hidden"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden border-t border-hairline md:hidden"
            >
              <div className="container-x flex flex-col gap-1 py-4">
                <a href="#services" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-paper-deep">Услуги</a>
                <a href="#about" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-paper-deep">О нас</a>
                <a href="#prep" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-paper-deep">Подготовка</a>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-paper-deep">Контакты</a>
                <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-2">
                  <span className="btn__fill" />
                  <span className="btn__label">Записаться в WhatsApp</span>
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper-deep to-paper" />
          <div className="absolute top-0 right-0 h-[80vh] w-[60vw] bg-gradient-to-bl from-accent/8 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 h-[50vh] w-[40vw] bg-gradient-to-tr from-paper-deep to-transparent" />
        </div>
        <div className="container-x grid min-h-[85vh] items-center py-20 md:min-h-[90vh] md:grid-cols-2 md:gap-12">
          <div>
            <motion.p {...r(0)} className="label text-accent">
              Студия эпиляции — г.&nbsp;Саратов
            </motion.p>
            <motion.h1 {...r(0.1)} className="mt-6">
              Нежность, к&nbsp;которой хочется прикасаться
            </motion.h1>
            <motion.p {...r(0.2)} className="mt-6 max-w-lg text-soft">
              Лазерная, восковая и&nbsp;сахарная эпиляция, массаж лица, барофорез.
              Подберём процедуру под ваш тип кожи и&nbsp;зону.
            </motion.p>
            <motion.div {...r(0.3)} className="mt-10 flex flex-wrap items-center gap-5">
              <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                <span className="btn__fill" />
                <span className="btn__label">
                  Записаться в WhatsApp
                  <ArrowUpRight className="btn__arrow size-4" />
                </span>
              </a>
              <a href="#services" className="btn btn-ghost">
                <span className="btn__label">
                  Смотреть услуги
                  <ArrowRight className="btn__arrow size-4" />
                </span>
              </a>
            </motion.div>
          </div>
          <motion.div {...r(0.15)} className="relative hidden md:block">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/images/hero-beauty.jpg"
                alt="Процедура в студии Bella Me"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -inset-3 -z-10 bg-gradient-to-tr from-accent/10 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── Checker ── */}
      <section className="hairline-t hairline-b bg-paper-deep">
        <div className="container-x py-14 md:py-20">
          <div className="mx-auto max-w-2xl">
            {checkerStep === 0 && (
              <motion.div className="text-center" {...r(0)}>
                <span className="label text-accent">Быстрая проверка</span>
                <h2 className="mt-4">Подходит ли мне процедура?</h2>
                <p className="mt-4 text-soft">
                  Выберите зоны и ответьте на 3 вопроса — получите персональные рекомендации.
                </p>
                <button onClick={() => setCheckerStep(1)} className="btn btn-solid mt-8">
                  <span className="btn__fill" />
                  <span className="btn__label">Проверить</span>
                </button>
              </motion.div>
            )}

            {checkerStep === 1 && (
              <motion.div {...r(0)}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="label text-accent">Шаг 1 из 2</span>
                  <button onClick={() => setCheckerStep(0)} className="label text-faint transition-colors hover:text-ink">Начать заново</button>
                </div>
                <div className="mb-6 h-0.5 w-full bg-hairline">
                  <div className="h-full w-1/2 bg-accent transition-all" />
                </div>
                <h3 className="mb-6">Какие зоны вас интересуют?</h3>
                <div className="flex flex-wrap gap-3">
                  {ZONES.map((z) => {
                    const active = selectedZones.includes(z.id)
                    return (
                      <button
                        key={z.id}
                        onClick={() => toggleZone(z.id)}
                        className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all ${
                          active
                            ? "border-accent bg-accent text-white"
                            : "border-hairline bg-paper text-ink hover:border-accent/40"
                        }`}
                      >
                        {active && <Check className="size-3.5" />}
                        {z.name}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => selectedZones.length > 0 && setCheckerStep(2)}
                  disabled={selectedZones.length === 0}
                  className="btn btn-solid mt-8 disabled:pointer-events-none disabled:opacity-40"
                >
                  <span className="btn__fill" />
                  <span className="btn__label">Далее</span>
                </button>
              </motion.div>
            )}

            {checkerStep === 2 && (
              <motion.div {...r(0)}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="label text-accent">Шаг 2 из 2</span>
                  <button onClick={() => setCheckerStep(1)} className="label text-faint transition-colors hover:text-ink">Назад</button>
                </div>
                <div className="mb-6 h-0.5 w-full bg-hairline">
                  <div className="h-full w-full bg-accent transition-all" />
                </div>
                <h3 className="mb-6">Ответьте на несколько вопросов</h3>
                <div className="flex flex-col gap-5">
                  {CHECKER_QUESTIONS.map((q) => (
                    <div key={q.id} className="hairline-t pt-5">
                      <p className="mb-3 text-sm font-medium">{q.text}</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => answerQuestion(q.id, false)}
                          className={`rounded-full border px-5 py-2 text-sm transition-all ${
                            answers[q.id] === false
                              ? "border-accent bg-accent text-white"
                              : "border-hairline bg-paper text-ink hover:border-accent/40"
                          }`}
                        >
                          Да
                        </button>
                        <button
                          onClick={() => answerQuestion(q.id, true)}
                          className={`rounded-full border px-5 py-2 text-sm transition-all ${
                            answers[q.id] === true
                              ? "border-accent bg-accent text-white"
                              : "border-hairline bg-paper text-ink hover:border-accent/40"
                          }`}
                        >
                          Нет
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCheckerStep(3)}
                  disabled={CHECKER_QUESTIONS.some((q) => !(q.id in answers))}
                  className="btn btn-solid mt-8 disabled:pointer-events-none disabled:opacity-40"
                >
                  <span className="btn__fill" />
                  <span className="btn__label">Узнать результат</span>
                </button>
              </motion.div>
            )}

            {checkerStep === 3 && checkerResult && (
              <motion.div {...r(0)}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="label text-accent">Результат</span>
                  <button onClick={() => { setCheckerStep(0); setAnswers({}); setSelectedZones([]) }} className="label text-faint transition-colors hover:text-ink">Начать заново</button>
                </div>

                {checkerResult.blocked ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                    <h3 className="mb-2 text-red-700">Есть противопоказания</h3>
                    <p className="text-sm leading-relaxed text-red-600">
                      По вашим ответам процедура не рекомендуется. Мы настоятельно рекомендуем
                      проконсультироваться с врачом перед записью. Ваша безопасность — наш приоритет.
                    </p>
                    <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-5 border-red-300 text-red-700 hover:bg-red-100">
                      <span className="btn__fill" />
                      <span className="btn__label">Связаться с нами</span>
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-6">
                      <h3 className="mb-2 text-accent">Процедура вам подходит</h3>
                      <p className="text-sm text-soft">
                        Вот что важно знать для выбранных зон: {selectedZones.map((id) => ZONES.find((z) => z.id === id)?.name).filter(Boolean).join(", ")}.
                      </p>
                    </div>

                    <h4 className="mb-4">Подготовка к сеансу</h4>
                    <div className="mb-6">
                      {checkerResult.relevantPre.map((item, i) => (
                        <div key={i} className="hairline-t py-4">
                          <div className="flex items-baseline gap-4">
                            <span className="label shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
                            <div className="max-w-[56ch]">
                              <p className="text-sm leading-relaxed">{item.text}</p>
                              {item.note && (
                                <p className="mt-1.5 text-xs italic text-soft">* {item.note}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 className="mb-4">После процедуры</h4>
                    <div className="mb-6">
                      {AFTER_CARE.map((item, i) => (
                        <div key={i} className="hairline-t py-4">
                          <div className="flex items-baseline gap-4">
                            <span className="label shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
                            <p className="max-w-[56ch] text-sm leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                        <span className="btn__fill" />
                        <span className="btn__label">
                          Записаться в WhatsApp
                          <ArrowUpRight className="btn__arrow size-4" />
                        </span>
                      </a>
                      <a href={CONTACTS.phoneHref} className="btn btn-outline">
                        <span className="btn__fill" />
                        <span className="btn__label">Позвонить</span>
                      </a>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services">
        <div className="container-x py-20 md:py-28">
          <div className="mb-14 max-w-xl" {...r(0)}>
            <span className="label text-accent">Услуги и цены</span>
            <h2 className="mt-4">Что мы предлагаем</h2>
            <p className="mt-4 text-soft">
              Полный спектр процедур для&nbsp;красоты и&nbsp;здоровья кожи.
              Индивидуальный подход к&nbsp;каждому клиенту.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                className="group flex flex-col gap-4 p-7 hairline transition-shadow duration-500 hover:shadow-[0_16px_60px_rgba(107,45,62,0.08)]"
                {...r(0.06 * i)}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3>{s.name}</h3>
                  <span className="label shrink-0 text-accent">{s.price}</span>
                </div>
                <p className="text-sm leading-relaxed text-soft">{s.desc}</p>
                <div className="mt-auto pt-4">
                  <a
                    href={CONTACTS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-hover"
                  >
                    Записаться
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="bg-paper-deep">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div {...r(0)}>
              <span className="label text-accent">О студии</span>
              <h2 className="mt-4">Bella Me</h2>
              <p className="mt-6 text-soft">
                Мы&nbsp;специализируемся на&nbsp;лазерной эпиляции и&nbsp;ухаживающих процедурах для&nbsp;лица и&nbsp;тела.
                Наша миссия — помочь вам почувствовать себя уверенно и&nbsp;комфортно в&nbsp;своём теле.
              </p>
              <p className="mt-4 text-soft">
                Используем современное лазерное оборудование, работаем с&nbsp;учётом индивидуальных особенностей кожи.
                Каждая процедура начинается с&nbsp;консультации и&nbsp;подбора оптимальных параметров.
              </p>
              <div className="mt-8 flex flex-col gap-3 text-sm text-soft">
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0 text-accent" />
                  <span>{CONTACTS.address}, {CONTACTS.addressDetail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-4 shrink-0 text-accent" />
                  <span>{CONTACTS.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-accent" />
                  <a href={CONTACTS.phoneHref} className="transition-colors hover:text-accent">{CONTACTS.phone}</a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6" {...r(0.1)}>
              <div className="relative overflow-hidden">
                <img
                  src="/images/about-skin.jpg"
                  alt="Процедура ухода за кожей в студии Bella Me"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <p className="absolute bottom-3 left-3 text-xs text-white/80 drop-shadow">Процедура в нашей студии</p>
              </div>
              <div className="bg-paper p-8">
                <p className="font-display text-2xl italic leading-snug text-ink">
                  &laquo;Придам твоей коже ту нежность, к&nbsp;которой хочется прикасаться&raquo;
                </p>
                <p className="mt-4 text-sm text-faint">— Наш подход к&nbsp;каждому клиенту</p>
              </div>
              <div className="grid grid-cols-3 gap-px hairline">
                <div className="flex flex-col items-center gap-1 p-5 text-center">
                  <span className="font-display text-3xl text-accent">7+</span>
                  <span className="label text-faint">лет опыта</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-5 text-center">
                  <span className="font-display text-3xl text-accent">5 000+</span>
                  <span className="label text-faint">сеансов</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-5 text-center">
                  <span className="font-display text-3xl text-accent">22</span>
                  <span className="label text-faint">отзыва</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reference ── */}
      <section id="prep" className="bg-paper-deep">
        <div className="container-x py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div {...r(0)}>
              <span className="label text-accent">Справка</span>
              <h2 className="mt-4">Подготовка и&nbsp;противопоказания</h2>
              <p className="mt-4 text-soft">
                Краткий список для&nbsp;тех, кто предпочитает прочитать самостоятельно.
                Для персональных рекомендаций — воспользуйтесь проверкой выше.
              </p>
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-medium">До сеанса</h3>
                <ul className="flex flex-col gap-2 text-sm text-soft">
                  <li>За 3–4 недели — исключить воск, сахар, пинцет</li>
                  <li>За 7 дней — исключить загар</li>
                  <li>За 3–4 дня — без бани, сауны, пилингов</li>
                  <li>За сутки — сбрить волосы бритвой</li>
                  <li>В день сеанса — без косметики в зоне эпиляции</li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-medium">После сеанса</h3>
                <ul className="flex flex-col gap-2 text-sm text-soft">
                  <li>7 дней — без солярия и загара (SPF 50)</li>
                  <li>2–3 дня — без бани, скрабов, мочалок</li>
                  <li>1–2 дня — без горячей ванны и спиртосодержащих средств</li>
                </ul>
              </div>
            </div>
            <div {...r(0.1)}>
              <h3 className="mb-4 text-sm font-medium">Противопоказания</h3>
              <div className="mb-6">
                <span className="label mb-3 inline-block text-accent">Абсолютные</span>
                <ul className="flex flex-col gap-1.5 text-sm text-soft">
                  {ABSOLUTE_CONTRA.map((c) => (
                    <li key={c.id} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent/40" />
                      {c.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label mb-3 inline-block text-faint">Относительные</span>
                <ul className="flex flex-col gap-1.5 text-sm text-soft">
                  {RELATIVE_CONTRA.map((c) => (
                    <li key={c.id} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-faint/40" />
                      {c.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-accent-tint mt-8 px-5 py-4">
                <p className="text-sm leading-relaxed text-ink">
                  Есть сомнения? Проконсультируйтесь с&nbsp;мастером перед записью.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking CTA ── */}
      <section id="contact">
        <div className="container-x py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <div {...r(0)}>
              <span className="label text-accent">Запись</span>
              <h2 className="mt-4">Начните с&nbsp;сообщения</h2>
              <p className="mt-4 text-soft">
                Напишите нам в&nbsp;WhatsApp — ответим за&nbsp;15&nbsp;минут.
                Подберём удобное время и&nbsp;расскажем о&nbsp;процедурах.
              </p>
              <div className="mt-8 flex flex-col gap-4">
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
                <span className="label text-faint">Ответим за 15 минут / с 9:00 до 20:00</span>
              </div>
            </div>
            <div className="flex flex-col gap-6" {...r(0.1)}>
              <div className="font-display text-4xl tracking-tight md:text-5xl">
                <a href={CONTACTS.phoneHref} className="transition-colors hover:text-accent">
                  {CONTACTS.phone}
                </a>
              </div>
              <div className="flex flex-col gap-3 text-sm text-soft">
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0 text-accent" />
                  <span>{CONTACTS.address}, {CONTACTS.addressDetail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-4 shrink-0 text-accent" />
                  <span>{CONTACTS.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="size-4 shrink-0 text-accent" />
                  <a href={CONTACTS.vk} target="_blank" rel="noopener noreferrer" className="underline decoration-hairline underline-offset-4 transition-colors hover:text-accent">VK: bella.me64</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="hairline-t">
        <div className="container-x flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-xl italic text-soft">{SLOGAN}</p>
          <div className="flex flex-col gap-2 text-xs text-faint">
            <span>Информация носит предварительный характер.</span>
            <span>Окончательное решение — со специалистом студии.</span>
          </div>
        </div>
      </footer>

      {/* Mobile sticky bar */}
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
    </div>
  )
}