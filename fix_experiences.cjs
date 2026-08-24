const fs = require('fs');
let c = fs.readFileSync('src/components/ExperiencesSection.tsx', 'utf-8');
c = c.replace(/text-white/g, 'text-stone-900 dark:text-white');
fs.writeFileSync('src/components/ExperiencesSection.tsx', c);
