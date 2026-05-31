import fs from 'fs';
import path from 'path';

function search(dir, depth=0) {
  if (depth > 8) return;
  if (['/proc', '/sys', '/dev', '/lib', '/lib64', '/boot', 'node_modules', '.git', '/usr/share'].some(p => dir.startsWith(p) || dir.includes(p))) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          search(fullPath, depth+1);
        } else {
          const ext = path.extname(file).toLowerCase();
          if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
            // Print basic stats of every image found outside node_modules
            if (!fullPath.includes('node_modules')) {
              console.log('IMAGE:', fullPath, 'size:', stat.size);
            }
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

search('/');
