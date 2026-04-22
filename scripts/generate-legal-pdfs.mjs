import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const PAGE_KEYS = ["datenschutz", "agb"];
const WRAP_WIDTH = 92;

function getProjectRoot() {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

function loadLegalContent(projectRoot) {
  const sourcePath = path.join(projectRoot, "src", "content", "siteContent.js");
  const source = readFileSync(sourcePath, "utf8")
    .replace(/\bimport\.meta\.env\b/g, "__IMPORT_META_ENV__")
    .replace(/^export const /gm, "const ");

  const context = {
    __EXPORTS__: {},
    __IMPORT_META_ENV__: {
      BASE_URL: "/",
      DEV: false,
      VITE_CONTACT_API_URL: "",
      VITE_SITE_URL: "https://teamwork-construction.de",
    },
    Array,
    Boolean,
    Date,
    Math,
    Number,
    Object,
    String,
    URLSearchParams,
  };

  vm.createContext(context);
  vm.runInContext(`${source}\n__EXPORTS__ = { LEGAL_CONTENT };`, context, { filename: sourcePath });

  return context.__EXPORTS__.LEGAL_CONTENT;
}

function wrapText(text, width = WRAP_WIDTH) {
  const normalizedText = String(text || "").trim().replace(/\s+/g, " ");
  if (!normalizedText) return [""];

  const words = normalizedText.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
      continue;
    }

    if (`${currentLine} ${word}`.length <= width) {
      currentLine = `${currentLine} ${word}`;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

function wrapListItem(text, width = WRAP_WIDTH) {
  const wrappedLines = wrapText(text, width - 2);
  return wrappedLines.map((line, index) => `${index === 0 ? "- " : "  "}${line}`);
}

function serializeLegalPage(page) {
  const lines = [page.title, page.subtitle, "", ...wrapText(page.intro), ""];

  for (const section of page.sections) {
    lines.push(section.heading);
    lines.push("");

    for (const paragraph of section.paragraphs || (section.text ? [section.text] : [])) {
      lines.push(...wrapText(paragraph));
      lines.push("");
    }

    for (const item of section.list || []) {
      lines.push(...wrapListItem(item));
      lines.push("");
    }
  }

  return `${lines.join("\n").trim()}\n`;
}

function renderPdfFromText(text, outputPath) {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "teamwork-legal-"));
  const inputPath = path.join(tempDir, "document.txt");

  try {
    writeFileSync(inputPath, text, "utf8");

    const result = spawnSync("cupsfilter", ["-m", "application/pdf", inputPath], {
      encoding: null,
      env: { ...process.env, CUPS_DEBUG_LEVEL: "0" },
    });

    if (result.status !== 0 || !result.stdout?.length) {
      const stderr = result.stderr ? result.stderr.toString("utf8") : "Unbekannter Fehler";
      throw new Error(`PDF-Erzeugung fehlgeschlagen: ${stderr.trim()}`);
    }

    writeFileSync(outputPath, result.stdout);
  } finally {
    rmSync(tempDir, { force: true, recursive: true });
  }
}

function main() {
  const projectRoot = getProjectRoot();
  const legalContent = loadLegalContent(projectRoot);
  const outputDir = path.join(projectRoot, "public", "documents");

  mkdirSync(outputDir, { recursive: true });

  for (const pageKey of PAGE_KEYS) {
    const page = legalContent[pageKey];
    if (!page) {
      throw new Error(`Rechtstext "${pageKey}" wurde nicht gefunden.`);
    }

    const outputPath = path.join(outputDir, `${pageKey}.pdf`);
    renderPdfFromText(serializeLegalPage(page), outputPath);
    console.log(`Erstellt: ${path.relative(projectRoot, outputPath)}`);
  }
}

main();
