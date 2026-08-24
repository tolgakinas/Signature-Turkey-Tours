const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.push('../App.tsx');

const replacements = [
  { regex: /(?<!dark:)bg-stone-900/g, replacement: 'bg-white dark:bg-stone-900' },
  { regex: /(?<!dark:)bg-stone-800/g, replacement: 'bg-stone-100 dark:bg-stone-800' },
  { regex: /(?<!dark:)border-stone-800/g, replacement: 'border-stone-200 dark:border-stone-800' },
  { regex: /(?<!dark:)border-stone-700/g, replacement: 'border-stone-300 dark:border-stone-700' },
  { regex: /(?<!dark:)text-stone-100/g, replacement: 'text-stone-900 dark:text-stone-100' },
  { regex: /(?<!dark:)text-stone-200/g, replacement: 'text-stone-800 dark:text-stone-200' },
  { regex: /(?<!dark:)text-stone-300/g, replacement: 'text-stone-600 dark:text-stone-300' },
  { regex: /(?<!dark:)text-stone-400/g, replacement: 'text-stone-500 dark:text-stone-400' },
  // Be careful with text-white as it's often used on images, but if used on bg-stone-900 it needs to be dark:text-white text-stone-900
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Specific fix for bg-[#0A0E14]
  content = content.replace(/(?<!dark:)bg-\[\#0A0E14\]/g, 'bg-stone-50 dark:bg-[#0A0E14]');
  
  // For text-white, only replace if it's near bg-stone-900 or bg-stone-800 or bg-[#0A0E14], but that's hard. 
  // Let's replace text-white with text-stone-900 dark:text-white ONLY IF it's not inside an absolute positioned overlay (e.g. from-black/80).
  // Actually, we can just replace text-white in specific main sections if it's not a hero image.
  
  replacements.forEach(({regex, replacement}) => {
    content = content.replace(regex, replacement);
  });

  fs.writeFileSync(filePath, content, 'utf-8');
});
console.log('Migration done.');
