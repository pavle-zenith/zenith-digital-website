import fs from "node:fs";
import path from "node:path";

/**
 * Intrinsic size of an image in /public, read from its header at build time.
 * PNG, WebP and SVG (by viewBox); anything else, or a missing file, is null.
 * Server-only: it reads the file system.
 */
export function publicImageSize(src: string): { width: number; height: number } | null {
  try {
    const file = path.join(process.cwd(), "public", decodeURI(src).replace(/^\//, ""));
    const buf = fs.readFileSync(file);

    // PNG: width and height are the first two fields of the IHDR chunk.
    if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }

    // WebP: three container variants, each storing the size differently.
    if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
      const chunk = buf.toString("ascii", 12, 16);
      if (chunk === "VP8X") {
        return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
      }
      if (chunk === "VP8 ") {
        return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
      }
      if (chunk === "VP8L") {
        const bits = buf.readUInt32LE(21);
        return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
      }
    }

    // SVG: the last two numbers of the viewBox.
    const viewBox = buf
      .toString("utf8", 0, 4096)
      .match(/viewBox=["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*["']/);
    if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
  } catch {
    // Missing or unreadable: the caller falls back.
  }
  return null;
}
