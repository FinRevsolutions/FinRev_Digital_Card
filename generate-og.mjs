import fs from 'fs';
import path from 'path';

const logoPath = path.resolve('./src/assets/logo.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1B2B"/>
      <stop offset="60%" stop-color="#102A43"/>
      <stop offset="100%" stop-color="#0B1B2B"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D49E00"/>
      <stop offset="50%" stop-color="#F2B705"/>
      <stop offset="100%" stop-color="#D49E00"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
    <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Ambient Decorative Lighting Elements -->
  <circle cx="200" cy="150" r="350" fill="#163A5F" opacity="0.3"/>
  <circle cx="1050" cy="500" r="300" fill="#1B5B63" opacity="0.25"/>

  <!-- Top Gold Accent Bar -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#goldGrad)"/>

  <!-- Left Side: Brand Identity Lockup -->
  <g transform="translate(100, 110)">
    <!-- Logo Container -->
    <rect x="0" y="0" width="150" height="75" rx="16" fill="#FFFFFF" filter="url(#shadow)"/>
    <image x="12" y="10" width="126" height="55" xlink:href="data:image/png;base64,${logoBase64}" preserveAspectRatio="xMidYMid meet"/>

    <!-- Brand Name & Slogan -->
    <text x="175" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="900" letter-spacing="2" fill="#FFFFFF">FINREV SOLUTIONS</text>
    <text x="175" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="19" font-weight="500" fill="#F2B705" letter-spacing="0.5">Secure Today. Stronger Tomorrow.</text>

    <!-- Value Statement / Services Highlights -->
    <g transform="translate(0, 120)">
      <rect x="0" y="0" width="480" height="240" rx="20" fill="#163A5F" opacity="0.5" stroke="#1B5B63" stroke-width="1.5" filter="url(#shadow)"/>

      <text x="30" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" letter-spacing="2" fill="#F2B705">FINANCIAL SERVICES &amp; ADVISORY</text>
      
      <!-- Bullet Points -->
      <g transform="translate(30, 75)">
        <circle cx="6" cy="-5" r="4" fill="#F2B705"/>
        <text x="22" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="17" font-weight="600" fill="#F5F7F8">Mutual Funds &amp; Systematic Investment Plans (SIP)</text>

        <circle cx="6" cy="35" r="4" fill="#F2B705"/>
        <text x="22" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="17" font-weight="600" fill="#F5F7F8">PMS, AIF &amp; Unlisted Private Equity</text>

        <circle cx="6" cy="75" r="4" fill="#F2B705"/>
        <text x="22" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="17" font-weight="600" fill="#F5F7F8">Insurance, Bonds &amp; Fixed Deposits</text>

        <circle cx="6" cy="115" r="4" fill="#F2B705"/>
        <text x="22" y="120" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="17" font-weight="600" fill="#F5F7F8">Comprehensive Wealth Advisory</text>
      </g>
    </g>
  </g>

  <!-- Right Side: Executive Profile Card Lockup -->
  <g transform="translate(680, 95)">
    <rect x="0" y="0" width="420" height="430" rx="28" fill="#FFFFFF" stroke="#D9E2EC" stroke-width="1.5" filter="url(#cardShadow)"/>
    
    <!-- Top Header inside card -->
    <rect x="0" y="0" width="420" height="110" rx="28" fill="#102A43"/>
    <!-- Overlap mask fix for top radius -->
    <rect x="0" y="50" width="420" height="60" fill="#102A43"/>

    <!-- Circular Profile Emblem with Gold Border -->
    <g transform="translate(210, 110)">
      <circle cx="0" cy="0" r="52" fill="#FFFFFF" filter="url(#shadow)"/>
      <circle cx="0" cy="0" r="47" fill="#F2B705"/>
      <circle cx="0" cy="0" r="43" fill="#102A43"/>
      <text x="0" y="12" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="32" font-weight="900" fill="#F2B705" text-anchor="middle" letter-spacing="1">PK</text>
    </g>

    <!-- Executive Name & Details -->
    <g transform="translate(210, 205)" text-anchor="middle">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="#102A43" letter-spacing="-0.5">Panchanan Kumar</text>
      
      <text x="0" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="700" fill="#1B5B63">Mutual Fund Distributor</text>

      <!-- AMFI Credential Badge -->
      <g transform="translate(0, 52)">
        <rect x="-165" y="0" width="330" height="34" rx="17" fill="#F5F7F8" stroke="#D9E2EC" stroke-width="1"/>
        <text x="0" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#102A43">
          AMFI Registered • ARN-195797
        </text>
      </g>

      <!-- Location & Contact -->
      <text x="0" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="500" fill="#526777">Dhanbad, Jharkhand • +91 98355 92142</text>
      <text x="0" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#1B5B63">www.finrevsolutions.com</text>
    </g>
  </g>

  <!-- Bottom Disclaimers & Regulatory Mark -->
  <g transform="translate(100, 570)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="12" fill="#829AB1">Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.</text>
  </g>
</svg>`;

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}
fs.writeFileSync('./public/og-image.svg', svg);
fs.writeFileSync('./public/og-image.png', Buffer.from(svg)); // SVG compatible or fallback
console.log('Successfully generated /public/og-image.svg');
