import { useEffect, useRef, useState } from 'react'
import {
  Phone,
  Mail,
  Globe,
  Facebook,
  Download,
  Share2,
  Copy,
  CheckCircle,
  MapPin,
  ChevronRight,
  QrCode,
  X,
  TrendingUp,
  ShieldCheck,
  Link2,
  PieChart,
  Briefcase,
  Building2,
  Landmark,
  Newspaper,
  BadgeCheck,
} from 'lucide-react'

import logoUrl from './assets/logo.png'

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

const SERVICES = [
  { icon: TrendingUp, label: 'Mutual Funds & SIP' },
  { icon: ShieldCheck, label: 'Insurance' },
  { icon: Link2, label: 'Bonds' },
  { icon: PieChart, label: 'PMS' },
  { icon: Briefcase, label: 'AIF' },
  { icon: Building2, label: 'Unlisted Equity' },
  { icon: Landmark, label: 'Fixed Deposits' },
  { icon: Newspaper, label: 'Book Newspapers Ads' },
]

const mailtoHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(BRAND.emailSubject)}`
const waChatHref = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
  'Hi Panchanan, I would like to discuss financial planning services.',
)}`

const SEND_MESSAGE = `Hi, this is *${BRAND.person}* from *${BRAND.name}*. Here is my digital visiting card:\n${BRAND.cardUrl}`

function WhatsAppIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
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

  const primaryActions = [
    { href: `tel:${BRAND.phoneRaw}`, label: 'Call', icon: Phone, external: false },
    { href: waChatHref, label: 'WhatsApp', icon: WhatsAppIcon, external: true },
    { href: mailtoHref, label: 'Email', icon: Mail, external: false },
  ]

  const secondaryActions = [
    { href: BRAND.website, label: 'Website', icon: Globe, external: true },
    { href: BRAND.facebook, label: 'Facebook', icon: Facebook, external: true },
  ]

  const contactRows = [
    { icon: Phone, label: 'Phone', value: BRAND.phone, href: `tel:${BRAND.phoneRaw}`, external: false },
    { icon: WhatsAppIcon, label: 'WhatsApp', value: BRAND.phone, href: waChatHref, external: true },
    { icon: Mail, label: 'Email', value: BRAND.email, href: mailtoHref, external: false },
    { icon: Globe, label: 'Website', value: 'www.finrevsolutions.com', href: BRAND.website, external: true },
    { icon: MapPin, label: 'Location', value: BRAND.location, href: undefined, external: false },
    { icon: BadgeCheck, label: 'AMFI Registration', value: BRAND.arn, href: undefined, external: false },
  ]

  return (
    <div className="min-h-screen bg-[radial-gradient(1100px_460px_at_50%_-12%,rgba(59,101,106,0.14),transparent),linear-gradient(to_bottom,#F2F5F6,#E8EDEF)] font-sans text-brand-ink antialiased">
      <div
        className={`mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-white transition-all duration-700 md:my-10 md:min-h-0 md:overflow-hidden md:rounded-[2.75rem] md:border md:border-slate-200/70 md:shadow-[0_30px_80px_-24px_rgba(17,20,31,0.45)] ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* 1+2. Logo & Profile */}
        <header className="relative overflow-hidden bg-gradient-to-b from-brand-navyDeep via-brand-navy to-[#1E2B30] text-white">
          <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-teal/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-tealLight/50 to-transparent" />
          <div className="relative px-6 pb-7 pt-9 text-center">
            <div className="mx-auto w-fit rounded-2xl bg-white p-3 shadow-logo ring-1 ring-white/20 sm:p-3.5">
              <img
                src={logoUrl}
                alt="FinRev Solutions logo"
                width="208"
                height="152"
                className="h-auto w-48 object-contain sm:w-52"
              />
            </div>

            <div className="mx-auto mt-6 flex items-center justify-center gap-2.5">
              <span className="h-px w-9 bg-brand-tealLight/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              <span className="h-px w-9 bg-brand-tealLight/60" />
            </div>

            <h1 className="mt-4 text-[1.8rem] font-extrabold leading-tight tracking-tight text-white">
              {BRAND.person}
            </h1>
            <p className="mt-1.5 text-base font-semibold text-brand-tealLight">{BRAND.role}</p>

            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/65">
              <MapPin className="h-3.5 w-3.5 text-brand-tealLight" strokeWidth={2} />
              {BRAND.location}
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-tealLight">
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
              AMFI Registered · {BRAND.arn}
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* 3+4. Contact actions + Save Contact */}
          <section id="contact" aria-label="Contact actions" className="scroll-mt-8 px-5 pt-8">
            <SectionHeading eyebrow="Contact" title="Get in Touch" />

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {primaryActions.map(({ href, label, icon: Icon, external }) => (
                <ActionTile key={label} href={href} label={label} icon={Icon} external={external} />
              ))}
            </div>

            <button
              type="button"
              onClick={downloadContact}
              className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-navy py-4 text-base font-semibold text-white shadow-cta transition duration-200 hover:bg-brand-navyDeep active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
            >
              <Download className="h-5 w-5" strokeWidth={2.25} />
              Save Contact
            </button>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {secondaryActions.map(({ href, label, icon: Icon, external }) => (
                <MiniLink key={label} href={href} label={label} icon={Icon} external={external} />
              ))}
            </div>
          </section>

          {/* 5. Our services */}
          <section id="services" aria-label="Our services" className="scroll-mt-8 px-5 pt-9">
            <SectionHeading eyebrow="What We Do" title="Our Services" />
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {SERVICES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group min-w-0 rounded-2xl border border-brand-line bg-white p-3.5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-card-hover"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-tealMist text-brand-teal transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                  </span>
                  <span className="mt-2.5 block break-words text-[13px] font-semibold leading-snug text-brand-ink">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Send my card */}
          <section id="send" aria-label="Send my card" className="scroll-mt-8 px-5 pt-9">
            <SectionHeading eyebrow="Send My Card" title="Send to WhatsApp" />
            <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">
              Send your digital card to any Indian mobile number on WhatsApp.
            </p>

            <div className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-b from-brand-navyDeep to-[#1B2830] p-5 shadow-panel">
              <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-brand-teal/20 blur-3xl" />
              <div className="relative">
                <label htmlFor="recipient-phone" className="block text-sm font-semibold text-white">
                  Recipient mobile number
                </label>
                <div className="mt-2.5 flex items-stretch overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/15 transition focus-within:ring-2 focus-within:ring-brand-teal">
                  <span className="flex items-center gap-1 border-r border-white/15 bg-white/5 px-3.5 text-sm font-semibold text-white/90">
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
                    className="w-full min-w-0 bg-transparent px-3 py-3 text-base font-medium tracking-wide text-white outline-none placeholder:text-white/35"
                  />
                </div>
                {phoneError && (
                  <p role="alert" className="mt-2 text-xs font-medium text-[#FFB4A8]">
                    {phoneError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={sendOnWhatsApp}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(59,101,106,0.8)] transition duration-200 hover:bg-brand-tealDeep active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navyDeep"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Send on WhatsApp
                </button>
              </div>
            </div>
          </section>

          {/* 7. Share my card */}
          <section id="share" aria-label="Share my card" className="scroll-mt-8 px-5 pt-9">
            <SectionHeading eyebrow="Share My Card" title="Share the Card" />
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <ShareTile onClick={shareWhatsApp} icon={WhatsAppIcon} label="WhatsApp" sub="Share on WhatsApp" />
              <ShareTile
                onClick={copyLink}
                icon={copied ? CheckCircle : Copy}
                label={copied ? 'Link Copied' : 'Copy Link'}
                sub={copied ? 'Copied to clipboard' : 'Copy card link'}
                active={copied}
                ariaLive={copied ? 'polite' : undefined}
              />
              <ShareTile onClick={() => setQrOpen(true)} icon={QrCode} label="QR Code" sub="Scan to view" />
              <ShareTile onClick={shareCard} icon={Share2} label="More" sub="Native share" />
            </div>
          </section>

          {/* 8. Contact / business information */}
          <section id="contact-info" aria-label="Contact information" className="scroll-mt-8 px-5 pt-9">
            <SectionHeading eyebrow="Business Details" title="Contact Information" />
            <div className="mt-4 overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card">
              {contactRows.map(({ icon: Icon, label, value, href, external }) => (
                <ContactRow key={label} icon={Icon} label={label} value={value} href={href} external={external} />
              ))}
            </div>
          </section>
        </main>

        {/* 9. Footer */}
        <footer className="mt-10 bg-brand-navyDeep px-6 pb-9 pt-7 text-center text-white">
          <div className="mx-auto w-fit rounded-xl bg-white p-2 shadow-card">
            <img src={logoUrl} alt="FinRev Solutions" width="84" height="62" className="h-9 w-auto object-contain" />
          </div>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-tealLight">
            {BRAND.name}
          </p>
          <p className="mt-2 text-xs text-white/60">
            AMFI Registered Mutual Fund Distributor · {BRAND.arn}
          </p>
          <div className="mx-auto mt-5 max-w-sm border-t border-white/10 pt-4">
            <p className="text-[11px] leading-relaxed text-white/45">
              Mutual Fund investments are subject to market risks. Please read all scheme-related documents
              carefully before investing.
            </p>
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-xs text-white/45">
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
            className="animate-fade-in absolute inset-0 h-full w-full cursor-default bg-brand-navyDeep/70 backdrop-blur-sm"
            onClick={() => setQrOpen(false)}
          />
          <div className="animate-qr-in relative w-full max-w-xs rounded-3xl bg-white p-6 pt-8 text-center shadow-panel">
            <button
              ref={qrCloseRef}
              type="button"
              onClick={() => setQrOpen(false)}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition hover:bg-brand-mist hover:text-brand-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
            <div className="mx-auto w-fit rounded-2xl bg-white p-3 shadow-card ring-1 ring-brand-line">
              <img
                src={BRAND.qrImage}
                alt="QR Code for FinRev Solutions Digital Card"
                className="h-44 w-44"
                width="176"
                height="176"
              />
            </div>
            <h3 className="mt-5 text-base font-bold text-brand-ink">Scan to View My Digital Card</h3>
            <p className="mt-1 text-sm text-brand-muted">Point your camera at the QR code</p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-6">
          <div className="animate-toast-in flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white shadow-panel">
            <CheckCircle className="h-4 w-4 text-brand-tealLight" strokeWidth={2.25} />
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
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white shadow-[0_12px_28px_-8px_rgba(59,101,106,0.7)] transition duration-200 hover:bg-brand-tealDeep active:scale-95 md:hidden"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-teal">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-extrabold tracking-tight text-brand-navy">{title}</h2>
    </div>
  )
}

function ActionTile({ href, label, icon: Icon, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-brand-line bg-white px-2 py-3.5 text-center shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-card-hover active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tealMist text-brand-teal transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white">
        <Icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
      </span>
      <span className="text-xs font-semibold text-brand-ink">{label}</span>
    </a>
  )
}

function MiniLink({ href, label, icon: Icon, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group flex min-w-0 items-center justify-center gap-2 rounded-xl border border-brand-line bg-white px-2 py-3 shadow-card transition duration-200 hover:border-brand-teal/40 hover:shadow-card-hover active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-mist text-brand-navy transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white">
        <Icon className="h-4 w-4" strokeWidth={1.9} />
      </span>
      <span className="min-w-0 truncate text-sm font-medium text-brand-ink">{label}</span>
    </a>
  )
}

function ShareTile({ onClick, icon: Icon, label, sub, active = false, ariaLive }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-live={ariaLive}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-brand-line bg-white px-2 py-4 text-center shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-card-hover active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 ${
          active
            ? 'bg-brand-teal text-white'
            : 'bg-brand-tealMist text-brand-teal group-hover:bg-brand-teal group-hover:text-white'
        }`}
      >
        <Icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
      </span>
      <span className="text-xs font-semibold text-brand-ink">{label}</span>
      <span className="text-[11px] leading-tight text-brand-muted">{sub}</span>
    </button>
  )
}

function ContactRow({ icon: Icon, label, value, href, external = false }) {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-tealMist text-brand-teal">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-brand-muted">{label}</span>
        <span className="block break-words text-sm font-semibold text-brand-ink">{value}</span>
      </span>
      {href && <ChevronRight className="h-4 w-4 shrink-0 text-brand-muted/60" strokeWidth={2} />}
    </>
  )
  const cls =
    'flex min-w-0 items-center gap-3 px-4 py-3.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-teal'
  return href ? (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`${cls} hover:bg-brand-mist`}
    >
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  )
}
