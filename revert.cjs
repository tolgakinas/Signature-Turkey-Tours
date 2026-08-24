const fs = require('fs');

// Revert Navbar
let nav = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
nav = nav.replace("import { LogoSymbol } from './LogoSymbol';\n", '');
const newNavLogo = `<a href="#" className="flex items-center group transition-transform hover:scale-105">
            <div className="text-amber-600 dark:text-amber-400 group-hover:text-amber-500 transition-colors drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
              <LogoSymbol className="w-12 h-12 md:w-14 md:h-14" />
            </div>
          </a>`;
const oldNavLogo = `<a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-900/30 text-stone-950 font-display-royal font-bold text-lg border border-amber-300/40">
              ✦
            </div>
            <div>
              <div className="font-display-royal font-bold tracking-widest text-lg md:text-xl text-amber-700 dark:text-amber-300 uppercase leading-tight group-hover:text-amber-200 transition-colors">
                SIGNATURE
              </div>
              <div className="text-[10px] tracking-[0.25em] text-stone-600 dark:text-stone-300 uppercase font-medium">
                TURKEY TOURS &bull; BESPOKE LUXURY
              </div>
            </div>
          </a>`;
nav = nav.replace(newNavLogo, oldNavLogo);
fs.writeFileSync('src/components/Navbar.tsx', nav, 'utf-8');

// Revert Footer
let foot = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
foot = foot.replace("import { LogoSymbol } from './LogoSymbol';\n", '');
const newFootLogo = `<div className="flex items-center">
            <div className="text-amber-600 dark:text-amber-400">
              <LogoSymbol className="w-14 h-14" />
            </div>
          </div>`;
const oldFootLogo = `<div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-bold text-lg border border-amber-300">
              ✦
            </div>
            <div>
              <div className="font-display-royal font-bold text-amber-700 dark:text-amber-300 tracking-widest text-lg">
                SIGNATURE
              </div>
              <div className="text-[10px] tracking-[0.25em] text-stone-500 dark:text-stone-400 uppercase">
                TURKEY TOURS &bull; BESPOKE LUXURY
              </div>
            </div>
          </div>`;
foot = foot.replace(newFootLogo, oldFootLogo);
fs.writeFileSync('src/components/Footer.tsx', foot, 'utf-8');
