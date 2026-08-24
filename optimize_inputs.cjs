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
      
      content = content.replace(/(bg-stone-50 dark:bg-\[\#0A0E14\][^>]*?)(text-white)/g, '$1text-stone-900 dark:text-white');
      
      // also replace in App.tsx or generic inputs where bg-white dark:bg-[#161C24] is used with text-white
      content = content.replace(/(bg-white dark:bg-\[\#161C24\][^>]*?)(text-white)/g, '$1text-stone-900 dark:text-white');
      
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

dirs.forEach(processDir);
