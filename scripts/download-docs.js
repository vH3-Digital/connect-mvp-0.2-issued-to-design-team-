import { readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create docs directory if it doesn't exist
const docsDir = join(dirname(__dirname), 'docs');
if (!existsSync(docsDir)) {
  mkdirSync(docsDir);
}

// Read the documentation file
const docPath = join(docsDir, 'VH3Connect.md');
const content = readFileSync(docPath, 'utf8');

console.log('Documentation is ready in the docs folder.');
console.log('You can find it at:', docPath);