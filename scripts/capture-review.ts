/**
 * Verification sweep: full-page screenshots of every docs page at desktop and
 * phone sizes. Usage: pnpm tsx scripts/capture-review.ts <baseUrl> <outDir>
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "docs/review/chunk-1";

const pages: Array<[name: string, path: string]> = [
  ["home", "/"],
  ["philosophy", "/foundations/philosophy"],
  ["colour", "/foundations/colour"],
  ["typography", "/foundations/typography"],
  ["spacing", "/foundations/spacing"],
  ["shape", "/foundations/shape"],
  ["motion", "/foundations/motion"],
  ["buttons", "/components/buttons"],
  ["icons", "/components/icons"],
];

const viewports = [
  { tag: "desktop", width: 1440, height: 900 },
  { tag: "mobile", width: 390, height: 844 },
];

async function main() {
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    for (const [name, path] of pages) {
      await page.goto(base + path, { waitUntil: "networkidle" });
      await page.waitForTimeout(800);
      await page.screenshot({
        path: `${outDir}/${name}-${vp.tag}.png`,
        fullPage: true,
      });
      console.log(`captured ${name}-${vp.tag}`);
    }
    await ctx.close();
  }
  await browser.close();
}

main();
