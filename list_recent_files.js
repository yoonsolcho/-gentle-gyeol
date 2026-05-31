import fs from 'fs';
import path from 'path';

const now = Date.now();

function search(dir, depth=0) {
  if (depth > 6) return;
  if (['/proc', '/sys', '/dev', '/lib', '/lib64', '/boot', '/root', 'node_modules', '.git'].some(p => dir.includes(p))) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          search(fullPath, depth+1);
        } else {
          const ageMin = (now - stat.mtimeMs) / (1000 * 60);
          const ext = path.extname(file).toLowerCase();
          if (ageMin < 240 && (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp')) {
            console.log('FILE:', fullPath, 'size:', stat.size, 'age:', ageMin.toFixed(1), 'm ago');
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

search('.');
if (fs.existsSync('/app')) {
  search('/app');
}
