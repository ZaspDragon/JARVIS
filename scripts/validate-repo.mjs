import { readFile, stat } from 'node:fs/promises';

const requiredFiles = [
  'README.md',
  'AGENTS.md',
  '.env.example',
  '.gitignore',
  'docs/ARCHITECTURE.md',
  'docs/ROADMAP.md',
  'supabase/migrations/0001_jarvis_core.sql'
];

const forbiddenPatterns = [
  /SUPABASE_SERVICE_ROLE_KEY\s*=\s*\S+/i,
  /OPENAI_API_KEY\s*=\s*sk-[A-Za-z0-9_-]+/i,
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/
];

const failures = [];

for (const path of requiredFiles) {
  try {
    await stat(path);
  } catch {
    failures.push(`Missing required file: ${path}`);
  }
}

for (const path of requiredFiles.filter((path) => !path.endsWith('.sql'))) {
  try {
    const content = await readFile(path, 'utf8');
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(content)) failures.push(`Possible secret detected in ${path}`);
    }
  } catch {
    // Missing files are reported above.
  }
}

if (failures.length) {
  console.error('JARVIS repository validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('JARVIS repository validation passed.');
