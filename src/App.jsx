import { useEffect, useRef, useState } from 'react'
import {
  Phone,
  Mail,
  Globe,
  Facebook,
  Download,
  Share2,
  Copy,
  CheckCircle2,
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
  Camera,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Shield,
  UploadCloud,
  Trash2,
} from 'lucide-react'

import logoUrl from './assets/logo.png'

const BRAND = {
  name: 'FinRev Solutions',
  person: 'Panchanan Kumar',
  role: 'Mutual Fund Distributor',
  credential: 'AMFI Registered Mutual Fund Distributor',
  arn: 'ARN-195797',
  location: 'Dhanbad, Jharkhand, India',
  tagline: 'Secure Today. Stronger Tomorrow.',
  phone: '+91 98355 92142',
  phoneRaw: '+919835592142',
  email: 'info@finrevsolutions.com',
  emailSubject: 'Financial Advisory & Investment Inquiry',
  website: 'https://www.finrevsolutions.com',
  facebook: 'https://www.facebook.com/FinRevSolutions',
  whatsappNumber: '919835592142',
  cardUrl: 'https://finrevsolutions.github.io/FinRev_Digital_Card/',
  qrImage:
    'https://api.qrserver.com/v1/create-qr-code/?size=400x400&format=png&data=https://finrevsolutions.github.io/FinRev_Digital_Card/',
}

// Exactly the 8 requested services
const SERVICES = [
  {
    icon: TrendingUp,
    title: 'Mutual Funds & SIP',
    description: 'Systematic wealth creation & goal-oriented portfolios',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance',
    description: 'Comprehensive risk coverage & financial protection',
  },
  {
    icon: Link2,
    title: 'Bonds',
    description: 'Stable fixed income & capital preservation instruments',
  },
  {
    icon: PieChart,
    title: 'PMS',
    description: 'Bespoke Portfolio Management Services for HNIs',
  },
  {
    icon: Briefcase,
    title: 'AIF',
    description: 'Alternative Investment Funds for diversified alpha',
  },
  {
    icon: Building2,
    title: 'Unlisted Equity',
    description: 'Pre-IPO & high-growth private market opportunities',
  },
  {
    icon: Landmark,
    title: 'Fixed Deposits',
    description: 'Corporate & bank FDs with guaranteed returns',
  },
  {
    icon: Newspaper,
    title: 'Book Newspapers Ads',
    description: 'Seamless financial & statutory newspaper notices',
  },
]

const mailtoHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(BRAND.emailSubject)}`
const waChatHref = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
  'Hi Panchanan, I would like to discuss financial planning and investment services.',
)}`

const SEND_CARD_MESSAGE = `Hi, this is *${BRAND.person}* from *${BRAND.name}* (${BRAND.credential} · ${BRAND.arn}).\n\nHere is my digital visiting card:\n${BRAND.cardUrl}`

function WhatsAppIcon({ className = 'h-5 w-5' }) {
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
  const [photoModalOpen, setPhotoModalOpen] = useState(false)
  const [customPhoto, setCustomPhoto] = useState(null)
  const [toast, setToast] = useState('')

  const toastTimer = useRef(null)
  const fileInputRef = useRef(null)
  const qrCloseRef = useRef(null)

  // Load custom user profile photo if stored
  useEffect(() => {
    setMounted(true)
    try {
      const savedPhoto = localStorage.getItem('finrev_profile_photo')
      if (savedPhoto) {
        setCustomPhoto(savedPhoto)
      }
    } catch {
      // Storage fallback
    }
    return () => clearTimeout(toastTimer.current)
  }, [])

  // QR modal accessibility & keyboard trap
  useEffect(() => {
    if (!qrOpen && !photoModalOpen) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setQrOpen(false)
        setPhotoModalOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [qrOpen, photoModalOpen])

  const showToast = (message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2400)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result
      if (typeof dataUrl === 'string') {
        setCustomPhoto(dataUrl)
        try {
          localStorage.setItem('finrev_profile_photo', dataUrl)
        } catch {
          // Ignore quota errors for large images
        }
        showToast('Profile photo updated')
        setPhotoModalOpen(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setCustomPhoto(null)
    try {
      localStorage.removeItem('finrev_profile_photo')
    } catch {
      // Storage fallback
    }
    showToast('Photo reset to monogram')
    setPhotoModalOpen(false)
  }

  const downloadContact = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Panchanan Kumar',
      'N:Kumar;Panchanan;;;',
      'ORG:FinRev Solutions',
      'TITLE:Mutual Fund Distributor',
      'TEL;TYPE=CELL,VOICE,PREF:+919835592142',
      'EMAIL;TYPE=WORK,INTERNET:info@finrevsolutions.com',
      'URL:https://www.finrevsolutions.com',
      'ADR;TYPE=WORK:;;Dhanbad;Jharkhand;;India',
      'NOTE:AMFI Registered Mutual Fund Distributor - ARN-195797. Mutual Funds, SIP, Insurance, Bonds, PMS, AIF, Unlisted Equity, Fixed Deposits.',
      'END:VCARD',
    ].join('\r\n')

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Panchanan_Kumar_FinRev_Solutions.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    showToast('vCard downloaded successfully')
  }

  const shareWhatsApp = () => {
    const message = encodeURIComponent(
      `*${BRAND.person}* · ${BRAND.role}\n*${BRAND.name}*\n${BRAND.credential} (${BRAND.arn})\n\nView official digital visiting card:\n${BRAND.cardUrl}`,
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
    showToast('Sharing on WhatsApp…')
  }

  const copyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(BRAND.cardUrl)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = BRAND.cardUrl
        textarea.style.position = 'fixed'
        textarea.style.left = '-999999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
      showToast('Link copied to clipboard')
    } catch {
      showToast('Failed to copy link')
    }
  }

  const shareCard = async () => {
    const shareData = {
      title: `${BRAND.person} | ${BRAND.name}`,
      text: `${BRAND.person} - ${BRAND.role} at ${BRAND.name} (${BRAND.arn})`,
      url: BRAND.cardUrl,
    }

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData)
      } catch {
        // User dismissed sheet
      }
    } else {
      await copyLink()
    }
  }

  const handlePhoneChange = (event) => {
    let digits = event.target.value.replace(/\D/g, '')
    if (digits.startsWith('91') && digits.length > 10) {
      digits = digits.slice(2)
    } else if (digits.startsWith('0') && digits.length > 10) {
      digits = digits.slice(1)
    }
    setPhone(digits.slice(0, 10))
    if (phoneError) setPhoneError('')
  }

  const sendOnWhatsApp = (e) => {
    if (e) e.preventDefault()
    const digits = phone.replace(/\D/g, '')

    if (digits.length === 0) {
      setPhoneError('Please enter a 10-digit mobile number')
      return
    }
    if (digits.length !== 10) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number')
      return
    }
    if (!/^[6-9]/.test(digits)) {
      setPhoneError('Indian mobile numbers start with 6, 7, 8, or 9')
      return
    }

    setPhoneError('')
    const message = encodeURIComponent(SEND_CARD_MESSAGE)
    const url = `https://wa.me/91${digits}?text=${message}`
    window.open(url, '_blank')
    showToast(`Dispatching to WhatsApp (+91 ${digits})`)
  }

  const primaryActions = [
    {
      id: 'action-call',
      href: `tel:${BRAND.phoneRaw}`,
      label: 'Call',
      subtitle: '+91 98355 92142',
      icon: Phone,
      external: false,
      color: 'bg-brand-navyDeep text-white border-brand-navyBorder hover:border-brand-teal',
      iconBg: 'bg-brand-teal text-white',
    },
    {
      id: 'action-whatsapp',
      href: waChatHref,
      label: 'WhatsApp',
      subtitle: 'Chat on WhatsApp',
      icon: WhatsAppIcon,
      external: true,
      color: 'bg-brand-navyDeep text-white border-brand-navyBorder hover:border-[#25D366]/60',
      iconBg: 'bg-[#25D366] text-white',
    },
  ]

  const secondaryActions = [
    {
      id: 'action-email',
      href: mailtoHref,
      label: 'Email',
      icon: Mail,
      external: false,
    },
    {
      id: 'action-website',
      href: BRAND.website,
      label: 'Website',
      icon: Globe,
      external: true,
    },
    {
      id: 'action-facebook',
      href: BRAND.facebook,
      label: 'Facebook',
      icon: Facebook,
      external: true,
    },
  ]

  const contactRows = [
    {
      id: 'info-phone',
      icon: Phone,
      label: 'Direct Phone',
      value: BRAND.phone,
      href: `tel:${BRAND.phoneRaw}`,
      external: false,
      actionText: 'Call',
    },
    {
      id: 'info-whatsapp',
      icon: WhatsAppIcon,
      label: 'WhatsApp Contact',
      value: BRAND.phone,
      href: waChatHref,
      external: true,
      actionText: 'Chat',
    },
    {
      id: 'info-email',
      icon: Mail,
      label: 'Official Email',
      value: BRAND.email,
      href: mailtoHref,
      external: false,
      actionText: 'Write',
    },
    {
      id: 'info-website',
      icon: Globe,
      label: 'Corporate Website',
      value: 'www.finrevsolutions.com',
      href: BRAND.website,
      external: true,
      actionText: 'Visit',
    },
    {
      id: 'info-location',
      icon: MapPin,
      label: 'Headquarters & Location',
      value: BRAND.location,
      href: undefined,
      external: false,
    },
    {
      id: 'info-arn',
      icon: BadgeCheck,
      label: 'AMFI Registration (ARN)',
      value: `${BRAND.arn} · Verified Distributor`,
      href: undefined,
      external: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0A0E17] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(47,105,115,0.25),rgba(10,14,23,1))] font-sans text-brand-ink antialiased selection:bg-brand-teal selection:text-white">
      {/* 9:16 Mobile-First Card Container */}
      <div className="flex min-h-screen items-center justify-center p-0 sm:py-6 md:py-10">
        <div
          id="digital-card-container"
          className={`relative mx-auto flex w-full max-w-[430px] flex-col overflow-hidden bg-[#0F1422] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] transition-opacity duration-500 sm:rounded-[2.75rem] sm:border sm:border-slate-800/80 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-teal/20 blur-[90px]" />
          <div className="pointer-events-none absolute top-[38%] right-0 h-56 w-56 rounded-full bg-brand-tealGlow/10 blur-[80px]" />

          {/* ========================================================
              1. HEADER / PROFILE (Strict Hierarchy)
              [ FINREV SOLUTIONS LOGO ]
              [ MY PROFILE PHOTO ]
              Panchanan Kumar
              Mutual Fund Distributor
              AMFI Registered Mutual Fund Distributor
              ======================================================== */}
          <header className="relative z-10 px-5 pt-7 pb-6 text-center">
            {/* Top Bar with FinRev Verified Indicator */}
            <div className="mb-5 flex items-center justify-between px-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-brand-teal/15 px-3 py-1 text-[11px] font-medium tracking-wide text-brand-tealLight backdrop-blur-md">
                <Shield className="h-3 w-3 text-brand-tealLight" strokeWidth={2.5} />
                <span>Verified Distributor</span>
              </div>
              <button
                type="button"
                id="header-qr-button"
                onClick={() => setQrOpen(true)}
                aria-label="Open QR Code"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-brand-tealLight/50 hover:bg-brand-teal/20 hover:text-white"
              >
                <QrCode className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            {/* Official FINREV SOLUTIONS Logo Card */}
            <div className="mx-auto w-fit rounded-2xl border border-white/15 bg-white p-3.5 shadow-logo transition-transform duration-300 hover:scale-[1.02]">
              <img
                src={logoUrl}
                alt="FinRev Solutions Official Logo"
                width="210"
                height="150"
                className="h-14 w-auto object-contain sm:h-16"
              />
            </div>

            {/* Profile Photo DIRECTLY BELOW THE LOGO */}
            <div className="relative mt-6 flex justify-center">
              <div className="relative group">
                {/* Refined concentric teal border ring with soft glow */}
                <div className="relative h-24 w-24 overflow-hidden rounded-full p-[3px] bg-gradient-to-tr from-brand-teal via-brand-tealLight to-brand-tealGlow shadow-[0_10px_25px_-5px_rgba(47,105,115,0.6)]">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#161C2E]">
                    {customPhoto ? (
                      <img
                        src={customPhoto}
                        alt="Panchanan Kumar"
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      /* Dignified High-End Monogram Profile Avatar */
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#1C253B] to-[#121828] text-white">
                        <span className="text-2xl font-extrabold tracking-wider text-brand-tealLight">
                          PK
                        </span>
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
                          FinRev
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload / Change Photo Trigger Icon */}
                <button
                  type="button"
                  id="profile-photo-trigger"
                  onClick={() => setPhotoModalOpen(true)}
                  aria-label="Upload or update profile photo"
                  title="Upload profile photo"
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#0F1422] bg-brand-teal text-white shadow-md transition-transform duration-200 hover:scale-110 hover:bg-brand-tealGlow active:scale-95"
                >
                  <Camera className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* Hidden Real File Input for Photo Upload */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            {/* Name & Credentials */}
            <div className="mt-4">
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[1.7rem]">
                {BRAND.person}
              </h1>
              <p className="mt-1 text-sm font-semibold tracking-wide text-brand-tealLight">
                {BRAND.role}
              </p>

              {/* AMFI Registered Badge */}
              <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-brand-teal/40 bg-brand-teal/15 px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-tealLight backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4 text-brand-tealLight" strokeWidth={2.2} />
                <span>{BRAND.credential}</span>
                <span className="text-white/40">|</span>
                <span className="text-white font-mono text-[11px]">{BRAND.arn}</span>
              </div>

              {/* Location */}
              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-brand-tealLight/80" strokeWidth={2} />
                <span>{BRAND.location}</span>
              </div>
            </div>
          </header>

          {/* ========================================================
              BODY CONTENT (Light / Crisp Wealth Management Canvas)
              ======================================================== */}
          <main className="relative z-10 flex-1 rounded-t-[2.25rem] bg-brand-canvas px-4 pt-6 pb-8 shadow-inner sm:px-5">
            {/* ========================================================
                2. PRIMARY ACTIONS & SAVE CONTACT
                Primary: CALL, WHATSAPP, SAVE CONTACT (Major CTA)
                Secondary: EMAIL, WEBSITE, FACEBOOK
                ======================================================== */}
            <section id="primary-actions" aria-label="Primary contact actions">
              {/* Call & WhatsApp Tiles */}
              <div className="grid grid-cols-2 gap-3">
                {primaryActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <a
                      key={action.id}
                      id={action.id}
                      href={action.href}
                      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/50 hover:shadow-card-hover active:scale-[0.98]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-tealSoft text-brand-teal transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white">
                        <Icon className="h-5 w-5" strokeWidth={2.1} />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">
                          {action.label}
                        </span>
                        <span className="block truncate text-xs font-bold text-brand-ink">
                          {action.subtitle}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-teal" />
                    </a>
                  )
                })}
              </div>

              {/* SAVE CONTACT (Major Premium CTA) */}
              <button
                type="button"
                id="save-contact-cta"
                onClick={downloadContact}
                className="group relative mt-3 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-navyDeep via-brand-navy to-[#1B243B] p-4 text-white shadow-cta transition-all duration-200 hover:shadow-[0_14px_30px_-6px_rgba(22,28,46,0.6)] hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(133,186,194,0.15),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-teal text-white shadow-sm transition-transform duration-200 group-hover:scale-110">
                  <Download className="h-4 w-4" strokeWidth={2.4} />
                </div>
                <span className="text-base font-bold tracking-wide">SAVE CONTACT</span>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-tealLight">
                  vCard
                </span>
              </button>

              {/* Secondary Actions (Email, Website, Facebook) */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {secondaryActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <a
                      key={action.id}
                      id={action.id}
                      href={action.href}
                      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white py-2.5 px-2 text-center shadow-subtle transition-all duration-200 hover:border-brand-teal/40 hover:bg-brand-tealSoft/40 hover:shadow-card active:scale-[0.97]"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-brand-inkSecondary transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                      </div>
                      <span className="mt-1.5 text-[11px] font-bold text-brand-inkSecondary group-hover:text-brand-ink">
                        {action.label}
                      </span>
                    </a>
                  )
                })}
              </div>
            </section>

            {/* ========================================================
                3. OUR SERVICES (ONLY THE 8 SPECIFIED SERVICES)
                2-Column Mobile Grid · Compact & Elegant
                ======================================================== */}
            <section id="services-section" aria-label="Our services" className="mt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-teal">
                    Investment Solutions
                  </p>
                  <h2 className="mt-0.5 text-lg font-extrabold text-brand-navy">
                    Our Services
                  </h2>
                </div>
                <span className="rounded-full bg-brand-tealSoft px-2.5 py-1 text-[11px] font-bold text-brand-teal">
                  8 Offerings
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                {SERVICES.map((service, idx) => {
                  const Icon = service.icon
                  return (
                    <div
                      key={service.title}
                      id={`service-card-${idx + 1}`}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-card-hover"
                    >
                      <div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-tealSoft text-brand-teal transition-all duration-200 group-hover:bg-brand-teal group-hover:text-white">
                          <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
                        </div>
                        <h3 className="mt-2.5 text-xs font-bold leading-tight text-brand-ink">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-[10px] leading-relaxed text-brand-muted line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* ========================================================
                4. SEND MY CARD (Instant WhatsApp Forwarding)
                Validates 10-digit Indian Mobile Number (+91)
                ======================================================== */}
            <section id="send-card-section" aria-label="Send my card" className="mt-8">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#111728] via-[#161F33] to-[#0F1424] p-5 text-white shadow-panel">
                {/* Background lighting */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-brand-teal/20 blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-teal text-white">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
                      SEND MY CARD
                    </h2>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    Send this digital card directly to any WhatsApp number in India.
                  </p>

                  <form onSubmit={sendOnWhatsApp} className="mt-4">
                    <label htmlFor="recipient-mobile" className="sr-only">
                      Recipient Mobile Number
                    </label>
                    <div className="flex items-stretch overflow-hidden rounded-xl border border-white/15 bg-white/10 backdrop-blur-md transition-all focus-within:border-brand-tealLight focus-within:ring-2 focus-within:ring-brand-tealLight/40">
                      <span className="flex select-none items-center gap-1 border-r border-white/15 bg-white/5 px-3.5 text-xs font-bold text-brand-tealLight">
                        +91
                      </span>
                      <input
                        id="recipient-mobile"
                        name="recipient-mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder="Enter 10-digit mobile number"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={10}
                        className="w-full min-w-0 bg-transparent px-3 py-3 text-sm font-medium tracking-wide text-white outline-none placeholder:text-slate-400"
                      />
                      {phone && (
                        <button
                          type="button"
                          onClick={() => setPhone('')}
                          className="px-3 text-slate-400 hover:text-white"
                          aria-label="Clear mobile number"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {phoneError && (
                      <p role="alert" className="mt-2 text-xs font-medium text-rose-300">
                        {phoneError}
                      </p>
                    )}

                    <button
                      type="submit"
                      id="send-whatsapp-submit"
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal py-3 text-xs font-bold uppercase tracking-wider text-white shadow-cta-teal transition-all duration-200 hover:bg-brand-tealGlow hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tealLight"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      <span>Send on WhatsApp</span>
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {/* ========================================================
                5. SHARE MY CARD (WhatsApp, Copy Link, QR Code, Native Share)
                ======================================================== */}
            <section id="share-card-section" aria-label="Share my card" className="mt-8">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-teal">
                  Instant Access
                </p>
                <h2 className="mt-0.5 text-lg font-extrabold text-brand-navy">
                  SHARE MY CARD
                </h2>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                {/* 1. WhatsApp Share */}
                <button
                  type="button"
                  id="share-tile-whatsapp"
                  onClick={shareWhatsApp}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-3.5 text-center shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-card-hover active:scale-[0.98]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366] transition-colors duration-200 group-hover:bg-[#25D366] group-hover:text-white">
                    <WhatsAppIcon className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-xs font-bold text-brand-ink">WhatsApp</span>
                  <span className="text-[10px] text-brand-muted">Share to chat</span>
                </button>

                {/* 2. Copy Link */}
                <button
                  type="button"
                  id="share-tile-copy"
                  onClick={copyLink}
                  aria-live={copied ? 'polite' : undefined}
                  className={`group flex flex-col items-center justify-center rounded-2xl border p-3.5 text-center shadow-card transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${
                    copied
                      ? 'border-brand-teal bg-brand-tealSoft text-brand-teal'
                      : 'border-slate-200/90 bg-white hover:border-brand-teal/40 hover:shadow-card-hover'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
                      copied
                        ? 'bg-brand-teal text-white'
                        : 'bg-brand-tealSoft text-brand-teal group-hover:bg-brand-teal group-hover:text-white'
                    }`}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-5 w-5" strokeWidth={2.4} />
                    ) : (
                      <Copy className="h-5 w-5" strokeWidth={2.1} />
                    )}
                  </div>
                  <span className="mt-2 text-xs font-bold text-brand-ink">
                    {copied ? 'Link Copied' : 'Copy Link'}
                  </span>
                  <span className="text-[10px] text-brand-muted">
                    {copied ? 'Copied to clipboard' : 'Copy card URL'}
                  </span>
                </button>

                {/* 3. QR Code Modal */}
                <button
                  type="button"
                  id="share-tile-qr"
                  onClick={() => setQrOpen(true)}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-3.5 text-center shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-card-hover active:scale-[0.98]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tealSoft text-brand-teal transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white">
                    <QrCode className="h-5 w-5" strokeWidth={2.1} />
                  </div>
                  <span className="mt-2 text-xs font-bold text-brand-ink">QR Code</span>
                  <span className="text-[10px] text-brand-muted">Scan to view</span>
                </button>

                {/* 4. More / Native Share */}
                <button
                  type="button"
                  id="share-tile-more"
                  onClick={shareCard}
                  className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white p-3.5 text-center shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-card-hover active:scale-[0.98]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tealSoft text-brand-teal transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white">
                    <Share2 className="h-5 w-5" strokeWidth={2.1} />
                  </div>
                  <span className="mt-2 text-xs font-bold text-brand-ink">More</span>
                  <span className="text-[10px] text-brand-muted">Native Share</span>
                </button>
              </div>
            </section>

            {/* ========================================================
                6. CONTACT INFORMATION (Premium Compact Panel)
                ======================================================== */}
            <section id="contact-details-section" aria-label="Contact information" className="mt-8">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-teal">
                  Direct Channel
                </p>
                <h2 className="mt-0.5 text-lg font-extrabold text-brand-navy">
                  Contact Information
                </h2>
              </div>

              <div className="mt-3.5 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card divide-y divide-slate-100">
                {contactRows.map((row) => {
                  const Icon = row.icon
                  const hasLink = Boolean(row.href)
                  const Wrapper = hasLink ? 'a' : 'div'
                  const wrapperProps = hasLink
                    ? {
                        id: row.id,
                        href: row.href,
                        ...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                        className:
                          'group flex items-center gap-3 p-3.5 transition-colors hover:bg-slate-50 active:bg-slate-100 focus:outline-none focus-visible:bg-slate-50',
                      }
                    : {
                        id: row.id,
                        className: 'flex items-center gap-3 p-3.5',
                      }

                  return (
                    <Wrapper key={row.id} {...wrapperProps}>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-tealSoft text-brand-teal transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white">
                        <Icon className="h-4 w-4" strokeWidth={2.1} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                          {row.label}
                        </span>
                        <span className="block truncate text-xs font-semibold text-brand-ink">
                          {row.value}
                        </span>
                      </div>
                      {row.actionText && (
                        <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-brand-inkSecondary transition-colors group-hover:bg-brand-tealSoft group-hover:text-brand-teal">
                          {row.actionText}
                        </span>
                      )}
                      {hasLink && (
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-brand-teal" />
                      )}
                    </Wrapper>
                  )
                })}
              </div>
            </section>
          </main>

          {/* ========================================================
              7. FOOTER (Sophisticated FinRev Branded Footer)
              ======================================================== */}
          <footer
            id="finrev-footer"
            className="relative z-10 border-t border-slate-800 bg-[#0B0F19] px-6 pt-7 pb-8 text-center text-white"
          >
            <div className="mx-auto w-fit rounded-xl bg-white p-2.5 shadow-md">
              <img
                src={logoUrl}
                alt="FinRev Solutions"
                width="120"
                height="80"
                className="h-7 w-auto object-contain"
              />
            </div>

            <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.25em] text-brand-tealLight">
              {BRAND.name}
            </p>
            <p className="mt-1 text-[11px] text-slate-400 font-medium">
              {BRAND.credential} · {BRAND.arn}
            </p>

            {/* Regulatory Disclaimer */}
            <div className="mx-auto mt-4 max-w-xs border-t border-white/10 pt-3">
              <p className="text-[10px] leading-relaxed text-slate-500">
                Mutual Fund investments are subject to market risks. Please read all scheme-related
                documents carefully before investing.
              </p>
            </div>

            {/* Copyright */}
            <div className="mt-3 border-t border-white/5 pt-3">
              <p className="text-[10px] text-slate-500">
                © 2026 {BRAND.name}. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* ========================================================
          QR CODE MODAL (Ultra-Premium Presentation)
          ======================================================== */}
      {qrOpen && (
        <div
          id="qr-modal"
          role="dialog"
          aria-modal="true"
          aria-label="FinRev Digital Visiting Card QR Code"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close modal backdrop"
            onClick={() => setQrOpen(false)}
            className="animate-fade-in fixed inset-0 h-full w-full bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="animate-qr-in relative z-10 w-full max-w-xs overflow-hidden rounded-3xl border border-white/15 bg-[#0F1422] p-6 text-center text-white shadow-modal">
            {/* Ambient Radial */}
            <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-teal/30 blur-2xl" />

            {/* Close Button */}
            <button
              ref={qrCloseRef}
              type="button"
              id="qr-modal-close"
              onClick={() => setQrOpen(false)}
              aria-label="Close QR Code"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mx-auto w-fit rounded-xl bg-white p-2 shadow-sm">
              <img
                src={logoUrl}
                alt="FinRev Solutions"
                className="h-6 w-auto object-contain"
              />
            </div>

            <h3 className="mt-3 text-base font-extrabold text-white">
              Scan My Digital Card
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Point any mobile camera to view instantly
            </p>

            {/* High-Resolution QR Display */}
            <div className="mx-auto mt-4 w-fit rounded-2xl bg-white p-3.5 shadow-lg ring-1 ring-slate-200">
              <img
                src={BRAND.qrImage}
                alt="QR Code for FinRev Solutions Digital Card"
                width="200"
                height="200"
                className="h-44 w-44 object-contain"
              />
            </div>

            {/* Modal Actions */}
            <div className="mt-5 space-y-2">
              <button
                type="button"
                id="modal-copy-link"
                onClick={() => {
                  copyLink()
                  setQrOpen(false)
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-cta transition hover:bg-brand-tealGlow active:scale-[0.98]"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Card Link</span>
              </button>

              <button
                type="button"
                id="modal-dismiss"
                onClick={() => setQrOpen(false)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PHOTO UPLOAD / MANAGEMENT MODAL
          ======================================================== */}
      {photoModalOpen && (
        <div
          id="photo-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Profile Photo Settings"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close photo modal backdrop"
            onClick={() => setPhotoModalOpen(false)}
            className="animate-fade-in fixed inset-0 h-full w-full bg-black/80 backdrop-blur-md"
          />

          <div className="animate-qr-in relative z-10 w-full max-w-xs overflow-hidden rounded-3xl border border-white/15 bg-[#0F1422] p-6 text-center text-white shadow-modal">
            <button
              type="button"
              id="photo-modal-close"
              onClick={() => setPhotoModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/20 text-brand-tealLight">
                <Camera className="h-6 w-6" />
              </div>
            </div>

            <h3 className="mt-3 text-base font-extrabold text-white">
              Profile Photo
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Upload your official professional portrait for your digital visiting card.
            </p>

            {/* Current Preview */}
            <div className="my-4 flex justify-center">
              <div className="h-20 w-20 overflow-hidden rounded-full p-1 bg-gradient-to-tr from-brand-teal to-brand-tealLight">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#161C2E]">
                  {customPhoto ? (
                    <img
                      src={customPhoto}
                      alt="Current Portrait"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold text-brand-tealLight">PK</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                id="photo-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-teal py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-cta transition hover:bg-brand-tealGlow active:scale-[0.98]"
              >
                <UploadCloud className="h-4 w-4" />
                <span>Upload New Photo</span>
              </button>

              {customPhoto && (
                <button
                  type="button"
                  id="photo-reset-btn"
                  onClick={removePhoto}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Reset to Initials</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPhotoModalOpen(false)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          FLOATING QUICK-ACTION (Mobile Direct WhatsApp)
          ======================================================== */}
      <a
        id="floating-whatsapp-btn"
        href={waChatHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Consultation"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white shadow-[0_10px_25px_-5px_rgba(47,105,115,0.7)] transition-all duration-300 hover:scale-105 hover:bg-brand-tealGlow active:scale-95 sm:hidden"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500" />
        </span>
      </a>

      {/* ========================================================
          TOAST NOTIFICATION (Tactile Feedback)
          ======================================================== */}
      {toast && (
        <div
          id="toast-notification"
          role="status"
          className="pointer-events-none fixed inset-x-0 bottom-20 z-50 flex justify-center px-4"
        >
          <div className="animate-toast-in flex items-center gap-2.5 rounded-full border border-teal-500/30 bg-[#0F1422]/95 px-4 py-2.5 text-xs font-semibold text-white shadow-modal backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-brand-tealLight" strokeWidth={2.4} />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  )
}
