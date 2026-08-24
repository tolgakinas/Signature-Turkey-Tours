const fs = require('fs');
let c = fs.readFileSync('src/components/TrustStatsBanner.tsx', 'utf-8');
c = c.replace('text-[#FDFCF8]', 'text-stone-900 dark:text-[#FDFCF8]');
c = c.replace('bg-[#161C24]', 'bg-white dark:bg-[#161C24]');
c = c.replace('text-white', 'text-stone-900 dark:text-white');
fs.writeFileSync('src/components/TrustStatsBanner.tsx', c);
