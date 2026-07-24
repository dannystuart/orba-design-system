/** Headless interaction checks for /components/inputs. */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${base}/components/inputs`, { waitUntil: "networkidle" });
  const results: string[] = [];
  const check = (name: string, ok: boolean) => {
    results.push(`${ok ? "PASS" : "FAIL"} ${name}`);
  };

  // Focus treatment on text field
  const email = page.getByLabel("Email address").first();
  const borderBefore = await email.evaluate((el) => getComputedStyle(el).borderColor);
  await email.click();
  const borderAfter = await email.evaluate((el) => getComputedStyle(el).borderColor);
  check("text field focus changes border colour", borderBefore !== borderAfter);

  // Select opens and chooses
  const ambient = page.getByRole("button", { name: "Ambient sound" });
  await ambient.click();
  check("select opens listbox", await page.getByRole("listbox").isVisible());
  await page.getByRole("option", { name: "Night Rain" }).click();
  check("select chooses option", (await ambient.textContent())?.includes("Night Rain") === true);

  // Toggle flips
  const toggle = page.getByRole("switch").nth(1); // "Do not disturb"
  const before = await toggle.isChecked();
  await toggle.click({ force: true });
  check("toggle flips on click", (await toggle.isChecked()) !== before);

  // Slider keyboard
  const thumb = page.getByRole("slider", { name: "Daily goal" });
  await thumb.focus();
  const beforeVal = Number(await thumb.getAttribute("aria-valuenow"));
  await page.keyboard.press("ArrowRight");
  const afterVal = Number(await thumb.getAttribute("aria-valuenow"));
  check("slider arrow key nudges value", afterVal === beforeVal + 1);

  // Slider drag
  const track = thumb;
  const box = await track.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + box.height / 2, { steps: 8 });
    await page.mouse.up();
  }
  const dragged = Number(await thumb.getAttribute("aria-valuenow"));
  check("slider drag moves value", dragged > afterVal);

  // Segmented control
  await page.getByRole("radio", { name: "Month" }).click();
  check(
    "segmented control selects",
    (await page.getByRole("radio", { name: "Month" }).getAttribute("aria-checked")) === "true",
  );

  await page.screenshot({ path: "docs/review/chunk-3/inputs-after-interactions.png", fullPage: true });
  await browser.close();
  console.log(results.join("\n"));
  if (results.some((r) => r.startsWith("FAIL"))) process.exit(1);
}

main();
