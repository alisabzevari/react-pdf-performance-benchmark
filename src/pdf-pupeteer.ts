import * as puppeteer from "puppeteer";
import * as fs from "node:fs";

export async function pdfPupeteer() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.setContent("<html></html>", { waitUntil: "networkidle0" });

  await page.emulateMediaType("print");
  const pdfBuffer = await page.pdf({ preferCSSPageSize: true });

  await browser.close();

  return Buffer.toString();
  // fs.writeFileSync("example-pupeteer.pdf", pdfBuffer);
}
