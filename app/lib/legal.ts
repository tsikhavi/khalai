import fs from 'node:fs';
import path from 'node:path';

const LEGAL_DIR = path.join(process.cwd(), 'app', 'content', 'legal');

export type LegalDocument = 'terms' | 'privacy';

/**
 * Read the raw MDX source for a legal document in the requested locale.
 * Falls back to the English base file if the locale-specific file is missing.
 */
export function getLegalSource(doc: LegalDocument, locale: string): string {
  const candidates = [
    path.join(LEGAL_DIR, `${doc}.${locale}.mdx`),
    path.join(LEGAL_DIR, `${doc}.mdx`),
  ];

  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) {
    throw new Error(
      `[legal] Missing content file for "${doc}". Looked in ${LEGAL_DIR}`
    );
  }

  return fs.readFileSync(filePath, 'utf8');
}
