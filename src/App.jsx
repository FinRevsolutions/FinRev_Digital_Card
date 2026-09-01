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
import pkPhotoUrl from './assets/pk-photo.jpg'

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

// Exactly the 8 requested services with rich interactive popup details
const SERVICES = [
  {
    id: 'mutual-funds-sip',
    icon: TrendingUp,
    title: 'Mutual Funds & SIP',
    shortDesc: 'Systematic goal planning & wealth creation',
    description: 'Systematic and goal-based investment solutions designed for long-term wealth creation.',
    offers: [
      'SIP & Lump Sum Investment',
      'Goal-Based Investment Planning',
      'Diversified Mutual Fund Portfolio',
      'Long-Term Wealth Creation',
    ],
    suitableFor: 'Long-term investors • Goal-based investors',
    ctaText: 'Talk to Panchanan',
    waMessage: 'Hello Panchanan, I would like to know more about Mutual Funds & SIP solutions.',
    disclaimer: 'Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.',
  },
  {
    id: 'insurance',
    icon: ShieldCheck,
    title: 'Insurance',
    shortDesc: 'Comprehensive risk & financial protection',
    description: 'Financial protection solutions designed to protect you, your family and your financial goals.',
    offers: [
      'Life Insurance',
      'Health Insurance',
      'Term Insurance',
      'Personal Accident Cover',
    ],
    suitableFor: 'Individuals • Families • Working Professionals',
    ctaText: 'Get Insurance Guidance',
    waMessage: 'Hello Panchanan, I would like to discuss Insurance solutions.',
  },
  {
    id: 'bonds',
    icon: Link2,
    title: 'Bonds',
    shortDesc: 'Stable fixed income & capital preservation',
    description: 'Fixed-income investment opportunities focused on income generation and capital preservation.',
    offers: [
      'Corporate Bonds',
      'Government / PSU Bonds',
      'Fixed Income Options',
      'Maturity-Based Planning',
    ],
    suitableFor: 'Conservative investors • Income-focused investors',
    ctaText: 'Explore Bonds',
    waMessage: 'Hello Panchanan, I would like to know more about Bond investment opportunities.',
    disclaimer: 'Bonds and fixed income instruments are subject to issuer credit terms and market conditions.',
  },
  {
    id: 'pms',
    icon: PieChart,
    title: 'Portfolio Management Services (PMS)',
    cardTitle: 'PMS',
    shortDesc: 'Bespoke Portfolio Management for HNIs',
    description: 'Professionally managed and customized investment portfolios for eligible high-net-worth investors.',
    offers: [
      'Customized Portfolio Strategies',
      'Professional Portfolio Management',
      'Direct Equity Strategies',
      'Regular Portfolio Monitoring',
    ],
    suitableFor: 'HNIs • Experienced Investors',
    ctaText: 'Discuss PMS',
    waMessage: 'Hello Panchanan, I would like to discuss PMS.',
    disclaimer: 'PMS offerings are subject to SEBI regulatory guidelines and market risks.',
  },
  {
    id: 'aif',
    icon: Briefcase,
    title: 'Alternative Investment Funds (AIF)',
    cardTitle: 'AIF',
    shortDesc: 'Alternative Investment Funds for alpha',
    description: 'Alternative investment opportunities designed for eligible and sophisticated investors seeking portfolio diversification.',
    offers: [
      'Alternative Investment Strategies',
      'Private Market Opportunities',
      'Specialized Investment Structures',
      'Portfolio Diversification',
    ],
    suitableFor: 'Eligible / sophisticated investors',
    ctaText: 'Know More About AIF',
    waMessage: 'Hello Panchanan, I would like to know more about AIF opportunities.',
    disclaimer: 'AIF products are intended for eligible accredited investors and subject to statutory guidelines.',
  },
  {
    id: 'unlisted-equity',
    icon: Building2,
    title: 'Unlisted Equity',
    shortDesc: 'Pre-IPO & high-growth private opportunities',
    description: 'Opportunities to participate in selected private companies before they become publicly listed.',
    offers: [
      'Pre-IPO Opportunities',
      'Unlisted Company Shares',
      'Private Market Opportunities',
      'Long-Term Growth Opportunities',
    ],
    suitableFor: 'Sophisticated / long-term investors',
    ctaText: 'Explore Opportunities',
    waMessage: 'Hello Panchanan, I would like to know more about Unlisted Equity opportunities.',
    disclaimer: 'Unlisted equity investments carry liquidity and company specific risks. No guaranteed returns.',
  },
  {
    id: 'fixed-deposits',
    icon: Landmark,
    title: 'Fixed Deposits',
    shortDesc: 'Corporate & bank FDs with assured safety',
    description: 'Deposit solutions designed for investors seeking capital stability and predictable interest income.',
    offers: [
      'Corporate Fixed Deposits',
      'Bank Fixed Deposits',
      'Multiple Tenure Options',
      'Fixed Interest Options',
    ],
    suitableFor: 'Conservative investors • Capital preservation focused investors',
    ctaText: 'Explore Fixed Deposits',
    waMessage: 'Hello Panchanan, I would like to know more about Fixed Deposits.',
  },
  {
    id: 'newspaper-ads',
    icon: Newspaper,
    title: 'Book Newspapers Ads',
    shortDesc: 'Statutory notices & public publications',
    description: 'Professional newspaper advertising solutions for businesses, organizations and individuals.',
    offers: [
      'Classified Advertisements',
      'Display Advertisements',
      'Public Notices',
      'Tender / Recruitment Ads',
      'Obituary / Announcement Ads',
    ],
    suitableFor: 'Businesses • Organizations • Individuals',
    ctaText: 'Book an Advertisement',
    waMessage: 'Hello Panchanan, I would like to know more about Newspaper Advertisement booking.',
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
    <div className="relative my-3.5 flex items-center justify-center">
      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#D9E2EC] to-transparent" />
      <div className="flex items-center gap-2 px-3.5">
        <span className="h-2 w-2 rotate-45 bg-[#F2B705] shadow-[0_0_5px_rgba(242,183,5,0.6)]" />
        <h2 className="text-[17px] sm:text-[18.5px] font-black uppercase tracking-[0.16em] text-[#102A43]">
          {title}
        </h2>
        <span className="h-2 w-2 rotate-45 bg-[#F2B705] shadow-[0_0_5px_rgba(242,183,5,0.6)]" />
      </div>
      <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#D9E2EC] to-transparent" />
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
  const [selectedService, setSelectedService] = useState(null)
  const [customPhoto, setCustomPhoto] = useState(null)
  const [toast, setToast] = useState('')

  const toastTimer = useRef(null)
  const fileInputRef = useRef(null)
  const lastFocusedServiceCardRef = useRef(null)

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
    if (!qrOpen && !photoModalOpen && !selectedService) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        if (selectedService) {
          setSelectedService(null)
          setTimeout(() => lastFocusedServiceCardRef.current?.focus(), 50)
        }
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
  }, [qrOpen, photoModalOpen, selectedService])

  const handleOpenService = (service) => {
    lastFocusedServiceCardRef.current = document.getElementById(`service-card-${service.id}`)
    setSelectedService(service)
  }

  const closeServiceModal = () => {
    setSelectedService(null)
    setTimeout(() => {
      lastFocusedServiceCardRef.current?.focus()
    }, 50)
  }

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
    <div className="min-h-screen bg-[#0B1B2B] font-sans text-[#102A43] antialiased selection:bg-[#F2B705]/30 selection:text-[#102A43]">
      {/* Background Subtle Gradient & Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#163A5F]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#1B5B63]/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-[#F2B705]/5 rounded-full blur-[120px]" />
      </div>

      {/* 9:16 Mobile-First Executive Card Container (Level 1 Surface) */}
      <div className="relative min-h-screen flex items-center justify-center p-0 sm:py-8 md:py-10">
        <main
          id="digital-card-container"
          className={`card-elevation-1 relative w-full max-w-[440px] bg-[#FFFFFF] transition-opacity duration-300 sm:rounded-[32px] sm:border sm:border-[#D9E2EC] overflow-hidden ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* ========================================================
              1. NEW PREMIUM CORPORATE HERO HEADER & OVERLAPPING PROFILE
              Deep Navy (#102A43) + Gold Accent (#F2B705) + White
              Hierarchy:
              - Top Gold Accent Bar
              - Deep Navy Hero with subtle geometric lines
              - Official FinRev Solutions Logo on White Surface
              - FINREV SOLUTIONS / Secure Today. Stronger Tomorrow.
              - Overlapping Executive Profile Photo (50% in Navy, 50% in White)
              - Panchanan Kumar • Mutual Fund Distributor
              - AMFI Registered • ARN-195797 (Gold accent pill)
              - Dhanbad, Jharkhand, India
              ======================================================== */}
          <header className="text-center bg-[#FFFFFF] pb-4">
            {/* Top Gold Brand Accent Line */}
            <div className="h-2 w-full bg-gradient-to-r from-[#D49E00] via-[#F2B705] to-[#D49E00] shadow-[0_1px_6px_rgba(242,183,5,0.45)]" />

            {/* Full-width Deep Navy Hero Section (More spacious & prominent) */}
            <div className="w-full bg-gradient-to-b from-[#102A43] via-[#122E4A] to-[#163A5F] pt-8 sm:pt-9 pb-20 sm:pb-22 px-4 sm:px-6 text-white relative shadow-[0_8px_24px_rgba(16,42,67,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden">
              {/* Subtle Geometric Background Watermark & Gold Lines */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full border border-[#F2B705]/10 pointer-events-none" />
              <div className="absolute top-0 right-1/4 w-44 h-[2px] bg-gradient-to-r from-transparent via-[#F2B705]/40 to-transparent pointer-events-none" />

              {/* Corporate Brand Lockup (Prominent Logo on Left + Bold Brand Name on Right) */}
              <div className="flex items-center justify-center gap-3.5 sm:gap-4.5 text-left relative z-10">
                {/* Official FinRev Logo on the LEFT (Crisp White Badge with Gold Highlight) */}
                <div className="flex-shrink-0 rounded-2xl bg-white p-2.5 sm:p-3 shadow-[0_6px_16px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,1)] border border-white/90 flex items-center justify-center">
                  <img
                    src={logoUrl}
                    alt="FinRev Solutions Logo"
                    width="160"
                    height="56"
                    className="h-10 sm:h-12 w-auto max-w-[110px] object-contain"
                  />
                </div>

                {/* Vertical Divider with Gold Node */}
                <div className="h-12 w-[2px] bg-gradient-to-b from-transparent via-[#F2B705] to-transparent flex-shrink-0 relative">
                  <span className="absolute top-1/2 -translate-y-1/2 -left-[3px] h-2 w-2 rounded-full bg-[#F2B705] shadow-[0_0_6px_rgba(242,183,5,0.9)]" />
                </div>

                {/* Brand Name & Slogan on the RIGHT */}
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-[19px] sm:text-[22px] font-black uppercase tracking-[0.14em] text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    FINREV SOLUTIONS
                  </span>
                  <span className="mt-1 text-[13px] sm:text-[14.5px] font-bold tracking-wide text-[#F2B705] leading-tight">
                    Secure Today. Stronger Tomorrow.
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Photo OVERLAPPING the boundary (50% in Navy Hero, 50% in White Content - 132px-145px) */}
            <div className="relative -mt-16 sm:-mt-18 flex justify-center z-20">
              <div className="relative group">
                {/* Subtle soft backdrop glow & gold aura */}
                <div className="absolute inset-0 rounded-full bg-[#F2B705]/25 blur-xl transform scale-110" />

                {/* 132px-145px Circular Portrait with Triple Ring: White frame + Gold/Teal accent + Deep Navy */}
                <div className="relative h-[132px] w-[132px] sm:h-[145px] sm:w-[145px] rounded-full border-[4.5px] border-[#FFFFFF] p-[3px] bg-gradient-to-tr from-[#102A43] via-[#F2B705] to-[#1B5B63] shadow-[0_16px_36px_-6px_rgba(16,42,67,0.5),0_6px_18px_rgba(0,0,0,0.2)]">
                  <div className="h-full w-full rounded-full overflow-hidden bg-[#F0F4F8] flex items-center justify-center">
                    <img
                      src={customPhoto || pkPhotoUrl}
                      alt="Panchanan Kumar - Mutual Fund Distributor"
                      className="h-full w-full object-cover object-center"
                      onError={(e) => {
                        // Safe fallback to public root path
                        if (!e.currentTarget.src.includes('pk-photo.jpg')) {
                          e.currentTarget.src = './pk-photo.jpg'
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Tactile Photo upload trigger with Navy + Gold accent */}
                <button
                  type="button"
                  id="profile-photo-trigger"
                  onClick={() => setPhotoModalOpen(true)}
                  aria-label="Update profile photo"
                  title="Upload profile photo"
                  className="btn-tactile-primary absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#102A43] text-[#F2B705] border-2 border-[#FFFFFF] shadow-md transition hover:bg-[#163A5F] active:scale-95"
                >
                  <Camera className="h-4.5 w-4.5" strokeWidth={2.2} />
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

            {/* Profile Typography Hierarchy (Prominent & High Contrast) */}
            <div className="mt-4 px-4 sm:px-6">
              <h1 className="text-[30px] sm:text-[34px] font-black tracking-tight text-[#102A43] leading-tight">
                {BRAND.person}
              </h1>
              <p className="mt-1 text-[17px] sm:text-[19px] font-extrabold tracking-wide text-[#1B5B63]">
                {BRAND.role}
              </p>

              {/* AMFI Registered Mutual Fund Distributor with Gold Accent Pill */}
              <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-[#D9E2EC] bg-[#F5F7F8] px-4 py-2 text-[14px] sm:text-[15px] font-bold text-[#102A43] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_3px_rgba(16,42,67,0.05)] flex-wrap justify-center">
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#F2B705]/30 text-[#B78103]">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <span>{BRAND.credential}</span>
                <span className="text-[#829AB1]">•</span>
                <span className="font-mono font-black text-[#1B5B63]">{BRAND.arn}</span>
              </div>

              {/* Location */}
              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[14.5px] sm:text-[15.5px] font-semibold text-[#526777]">
                <MapPin className="h-4.5 w-4.5 text-[#1B5B63]" />
                <span>{BRAND.location}</span>
              </div>
            </div>
          </header>

          {/* ========================================================
              CARD CONTENT BODY
              ======================================================== */}
          <div className="px-4 sm:px-6 pb-6 space-y-4">
            {/* ========================================================
                2. ACTION BUTTONS
                Primary CTA: SAVE CONTACT (Deep Navy + Gold Accent)
                Contact Actions: Call, WhatsApp, Email (Tactile White Cards)
                Secondary: Visit Website, Facebook Page
                ======================================================== */}
            <section id="action-system" aria-label="Contact actions" className="space-y-2.5">
              {/* SAVE CONTACT (Primary Tactile CTA in Deep Navy #102A43 + Gold #F2B705 Accent) */}
              <button
                type="button"
                id="save-contact-cta"
                onClick={downloadContact}
                className="btn-tactile-primary group relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#102A43] via-[#163A5F] to-[#102A43] py-4 px-5 text-white border border-[#163A5F] focus:outline-none overflow-hidden shadow-md"
              >
                {/* Subtle gold shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B705] to-transparent opacity-90" />

                <Download className="h-5.5 w-5.5 text-[#F2B705]" strokeWidth={2.4} />
                <span className="text-[17px] sm:text-[18px] font-black uppercase tracking-wider text-white">
                  SAVE CONTACT
                </span>
                <span className="rounded bg-[#F2B705]/20 border border-[#F2B705]/40 px-2.5 py-0.5 text-[11.5px] font-extrabold text-[#F2B705]">
                  vCard
                </span>
              </button>

              {/* Contact Actions Row: Call, WhatsApp, Email */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* Call */}
                <a
                  id="action-call"
                  href={`tel:${BRAND.phoneRaw}`}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] py-3.5 px-2 text-center"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1B5B63] transition-colors group-hover:bg-[#102A43] group-hover:text-[#F2B705] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <Phone className="h-5.5 w-5.5" strokeWidth={2.2} />
                  </div>
                  <span className="mt-2 text-[15.5px] sm:text-[16.5px] font-bold text-[#102A43]">
                    Call
                  </span>
                  <span className="text-[12.5px] sm:text-[13px] text-[#526777] font-medium truncate max-w-full">
                    Direct
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  id="action-whatsapp"
                  href={waChatHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] py-3.5 px-2 text-center"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1B5B63] transition-colors group-hover:bg-[#102A43] group-hover:text-[#F2B705] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <WhatsAppIcon className="h-5.5 w-5.5" />
                  </div>
                  <span className="mt-2 text-[15.5px] sm:text-[16.5px] font-bold text-[#102A43]">
                    WhatsApp
                  </span>
                  <span className="text-[12.5px] sm:text-[13px] text-[#526777] font-medium truncate max-w-full">
                    Chat
                  </span>
                </a>

                {/* Email */}
                <a
                  id="action-email"
                  href={mailtoHref}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] py-3.5 px-2 text-center"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1B5B63] transition-colors group-hover:bg-[#102A43] group-hover:text-[#F2B705] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <Mail className="h-5.5 w-5.5" strokeWidth={2.2} />
                  </div>
                  <span className="mt-2 text-[15.5px] sm:text-[16.5px] font-bold text-[#102A43]">
                    Email
                  </span>
                  <span className="text-[12.5px] sm:text-[13px] text-[#526777] font-medium truncate max-w-full">
                    Inquiry
                  </span>
                </a>
              </div>

              {/* Secondary: Website & Facebook */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  id="action-website"
                  href={BRAND.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-secondary group flex items-center justify-center gap-2 rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] py-3 px-3.5 text-center"
                >
                  <Globe className="h-4.5 w-4.5 text-[#1B5B63] group-hover:text-[#102A43]" />
                  <span className="text-[14px] sm:text-[15px] font-bold text-[#102A43]">
                    Visit Website
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#829AB1] group-hover:text-[#F2B705]" />
                </a>

                <a
                  id="action-facebook"
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-secondary group flex items-center justify-center gap-2 rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] py-3 px-3.5 text-center"
                >
                  <Facebook className="h-4.5 w-4.5 text-[#1B5B63] group-hover:text-[#102A43]" />
                  <span className="text-[14px] sm:text-[15px] font-bold text-[#102A43]">
                    Facebook Page
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#829AB1] group-hover:text-[#F2B705]" />
                </a>
              </div>
            </section>

            {/* ========================================================
                3. OUR SERVICES (Editorial Header + 2-Column Tactile Cards)
                ONLY THE 8 SERVICES (Interactive Detail Popups)
                ======================================================== */}
            <section id="services-section" aria-label="Our services" className="pt-2">
              <SectionDivider title="Our Services" />

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {SERVICES.map((service, idx) => {
                  const Icon = service.icon
                  return (
                    <button
                      key={service.id || service.title}
                      id={`service-card-${service.id || idx + 1}`}
                      type="button"
                      onClick={() => handleOpenService(service)}
                      aria-label={`Explore ${service.title} details and offerings`}
                      className="card-elevation-interactive group flex flex-col justify-between rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] p-3.5 sm:p-4 relative overflow-hidden text-left cursor-pointer transition-all duration-200 hover:border-[#1B5B63]/40 focus:outline-none focus:ring-2 focus:ring-[#102A43]/20 min-h-[124px]"
                    >
                      {/* Subtle hover gold accent indicator */}
                      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#F2B705] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex h-9.5 w-9.5 items-center justify-center rounded-lg bg-[#F0F4F8] text-[#1B5B63] transition-colors group-hover:bg-[#102A43] group-hover:text-[#F2B705] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                            <Icon className="h-5 w-5" strokeWidth={2.2} />
                          </div>
                          <div className="flex items-center text-[#829AB1] group-hover:text-[#1B5B63] transition-colors">
                            <ChevronRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </div>
                        </div>
                        <h3 className="mt-3 text-[16px] sm:text-[17px] font-bold leading-snug text-[#102A43] group-hover:text-[#1B5B63] transition-colors">
                          {service.cardTitle || service.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] sm:text-[14px] leading-relaxed text-[#526777] line-clamp-2">
                          {service.shortDesc || service.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* ========================================================
                4. SEND MY CARD (Compact, Premium WhatsApp Dispatch)
                ======================================================== */}
            <section id="send-card-section" aria-label="Send my card" className="pt-2">
              <SectionDivider title="Send My Card" />

              <div className="card-elevation-panel mt-3 rounded-2xl border border-[#D9E2EC] bg-[#F5F7F8] p-4 sm:p-4.5 relative overflow-hidden">
                <form onSubmit={sendOnWhatsApp} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="recipient-mobile" className="block text-[13.5px] sm:text-[14.5px] font-bold text-[#102A43]">
                      Forward Card via WhatsApp
                    </label>
                    <span className="text-[11.5px] sm:text-[12px] font-semibold text-[#526777]">
                      Direct Dispatch
                    </span>
                  </div>

                  <div className="input-tactile flex items-stretch overflow-hidden rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] transition focus-within:border-[#102A43] focus-within:ring-2 focus-within:ring-[#102A43]/20 shadow-xs">
                    <span className="flex select-none items-center border-r border-[#D9E2EC] bg-[#F0F4F8] px-3.5 text-[15px] font-bold text-[#102A43]">
                      +91
                    </span>
                    <input
                      id="recipient-mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="Enter 10-digit mobile number"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={10}
                      className="w-full bg-transparent px-3.5 py-3 text-[15px] sm:text-[16px] font-medium text-[#102A43] outline-none placeholder:text-[#829AB1]"
                    />
                    {phone && (
                      <button
                        type="button"
                        onClick={() => setPhone('')}
                        className="px-3 text-[#829AB1] hover:text-[#102A43]"
                        aria-label="Clear number"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {phoneError && (
                    <p role="alert" className="text-[12.5px] font-semibold text-rose-600">
                      {phoneError}
                    </p>
                  )}

                  <button
                    type="submit"
                    id="send-whatsapp-submit"
                    className="btn-tactile-primary flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#102A43] via-[#163A5F] to-[#102A43] hover:from-[#163A5F] hover:to-[#102A43] py-3.5 px-4 text-[15.5px] sm:text-[16.5px] font-black uppercase tracking-wider text-white border border-[#163A5F] shadow-sm active:scale-[0.99] transition-all"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                    <span>SEND CARD ON WHATSAPP</span>
                    <ArrowUpRight className="h-4.5 w-4.5 text-[#F2B705]" />
                  </button>
                </form>
              </div>
            </section>

            {/* ========================================================
                5. SHARE MY CARD (Tactile Quick Share Options)
                WhatsApp · Copy Link · QR Code · More Options
                ======================================================== */}
            <section id="share-card-section" aria-label="Share my card" className="pt-2">
              <SectionDivider title="Share My Card" />

              <div className="mt-3 grid grid-cols-4 gap-2.5">
                {/* 1. WhatsApp */}
                <button
                  type="button"
                  id="share-tile-whatsapp"
                  onClick={shareWhatsApp}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] p-3 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1B5B63] transition-colors group-hover:bg-[#102A43] group-hover:text-[#F2B705] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <WhatsAppIcon className="h-5 w-5" />
                  </div>
                  <span className="mt-2 text-[12.5px] sm:text-[13px] font-bold text-[#102A43]">
                    WhatsApp
                  </span>
                </button>

                {/* 2. Copy Link */}
                <button
                  type="button"
                  id="share-tile-copy"
                  onClick={copyLink}
                  aria-live={copied ? 'polite' : undefined}
                  className={`card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border p-3 text-center ${
                    copied
                      ? 'border-[#1B5B63] bg-[#F0F4F8] text-[#1B5B63]'
                      : 'border-[#D9E2EC] bg-[#FFFFFF]'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      copied
                        ? 'bg-[#1B5B63] text-white'
                        : 'bg-[#F0F4F8] text-[#1B5B63] group-hover:bg-[#102A43] group-hover:text-[#F2B705] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]'
                    }`}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-5 w-5 stroke-[2.4]" />
                    ) : (
                      <Copy className="h-5 w-5" strokeWidth={2.2} />
                    )}
                  </div>
                  <span className="mt-2 text-[12.5px] sm:text-[13px] font-bold text-[#102A43]">
                    {copied ? 'Copied' : 'Copy Link'}
                  </span>
                </button>

                {/* 3. QR Code */}
                <button
                  type="button"
                  id="share-tile-qr"
                  onClick={() => setQrOpen(true)}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] p-3 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1B5B63] transition-colors group-hover:bg-[#102A43] group-hover:text-[#F2B705] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <QrCode className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <span className="mt-2 text-[12.5px] sm:text-[13px] font-bold text-[#102A43]">
                    QR Code
                  </span>
                </button>

                {/* 4. More Options */}
                <button
                  type="button"
                  id="share-tile-more"
                  onClick={shareNative}
                  className="card-elevation-interactive group flex flex-col items-center justify-center rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] p-3 text-center"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F4F8] text-[#1B5B63] transition-colors group-hover:bg-[#102A43] group-hover:text-[#F2B705] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04)]">
                    <Share2 className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <span className="mt-2 text-[12.5px] sm:text-[13px] font-bold text-[#102A43]">
                    More
                  </span>
                </button>
              </div>
            </section>

            {/* ========================================================
                6. BUSINESS INFORMATION (Clean Editorial Panel)
                Phone, Email, Website, Registration & Credential, Location
                ======================================================== */}
            <section id="business-info-section" aria-label="Business information" className="pt-2">
              <SectionDivider title="Business Details" />

              <div className="card-elevation-panel mt-3 rounded-xl border border-[#D9E2EC] bg-[#FFFFFF] divide-y divide-[#D9E2EC]/70 overflow-hidden">
                {/* 1. Phone & WhatsApp */}
                <a
                  href={`tel:${BRAND.phoneRaw}`}
                  className="group flex items-center justify-between p-3.5 transition hover:bg-[#F5F7F8]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F4F8] text-[#1B5B63] group-hover:bg-[#102A43] group-hover:text-[#F2B705] transition-colors flex-shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#526777]">
                        PHONE & WHATSAPP
                      </span>
                      <span className="block text-[15px] sm:text-[16px] font-bold text-[#102A43] group-hover:text-[#1B5B63]">
                        {BRAND.phone}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#829AB1] group-hover:text-[#102A43] flex-shrink-0" />
                </a>

                {/* 2. Email */}
                <a
                  href={mailtoHref}
                  className="group flex items-center justify-between p-3.5 transition hover:bg-[#F5F7F8]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F4F8] text-[#1B5B63] group-hover:bg-[#102A43] group-hover:text-[#F2B705] transition-colors flex-shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#526777]">
                        EMAIL
                      </span>
                      <span className="block break-all text-[15px] sm:text-[16px] font-bold text-[#102A43] group-hover:text-[#1B5B63]">
                        {BRAND.email}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#829AB1] group-hover:text-[#102A43] flex-shrink-0" />
                </a>

                {/* 3. Website */}
                <a
                  href={BRAND.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 transition hover:bg-[#F5F7F8]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F4F8] text-[#1B5B63] group-hover:bg-[#102A43] group-hover:text-[#F2B705] transition-colors flex-shrink-0">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#526777]">
                        WEBSITE
                      </span>
                      <span className="block text-[15px] sm:text-[16px] font-bold text-[#102A43] group-hover:text-[#1B5B63]">
                        {BRAND.websiteDisplay}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#829AB1] group-hover:text-[#102A43] flex-shrink-0" />
                </a>

                {/* 4. ARN & AMFI Registration (Multi-line layout, zero clipping) */}
                <div className="flex items-start gap-3.5 p-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F4F8] text-[#1B5B63] flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#526777]">
                      REGISTRATION & CREDENTIAL
                    </span>
                    <div className="mt-0.5 space-y-0.5">
                      <span className="block text-[14.5px] sm:text-[15.5px] font-bold text-[#102A43] leading-snug">
                        {BRAND.credential}
                      </span>
                      <span className="inline-block rounded bg-[#F0F4F8] border border-[#D9E2EC] px-2 py-0.5 text-[12.5px] sm:text-[13px] font-black font-mono text-[#1B5B63]">
                        {BRAND.arn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. Location */}
                <div className="flex items-center gap-3.5 p-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0F4F8] text-[#1B5B63] flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#526777]">
                      LOCATION
                    </span>
                    <span className="block text-[14.5px] sm:text-[15.5px] font-bold text-[#102A43]">
                      {BRAND.location}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ========================================================
              7. FOOTER (Ultra-Premium Corporate FinTech Brand Signature)
              Brand Header with Real Logo & Slogan
              Phone, Email, Website & Social Connect
              Credential & Regulatory Disclaimer
              ======================================================== */}
          <footer
            id="finrev-footer"
            className="bg-gradient-to-b from-[#102A43] via-[#0E243A] to-[#0B1F33] px-4 py-5 sm:py-6 text-center text-white relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] border-t border-[#1B5B63]/40"
          >
            {/* Top Gold Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2B705] to-transparent opacity-85" />

            {/* Subtle Ambient Teal Glow */}
            <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-60 rounded-full bg-[#1B5B63]/15 blur-2xl" />

            <div className="relative z-10 max-w-md mx-auto space-y-3.5">
              {/* 1. Brand Header Lockup */}
              <div className="flex flex-col items-center">
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-[0_3px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] border border-[#F2B705]/40">
                  <img
                    src={logoUrl}
                    alt="FinRev Solutions Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="text-[15px] sm:text-[16px] font-black uppercase tracking-[0.22em] text-white">
                  {BRAND.name}
                </h3>
                <p className="mt-0.5 text-[12.5px] sm:text-[13px] font-bold tracking-wide text-[#F2B705]">
                  {BRAND.tagline}
                </p>

                {/* Subtle Premium Gold Accent Line with Dot */}
                <div className="my-2.5 flex items-center justify-center gap-2">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#1B5B63]" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#F2B705] shadow-[0_0_4px_rgba(242,183,5,0.7)]" />
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#1B5B63]" />
                </div>
              </div>

              {/* 2. Direct Contact Chips: 9835592142 • info@finrevsolutions.com • finrevsolutions.com */}
              <div className="space-y-1.5 text-xs">
                <div className="flex flex-wrap items-center justify-center gap-2 text-[13px] sm:text-[14px] font-bold text-white/95">
                  <a
                    href={`tel:${BRAND.phoneRaw}`}
                    className="hover:text-[#F2B705] transition-colors"
                  >
                    9835592142
                  </a>
                  <span className="text-[#F2B705]">•</span>
                  <a
                    href={mailtoHref}
                    className="hover:text-[#F2B705] transition-colors break-all"
                  >
                    info@finrevsolutions.com
                  </a>
                </div>
                <div>
                  <a
                    href={BRAND.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] sm:text-[13.5px] font-semibold text-[#AFC3CE] hover:text-[#F2B705] transition-colors"
                  >
                    finrevsolutions.com
                  </a>
                </div>
              </div>

              {/* 3. Connect: WhatsApp & Facebook */}
              <div className="flex items-center justify-center gap-2.5 pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#AFC3CE]/80 mr-0.5">
                  CONNECT
                </span>
                <a
                  href={waChatHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on WhatsApp"
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#0B1F33] text-white border border-[#1B5B63]/60 shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-200 hover:border-[#F2B705] hover:-translate-y-0.5 hover:bg-[#102A43] hover:text-[#25D366] active:scale-95"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
                <a
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on Facebook"
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#0B1F33] text-white border border-[#1B5B63]/60 shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-200 hover:border-[#F2B705] hover:-translate-y-0.5 hover:bg-[#102A43] hover:text-[#1877F2] active:scale-95"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>

              {/* 4. Professional Credential Lockup */}
              <div className="pt-3 border-t border-white/[0.12] space-y-1.5">
                <div className="text-[14px] sm:text-[15px] text-white font-bold tracking-tight">
                  <span>{BRAND.person}</span>
                  <span className="mx-2 text-[#F2B705]">•</span>
                  <span className="text-[#D9E2EC] font-semibold">{BRAND.role}</span>
                </div>
                <div className="text-[12.5px] sm:text-[13px] text-[#AFC3CE] font-semibold flex items-center justify-center gap-2 flex-wrap">
                  <span>AMFI Registered Mutual Fund Distributor</span>
                  <span className="text-[#F2B705]">•</span>
                  <span className="rounded bg-[#1B5B63]/40 px-2.5 py-0.5 text-[11px] font-black text-[#F2B705] border border-[#F2B705]/40 tracking-wider font-mono">
                    {BRAND.arn}
                  </span>
                </div>
              </div>

              {/* 5. Regulatory Disclaimer */}
              <div className="max-w-[96%] mx-auto pt-1">
                <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-[#AFC3CE]/90 font-normal">
                  Mutual Fund investments are subject to market risks.
                  <br className="hidden sm:inline" /> Please read all scheme related documents carefully before investing.
                </p>
              </div>

              {/* 6. Copyright */}
              <div className="border-t border-white/[0.1] pt-2.5">
                <p className="text-[11.5px] sm:text-[12px] font-medium text-[#AFC3CE]/70 tracking-wider">
                  © 2026 {BRAND.name}. All Rights Reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* ========================================================
          PREMIUM SERVICE DETAIL POPUP (Compact Mobile Bottom Sheet / Modal)
          ======================================================== */}
      {selectedService && (
        <div
          id="service-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          {/* Subtle dark transparent overlay */}
          <button
            type="button"
            aria-label="Close service details overlay"
            onClick={closeServiceModal}
            className="animate-fade-in fixed inset-0 h-full w-full bg-black/80 backdrop-blur-sm cursor-default"
          />

          {/* Modal Container */}
          <div className="animate-sheet-up card-elevation-1 relative z-10 w-full max-w-[440px] max-h-[88vh] flex flex-col overflow-hidden rounded-t-[24px] sm:rounded-[24px] border border-[#D9E2EC] bg-[#FFFFFF] text-left text-[#102A43] shadow-[0_24px_60px_rgba(16,42,67,0.4)]">
            {/* Subtle Gold Accent Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#D49E00] via-[#F2B705] to-[#D49E00] flex-shrink-0" />

            {/* Header: [Service Icon] SERVICE NAME [X] */}
            <div className="flex items-start justify-between gap-3.5 px-5 py-4 border-b border-[#D9E2EC]/80 bg-gradient-to-b from-[#F5F7F8] to-[#FFFFFF] flex-shrink-0">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#102A43] to-[#163A5F] text-[#F2B705] shadow-[0_3px_8px_rgba(16,42,67,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]">
                  {(() => {
                    const ModalIcon = selectedService.icon
                    return <ModalIcon className="h-6.5 w-6.5" strokeWidth={2.2} />
                  })()}
                </div>
                <div className="min-w-0">
                  <span className="block text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#1B5B63]">
                    FINREV SERVICES
                  </span>
                  <h3
                    id="service-modal-title"
                    className="text-[20px] sm:text-[22px] font-black tracking-tight text-[#102A43] leading-tight truncate"
                  >
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                id="service-modal-close"
                onClick={closeServiceModal}
                aria-label="Close service details"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F0F4F8] text-[#526777] hover:bg-[#102A43] hover:text-[#F2B705] transition-colors shadow-sm"
              >
                <X className="h-5 w-5" strokeWidth={2.4} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto px-5 py-4 space-y-4">
              {/* Short Professional Description */}
              <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#334E68] font-medium">
                {selectedService.description}
              </p>

              {/* WHAT WE OFFER */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="h-2.5 w-2.5 rotate-45 bg-[#F2B705]" />
                  <h4 className="text-[13px] sm:text-[14px] font-black uppercase tracking-[0.18em] text-[#102A43]">
                    WHAT WE OFFER
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {selectedService.offers.map((offer, oIdx) => (
                    <li
                      key={oIdx}
                      className="flex items-start gap-3 rounded-xl border border-[#D9E2EC]/80 bg-[#F5F7F8] p-3.5 text-[15px] sm:text-[16px] font-semibold text-[#102A43]"
                    >
                      <span className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1B5B63] text-white shadow-xs">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                      <span>{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SUITABLE FOR */}
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F5F7F8] p-4">
                <span className="block text-[12px] font-extrabold uppercase tracking-wider text-[#1B5B63]">
                  SUITABLE FOR
                </span>
                <p className="mt-1 text-[15px] sm:text-[16px] font-bold text-[#102A43]">
                  {selectedService.suitableFor}
                </p>
              </div>

              {/* Compliance & Risk Disclaimer */}
              {selectedService.disclaimer && (
                <p className="text-[12px] sm:text-[12.5px] italic leading-relaxed text-[#829AB1] pt-1">
                  * {selectedService.disclaimer}
                </p>
              )}
            </div>

            {/* Footer CTA: Direct to WhatsApp with pre-filled message */}
            <div className="p-4 border-t border-[#D9E2EC] bg-[#FFFFFF] flex-shrink-0">
              <a
                id="service-cta-btn"
                href={`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(selectedService.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-primary group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#102A43] via-[#163A5F] to-[#102A43] py-4 px-5 text-[16px] sm:text-[17px] font-black uppercase tracking-wider text-white border border-[#163A5F] shadow-md hover:shadow-lg transition-all"
              >
                <WhatsAppIcon className="h-5.5 w-5.5 text-[#25D366]" />
                <span>{selectedService.ctaText}</span>
                <ArrowUpRight className="h-4.5 w-4.5 text-[#F2B705] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          QR CODE MODAL (Deep Navy + Gold + White Presentation)
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
            className="animate-fade-in fixed inset-0 h-full w-full bg-black/80 backdrop-blur-sm"
          />

          <div className="animate-qr-in card-elevation-1 relative z-10 w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#D9E2EC] bg-[#FFFFFF] p-5 sm:p-6 text-center text-[#102A43]">
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D49E00] via-[#F2B705] to-[#D49E00]" />

            <button
              type="button"
              id="qr-modal-close"
              onClick={() => setQrOpen(false)}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F4F8] text-[#526777] hover:text-[#102A43] transition"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="mx-auto w-fit">
              <img
                src={logoUrl}
                alt="FinRev Solutions"
                className="h-7 w-auto object-contain"
              />
            </div>

            <h3 className="mt-3 text-[16px] sm:text-[17px] font-extrabold text-[#102A43]">
              Scan to View Digital Card
            </h3>
            <p className="text-[12px] sm:text-[13px] text-[#526777]">
              Point your camera at this QR code
            </p>

            <div className="mx-auto mt-4 w-fit rounded-xl border border-[#D9E2EC] bg-white p-3.5 shadow-sm">
              <img
                src={BRAND.qrImage}
                alt="QR Code"
                width="180"
                height="180"
                className="h-44 w-44 object-contain"
              />
            </div>

            <div className="mt-4 space-y-2.5">
              <button
                type="button"
                id="modal-copy-link"
                onClick={() => {
                  copyLink()
                  setQrOpen(false)
                }}
                className="btn-tactile-primary flex w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] hover:bg-[#163A5F] py-2.5 text-[13.5px] font-bold text-white transition"
              >
                <Copy className="h-4 w-4 text-[#F2B705]" />
                <span>Copy Card Link</span>
              </button>

              <button
                type="button"
                onClick={() => setQrOpen(false)}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F5F7F8] py-2 text-[13px] font-semibold text-[#102A43] hover:bg-[#E8EFF5] transition"
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
            className="animate-fade-in fixed inset-0 h-full w-full bg-black/80 backdrop-blur-sm"
          />

          <div className="animate-qr-in card-elevation-1 relative z-10 w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#D9E2EC] bg-[#FFFFFF] p-5 sm:p-6 text-center text-[#102A43]">
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D49E00] via-[#F2B705] to-[#D49E00]" />

            <button
              type="button"
              id="photo-modal-close"
              onClick={() => setPhotoModalOpen(false)}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F4F8] text-[#526777] hover:text-[#102A43] transition"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F4F8] text-[#102A43] shadow-sm">
              <Camera className="h-5 w-5 text-[#1B5B63]" />
            </div>

            <h3 className="mt-2.5 text-[16px] sm:text-[17px] font-extrabold text-[#102A43]">
              Profile Photo
            </h3>
            <p className="text-[12px] sm:text-[13px] text-[#526777]">
              Upload your executive portrait for your digital card
            </p>

            <div className="my-4 flex justify-center">
              <div className="h-28 w-28 rounded-full p-[2.5px] bg-gradient-to-tr from-[#102A43] via-[#F2B705] to-[#1B5B63] shadow-md overflow-hidden">
                <div className="h-full w-full rounded-full bg-[#F0F4F8] overflow-hidden flex items-center justify-center">
                  <img
                    src={customPhoto || pkPhotoUrl}
                    alt="Panchanan Kumar"
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      if (!e.currentTarget.src.includes('pk-photo.jpg')) {
                        e.currentTarget.src = './pk-photo.jpg'
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                id="photo-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                className="btn-tactile-primary flex w-full items-center justify-center gap-2 rounded-xl bg-[#102A43] hover:bg-[#163A5F] py-3 text-[14px] font-bold text-white shadow-sm"
              >
                <UploadCloud className="h-4.5 w-4.5 text-[#F2B705]" />
                <span>Upload Custom Photo</span>
              </button>

              {customPhoto && (
                <button
                  type="button"
                  id="photo-reset-btn"
                  onClick={removePhoto}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-[13px] font-semibold text-rose-700 hover:bg-rose-100 transition"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Reset to Official Photo</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPhotoModalOpen(false)}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F5F7F8] py-2.5 text-[13.5px] font-semibold text-[#102A43] hover:bg-[#E8EFF5] transition"
              >
                Close
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
          className="animate-toast-in fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-[#102A43] border border-[#163A5F] px-5 py-2.5 text-[13px] font-semibold text-white shadow-2xl"
        >
          <Sparkles className="h-4 w-4 text-[#F2B705]" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
