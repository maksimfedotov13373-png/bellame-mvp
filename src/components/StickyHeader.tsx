import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { CONTACTS } from "@/lib/data"

export default function StickyHeader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-white/80 backdrop-blur-md"
      initial={false}
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-x flex h-14 items-center justify-between">
        <a href="#" className="font-heading text-lg font-semibold text-graphite" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Bella Me
        </a>
        <div className="flex items-center gap-3">
          <a href={CONTACTS.phoneHref} className="hidden text-sm text-graphite-soft transition-colors hover:text-rose-dark sm:block">
            {CONTACTS.phone}
          </a>
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-rose-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
          >
            Записаться
          </a>
        </div>
      </div>
    </motion.header>
  )
}