import { CONTACTS } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white py-10">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <span className="font-heading text-xl font-semibold text-graphite">Bella Me</span>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-graphite-soft">
          <a href={CONTACTS.phoneHref} className="transition-colors hover:text-rose-dark">{CONTACTS.phone}</a>
          <span aria-hidden="true">·</span>
          <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-rose-dark">WhatsApp</a>
          <span aria-hidden="true">·</span>
          <a href={CONTACTS.vk} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-rose-dark">ВКонтакте</a>
        </div>
        <p className="text-xs text-graphite-soft">{CONTACTS.address}</p>
      </div>
    </footer>
  )
}