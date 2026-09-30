/**
 * 🎨 Hand-crafted Kawaii Vector Illustrations & Decorative Stickers
 * Ultra-cute pastel illustrations tailored for the birthday story.
 */

export const Illustrations = {
  // 📦 Two cute characters cuddling inside a box ("I made something..." page)
  cuddleBox: () => `
    <svg class="kawaii-svg cuddle-box-svg" viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="boxGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFE8EC" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FFE8EC" stop-opacity="0"/>
        </radialGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#E75480" flood-opacity="0.12"/>
        </filter>
      </defs>

      <!-- Ambient Glow -->
      <circle cx="160" cy="150" r="130" fill="url(#boxGlow)"/>

      <!-- Floating Hearts & Sparkles -->
      <g class="floating-sparkles">
        <path d="M70 70 Q70 60 78 60 Q86 60 86 70 Q86 82 78 90 Q70 82 70 70 Z" fill="#FF8FA3" opacity="0.8"/>
        <path d="M245 65 Q245 57 252 57 Q259 57 259 65 Q259 75 252 82 Q245 75 245 65 Z" fill="#FFAFCC" opacity="0.85"/>
        <path d="M160 30 Q160 20 170 20 Q180 20 180 30 Q180 42 170 52 Q160 42 160 30 Z" fill="#FF4D6D" opacity="0.9"/>
        <!-- Stars -->
        <path d="M100 45 L103 52 L110 55 L103 58 L100 65 L97 58 L90 55 L97 52 Z" fill="#FFD166"/>
        <path d="M220 40 L222 46 L228 48 L222 50 L220 56 L218 50 L212 48 L218 46 Z" fill="#FFD166"/>
      </g>

      <!-- Cute Bear (Left) -->
      <g class="bear-char">
        <!-- Ears -->
        <circle cx="112" cy="110" r="16" fill="#C59B7D" filter="url(#softShadow)"/>
        <circle cx="112" cy="110" r="9" fill="#FFCCD5"/>
        <circle cx="152" cy="108" r="16" fill="#C59B7D" filter="url(#softShadow)"/>
        <circle cx="152" cy="108" r="9" fill="#FFCCD5"/>
        <!-- Head -->
        <ellipse cx="132" cy="135" rx="34" ry="30" fill="#E6BA95" filter="url(#softShadow)"/>
        <!-- Eyes -->
        <ellipse cx="122" cy="132" rx="3.5" ry="5" fill="#3D2C2E"/>
        <circle cx="123" cy="130" r="1.5" fill="#FFFFFF"/>
        <ellipse cx="142" cy="132" rx="3.5" ry="5" fill="#3D2C2E"/>
        <circle cx="143" cy="130" r="1.5" fill="#FFFFFF"/>
        <!-- Snout -->
        <ellipse cx="132" cy="142" rx="9" ry="7" fill="#FFFFFF"/>
        <ellipse cx="132" cy="139" rx="3.5" ry="2.5" fill="#3D2C2E"/>
        <path d="M132 142 L132 145" stroke="#3D2C2E" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Blush -->
        <ellipse cx="115" cy="140" rx="6" ry="4" fill="#FF8FA3" opacity="0.6"/>
        <ellipse cx="149" cy="140" rx="6" ry="4" fill="#FF8FA3" opacity="0.6"/>
        <!-- Little Paw over box -->
        <ellipse cx="108" cy="168" rx="10" ry="8" fill="#E6BA95" filter="url(#softShadow)"/>
      </g>

      <!-- Cute Bunny (Right) -->
      <g class="bunny-char">
        <!-- Bunny Ears -->
        <g class="bunny-ear-left">
          <ellipse cx="178" cy="85" rx="10" ry="28" fill="#FFFDF9" filter="url(#softShadow)" transform="rotate(-12 178 85)"/>
          <ellipse cx="178" cy="85" rx="5.5" ry="20" fill="#FFCCD5" transform="rotate(-12 178 85)"/>
        </g>
        <g class="bunny-ear-right">
          <ellipse cx="205" cy="88" rx="10" ry="28" fill="#FFFDF9" filter="url(#softShadow)" transform="rotate(16 205 88)"/>
          <ellipse cx="205" cy="88" rx="5.5" ry="20" fill="#FFCCD5" transform="rotate(16 205 88)"/>
        </g>
        <!-- Bunny Head -->
        <ellipse cx="188" cy="138" rx="32" ry="28" fill="#FFFDF9" filter="url(#softShadow)"/>
        <!-- Eyes (Happy Arcs) -->
        <path d="M176 134 Q181 129 186 134" stroke="#3D2C2E" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M196 134 Q201 129 206 134" stroke="#3D2C2E" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <!-- Nose / Mouth -->
        <polygon points="191,139 188,143 194,143" fill="#FF8FA3"/>
        <path d="M188 143 Q191 146 194 143" stroke="#3D2C2E" stroke-width="1.5" fill="none"/>
        <!-- Pink Blush -->
        <ellipse cx="173" cy="142" rx="7" ry="4.5" fill="#FF8FA3" opacity="0.65"/>
        <ellipse cx="206" cy="142" rx="7" ry="4.5" fill="#FF8FA3" opacity="0.65"/>
        <!-- Little Bow -->
        <path d="M198 108 L210 114 L198 120 Z" fill="#FF85A1"/>
        <path d="M198 108 L186 114 L198 120 Z" fill="#FF85A1"/>
        <circle cx="198" cy="114" r="3.5" fill="#FFE5EC"/>
        <!-- Little Bunny Paw over box -->
        <ellipse cx="212" cy="168" rx="10" ry="8" fill="#FFFDF9" filter="url(#softShadow)"/>
      </g>

      <!-- Cuddle Love Heart Between Them -->
      <path class="heart-pulse" d="M160 112 C160 102 148 102 148 112 C148 124 160 134 160 134 C160 134 172 124 172 112 C172 102 160 102 160 112 Z" fill="#FF4D6D" filter="url(#softShadow)"/>

      <!-- Gift Box / Nest -->
      <g class="box-container" filter="url(#softShadow)">
        <!-- Back Flaps -->
        <polygon points="75,170 160,158 245,170 160,182" fill="#E8C39E"/>
        <!-- Main Box Body -->
        <path d="M72 170 L248 170 L238 250 Q238 256 230 256 L90 256 Q82 256 82 250 Z" fill="#F4D3B4" stroke="#D8AC82" stroke-width="2.5"/>
        <!-- Box Front Flap / Rim -->
        <path d="M66 168 Q66 162 74 162 L246 162 Q254 162 254 168 L250 178 L70 178 Z" fill="#FFE4CC" stroke="#D8AC82" stroke-width="2"/>
        <!-- Ribbon across Box -->
        <rect x="150" y="162" width="20" height="94" fill="#FF8FA3"/>
        <rect x="154" y="162" width="12" height="94" fill="#FFB3C1"/>
        <!-- Big Cute Ribbon Bow -->
        <path d="M160 175 C145 160 130 170 148 182 C155 186 160 180 160 175 Z" fill="#FF4D6D"/>
        <path d="M160 175 C175 160 190 170 172 182 C165 186 160 180 160 175 Z" fill="#FF4D6D"/>
        <circle cx="160" cy="177" r="6" fill="#FFCCD5" stroke="#FF4D6D" stroke-width="2"/>
        <path d="M157 182 Q150 202 142 208" stroke="#FF4D6D" stroke-width="3" stroke-linecap="round"/>
        <path d="M163 182 Q170 202 178 208" stroke="#FF4D6D" stroke-width="3" stroke-linecap="round"/>
        <!-- Cute Doodle on Box -->
        <text x="160" y="235" font-family="'Gaegu', cursive, sans-serif" font-size="14" font-weight="bold" fill="#B07D54" text-anchor="middle">✨ FOR YOU ✨</text>
      </g>
    </svg>
  `,

  // 😭 Crying / Pouting Bunny illustration (Wrong Passcode page)
  cryingBunny: () => `
    <svg class="kawaii-svg crying-bunny-svg" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sadGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFE8EC" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#FFE8EC" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="130" cy="140" r="105" fill="url(#sadGlow)"/>

      <!-- Question Mark / Sweat Drops -->
      <g class="sweat-drops">
        <path d="M185 80 Q192 70 195 80 Q198 90 190 92 Q182 90 185 80 Z" fill="#89CFF0"/>
        <text x="65" y="75" font-family="'Gaegu', cursive" font-size="28" font-weight="bold" fill="#FF6B6B">?</text>
        <text x="195" y="65" font-family="'Gaegu', cursive" font-size="24" font-weight="bold" fill="#FF6B6B">!</text>
      </g>

      <!-- Drooping Ears -->
      <g class="droop-ears">
        <ellipse cx="80" cy="115" rx="14" ry="34" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="2" transform="rotate(-38 80 115)"/>
        <ellipse cx="80" cy="115" rx="8" ry="24" fill="#FFCCD5" transform="rotate(-38 80 115)"/>
        
        <ellipse cx="180" cy="115" rx="14" ry="34" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="2" transform="rotate(38 180 115)"/>
        <ellipse cx="180" cy="115" rx="8" ry="24" fill="#FFCCD5" transform="rotate(38 180 115)"/>
      </g>

      <!-- Bunny Head -->
      <ellipse cx="130" cy="150" rx="55" ry="46" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="2.5"/>

      <!-- Tear Streams -->
      <g class="tear-streams">
        <path d="M105 155 C100 170 95 185 97 200" stroke="#70C1B3" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
        <path d="M155 155 C160 170 165 185 163 200" stroke="#70C1B3" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
        <ellipse cx="97" cy="202" rx="4" ry="6" fill="#70C1B3"/>
        <ellipse cx="163" cy="202" rx="4" ry="6" fill="#70C1B3"/>
      </g>

      <!-- Watery Sad Eyes -->
      <g class="sad-eyes">
        <ellipse cx="108" cy="142" rx="7" ry="10" fill="#3D2C2E"/>
        <circle cx="106" cy="138" r="3.5" fill="#FFFFFF"/>
        <circle cx="110" cy="146" r="1.8" fill="#FFFFFF"/>
        
        <ellipse cx="152" cy="142" rx="7" ry="10" fill="#3D2C2E"/>
        <circle cx="150" cy="138" r="3.5" fill="#FFFFFF"/>
        <circle cx="154" cy="146" r="1.8" fill="#FFFFFF"/>
      </g>

      <!-- Cute Pouting Snout & Trembling Mouth -->
      <ellipse cx="130" cy="158" rx="4" ry="3" fill="#FF8FA3"/>
      <path d="M124 168 Q130 162 136 168" stroke="#3D2C2E" stroke-width="2.5" stroke-linecap="round" fill="none"/>

      <!-- Blush -->
      <ellipse cx="95" cy="156" rx="9" ry="6" fill="#FF8FA3" opacity="0.6"/>
      <ellipse cx="165" cy="156" rx="9" ry="6" fill="#FF8FA3" opacity="0.6"/>

      <!-- Tiny paws clutching together -->
      <ellipse cx="118" cy="190" rx="10" ry="8" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="1.5"/>
      <ellipse cx="142" cy="190" rx="10" ry="8" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="1.5"/>
    </svg>
  `,

  // 🥺 Pleading Puppy / Kitty ("Why did u click no!? 🥺")
  sadPuppy: () => `
    <svg class="kawaii-svg sad-puppy-svg" viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="puppyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF0F5" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#FFF0F5" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="140" cy="130" r="110" fill="url(#puppyGlow)"/>

      <!-- Floating Broken Little Heart with Bandage -->
      <g class="floating-broken-heart">
        <path d="M60 65 C60 55 50 55 50 65 C50 77 60 85 60 85 C60 85 70 77 70 65 C70 55 60 55 60 65 Z" fill="#FF758F"/>
        <!-- Bandage -->
        <rect x="52" y="68" width="16" height="5" rx="2" fill="#FFE5EC" transform="rotate(-20 60 70)"/>
      </g>
      
      <!-- Floppy Ears -->
      <path d="M80 90 C55 100 50 145 75 160 C90 150 95 115 80 90 Z" fill="#D4A373" stroke="#BC6C25" stroke-width="2"/>
      <path d="M200 90 C225 100 230 145 205 160 C190 150 185 115 200 90 Z" fill="#D4A373" stroke="#BC6C25" stroke-width="2"/>

      <!-- Puppy Face -->
      <ellipse cx="140" cy="135" rx="58" ry="48" fill="#FAEDCD" stroke="#D4A373" stroke-width="2"/>

      <!-- Big Glossy Puppy Eyes -->
      <g class="puppy-eyes">
        <ellipse cx="116" cy="125" rx="13" ry="16" fill="#2B1E1A"/>
        <circle cx="112" cy="118" r="6" fill="#FFFFFF"/>
        <circle cx="122" cy="133" r="3" fill="#FFFFFF"/>
        <circle cx="113" cy="134" r="1.5" fill="#FFFFFF"/>

        <ellipse cx="164" cy="125" rx="13" ry="16" fill="#2B1E1A"/>
        <circle cx="160" cy="118" r="6" fill="#FFFFFF"/>
        <circle cx="170" cy="133" r="3" fill="#FFFFFF"/>
        <circle cx="161" cy="134" r="1.5" fill="#FFFFFF"/>
      </g>

      <!-- Snout -->
      <ellipse cx="140" cy="148" rx="16" ry="12" fill="#FEFAE0"/>
      <ellipse cx="140" cy="143" rx="7" ry="5" fill="#2B1E1A"/>
      <!-- Quivering Cute Mouth -->
      <path d="M133 154 Q140 149 147 154" stroke="#2B1E1A" stroke-width="2" stroke-linecap="round" fill="none"/>

      <!-- Puppy Blush -->
      <ellipse cx="98" cy="143" rx="8" ry="5" fill="#FF8FA3" opacity="0.6"/>
      <ellipse cx="182" cy="143" rx="8" ry="5" fill="#FF8FA3" opacity="0.6"/>

      <!-- Tiny paws begging -->
      <g class="begging-paws">
        <ellipse cx="128" cy="180" rx="11" ry="9" fill="#FAEDCD" stroke="#D4A373" stroke-width="1.5"/>
        <ellipse cx="152" cy="180" rx="11" ry="9" fill="#FAEDCD" stroke="#D4A373" stroke-width="1.5"/>
      </g>
    </svg>
  `,

  // 🤗 Warm Hugging Couple Characters (Virtual Hug page)
  huggingCouple: () => `
    <svg class="kawaii-svg hugging-couple-svg" viewBox="0 0 320 270" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hugGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFE3E8" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FFE3E8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="160" cy="140" r="125" fill="url(#hugGlow)"/>

      <!-- Heart Explosion particles (Animated in CSS/JS) -->
      <g class="hug-hearts">
        <path class="floating-heart h1" d="M160 40 C160 30 148 30 148 40 C148 52 160 62 160 62 C160 62 172 52 172 40 C172 30 160 30 160 40 Z" fill="#FF4D6D"/>
        <path class="floating-heart h2" d="M90 70 C90 62 80 62 80 70 C80 80 90 87 90 87 C90 87 100 80 100 70 C100 62 90 62 90 70 Z" fill="#FFAFCC"/>
        <path class="floating-heart h3" d="M230 65 C230 57 220 57 220 65 C220 75 230 82 230 82 C230 82 240 75 240 65 C240 57 230 57 230 65 Z" fill="#FF758F"/>
      </g>

      <!-- Brown Teddy (Left) -->
      <g class="hug-bear">
        <!-- Ear -->
        <circle cx="108" cy="98" r="14" fill="#C59B7D"/>
        <circle cx="108" cy="98" r="8" fill="#FFCCD5"/>
        <!-- Body -->
        <ellipse cx="132" cy="165" rx="36" ry="40" fill="#DDB892"/>
        <!-- Head -->
        <ellipse cx="128" cy="125" rx="30" ry="28" fill="#DDB892"/>
        <!-- Content Happy Closed Eyes -->
        <path d="M116 122 Q122 116 128 122" stroke="#3D2C2E" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <!-- Snout & Blush -->
        <ellipse cx="135" cy="132" rx="8" ry="6" fill="#FFFDF9"/>
        <circle cx="135" cy="130" r="2.5" fill="#3D2C2E"/>
        <ellipse cx="115" cy="132" rx="6" ry="4" fill="#FF8FA3" opacity="0.7"/>
      </g>

      <!-- White Bunny (Right) -->
      <g class="hug-bunny">
        <!-- Ears -->
        <ellipse cx="188" cy="72" rx="9" ry="26" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="1.5" transform="rotate(-10 188 72)"/>
        <ellipse cx="188" cy="72" rx="5" ry="18" fill="#FFCCD5" transform="rotate(-10 188 72)"/>
        <ellipse cx="212" cy="76" rx="9" ry="26" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="1.5" transform="rotate(18 212 76)"/>
        <ellipse cx="212" cy="76" rx="5" ry="18" fill="#FFCCD5" transform="rotate(18 212 76)"/>
        <!-- Body -->
        <ellipse cx="188" cy="165" rx="36" ry="40" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="1.5"/>
        <!-- Head -->
        <ellipse cx="192" cy="125" rx="30" ry="28" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="1.5"/>
        <!-- Happy Closed Eye -->
        <path d="M192 122 Q198 116 204 122" stroke="#3D2C2E" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <ellipse cx="205" cy="132" rx="6" ry="4" fill="#FF8FA3" opacity="0.7"/>
      </g>

      <!-- Wrapping Hug Arms -->
      <g class="hug-arms">
        <!-- Bear's arm around Bunny -->
        <path d="M130 148 Q165 155 198 142" stroke="#DDB892" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="198" cy="142" r="8" fill="#DDB892"/>
        <!-- Bunny's arm around Bear -->
        <path d="M190 152 Q155 160 122 146" stroke="#FFFDF9" stroke-width="14" stroke-linecap="round" fill="none"/>
        <circle cx="122" cy="146" r="8" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="1"/>
      </g>

      <!-- Little Bows -->
      <circle cx="212" cy="100" r="4" fill="#FF85A1"/>
    </svg>
  `,

  // 🎂 Gorgeous Layered Birthday Cake with Flickering Candle
  birthdayCake: () => `
    <svg class="kawaii-svg birthday-cake-svg" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFEAA7" stop-opacity="1"/>
          <stop offset="60%" stop-color="#FF7675" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#FF7675" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Cake Stand -->
      <ellipse cx="120" cy="205" rx="85" ry="14" fill="#FFF0F5" stroke="#F4ACB7" stroke-width="2"/>
      <path d="M95 205 Q120 220 145 205" fill="#FFE5EC"/>
      <ellipse cx="120" cy="220" rx="35" ry="6" fill="#F4ACB7"/>

      <!-- Bottom Layer (Strawberry Cream) -->
      <path d="M50 150 Q120 162 190 150 L190 190 Q120 206 50 190 Z" fill="#FFE5EC" stroke="#F4ACB7" stroke-width="2"/>
      <ellipse cx="120" cy="150" rx="70" ry="14" fill="#FFCCD5"/>
      <!-- Icing Drips Bottom -->
      <path d="M50 152 Q60 170 70 154 Q80 172 90 153 Q105 175 120 154 Q135 172 150 154 Q165 170 175 153 Q183 165 190 152" fill="#FFFDF9"/>

      <!-- Top Layer (Vanilla Pastry) -->
      <path d="M68 105 Q120 116 172 105 L172 145 Q120 158 68 145 Z" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="2"/>
      <ellipse cx="120" cy="105" rx="52" ry="12" fill="#FFE5EC"/>
      <!-- Icing Drips Top -->
      <path d="M68 107 Q80 122 92 108 Q106 125 120 108 Q134 124 148 108 Q160 120 172 107" fill="#FF8FA3"/>

      <!-- Strawberries & Cherries on Cake -->
      <circle cx="82" cy="100" r="7" fill="#FF4D6D"/>
      <circle cx="120" cy="98" r="8" fill="#FF4D6D"/>
      <circle cx="158" cy="100" r="7" fill="#FF4D6D"/>
      <path d="M120 92 L120 88 Q123 85 126 87" stroke="#2B9348" stroke-width="1.8" fill="none"/>

      <!-- Cute Candle with Stripes -->
      <rect x="116" y="52" width="8" height="42" rx="3" fill="#FFFDF9" stroke="#F4ACB7" stroke-width="1"/>
      <path d="M116 60 L124 64 M116 72 L124 76 M116 84 L124 88" stroke="#FF8FA3" stroke-width="2"/>
      <line x1="120" y1="52" x2="120" y2="44" stroke="#3D2C2E" stroke-width="1.5"/>

      <!-- Flickering Flame & Glow -->
      <circle cx="120" cy="36" r="18" fill="url(#flameGlow)" class="flame-glow"/>
      <path class="candle-flame" d="M120 24 Q128 36 120 44 Q112 36 120 24 Z" fill="#FFB703"/>
      <path class="candle-flame-inner" d="M120 28 Q124 36 120 42 Q116 36 120 28 Z" fill="#FFFDF9"/>

      <!-- Cute Face on Cake -->
      <ellipse cx="106" cy="172" rx="2.5" ry="3.5" fill="#3D2C2E"/>
      <ellipse cx="134" cy="172" rx="2.5" ry="3.5" fill="#3D2C2E"/>
      <path d="M117 175 Q120 178 123 175" stroke="#3D2C2E" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <ellipse cx="98" cy="174" rx="4" ry="2.5" fill="#FF4D6D" opacity="0.6"/>
      <ellipse cx="142" cy="174" rx="4" ry="2.5" fill="#FF4D6D" opacity="0.6"/>
    </svg>
  `,

  // 🎁 Cute Present Gift Box (Final Surprise)
  giftBox: () => `
    <svg class="kawaii-svg gift-box-interactive-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="giftGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFE3E8" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#FFE3E8" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#giftGlow)"/>

      <!-- Sparkles around Gift -->
      <g class="gift-sparkles">
        <path d="M35 45 L38 52 L45 55 L38 58 L35 65 L32 58 L25 55 L32 52 Z" fill="#FFD166"/>
        <path d="M165 40 L167 46 L173 48 L167 50 L165 56 L163 50 L157 48 L163 46 Z" fill="#FFD166"/>
        <path d="M160 150 L162 155 L167 157 L162 159 L160 164 L158 159 L153 157 L158 155 Z" fill="#FF8FA3"/>
      </g>

      <!-- Gift Box Base -->
      <rect x="45" y="85" width="110" height="85" rx="10" fill="#FFB6C1" stroke="#F4ACB7" stroke-width="2.5"/>
      <!-- Polka Dots on Box -->
      <circle cx="65" cy="110" r="4" fill="#FFFDF9" opacity="0.7"/>
      <circle cx="85" cy="140" r="4" fill="#FFFDF9" opacity="0.7"/>
      <circle cx="135" cy="115" r="4" fill="#FFFDF9" opacity="0.7"/>
      <circle cx="120" cy="150" r="4" fill="#FFFDF9" opacity="0.7"/>
      
      <!-- Vertical Ribbon on Body -->
      <rect x="90" y="85" width="20" height="85" fill="#FF4D6D"/>

      <!-- Gift Box Lid (Animatable) -->
      <g class="gift-lid">
        <rect x="38" y="65" width="124" height="26" rx="6" fill="#FFCCD5" stroke="#F4ACB7" stroke-width="2.5"/>
        <rect x="90" y="65" width="20" height="26" fill="#FF4D6D"/>
        <!-- Big Bow -->
        <path d="M100 65 C78 35 55 55 88 65 Z" fill="#FF4D6D"/>
        <path d="M100 65 C122 35 145 55 112 65 Z" fill="#FF4D6D"/>
        <circle cx="100" cy="65" r="7" fill="#FFE5EC" stroke="#FF4D6D" stroke-width="2"/>
        <path d="M96 68 Q88 82 82 88" stroke="#FF4D6D" stroke-width="3" stroke-linecap="round"/>
        <path d="M104 68 Q112 82 118 88" stroke="#FF4D6D" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Happy Face on Box -->
      <ellipse cx="75" cy="125" rx="3" ry="4" fill="#3D2C2E"/>
      <ellipse cx="125" cy="125" rx="3" ry="4" fill="#3D2C2E"/>
      <path d="M97 128 Q100 132 103 128" stroke="#3D2C2E" stroke-width="2" stroke-linecap="round" fill="none"/>
      <ellipse cx="68" cy="128" rx="5" ry="3" fill="#FF4D6D" opacity="0.6"/>
      <ellipse cx="132" cy="128" rx="5" ry="3" fill="#FF4D6D" opacity="0.6"/>
    </svg>
  `
};
