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
  Check,
  Camera,
  ArrowUpRight,
  UploadCloud,
  Trash2,
  Send,
  Sparkles,
} from 'lucide-react'

import logoUrl from './assets/logo.png'

const BRAND = {
  name: 'FINREV SOLUTIONS',
  tagline: 'Secure Today. Stronger Tomorrow.',
  person: 'Panchanan Kumar',
  role: 'Mutual Fund Distributor',
  credential: 'AMFI Registered Mutual Fund Distributor',
  arn: 'ARN-195797',
  location: 'Dhanbad, Jharkhand, India',
  phone: '+91 98355 92142',
  phoneRaw: '+919835592142',
  email: 'info@finrevsolutions.com',
  emailSubject: 'Investment Inquiry - FinRev Solutions',
  website: 'https://www.finrevsolutions.com',
  websiteDisplay: 'finrevsolutions.com',
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
    description: 'Systematic goal planning & wealth creation',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance',
    description: 'Comprehensive risk & financial protection',
  },
  {
    icon: Link2,
    title: 'Bonds',
    description: 'Stable fixed income & capital preservation',
  },
  {
    icon: PieChart,
    title: 'PMS',
    description: 'Bespoke Portfolio Management for HNIs',
  },
  {
    icon: Briefcase,
    title: 'AIF',
    description: 'Alternative Investment Funds for alpha',
  },
  {
    icon: Building2,
    title: 'Unlisted Equity',
    description: 'Pre-IPO & high-growth private opportunities',
  },
  {
    icon: Landmark,
    title: 'Fixed Deposits',
    description: 'Corporate & bank FDs with assured safety',
  },
  {
    icon: Newspaper,
    title: 'Book Newspapers Ads',
    description: 'Statutory notices & public publications',
  },
]

const mailtoHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(BRAND.emailSubject)}`
const waChatHref = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
  'Hi Panchanan, I would like to explore financial advisory and investment solutions.',
)}`

const PROFESSIONAL_WHATSAPP_MESSAGE = `Hello,

I'm Panchanan Kumar, Mutual Fund Distributor at FinRev Solutions.

Please find my digital visiting card and professional profile below:

FinRev Solutions
Secure Today. Stronger Tomorrow.

${BRAND.cardUrl}`

const SEND_CARD_MESSAGE = PROFESSIONAL_WHATSAPP_MESSAGE

function WhatsAppIcon({ className = 'h-4 w-4' }) {
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

function SectionDivider({ title }) {
  return (
    <div className="relative my-1 flex items-center justify-center">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C3CFD2]/80 to-transparent" />
      <div className="flex items-center gap-1.5 px-3">
        <span className="h-1 w-1 rounded-full bg-[#1B4F57]" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#163744]">
          {title}
        </h2>
        <span className="h-1 w-1 rounded-full bg-[#1B4F57]" />
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C3CFD2]/80 to-transparent" />
    </div>
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

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('finrev_profile_photo')
      if (saved) setCustomPhoto(saved)
    } catch {
      // Storage fallback
    }
    return () => clearTimeout(toastTimer.current)
  }, [])

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
    toastTimer.current = setTimeout(() => setToast(''), 2500)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file')
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
          // Quota handling
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
    showToast('Photo reset')
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
    link.download = 'Panchanan_Kumar_FinRev.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    showToast('Contact vCard saved to device')
  }

  const shareWhatsApp = () => {
    const message = encodeURIComponent(PROFESSIONAL_WHATSAPP_MESSAGE)
    window.open(`https://wa.me/?text=${message}`, '_blank')
    showToast('Opening WhatsApp…')
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
      showToast('Could not copy link')
    }
  }

  const shareNative = async () => {
    const shareData = {
      title: `${BRAND.person} | ${BRAND.name}`,
      text: `${BRAND.person} - ${BRAND.role} (${BRAND.arn})`,
      url: BRAND.cardUrl,
    }
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData)
      } catch {
        // Dismissed
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
      setPhoneError('Indian numbers start with 6, 7, 8, or 9')
      return
    }

    setPhoneError('')
    const message = encodeURIComponent(SEND_CARD_MESSAGE)
    const url = `https://wa.me/91${digits}?text=${message}`
    window.open(url, '_blank')
    showToast(`Sending to WhatsApp (+91 ${digits})`)
  }

  return (
    <div className="min-h-screen bg-[#0C1928] font-sans text-[#162B3A] antialiased selection:bg-[#1B4F57] selection:text-white">
      {/* Background Subtle Gradient & Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#163744]/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#1B4F57]/15 rounded-full blur-[130px]" />
      </div>

      {/* 9:16 Mobile-First Executive Card Container (Level 1 Surface) */}
      <div className="relative min-h-screen flex items-center justify-center p-0 sm:py-8 md:py-10">
        <main
          id="digital-card-container"
          className={`card-elevation-1 relative w-full max-w-[440px] bg-[#FBFCFD] transition-opacity duration-300 sm:rounded-[32px] sm:border sm:border-[#C3CFD2]/70 overflow-hidden ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* ========================================================
              1. NEW PREMIUM FULL-WIDTH HERO HEADER & OVERLAPPING PROFILE
              Hierarchy:
              Deep FinRev Teal Hero (Full-width, Solid #1B4F57)
                ↳ [FINREV LOGO] | FINREV SOLUTIONS / Tagline (White Lockup)
              ↓
              Overlapping Profile Photo (50% in Teal, 50% in White)
              ↓
              PANCHANAN KUMAR
              ↓
              Mutual Fund Distributor
              ↓
              AMFI Registered Mutual Fund Distributor • ARN-195797
              ======================================================== */}
          <header className="text-center bg-[#FBFCFD] pb-4">
            {/* Full-width Deep FinRev Teal (#1B4F57) Hero Section */}
            <div className="w-full bg-[#1B4F57] pt-7 sm:pt-8 pb-14 px-6 text-white relative shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.18)]">
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-white/10 rounded-full blur-xl pointer-events-none" />

              {/* Corporate Brand Lockup (Logo on Left + White Typography on Right) */}
              <div className="flex items-center justify-center gap-3 sm:gap-3.5 text-left">
                {/* Official FinRev Logo on the LEFT (Clean white surface for maximum clarity and brand fidelity) */}
                <div className="flex-shrink-0 rounded-lg bg-white p-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,1)] border border-white/40 flex items-center justify-center">
                  <img
                    src={logoUrl}
                    alt="FinRev Solutions Logo"
                    width="140"
                    height="48"
                    className="h-7 sm:h-8 w-auto max-w-[72px] object-contain"
                  />
                </div>

                {/* Subtle Vertical Divider */}
                <div className="h-8 w-[1px] bg-white/25 flex-shrink-0" />

                {/* Brand Name & Slogan on the RIGHT */}
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-[15px] sm:text-[16px] font-extrabold uppercase tracking-[0.14em] text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                    FINREV SOLUTIONS
                  </span>
                  <span className="mt-0.5 text-[10px] sm:text-[10.5px] font-medium tracking-[0.03em] text-[#EEF2F3]/90 leading-tight">
                    Secure Today. Stronger Tomorrow.
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Photo OVERLAPPING the boundary (50% in Teal, 50% in White) */}
            <div className="relative -mt-12 flex justify-center z-20">
              <div className="relative group">
                {/* Subtle soft backdrop depth */}
                <div className="absolute inset-0 rounded-full bg-[#1B4F57]/15 blur-md transform scale-110" />

                {/* 100px Circular Portrait with White/Teal Frame & 3D Layered Shadow */}
                <div className="relative h-[100px] w-[100px] rounded-full border-[4px] border-[#FBFCFD] p-[1.5px] bg-[#1B4F57] shadow-[0_10px_25px_-5px_rgba(27,79,87,0.38),0_4px_10px_rgba(0,0,0,0.15)]">
                  <div className="h-full w-full rounded-full overflow-hidden bg-[#EEF2F3] flex items-center justify-center">
                    {customPhoto ? (
                      <img
                        src={customPhoto}
                        alt="Panchanan Kumar"
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      /* Executive Monogram Profile fallback */
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#EEF2F3] to-[#DFE7EA]">
                        <span className="text-2xl font-bold tracking-wider text-[#1B4F57]">
                          PK
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-[#6C8085]">
                          FINREV
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtle tactile photo upload trigger */}
                <button
                  type="button"
                  id="profile-photo-trigger"
                  onClick={() => setPhotoModalOpen(true)}
                  aria-label="Update profile photo"
                  title="Upload profile photo"
                  className="btn-tactile-teal absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#1B4F57] text-white border-2 border-[#FBFCFD] shadow-md transition"
                >
                  <Camera className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

            {/* Exact Profile Typography Hierarchy */}
            <div className="mt-3 px-6">
              <h1 className="text-[23px] sm:text-[25px] font-bold tracking-tight text-[#163744]">
                {BRAND.person}
              </h1>
              <p className="mt-0.5 text-xs font-semibold tracking-wide text-[#1B4F57]">
                {BRAND.role}
              </p>

              {/* AMFI Registered Mutual Fund Distributor */}
              <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#C3CFD2] bg-[#EEF2F3] px-3.5 py-1 text-[11px] font-medium text-[#163744] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <Check className="h-3.5 w-3.5 text-[#1B4F57] stroke-[2.5]" />
                <span className="font-semibold">{BRAND.credential}</span>
                <span className="text-[#6C8085]">•</span>
                <span className="font-mono font-semibold text-[#1B4F57]">{BRAND.arn}</span>
              </div>

              {/* Location */}
              <div className="mt-2 flex items-center justify-center gap-1 text-[11px] text-[#6C8085]">
                <MapPin className="h-3 w-3 text-[#1B4F57]" />
                <span>{BRAND.location}</span>
              </div>
            </div>
          </header>

          {/* ========================================================
              CARD CONTENT BODY
              ======================================================== */}
          <div className="px-5 pb-6 space-y-4">
            {/* ========================================================
                2. ACTION BUTTONS (Level 3 & 4 Surfaces)
                Primary CTA: SAVE CONTACT (FinRev Teal, 3D Depth)
                Contact Actions: Call, WhatsApp, Email (Tactile White Cards)
                Secondary: Visit Website, Facebook Page
                ======================================================== */}
            <section id="action-system" aria-label="Contact actions" className="space-y-2">
              {/* SAVE CONTACT (Primary Tactile CTA in FinRev Teal #1B4F57) */}
              <button
                type="button"
                id="save-contact-cta"
                onClick={downloadContact}
                className="btn-tactile-teal group relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1B4F57] py-3.5 px-4 text-white focus:outline-none"
              >
                <Download className="h-4 w-4" strokeWidth={2.4} />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  SAVE CONTACT
                </span>
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                  vCard
                </span>
              </button>

              {/* Contact Actions Row: Call, WhatsApp, Email */}
              <div className="grid grid-cols-3 gap-2">
                {/* Call */}
                <a
                  id="action-call"
                  href={`tel:${BRAND.phoneRaw}`}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] py-2.5 px-2 text-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#1B4F57] transition-colors group-hover:bg-[#1B4F57] group-hover:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <Phone className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <span className="mt-1.5 text-[11px] font-bold text-[#162B3A]">
                    Call
                  </span>
                  <span className="text-[9px] text-[#6C8085] truncate max-w-full">
                    Direct
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  id="action-whatsapp"
                  href={waChatHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] py-2.5 px-2 text-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#1B4F57] transition-colors group-hover:bg-[#1B4F57] group-hover:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <WhatsAppIcon className="h-4 w-4" />
                  </div>
                  <span className="mt-1.5 text-[11px] font-bold text-[#162B3A]">
                    WhatsApp
                  </span>
                  <span className="text-[9px] text-[#6C8085] truncate max-w-full">
                    Chat
                  </span>
                </a>

                {/* Email */}
                <a
                  id="action-email"
                  href={mailtoHref}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] py-2.5 px-2 text-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#1B4F57] transition-colors group-hover:bg-[#1B4F57] group-hover:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <Mail className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <span className="mt-1.5 text-[11px] font-bold text-[#162B3A]">
                    Email
                  </span>
                  <span className="text-[9px] text-[#6C8085] truncate max-w-full">
                    Inquiry
                  </span>
                </a>
              </div>

              {/* Secondary: Website & Facebook */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  id="action-website"
                  href={BRAND.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-secondary group flex items-center justify-center gap-2 rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] py-2 px-3 text-center"
                >
                  <Globe className="h-3.5 w-3.5 text-[#1B4F57]" />
                  <span className="text-[11px] font-semibold text-[#162B3A]">
                    Visit Website
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-[#6C8085] group-hover:text-[#1B4F57]" />
                </a>

                <a
                  id="action-facebook"
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-secondary group flex items-center justify-center gap-2 rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] py-2 px-3 text-center"
                >
                  <Facebook className="h-3.5 w-3.5 text-[#1B4F57]" />
                  <span className="text-[11px] font-semibold text-[#162B3A]">
                    Facebook Page
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-[#6C8085] group-hover:text-[#1B4F57]" />
                </a>
              </div>
            </section>

            {/* ========================================================
                3. OUR SERVICES (Editorial Header + 2-Column Tactile Cards)
                ONLY THE 8 SERVICES
                ======================================================== */}
            <section id="services-section" aria-label="Our services" className="pt-2">
              <SectionDivider title="Our Services" />

              <div className="mt-3 grid grid-cols-2 gap-2">
                {SERVICES.map((service, idx) => {
                  const Icon = service.icon
                  return (
                    <div
                      key={service.title}
                      id={`service-card-${idx + 1}`}
                      className="card-elevation-interactive group flex flex-col justify-between rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] p-3"
                    >
                      <div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#1B4F57] transition-colors group-hover:bg-[#1B4F57] group-hover:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                          <Icon className="h-4 w-4" strokeWidth={2.2} />
                        </div>
                        <h3 className="mt-2.5 text-xs font-bold leading-tight text-[#163744] group-hover:text-[#1B4F57] transition-colors">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-[10px] leading-relaxed text-[#6C8085] line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* ========================================================
                4. SEND MY CARD (Level 2 Panel in #EEF2F3)
                +91 | Enter mobile number -> Send on WhatsApp
                ======================================================== */}
            <section id="send-card-section" aria-label="Send my card" className="pt-2">
              <SectionDivider title="Send My Card" />

              <div className="card-elevation-panel mt-3 rounded-2xl border border-[#C3CFD2] bg-[#EEF2F3] p-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1B4F57] text-white shadow-sm">
                    <Send className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#163744]">
                      Instant WhatsApp Dispatch
                    </h3>
                    <p className="text-[10px] text-[#6C8085]">
                      Forward this digital card directly to any mobile number
                    </p>
                  </div>
                </div>

                <form onSubmit={sendOnWhatsApp} className="mt-3">
                  <label htmlFor="recipient-mobile" className="sr-only">
                    Mobile number
                  </label>
                  <div className="input-tactile flex items-stretch overflow-hidden rounded-xl border border-[#C3CFD2] bg-[#FBFCFD] transition focus-within:border-[#1B4F57] focus-within:ring-1 focus-within:ring-[#1B4F57]">
                    <span className="flex select-none items-center border-r border-[#C3CFD2] bg-[#F4F7F8] px-3 text-xs font-bold text-[#163744]">
                      +91
                    </span>
                    <input
                      id="recipient-mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="Enter mobile number"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={10}
                      className="w-full bg-transparent px-3 py-2.5 text-xs font-medium text-[#162B3A] outline-none placeholder:text-[#6C8085]"
                    />
                    {phone && (
                      <button
                        type="button"
                        onClick={() => setPhone('')}
                        className="px-2.5 text-[#6C8085] hover:text-[#162B3A]"
                        aria-label="Clear number"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {phoneError && (
                    <p role="alert" className="mt-1.5 text-[11px] font-medium text-rose-600">
                      {phoneError}
                    </p>
                  )}

                  <button
                    type="submit"
                    id="send-whatsapp-submit"
                    className="btn-tactile-teal mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B4F57] py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    <span>Send on WhatsApp</span>
                  </button>
                </form>
              </div>
            </section>

            {/* ========================================================
                5. SHARE MY CARD (Level 3 Tactile Share Options)
                WhatsApp · Copy Link · QR Code · More Options
                ======================================================== */}
            <section id="share-card-section" aria-label="Share my card" className="pt-2">
              <SectionDivider title="Share My Card" />

              <div className="mt-3 grid grid-cols-4 gap-2">
                {/* 1. WhatsApp */}
                <button
                  type="button"
                  id="share-tile-whatsapp"
                  onClick={shareWhatsApp}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] p-2.5 text-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#1B4F57] transition-colors group-hover:bg-[#1B4F57] group-hover:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <WhatsAppIcon className="h-4 w-4" />
                  </div>
                  <span className="mt-1.5 text-[10px] font-semibold text-[#162B3A]">
                    WhatsApp
                  </span>
                </button>

                {/* 2. Copy Link */}
                <button
                  type="button"
                  id="share-tile-copy"
                  onClick={copyLink}
                  aria-live={copied ? 'polite' : undefined}
                  className={`card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border p-2.5 text-center ${
                    copied
                      ? 'border-[#1B4F57] bg-[#EEF2F3] text-[#1B4F57]'
                      : 'border-[#C3CFD2]/80 bg-[#FBFCFD]'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      copied
                        ? 'bg-[#1B4F57] text-white'
                        : 'bg-[#EEF2F3] text-[#1B4F57] group-hover:bg-[#1B4F57] group-hover:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]'
                    }`}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 stroke-[2.4]" />
                    ) : (
                      <Copy className="h-4 w-4" strokeWidth={2.2} />
                    )}
                  </div>
                  <span className="mt-1.5 text-[10px] font-semibold text-[#162B3A]">
                    {copied ? 'Copied' : 'Copy Link'}
                  </span>
                </button>

                {/* 3. QR Code */}
                <button
                  type="button"
                  id="share-tile-qr"
                  onClick={() => setQrOpen(true)}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] p-2.5 text-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#1B4F57] transition-colors group-hover:bg-[#1B4F57] group-hover:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <QrCode className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <span className="mt-1.5 text-[10px] font-semibold text-[#162B3A]">
                    QR Code
                  </span>
                </button>

                {/* 4. More Options */}
                <button
                  type="button"
                  id="share-tile-more"
                  onClick={shareNative}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#C3CFD2]/80 bg-[#FBFCFD] p-2.5 text-center"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2F3] text-[#1B4F57] transition-colors group-hover:bg-[#1B4F57] group-hover:text-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <Share2 className="h-4 w-4" strokeWidth={2.2} />
                  </div>
                  <span className="mt-1.5 text-[10px] font-semibold text-[#162B3A]">
                    More
                  </span>
                </button>
              </div>
            </section>

            {/* ========================================================
                6. BUSINESS INFORMATION (Clean Editorial Panel)
                Phone, Email, Website, ARN, Location
                ======================================================== */}
            <section id="business-info-section" aria-label="Business information" className="pt-2">
              <SectionDivider title="Business Details" />

              <div className="card-elevation-panel mt-3 rounded-xl border border-[#C3CFD2] bg-[#FBFCFD] divide-y divide-[#C3CFD2]/60 overflow-hidden">
                {/* 1. Phone & WhatsApp */}
                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="group flex items-center justify-between p-3 transition hover:bg-[#EEF2F3]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEF2F3] text-[#1B4F57]">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-[#6C8085]">
                        PHONE & WHATSAPP
                      </span>
                      <span className="block truncate text-xs font-semibold text-[#163744] group-hover:text-[#1B4F57]">
                        {BRAND.phone}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-[#6C8085] group-hover:text-[#1B4F57]" />
                </a>

                {/* 2. Email */}
                <a
                  href={mailtoHref}
                  className="group flex items-center justify-between p-3 transition hover:bg-[#EEF2F3]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEF2F3] text-[#1B4F57]">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-[#6C8085]">
                        EMAIL
                      </span>
                      <span className="block truncate text-xs font-semibold text-[#163744] group-hover:text-[#1B4F57]">
                        {BRAND.email}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-[#6C8085] group-hover:text-[#1B4F57]" />
                </a>

                {/* 3. Website */}
                <a
                  href={BRAND.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 transition hover:bg-[#EEF2F3]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEF2F3] text-[#1B4F57]">
                      <Globe className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-[#6C8085]">
                        WEBSITE
                      </span>
                      <span className="block truncate text-xs font-semibold text-[#163744] group-hover:text-[#1B4F57]">
                        {BRAND.websiteDisplay}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#6C8085] group-hover:text-[#1B4F57]" />
                </a>

                {/* 4. ARN & AMFI Registration */}
                <div className="flex items-center gap-3 p-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEF2F3] text-[#1B4F57]">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-[#6C8085]">
                      REGISTRATION & CREDENTIAL
                    </span>
                    <span className="block truncate text-xs font-semibold text-[#163744]">
                      {BRAND.credential} ({BRAND.arn})
                    </span>
                  </div>
                </div>

                {/* 5. Location */}
                <div className="flex items-center gap-3 p-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEF2F3] text-[#1B4F57]">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-[#6C8085]">
                      LOCATION
                    </span>
                    <span className="block truncate text-xs font-semibold text-[#163744]">
                      {BRAND.location}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ========================================================
              7. FOOTER (Premium FinRev Teal Footer)
              FINREV SOLUTIONS
              Secure Today. Stronger Tomorrow.
              Panchanan Kumar · Mutual Fund Distributor
              Required disclaimer and copyright
              ======================================================== */}
          <footer
            id="finrev-footer"
            className="bg-[#1B4F57] px-6 py-6 text-center text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              {BRAND.name}
            </p>
            <p className="mt-0.5 text-[11px] italic text-[#EEF2F3]/90">
              "{BRAND.tagline}"
            </p>

            <div className="mt-2.5 text-[11px] text-white/90">
              <span className="font-semibold">{BRAND.person}</span>
              <span className="mx-1.5 opacity-60">•</span>
              <span>{BRAND.role}</span>
            </div>

            <div className="mt-3.5 border-t border-white/15 pt-3 max-w-xs mx-auto">
              <p className="text-[9px] leading-relaxed text-[#EEF2F3]/80">
                Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.
              </p>
              <p className="mt-2 text-[9px] text-[#EEF2F3]/60">
                © 2026 {BRAND.name}. All rights reserved.
              </p>
            </div>
          </footer>
        </main>
      </div>

      {/* ========================================================
          QR CODE MODAL (Bespoke 3D Presentation)
          ======================================================== */}
      {qrOpen && (
        <div
          id="qr-modal"
          role="dialog"
          aria-modal="true"
          aria-label="FinRev Digital Visiting Card QR Code"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close QR backdrop"
            onClick={() => setQrOpen(false)}
            className="animate-fade-in fixed inset-0 h-full w-full bg-black/75 backdrop-blur-sm"
          />

          <div className="animate-qr-in card-elevation-1 relative z-10 w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#C3CFD2] bg-[#FBFCFD] p-5 text-center text-[#162B3A]">
            <button
              type="button"
              id="qr-modal-close"
              onClick={() => setQrOpen(false)}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2F3] text-[#6C8085] hover:text-[#163744] transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto w-fit">
              <img
                src={logoUrl}
                alt="FinRev Solutions"
                className="h-6 w-auto object-contain"
              />
            </div>

            <h3 className="mt-3 text-sm font-bold text-[#163744]">
              Scan to View Digital Card
            </h3>
            <p className="text-[11px] text-[#6C8085]">
              Point your camera at this QR code
            </p>

            <div className="mx-auto mt-3.5 w-fit rounded-xl border border-[#C3CFD2] bg-white p-3 shadow-sm">
              <img
                src={BRAND.qrImage}
                alt="QR Code"
                width="180"
                height="180"
                className="h-40 w-40 object-contain"
              />
            </div>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                id="modal-copy-link"
                onClick={() => {
                  copyLink()
                  setQrOpen(false)
                }}
                className="btn-tactile-teal flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B4F57] py-2 text-xs font-bold text-white transition"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Card Link</span>
              </button>

              <button
                type="button"
                onClick={() => setQrOpen(false)}
                className="w-full rounded-lg border border-[#C3CFD2] bg-[#EEF2F3] py-1.5 text-xs font-medium text-[#163744] hover:bg-[#E2E8EB] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PHOTO UPLOAD MODAL
          ======================================================== */}
      {photoModalOpen && (
        <div
          id="photo-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Profile Photo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label="Close backdrop"
            onClick={() => setPhotoModalOpen(false)}
            className="animate-fade-in fixed inset-0 h-full w-full bg-black/75 backdrop-blur-sm"
          />

          <div className="animate-qr-in card-elevation-1 relative z-10 w-full max-w-[320px] overflow-hidden rounded-2xl border border-[#C3CFD2] bg-[#FBFCFD] p-5 text-center text-[#162B3A]">
            <button
              type="button"
              id="photo-modal-close"
              onClick={() => setPhotoModalOpen(false)}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF2F3] text-[#6C8085] hover:text-[#163744] transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2F3] text-[#1B4F57] shadow-sm">
              <Camera className="h-5 w-5" />
            </div>

            <h3 className="mt-2 text-sm font-bold text-[#163744]">
              Profile Photo
            </h3>
            <p className="text-[11px] text-[#6C8085]">
              Upload your executive portrait for your visiting card
            </p>

            <div className="my-4 flex justify-center">
              <div className="h-20 w-20 rounded-full p-[2px] bg-[#1B4F57] shadow-md overflow-hidden">
                <div className="h-full w-full rounded-full bg-[#EEF2F3] overflow-hidden flex items-center justify-center">
                  {customPhoto ? (
                    <img src={customPhoto} alt="Portrait" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-[#1B4F57]">PK</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                id="photo-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                className="btn-tactile-teal flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B4F57] py-2 text-xs font-bold text-white"
              >
                <UploadCloud className="h-3.5 w-3.5" />
                <span>Upload Photo</span>
              </button>

              {customPhoto && (
                <button
                  type="button"
                  id="photo-reset-btn"
                  onClick={removePhoto}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 py-1.5 text-xs text-rose-700 hover:bg-rose-100 transition"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Reset to Initials</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPhotoModalOpen(false)}
                className="w-full rounded-lg border border-[#C3CFD2] bg-[#EEF2F3] py-1.5 text-xs font-medium text-[#163744] hover:bg-[#E2E8EB] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TOAST FEEDBACK
          ======================================================== */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="animate-toast-in fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#163744] px-4 py-2 text-xs font-semibold text-white shadow-2xl"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#2B7A80]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
