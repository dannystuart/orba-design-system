/**
 * Downloads Satoshi from Fontshare on first install/build.
 *
 * The font files are deliberately NOT committed: Fontshare's Free Font Licence
 * permits using Satoshi in projects but not redistributing the font files, so
 * a public repo must fetch them at build time instead.
 */
import AdmZip from "adm-zip";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FONT_DIR = "src/fonts";
const WANTED = ["Satoshi-Variable.woff2", "Satoshi-VariableItalic.woff2"];
const LICENCE = "FFL.txt";
const ZIP_URL = "https://api.fontshare.com/v2/fonts/download/satoshi";

async function main() {
  if (WANTED.every((f) => existsSync(join(FONT_DIR, f)))) {
    console.log("[fonts] Satoshi already present — skipping download");
    return;
  }
  console.log("[fonts] downloading Satoshi from Fontshare…");
  const res = await fetch(ZIP_URL);
  if (!res.ok) {
    throw new Error(
      `[fonts] Fontshare download failed (${res.status}). Download Satoshi manually from https://www.fontshare.com/fonts/satoshi and place ${WANTED.join(", ")} in ${FONT_DIR}/`,
    );
  }
  const zip = new AdmZip(Buffer.from(await res.arrayBuffer()));
  mkdirSync(FONT_DIR, { recursive: true });
  let found = 0;
  for (const entry of zip.getEntries()) {
    const base = entry.entryName.split("/").pop() ?? "";
    if (WANTED.includes(base) || base === LICENCE) {
      writeFileSync(join(FONT_DIR, base), entry.getData());
      found++;
    }
  }
  if (found < WANTED.length) {
    throw new Error("[fonts] expected font files missing from Fontshare zip");
  }
  console.log(`[fonts] installed ${found} files into ${FONT_DIR}/`);
}

main();
