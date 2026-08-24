const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

// The line is: <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
content = content.replace(
  '<div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">',
  '<div className="max-w-7xl mx-auto flex flex-wrap justify-end items-center gap-6">' // Removed justify-between, added justify-end, increased gap to 6 between the two inner divs
);

// Second div is: <div className="flex items-center gap-4 ml-auto">
content = content.replace(
  '<div className="flex items-center gap-4 ml-auto">',
  '<div className="flex items-center gap-4">'
);

fs.writeFileSync('src/components/Navbar.tsx', content, 'utf-8');
