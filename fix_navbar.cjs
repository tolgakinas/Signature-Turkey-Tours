const fs = require('fs');
let c = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
c = c.replace(/bg-white dark:bg-stone-900\/95 backdrop-blur-md shadow-md text-white/g, 'bg-white dark:bg-stone-900/95 backdrop-blur-md shadow-md text-stone-900 dark:text-white');
c = c.replace(/bg-white dark:bg-stone-900 text-white/g, 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white');
fs.writeFileSync('src/components/Navbar.tsx', c);
