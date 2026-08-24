const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf-8');

const oldLogoBlock = `<div className="flex items-center gap-3">
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
          
const newLogoBlock = `<div className="flex items-center">
            <div className="text-amber-600 dark:text-amber-400">
              <LogoSymbol className="w-14 h-14" />
            </div>
          </div>`;

content = content.replace(oldLogoBlock, newLogoBlock);
fs.writeFileSync('src/components/Footer.tsx', content, 'utf-8');
