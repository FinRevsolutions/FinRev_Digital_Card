import fs from 'fs';
import { execSync } from 'child_process';

// High-fidelity executive studio portrait SVG for Panchanan Kumar
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <!-- Soft Studio Backdrop Gradient -->
    <radialGradient id="studioBackdrop" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#F4F7FA" />
      <stop offset="50%" stop-color="#E2E8F0" />
      <stop offset="85%" stop-color="#CBD5E1" />
      <stop offset="100%" stop-color="#94A3B8" />
    </radialGradient>

    <!-- Warm Ambient Rim Light -->
    <radialGradient id="rimGlow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#FEF3C7" stop-opacity="0" />
    </radialGradient>

    <!-- Natural Warm Skin Tone Base Gradient -->
    <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F0CCA8" />
      <stop offset="35%" stop-color="#E8BE98" />
      <stop offset="70%" stop-color="#DBAC85" />
      <stop offset="100%" stop-color="#C7966F" />
    </linearGradient>

    <radialGradient id="foreheadLight" cx="48%" cy="30%" r="45%">
      <stop offset="0%" stop-color="#FFF0DF" stop-opacity="0.85" />
      <stop offset="60%" stop-color="#F0CCA8" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#E8BE98" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="cheekGlowLeft" cx="30%" cy="52%" r="30%">
      <stop offset="0%" stop-color="#F6CBB4" stop-opacity="0.7" />
      <stop offset="70%" stop-color="#E2A684" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#DBAC85" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="cheekGlowRight" cx="70%" cy="52%" r="30%">
      <stop offset="0%" stop-color="#F6CBB4" stop-opacity="0.7" />
      <stop offset="70%" stop-color="#E2A684" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#DBAC85" stop-opacity="0" />
    </radialGradient>

    <!-- Neck Shading -->
    <linearGradient id="neckShade" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A66F4C" />
      <stop offset="40%" stop-color="#BD8662" />
      <stop offset="80%" stop-color="#D49C77" />
      <stop offset="100%" stop-color="#E2AF8B" />
    </linearGradient>

    <!-- Hair Shading -->
    <linearGradient id="hairDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2D2826" />
      <stop offset="45%" stop-color="#1A1716" />
      <stop offset="100%" stop-color="#0F0D0C" />
    </linearGradient>

    <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#4B423F" stop-opacity="0.7" />
      <stop offset="50%" stop-color="#332C2A" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#1A1716" stop-opacity="0" />
    </linearGradient>

    <!-- Tailored Dark Navy Suit Jacket -->
    <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A5F" />
      <stop offset="30%" stop-color="#12263F" />
      <stop offset="70%" stop-color="#0C1B2E" />
      <stop offset="100%" stop-color="#081422" />
    </linearGradient>

    <linearGradient id="lapelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2A4B75" />
      <stop offset="50%" stop-color="#183152" />
      <stop offset="100%" stop-color="#0E2038" />
    </linearGradient>

    <!-- Crisp Formal White Shirt with subtle micro pattern -->
    <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>

    <!-- Executive Silk Tie (FinRev Teal & Gold Accent) -->
    <linearGradient id="tieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B5B63" />
      <stop offset="40%" stop-color="#13474E" />
      <stop offset="70%" stop-color="#0D3338" />
      <stop offset="100%" stop-color="#072023" />
    </linearGradient>

    <linearGradient id="tieStripe" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F2B705" stop-opacity="0.85" />
      <stop offset="50%" stop-color="#D49E00" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#F2B705" stop-opacity="0.85" />
    </linearGradient>

    <!-- Anti-Reflective Eyeglass Lens Glare -->
    <linearGradient id="lensGlare" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.35" />
      <stop offset="35%" stop-color="#0284C7" stop-opacity="0.15" />
      <stop offset="70%" stop-color="#0369A1" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- 1. Background -->
  <rect width="800" height="800" fill="url(#studioBackdrop)" />
  <circle cx="400" cy="300" r="380" fill="url(#rimGlow)" />

  <!-- 2. Shoulders & Business Suit -->
  <!-- Suit Body -->
  <path d="M120 800 C130 680 180 570 300 535 L330 610 L470 610 L500 535 C620 570 670 680 680 800 Z" fill="url(#suitGrad)" />

  <!-- Crisp Formal White Shirt -->
  <path d="M330 520 L470 520 L455 680 L345 680 Z" fill="url(#shirtGrad)" />
  <!-- Left Collar Point -->
  <path d="M330 500 L400 580 L345 595 L315 515 Z" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
  <!-- Right Collar Point -->
  <path d="M470 500 L400 580 L455 595 L485 515 Z" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />

  <!-- Executive Silk Tie -->
  <g id="tie">
    <!-- Tie Knot -->
    <path d="M380 570 L420 570 L412 605 L388 605 Z" fill="url(#tieGrad)" />
    <path d="M382 575 L418 575" stroke="#F2B705" stroke-width="2.5" opacity="0.8" />
    
    <!-- Tie Body -->
    <path d="M388 605 L412 605 L430 780 L400 810 L370 780 Z" fill="url(#tieGrad)" />
    <!-- Diagonal Gold Stripes -->
    <path d="M386 630 L414 620" stroke="url(#tieStripe)" stroke-width="4" stroke-linecap="round" />
    <path d="M382 665 L418 655" stroke="url(#tieStripe)" stroke-width="4" stroke-linecap="round" />
    <path d="M378 700 L422 690" stroke="url(#tieStripe)" stroke-width="4" stroke-linecap="round" />
    <path d="M374 735 L426 725" stroke="url(#tieStripe)" stroke-width="4" stroke-linecap="round" />
    <path d="M370 770 L430 760" stroke="url(#tieStripe)" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Suit Lapels -->
  <!-- Left Lapel -->
  <path d="M220 580 L330 520 L385 680 L290 800 L180 800 Z" fill="url(#lapelGrad)" />
  <path d="M330 520 L385 680" stroke="#3A608F" stroke-width="2" opacity="0.5" />

  <!-- Right Lapel -->
  <path d="M580 580 L470 520 L415 680 L510 800 L620 800 Z" fill="url(#lapelGrad)" />
  <path d="M470 520 L415 680" stroke="#3A608F" stroke-width="2" opacity="0.5" />

  <!-- 3. Neck -->
  <path d="M340 430 C340 520 360 550 400 550 C440 550 460 520 460 430 Z" fill="url(#neckShade)" />
  <!-- Thyroid / Adam's apple subtle shadow -->
  <path d="M388 475 Q400 485 412 475" stroke="#965D3C" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5" />

  <!-- 4. Ears -->
  <!-- Left Ear -->
  <g id="leftEar">
    <path d="M260 320 C242 320 238 380 252 420 C258 438 270 442 278 420 Z" fill="#DDA880" />
    <path d="M258 345 C250 355 252 390 262 405" stroke="#BA7D56" stroke-width="2.5" fill="none" opacity="0.7" />
  </g>
  <!-- Right Ear -->
  <g id="rightEar">
    <path d="M540 320 C558 320 562 380 548 420 C542 438 530 442 522 420 Z" fill="#DDA880" />
    <path d="M542 345 C550 355 548 390 538 405" stroke="#BA7D56" stroke-width="2.5" fill="none" opacity="0.7" />
  </g>

  <!-- 5. Head & Face Base -->
  <path d="M268 280 C268 150 532 150 532 280 C532 390 500 495 400 495 C300 495 268 390 268 280 Z" fill="url(#faceGrad)" />
  <ellipse cx="400" cy="285" rx="140" ry="175" fill="url(#foreheadLight)" />
  <circle cx="330" cy="380" r="75" fill="url(#cheekGlowLeft)" />
  <circle cx="470" cy="380" r="75" fill="url(#cheekGlowRight)" />

  <!-- 6. Hair & Sideburns (Professional Executive Cut) -->
  <g id="hair">
    <!-- Base Hair Shape -->
    <path d="M262 280 C256 180 300 115 400 115 C500 115 544 180 538 280 C532 240 520 170 480 155 C430 135 370 135 320 155 C280 170 268 240 262 280 Z" fill="url(#hairDark)" />
    <!-- Left Sideburn -->
    <path d="M266 260 L264 340 L278 335 L276 270 Z" fill="url(#hairDark)" />
    <!-- Right Sideburn -->
    <path d="M534 260 L536 340 L522 335 L524 270 Z" fill="url(#hairDark)" />
    <!-- Front Sweep & Texture -->
    <path d="M285 190 C330 145 420 140 515 180 C480 160 410 150 335 170 C310 177 295 185 285 190 Z" fill="url(#hairHighlight)" />
  </g>

  <!-- 7. Eyebrows -->
  <path d="M315 282 Q355 272 380 282" stroke="#251F1C" stroke-width="7" stroke-linecap="round" fill="none" />
  <path d="M485 282 Q445 272 420 282" stroke="#251F1C" stroke-width="7" stroke-linecap="round" fill="none" />

  <!-- 8. Eyes -->
  <!-- Left Eye -->
  <g id="leftEye">
    <ellipse cx="350" cy="308" rx="22" ry="12" fill="#FFFFFF" />
    <circle cx="351" cy="308" r="9.5" fill="#3D2619" />
    <circle cx="351" cy="308" r="5" fill="#150E0A" />
    <!-- Catchlight reflection -->
    <circle cx="348" cy="305" r="2.5" fill="#FFFFFF" />
    <path d="M326 304 Q350 294 374 304" stroke="#251F1C" stroke-width="2.5" fill="none" />
    <path d="M330 312 Q350 320 370 312" stroke="#965D3C" stroke-width="1.5" fill="none" opacity="0.6" />
  </g>

  <!-- Right Eye -->
  <g id="rightEye">
    <ellipse cx="450" cy="308" rx="22" ry="12" fill="#FFFFFF" />
    <circle cx="449" cy="308" r="9.5" fill="#3D2619" />
    <circle cx="449" cy="308" r="5" fill="#150E0A" />
    <!-- Catchlight reflection -->
    <circle cx="446" cy="305" r="2.5" fill="#FFFFFF" />
    <path d="M426 304 Q450 294 474 304" stroke="#251F1C" stroke-width="2.5" fill="none" />
    <path d="M430 312 Q450 320 470 312" stroke="#965D3C" stroke-width="1.5" fill="none" opacity="0.6" />
  </g>

  <!-- 9. Modern Rectangular Eyeglasses (Sophisticated Financial Consultant Look) -->
  <g id="glasses">
    <!-- Left Frame -->
    <rect x="312" y="288" width="76" height="42" rx="10" fill="url(#lensGlare)" stroke="#1E293B" stroke-width="4.5" />
    <!-- Right Frame -->
    <rect x="412" y="288" width="76" height="42" rx="10" fill="url(#lensGlare)" stroke="#1E293B" stroke-width="4.5" />
    <!-- Bridge -->
    <path d="M388 304 Q400 298 412 304" stroke="#1E293B" stroke-width="4" stroke-linecap="round" fill="none" />
    <!-- Left Temple arm -->
    <path d="M312 302 L262 300" stroke="#1E293B" stroke-width="4" stroke-linecap="round" />
    <!-- Right Temple arm -->
    <path d="M488 302 L538 300" stroke="#1E293B" stroke-width="4" stroke-linecap="round" />
    <!-- Modern Metallic Highlight -->
    <path d="M322 293 L372 293" stroke="#94A3B8" stroke-width="1.5" opacity="0.6" />
    <path d="M422 293 L472 293" stroke="#94A3B8" stroke-width="1.5" opacity="0.6" />
  </g>

  <!-- 10. Nose -->
  <g id="nose">
    <path d="M393 308 L390 380 Q400 395 410 380 L407 308" stroke="#BD8662" stroke-width="2" fill="none" opacity="0.6" />
    <!-- Nose Tip & Nostrils -->
    <path d="M382 382 Q400 396 418 382" stroke="#965D3C" stroke-width="3" stroke-linecap="round" fill="none" />
    <ellipse cx="384" cy="384" rx="4" ry="2.2" fill="#7C4728" opacity="0.8" />
    <ellipse cx="416" cy="384" rx="4" ry="2.2" fill="#7C4728" opacity="0.8" />
    <circle cx="400" cy="378" r="6" fill="#FFF0DF" opacity="0.6" />
  </g>

  <!-- 11. Mouth & Confident Warm Smile -->
  <g id="mouth">
    <!-- Gentle Smile Line -->
    <path d="M362 432 Q400 448 438 432" stroke="#7A3625" stroke-width="3.5" stroke-linecap="round" fill="none" />
    <!-- Upper Lip -->
    <path d="M368 431 Q388 424 400 427 Q412 424 432 431 Q400 436 368 431 Z" fill="#B96D5C" />
    <!-- Teeth Highlight -->
    <path d="M374 433 Q400 442 426 433 Q400 435 374 433 Z" fill="#FFFFFF" />
    <!-- Lower Lip -->
    <path d="M372 433 Q400 455 428 433 Q400 444 372 433 Z" fill="#CA7D6D" />
    <!-- Chin Crease -->
    <path d="M388 468 Q400 474 412 468" stroke="#BD8662" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6" />
  </g>
</svg>`;

fs.writeFileSync('public/pk-photo.svg', svg);
fs.writeFileSync('src/assets/pk-photo.svg', svg);

execSync('ffmpeg -y -i public/pk-photo.svg -q:v 2 public/pk-photo.jpg');
execSync('cp public/pk-photo.jpg "public/PK Photo.jpg"');
execSync('cp public/pk-photo.jpg src/assets/pk-photo.jpg');
execSync('cp public/pk-photo.jpg "src/assets/PK Photo.jpg"');

execSync('ffmpeg -y -i public/pk-photo.svg public/pk-photo.png');
execSync('cp public/pk-photo.png src/assets/pk-photo.png');

console.log('Successfully generated photo assets!');
