import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, ArrowRight, Shield, Sparkles, Phone, MessageCircle, MapPin, Clock, Heart, Star } from "lucide-react"
import {
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

const features = [
  { icon: Shield, title: "Безопасно", text: "Лицензированное оборудование, стерильность, полная дезинфекция" },
  { icon: Star, title: "Опытные мастера", text: "Сертифицированные специалисты с профильным образованием" },
  { icon: Sparkles, title: "Современные технологии", text: "Diode лазер нового поколения, точная настройка под ваш тип кожи" },
  { icon: Heart, title: "Комфорт", text: "Индивидуальный подход, мягкое воздействие, без боли" },
]

const services = [
  { name: "Лазерная эпиляция", price: "от 500 ₽", desc: "Diode лазер — эффективно и безопасно для всех зон. Результат уже после первого сеанса." },
  { name: "Восковая эпиляция", price: "от 400 ₽", desc: "Классический метод для быстрого результата. Подходит для всех зон тела." },
  { name: "Сахарная эпиляция", price: "от 400 ₽", desc: "Натуральный состав, мягкое удаление. Идеально для чувствительной кожи." },
  { name: "Массаж лица", price: "800 ₽", desc: "Антивозрастной массаж — подтяжка, контур, сияние кожи." },
  { name: "Барофорез", price: "2 500 ₽", desc: "Интенсивное увлажнение и питание кожи с помощью давления воздуха." },
  { name: "АЦ Программа Липолитик", price: "2 500 ₽", desc: "Инъекционная липолитика — коррекция фигуры, уменьшение объёмов." },
]

export default function App() {
  const reduce = useReducedMotion()

  const r = (delay: number) => rise(delay, reduce)

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
          <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            <span className="btn__fill" />
            <span className="btn__label">
              Записаться
              <ArrowUpRight className="btn__arrow size-4" />
            </span>
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-paper via-paper-deep to-paper" />
          <div className="absolute top-0 right-0 h-[80vh] w-[60vw] bg-gradient-to-bl from-accent/8 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 h-[50vh] w-[40vw] bg-gradient-to-tr from-paper-deep to-transparent" />
        </div>
        <div className="container-x flex min-h-[85vh] flex-col justify-center py-20 md:min-h-[90vh]">
          <div className="max-w-2xl">
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
        </div>
      </section>

      {/* ── Features ── */}
      <section className="hairline-t hairline-b">
        <div className="container-x py-6 md:py-8">
          <div className="grid grid-cols-2 gap-px md:grid-cols-4">
            {features.map((f, i) => (
              <motion.div key={f.title} className="flex flex-col gap-3 p-7 md:p-10" {...r(0.06 * i)}>
                <f.icon className="size-6 text-accent" strokeWidth={1.5} />
                <h3 className="text-base font-medium">{f.title}</h3>
                <p className="text-sm leading-relaxed text-soft">{f.text}</p>
              </motion.div>
            ))}
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
                Используем современное diode-оборудование, работаем с&nbsp;учётом индивидуальных особенностей кожи.
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
                  <span className="font-display text-3xl text-accent">98%</span>
                  <span className="label text-faint">рекомендуют</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Preparation ── */}
      <section id="prep">
        <div className="container-x py-20 md:py-28">
          <div className="mb-14 max-w-xl" {...r(0)}>
            <span className="label text-accent">Подготовка</span>
            <h2 className="mt-4">Как подготовиться к&nbsp;сеансу</h2>
            <p className="mt-4 text-soft">
              Следуйте рекомендациям для&nbsp;лучшего результата и&nbsp;комфорта во&nbsp;время процедуры.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div {...r(0.05)}>
              <h3 className="mb-6 text-accent">До процедуры</h3>
              <div>
                {PRE_CARE.map((item, i) => (
                    <div key={i} className="hairline-t py-5">
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
            </div>

            <div {...r(0.1)}>
              <h3 className="mb-6 text-accent">После процедуры</h3>
              <div>
                {AFTER_CARE.map((item, i) => (
                  <div key={i} className="hairline-t py-5">
                    <div className="flex items-baseline gap-4">
                      <span className="label shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
                      <p className="max-w-[56ch] text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contraindications ── */}
      <section className="bg-paper-deep">
        <div className="container-x py-20 md:py-28">
          <div className="mb-14 max-w-xl" {...r(0)}>
            <span className="label text-accent">Важно знать</span>
            <h2 className="mt-4">Противопоказания</h2>
            <p className="mt-4 text-soft">
              Ознакомьтесь со&nbsp;списком противопоказаний перед записью. Если есть сомнения — сообщите мастеру.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div {...r(0.05)}>
              <div className="mb-5 flex items-baseline gap-3">
                <span className="label text-accent">Абсолютные</span>
                <span className="label text-faint">процедура не проводится</span>
              </div>
              <div>
                {ABSOLUTE_CONTRA.map((c, i) => (
                  <div key={c.id} className="hairline-t flex items-baseline gap-4 py-4">
                    <span className="label shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div {...r(0.1)}>
              <div className="mb-5 flex items-baseline gap-3">
                <span className="label text-faint">Относительные</span>
                <span className="label text-faint">уточнить у мастера</span>
              </div>
              <div>
                {RELATIVE_CONTRA.map((c, i) => (
                  <div key={c.id} className="hairline-t flex items-baseline gap-4 py-4">
                    <span className="label shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-sm leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-accent-tint mt-12 px-6 py-5">
            <p className="text-sm leading-relaxed text-ink">
              Если у&nbsp;вас есть сомнения — обязательно проконсультируйтесь с&nbsp;мастером перед процедурой.
              Ваша безопасность — наш приоритет.
            </p>
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