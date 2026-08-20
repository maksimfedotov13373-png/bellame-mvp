import { MapPin, Clock, Phone, MessageCircle } from "lucide-react"
import { CONTACTS } from "@/lib/data"
import Reveal from "./Reveal"

export default function Contact() {
  return (
    <section className="scroll-mt-16 bg-cream-deep py-20 md:py-28">
      <div className="container-x mx-auto max-w-3xl">
        <Reveal className="text-center">
          <span className="rounded-full bg-rose-light px-4 py-1.5 text-sm font-semibold text-rose-dark">
            Контакты
          </span>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-graphite md:text-5xl">
            Как нас найти
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-2xl border border-border bg-white p-6">
            <div className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-light text-rose-dark">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-graphite">{CONTACTS.address}</p>
                <p className="text-xs text-graphite-soft">{CONTACTS.addressDetail}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-light text-rose-dark">
                <Clock className="size-5" />
              </span>
              <p className="text-sm font-semibold text-graphite">{CONTACTS.hours}</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-light text-rose-dark">
                <Phone className="size-5" />
              </span>
              <a href={CONTACTS.phoneHref} className="text-sm font-semibold text-graphite transition-colors hover:text-rose-dark">
                {CONTACTS.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-6">
            <p className="text-sm font-semibold text-graphite">Быстрая запись</p>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-rose-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={CONTACTS.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-rose bg-white px-6 py-3 text-sm font-semibold text-rose-dark transition-all hover:-translate-y-0.5 hover:bg-rose-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              Сообщество ВК
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}