const fs = require('fs');
const path = require('path');

const dirs = ['./src/components', './src/components/admin', './src'];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
       // do nothing
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      content = content.replace(/hover:bg-white dark:bg-\[\#161C24\]/g, 'hover:bg-stone-50 dark:hover:bg-[#161C24]');
      content = content.replace(/hover:bg-stone-100 dark:bg-\[\#212936\]/g, 'hover:bg-stone-200 dark:hover:bg-[#212936]');
      content = content.replace(/hover:bg-amber-500 dark:bg-\[\#D4AF37\]/g, 'hover:bg-amber-500 dark:hover:bg-[#D4AF37]');
      content = content.replace(/hover:text-stone-900 dark:text-\[\#0A0E14\]/g, 'hover:text-stone-900 dark:hover:text-[#0A0E14]');
      content = content.replace(/hover:bg-stone-100 dark:bg-stone-800/g, 'hover:bg-stone-200 dark:hover:bg-stone-800');
      content = content.replace(/hover:bg-white dark:bg-stone-900/g, 'hover:bg-stone-50 dark:hover:bg-stone-900');
      
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

dirs.forEach(processDir);
