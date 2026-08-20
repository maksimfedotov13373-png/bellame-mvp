import { Star } from "lucide-react"
import { REVIEWS } from "@/lib/data"
import Reveal from "./Reveal"

export default function Reviews() {
  return (
    <section className="scroll-mt-16 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-rose-light px-4 py-1.5 text-sm font-semibold text-rose-dark">
            Отзывы
          </span>
          <h2 className="font-heading text-4xl font-semibold text-graphite md:text-5xl">
            Что говорят клиенты
          </h2>
          <div className="flex items-center gap-2 text-sm text-graphite-soft">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-rose text-rose" />
              ))}
            </div>
            <span>22 отзыва на Avito</span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-3.5 fill-rose text-rose" />
                  ))}
                </div>
                <p className="flex-1 text-[15px] leading-relaxed text-graphite-soft">{r.text}</p>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm font-semibold text-graphite">{r.name}</span>
                  <span className="text-xs text-graphite-soft">{r.source}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}