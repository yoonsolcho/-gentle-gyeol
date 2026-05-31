import fs from 'fs';
import path from 'path';

function listHex(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        listHex(fullPath);
      } else {
        console.log('FILE:', fullPath);
        console.log('  Normal:', file);
        console.log('  Normalized NFC:', file.normalize('NFC'));
        console.log('  Normalized NFD:', file.normalize('NFD'));
        console.log('  Is NFC?:', file === file.normalize('NFC'));
        console.log('  Is NFD?:', file === file.normalize('NFD'));
        const hex = Buffer.from(file).toString('hex');
        console.log('  Hex:', hex);
      }
    }
  } catch (e) {}
}

listHex('./public/assets/products');
