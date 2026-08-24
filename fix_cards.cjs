const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.push('../App.tsx');

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  
  content = content.replace(/(?<!dark:)bg-\[\#161C24\]/g, 'bg-white dark:bg-[#161C24]');
  // Also text-white in App.tsx might need dark:text-white
  if (file === '../App.tsx') {
      content = content.replace(/text-white/g, 'text-stone-900 dark:text-white');
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
});
