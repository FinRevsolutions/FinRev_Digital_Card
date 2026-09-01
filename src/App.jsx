import { useEffect, useState } from 'react'
import {
  Phone,
  Mail,
  MessageCircle,
  Globe,
  Facebook,
  Download,
  Share2,
  Copy,
  CheckCircle,
  MapPin,
  Image as ImageIcon,
  ChevronRight,
  TrendingUp,
  Shield,
  Link2,
  PieChart,
  Briefcase,
  Building2,
  Landmark,
  Newspaper,
} from 'lucide-react'

const BRAND = {
  name: 'FinRev Solutions',
  person: 'Panchanan Kumar',
  role: 'Founder & Financial Advisor',
  location: 'Dhanbad, Jharkhand, India',
  tagline: 'Secure Today. Stronger Tomorrow.',
  phone: '+91 98355 92142',
  phoneRaw: '+919835592142',
  email: 'info@finrevsolutions.com',
  emailSubject: 'Financial Consultation Inquiry',
  website: 'https://www.finrevsolutions.com',
  facebook: 'https://www.facebook.com/FinRevSolutions',
  whatsappNumber: '919835592142',
  cardUrl: 'https://finrevsolutions.github.io/FinRev_Digital_Card/',
  arn: 'ARN-195797',
  qrImage:
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://finrevsolutions.github.io/FinRev_Digital_Card/',
}

/*
 * LOGO SLOT
 * Drop the official FINREV SOLUTIONS logo into /public/ (e.g. /public/logo.png) and then set
 * LOGO_URL below to: import.meta.env.BASE_URL + 'logo.png'
 * Until the official logo is supplied, a neutral branded placeholder tile is shown instead.
 */
const LOGO_URL = ''

const SERVICES = [
  { icon: TrendingUp, label: 'Mutual Funds & SIP' },
  { icon: Shield, label: 'Insurance' },
  { icon: Link2, label: 'Bonds' },
  { icon: PieChart, label: 'PMS' },
  { icon: Briefcase, label: 'AIF' },
  { icon: Building2, label: 'Unlisted Equity' },
  { icon: Landmark, label: 'Fixed Deposits' },
  { icon: Newspaper, label: 'Book Newspapers Ads' },
]

const NAV_SECTIONS = [
  { id: 'contact', label: 'Contact' },
  { id: 'services', label: 'Services' },
  { id: 'connect', label: 'Connect' },
]

const mailtoHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(BRAND.emailSubject)}`
const waChatHref = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
  'Hi Panchanan, I would like to discuss financial planning services.',
)}`

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [active, setActive] = useState('contact')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const downloadContact = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Panchanan Kumar',
      'ORG:FinRev Solutions',
      'TITLE:Founder and Financial Advisor',
      'TEL;TYPE=WORK,VOICE:+91-98355-92142',
      'EMAIL;TYPE=WORK:info@finrevsolutions.com',
      'URL:https://www.finrevsolutions.com',
      'ADR;TYPE=WORK:;;Dhanbad;Jharkhand;;India',
      'NOTE:AMFI Registered Mutual Fund Distributor - ARN-195797. Secure Today. Stronger Tomorrow.',
      'END:VCARD',
    ].join('\n')
    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Panchanan_Kumar_FinRev_Solutions.vcf'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const shareWhatsApp = () => {
    const message = encodeURIComponent(
      `Check out *${BRAND.person}* - ${BRAND.role} at *${BRAND.name}*\n\nAMFI Registered Mutual Fund Distributor (${BRAND.arn})\nSpecialising in Mutual Funds, Insurance, Bonds, PMS, AIF, Unlisted Equity, Fixed Deposits and more\n\nView my digital card: ${BRAND.cardUrl}`,
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.cardUrl)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = BRAND.cardUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-blue-100/40 font-sans text-slate-900 antialiased">
      <div
        className={`mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white transition-all duration-700 md:my-8 md:min-h-0 md:rounded-[2.75rem] md:border md:border-slate-200/70 md:shadow-[0_25px_70px_-20px_rgba(15,23,42,0.35)] ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <nav
          aria-label="Section navigation"
          className="sticky top-0 z-30 border-b border-slate-100 bg-white/85 px-4 py-2.5 backdrop-blur-md"
        >
          <div className="flex items-center justify-center gap-1.5">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  active === id
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                    : 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Header */}
        <header className="px-6 pb-4 pt-10 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center">
            {LOGO_URL ? (
              <img src={LOGO_URL} alt="FinRev Solutions logo" className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-900/20">
                <ImageIcon className="h-8 w-8" strokeWidth={1.75} />
              </div>
            )}
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-700">FinRev Solutions</p>
          <h1 className="mt-3 text-[2rem] font-extrabold leading-tight tracking-tight text-slate-900">
            {BRAND.person}
          </h1>
          <p className="mt-1.5 text-base font-semibold text-slate-600">{BRAND.role}</p>
          <p className="mt-1 text-sm text-slate-500">Digital Visiting Card</p>

          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <MapPin className="h-4 w-4 text-blue-600" strokeWidth={2} />
            {BRAND.location}
          </div>
          <p className="mt-3 text-sm font-semibold italic text-amber-600">&ldquo;{BRAND.tagline}&rdquo;</p>
        </header>

        <main className="flex-1 px-5">
          {/* Contact actions */}
          <section id="contact" aria-label="Contact actions" className="scroll-mt-16 pt-6">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-blue-600 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-200 hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <Phone className="h-5 w-5" strokeWidth={2.25} />
              Call Now
            </a>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <ActionTile href={mailtoHref} label="Email" icon={Mail} tone="blue" />
              <ActionTile href={waChatHref} label="WhatsApp" icon={MessageCircle} tone="green" external />
              <ActionTile href={BRAND.website} label="Website" icon={Globe} tone="slate" external />
              <ActionTile href={BRAND.facebook} label="Facebook" icon={Facebook} tone="indigo" external />
            </div>
          </section>

          {/* Services */}
          <section id="services" aria-label="Our services" className="scroll-mt-16 pt-10">
            <SectionHeading eyebrow="What we do" title="Our Services" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {SERVICES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group flex min-w-0 items-center gap-2.5 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 break-words text-sm font-semibold leading-snug text-slate-800">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Connect / share */}
          <section id="connect" aria-label="Save and share card" className="scroll-mt-16 pt-10">
            <SectionHeading eyebrow="Save & share" title="Connect" />
            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={downloadContact}
                className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Download className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-800">Download Contact</span>
                  <span className="block text-xs text-slate-500">Save as vCard</span>
                </span>
                <ChevronRight className="h-5 w-5 text-slate-400" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={shareWhatsApp}
                className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <Share2 className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-800">Share to WhatsApp</span>
                  <span className="block text-xs text-slate-500">Send my card to a friend</span>
                </span>
                <ChevronRight className="h-5 w-5 text-slate-400" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={copyLink}
                aria-live="polite"
                className="flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    copied ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {copied ? <CheckCircle className="h-5 w-5" strokeWidth={2} /> : <Copy className="h-5 w-5" strokeWidth={2} />}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-slate-800">
                    {copied ? 'Link Copied!' : 'Copy Link'}
                  </span>
                  <span className="block text-xs text-slate-500">
                    {copied ? 'Card link copied to clipboard' : 'Copy my digital card link'}
                  </span>
                </span>
                {copied ? (
                  <CheckCircle className="h-5 w-5 text-green-600" strokeWidth={2} />
                ) : (
                  <ChevronRight className="h-5 w-5 text-slate-400" strokeWidth={2} />
                )}
              </button>
            </div>
          </section>

          {/* QR code */}
          <section id="scan" aria-label="Scan QR code" className="py-10">
            <div className="flex flex-col items-center rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-blue-50/50 px-6 py-8 text-center shadow-sm">
              <h2 className="text-base font-bold text-slate-900">Scan to View My Digital Card</h2>
              <p className="mt-1 text-sm text-slate-500">Point your camera at the QR code</p>
              <div className="mt-5 rounded-2xl bg-white p-3 shadow-md ring-1 ring-slate-100">
                <img
                  src={BRAND.qrImage}
                  alt="QR Code for FinRev Solutions Digital Card"
                  className="h-44 w-44"
                  width="176"
                  height="176"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 px-6 pb-10 pt-8 text-center text-white">
          <p className="text-sm font-semibold">AMFI Registered Mutual Fund Distributor</p>
          <p className="mt-1 text-xs font-medium text-blue-300">{BRAND.arn}</p>
          <div className="mx-auto mt-5 max-w-sm border-t border-slate-700 pt-4">
            <p className="text-[11px] leading-relaxed text-slate-400">
              Mutual Fund investments are subject to market risks. Please read all scheme-related documents
              carefully before investing.
            </p>
          </div>
          <div className="mt-4 border-t border-slate-700 pt-4">
            <p className="text-xs text-slate-400">© 2026 {BRAND.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Floating WhatsApp action */}
      <a
        href={waChatHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-600/30 transition duration-200 hover:scale-105 active:scale-95 md:hidden"
      >
        <MessageCircle className="h-7 w-7" strokeWidth={2} />
      </a>
    </div>
  )
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">{title}</h2>
    </div>
  )
}

const TONES = {
  green: { tile: 'bg-green-50 text-green-600', hover: 'hover:bg-green-600' },
  blue: { tile: 'bg-blue-50 text-blue-700', hover: 'hover:bg-blue-600' },
  slate: { tile: 'bg-slate-100 text-slate-700', hover: 'hover:bg-slate-800' },
  indigo: { tile: 'bg-indigo-50 text-indigo-600', hover: 'hover:bg-indigo-600' },
}

function ActionTile({ href, label, icon: Icon, tone, external = false }) {
  const t = TONES[tone]
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white px-3 py-3.5 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 group-hover:text-white ${t.tile} ${t.hover}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="text-xs font-semibold text-slate-700">{label}</span>
    </a>
  )
}
