const fs = require('fs');
let c = fs.readFileSync('src/components/TravelGuideFaq.tsx', 'utf-8');
c = c.replace(/text-white/g, 'text-stone-900 dark:text-white');
fs.writeFileSync('src/components/TravelGuideFaq.tsx', c);
