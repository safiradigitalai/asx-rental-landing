const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing paths for HostGator deployment...');

function fixPaths(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Fix _next paths
  html = html.replace(/href="\/_next\//g, 'href="./_next/');
  html = html.replace(/src="\/_next\//g, 'src="./_next/');
  
  // Fix asset paths
  html = html.replace(/src="\/logo\.png"/g, 'src="./logo.png"');
  html = html.replace(/src="\/suburban-certa\.jpeg"/g, 'src="./suburban-certa.jpeg"');
  html = html.replace(/href="\/favicon\.ico"/g, 'href="./favicon.ico"');
  
  // Fix any other absolute paths (but not external URLs)
  html = html.replace(/href="\/([^\/][^"]*)"(?![^>]*http)/g, 'href="./$1"');
  html = html.replace(/src="\/([^\/][^"]*)"(?![^>]*http)/g, 'src="./$1"');
  
  fs.writeFileSync(filePath, html);
  console.log(`✅ Fixed: ${path.basename(filePath)}`);
}

// Fix main files
fixPaths(path.join(__dirname, 'out', 'index.html'));
fixPaths(path.join(__dirname, 'out', '404.html'));

// Fix any HTML files in subdirectories
function fixAllHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.startsWith('_next')) {
      fixAllHtmlFiles(fullPath);
    } else if (file.endsWith('.html')) {
      fixPaths(fullPath);
    }
  });
}

fixAllHtmlFiles(path.join(__dirname, 'out'));

console.log('✅ All paths fixed for HostGator!');
console.log('📁 Ready to upload "out" folder contents to HostGator public_html');