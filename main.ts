// Midnight Fridge Roast — one line roasting a smart fridge that refuses to
// open after midnight. Gate: /output/entry.txt, UTF-8, 1-200 chars, single line.
// The joke is a role reversal: the appliance has a curfew and its owner does not.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

// The line is built as scene + twist: a dark kitchen, a negotiation, then the
// reversal that the fridge — not the human — is the one with the bedtime.
function buildRoast(scene: string, twist: string): string {
  const line = `${scene} ${twist}`;
  return line.replace(/\s+/g, " ").trim();
}

function checkLine(line: string): void {
  if (line.length < 1 || line.length > LIMIT) {
    throw new Error(`fridge roast must be 1-${LIMIT} chars, got ${line.length}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("fridge roast must be a single line");
  }
  if (!/fridge/i.test(line) || !/curfew/i.test(line)) {
    throw new Error("roast must name the fridge and its midnight rule");
  }
  if (!line.endsWith(".")) {
    throw new Error("roast must land on a full stop");
  }
}

const line = buildRoast(
  "I stood in the dark negotiating with a fridge",
  "that has a curfew and I do not."
);
checkLine(line);
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars: ${line}`);
