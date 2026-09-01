import { useEffect, useRef, useState } from 'react'
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
  QrCode,
  X,
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
  role: 'Mutual Fund Distributor',
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
  { id: 'send', label: 'Send' },
  { id: 'share', label: 'Share' },
]

const mailtoHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(BRAND.emailSubject)}`
const waChatHref = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
  'Hi Panchanan, I would like to discuss financial planning services.',
)}`

const SEND_MESSAGE = `Hi, this is *${BRAND.person}* from *${BRAND.name}*. Here is my digital visiting card:\n${BRAND.cardUrl}`

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [active, setActive] = useState('contact')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [qrOpen, setQrOpen] = useState(false)
  const [toast, setToast] = useState('')

  const toastTimer = useRef(null)
  const qrCloseRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    return () => clearTimeout(toastTimer.current)
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

  useEffect(() => {
    if (!qrOpen) return
    qrCloseRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') setQrOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [qrOpen])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const showToast = (message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2200)
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
    showToast('Contact saved')
  }

  const shareWhatsApp = () => {
    const message = encodeURIComponent(
      `Check out *${BRAND.person}* - ${BRAND.role} at *${BRAND.name}*\n\nAMFI Registered Mutual Fund Distributor (${BRAND.arn})\nSpecialising in Mutual Funds, Insurance, Bonds, PMS, AIF, Unlisted Equity, Fixed Deposits and more\n\nView my digital card: ${BRAND.cardUrl}`,
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
    showToast('Opening WhatsApp…')
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
    window.setTimeout(() => setCopied(false), 2200)
    showToast('Link copied')
  }

  const shareCard = async () => {
    const shareData = {
      title: `${BRAND.person} · ${BRAND.name}`,
      text: `Check out my digital visiting card: ${BRAND.cardUrl}`,
      url: BRAND.cardUrl,
    }
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData)
      } catch {
        // User dismissed the native share sheet.
      }
    } else {
      await copyLink()
    }
  }

  const handlePhoneChange = (event) => {
    let digits = event.target.value.replace(/\D/g, '')
    if (digits.startsWith('91') && digits.length > 10) digits = digits.slice(2)
    setPhone(digits.slice(0, 10))
    if (phoneError) setPhoneError('')
  }

  const sendOnWhatsApp = () => {
    const raw = phone.replace(/\D/g, '')
    const digits = raw.length === 12 && raw.startsWith('91') ? raw.slice(2) : raw
    if (digits.length === 0) {
      setPhoneError('Please enter a mobile number')
      return
    }
    if (digits.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number')
      return
    }
    if (!/^[6-9]/.test(digits)) {
      setPhoneError('Indian mobile numbers start with digits 6-9')
      return
    }
    setPhoneError('')
    const message = encodeURIComponent(SEND_MESSAGE)
    window.open(`https://wa.me/91${digits}?text=${message}`, '_blank')
    showToast(`Opening WhatsApp for +91 ${digits}`)
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
          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:px-3.5 sm:text-sm ${
                  active === id
                    ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/25'
                    : 'text-slate-600 hover:bg-slate-100 active:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Header */}
        <header className="px-6 pb-2 pt-10 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center">
            {LOGO_URL ? (
              <img src={LOGO_URL} alt="FinRev Solutions logo" className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg shadow-blue-900/20 ring-1 ring-blue-800/40">
                <ImageIcon className="h-8 w-8" strokeWidth={1.75} />
              </div>
            )}
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-blue-700">{BRAND.name}</p>
          <h1 className="mt-3 text-[2rem] font-extrabold leading-tight tracking-tight text-slate-900">
            {BRAND.person}
          </h1>
          <p className="mt-1.5 text-base font-semibold text-slate-600">{BRAND.role}</p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <MapPin className="h-4 w-4 text-blue-700" strokeWidth={2} />
            {BRAND.location}
          </div>
          <p className="mt-2.5 text-sm font-semibold italic text-amber-600">&ldquo;{BRAND.tagline}&rdquo;</p>
        </header>

        <main className="flex-1 px-5">
          {/* Contact actions */}
          <section id="contact" aria-label="Contact actions" className="scroll-mt-16 pt-8">
            <SectionHeading eyebrow="Connect" title="Get in Touch" />

            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={downloadContact}
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-blue-700 py-4 text-base font-semibold text-white shadow-lg shadow-blue-700/25 transition duration-200 hover:bg-blue-800 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                <Download className="h-5 w-5" strokeWidth={2.25} />
                Save Contact
              </button>

              <div className="grid grid-cols-3 gap-3">
                <ActionTile href={`tel:${BRAND.phoneRaw}`} label="Call" icon={Phone} tone="blue" />
                <ActionTile href={waChatHref} label="WhatsApp" icon={MessageCircle} tone="green" external />
                <ActionTile href={mailtoHref} label="Email" icon={Mail} tone="slate" />
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
                <MiniLink href={BRAND.website} label="Website" icon={Globe} external />
                <MiniLink href={BRAND.facebook} label="Facebook" icon={Facebook} external />
              </div>
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
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 break-words text-sm font-semibold leading-snug text-slate-800">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Send my card */}
          <section id="send" aria-label="Send my card" className="scroll-mt-16 pt-10">
            <SectionHeading eyebrow="Send my card" title="Send My Card" />
            <p className="mt-1.5 text-sm text-slate-500">
              Send your digital card to any Indian mobile number on WhatsApp.
            </p>

            <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <label htmlFor="recipient-phone" className="block text-sm font-semibold text-slate-800">
                Recipient mobile number
              </label>
              <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border border-slate-200 transition focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-700/15">
                <span className="flex items-center gap-1 border-r border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
                  +91
                </span>
                <input
                  id="recipient-phone"
                  name="recipient-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                  className="w-full min-w-0 bg-transparent px-3 py-3 text-base font-medium tracking-wide text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              {phoneError && (
                <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                  {phoneError}
                </p>
              )}
              <button
                type="button"
                onClick={sendOnWhatsApp}
                className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-semibold text-white shadow-sm shadow-green-600/20 transition duration-200 hover:bg-green-700 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2.25} />
                Send on WhatsApp
              </button>
            </div>
          </section>

          {/* Share my card */}
          <section id="share" aria-label="Share my card" className="scroll-mt-16 pt-10">
            <SectionHeading eyebrow="Share my card" title="Share My Card" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ShareTile
                onClick={shareWhatsApp}
                icon={MessageCircle}
                label="WhatsApp"
                sub="Share on WhatsApp"
                tone="green"
              />
              <ShareTile
                onClick={copyLink}
                icon={copied ? CheckCircle : Copy}
                label={copied ? 'Link Copied' : 'Copy Link'}
                sub={copied ? 'Copied to clipboard' : 'Copy card link'}
                tone={copied ? 'green' : 'slate'}
                ariaLive={copied ? 'polite' : undefined}
              />
              <ShareTile
                onClick={() => setQrOpen(true)}
                icon={QrCode}
                label="QR Code"
                sub="Scan to view"
                tone="blue"
              />
              <ShareTile
                onClick={shareCard}
                icon={Share2}
                label="More"
                sub="Native share"
                tone="indigo"
              />
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
            <p className="text-xs text-slate-400">
              © 2026 {BRAND.name}. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* QR code modal */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="QR code for digital visiting card"
        >
          <button
            type="button"
            aria-label="Close QR code"
            className="animate-fade-in absolute inset-0 h-full w-full cursor-default bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setQrOpen(false)}
          />
          <div className="animate-qr-in relative w-full max-w-xs rounded-3xl bg-white p-6 pt-8 text-center shadow-2xl">
            <button
              ref={qrCloseRef}
              type="button"
              onClick={() => setQrOpen(false)}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
            <div className="mx-auto w-fit rounded-2xl bg-white p-3 shadow-md ring-1 ring-slate-100">
              <img
                src={BRAND.qrImage}
                alt="QR Code for FinRev Solutions Digital Card"
                className="h-44 w-44"
                width="176"
                height="176"
              />
            </div>
            <h3 className="mt-5 text-base font-bold text-slate-900">Scan to View My Digital Card</h3>
            <p className="mt-1 text-sm text-slate-500">Point your camera at the QR code</p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-6">
          <div className="animate-toast-in rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
            {toast}
          </div>
        </div>
      )}

      {/* Floating WhatsApp action */}
      <a
        href={waChatHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-600/30 transition duration-200 hover:scale-105 active:scale-95 md:hidden"
      >
        <MessageCircle className="h-7 w-7" strokeWidth={2} />
      </a>
    </div>
  )
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">{title}</h2>
    </div>
  )
}

const TONES = {
  green: { tile: 'bg-green-50 text-green-600', hover: 'hover:bg-green-600' },
  blue: { tile: 'bg-blue-50 text-blue-700', hover: 'hover:bg-blue-700' },
  slate: { tile: 'bg-slate-100 text-slate-700', hover: 'hover:bg-slate-700' },
  indigo: { tile: 'bg-indigo-50 text-indigo-600', hover: 'hover:bg-indigo-600' },
}

function ActionTile({ href, label, icon: Icon, tone, external = false }) {
  const t = TONES[tone]
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white px-2 py-3.5 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
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

function MiniLink({ href, icon: Icon, label, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition hover:bg-slate-50 active:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="flex-1 text-sm font-medium text-slate-700">{label}</span>
      <ChevronRight className="h-4 w-4 text-slate-400" strokeWidth={2} />
    </a>
  )
}

function ShareTile({ onClick, icon: Icon, label, sub, tone, ariaLive }) {
  const t = TONES[tone]
  return (
    <button
      type="button"
      onClick={onClick}
      aria-live={ariaLive}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white px-2 py-4 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 group-hover:text-white ${t.tile} ${t.hover}`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="text-xs font-semibold text-slate-800">{label}</span>
      <span className="text-[11px] leading-tight text-slate-500">{sub}</span>
    </button>
  )
}
