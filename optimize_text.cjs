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
      
      // Look for text-white that should probably be dark:text-white
      // But avoid replacing text-white inside buttons, badges, gradients, or absolute positioned elements
      // A common pattern is `<h2 className="... text-white ...">` or `<h3...text-white...>` or `<h4...text-white...>`
      // and `<div className="... text-white ...">`
      
      // Let's just do a smart regex for text-white inside h1, h2, h3, h4, span, div, p where bg- is not prominent
      content = content.replace(/text-white(?!\/)/g, 'text-stone-900 dark:text-white');
      
      // Revert text-white if it's over an image gradient (absolute), emerald, blue, indigo, purple, amber, etc
      content = content.replace(/(from-\w+-\d+|bg-\w+-\d+)[^"']*(text-stone-900 dark:text-white)/g, (match) => {
         return match.replace('text-stone-900 dark:text-white', 'text-white');
      });
      content = content.replace(/(bg-gradient-to-[a-z]+)[^"']*(text-stone-900 dark:text-white)/g, (match) => {
         return match.replace('text-stone-900 dark:text-white', 'text-white');
      });
      // Revert text-white inside button
      content = content.replace(/<button[^>]*>[\s\S]*?<\/button>/g, (match) => {
         return match.replace(/text-stone-900 dark:text-white/g, 'text-white');
      });

      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

dirs.forEach(processDir);
