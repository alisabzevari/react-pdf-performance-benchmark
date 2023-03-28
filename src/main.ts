import { pdfPupeteer } from "./pdf-pupeteer";
import { performance } from "node:perf_hooks";
import { pdfReact } from "./pdf-react";

async function main() {
  for (let i = 0; i < 10; i++) {
    console.log(`Round: ${i}`);

    const pT0 = performance.now();
    const pupeteerPdf = await pdfPupeteer();
    const pT1 = performance.now();
    console.log(`Pupeteer: ${pT1 - pT0} milliseconds.`);

    const rT0 = performance.now();
    const reactPdf = await pdfReact();
    const rT1 = performance.now();
    console.log(`React: ${rT1 - rT0} milliseconds.`);
  }
}

main().catch(console.log);
