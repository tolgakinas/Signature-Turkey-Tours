const fs = require('fs');
const path = require('path');

const dirs = ['./src/components', './src/components/admin', './src'];

const replacements = [
  // Borders
  { regex: /(?<!dark:)border-white\/5/g, replacement: 'border-stone-200 dark:border-white/5' },
  { regex: /(?<!dark:)border-white\/10/g, replacement: 'border-stone-200 dark:border-white/10' },
  { regex: /(?<!dark:)border-white\/15/g, replacement: 'border-stone-200 dark:border-white/15' },
  { regex: /(?<!dark:)border-white\/20/g, replacement: 'border-stone-200 dark:border-white/20' },
  
  // Backgrounds
  { regex: /(?<!dark:)bg-\[\#161C24\]/g, replacement: 'bg-white dark:bg-[#161C24]' },
  { regex: /(?<!dark:)bg-\[\#0A0E14\]/g, replacement: 'bg-stone-50 dark:bg-[#0A0E14]' },
  { regex: /(?<!dark:)bg-\[\#212936\]/g, replacement: 'bg-stone-100 dark:bg-[#212936]' },
  
  // Text Colors
  { regex: /(?<!dark:)text-\[\#0A0E14\]/g, replacement: 'text-stone-900 dark:text-[#0A0E14]' },
  { regex: /(?<!dark:)text-\[\#FDFCF8\]/g, replacement: 'text-stone-900 dark:text-[#FDFCF8]' },
  { regex: /(?<!dark:)text-\[\#D4AF37\]/g, replacement: 'text-amber-600 dark:text-[#D4AF37]' },
  { regex: /(?<!dark:)border-\[\#D4AF37\]/g, replacement: 'border-amber-600 dark:border-[#D4AF37]' },
  { regex: /(?<!dark:)bg-\[\#D4AF37\]/g, replacement: 'bg-amber-500 dark:bg-[#D4AF37]' },
  
  // Specific fix for text-white that are actually body texts
  // (We skip this via regex because it's too risky to replace ALL text-white, but we can do text-stone-900 dark:text-white where appropriate)
];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
       // do nothing
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let originalContent = content;
      
      replacements.forEach(({regex, replacement}) => {
        content = content.replace(regex, replacement);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf-8');
      }
    }
  });
}

dirs.forEach(processDir);
console.log("Optimization complete");
