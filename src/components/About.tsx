import { SERVICES } from "@/lib/data"
import Reveal from "./Reveal"

export default function About() {
  return (
    <section className="scroll-mt-16 bg-cream-deep py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-rose-light px-4 py-1.5 text-sm font-semibold text-rose-dark">
            О студии
          </span>
          <h2 className="font-heading text-4xl font-semibold text-graphite md:text-5xl">
            Bella Me
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-graphite-soft">
            Студия эпиляции и косметологии в Саратове. Лазерная эпиляция, восковая и сахарная эпиляция, массаж лица, барофорез. Индивидуальный подход к каждому клиенту.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(196,160,138,0.1)]">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-heading text-lg font-semibold text-graphite">{s.name}</span>
                <span className="text-sm text-graphite-soft">{s.description}</span>
                <span className="rounded-full bg-cream-deep px-3 py-1 text-sm font-semibold text-rose-dark">{s.price}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}