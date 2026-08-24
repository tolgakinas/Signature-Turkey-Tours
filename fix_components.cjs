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
      
      // Fix doubled dark: classes
      content = content.replace(/text-stone-900 dark:text-stone-900 dark:text-white/g, 'text-stone-900 dark:text-white');
      
      // Fix bg-stone-950 missing light variant
      content = content.replace(/(?<!dark:)bg-stone-950(?!\/)/g, 'bg-white dark:bg-stone-950');

      // Fix text-white inside buttons (in some cases they became text-stone-900 dark:text-white)
      // Actually we reverted that earlier, but let's make sure.
      
      // Let's also ensure `bg-amber-500/20` and `text-amber-300` have good contrast.
      // Usually `text-amber-300` on light mode is unreadable, it should be `text-amber-700 dark:text-amber-300`
      content = content.replace(/(?<!dark:)text-amber-400(?!\/)/g, 'text-amber-600 dark:text-amber-400');
      content = content.replace(/(?<!dark:)text-amber-300(?!\/)/g, 'text-amber-700 dark:text-amber-300');
      content = content.replace(/(?<!dark:)text-emerald-400(?!\/)/g, 'text-emerald-700 dark:text-emerald-400');
      
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

dirs.forEach(processDir);
