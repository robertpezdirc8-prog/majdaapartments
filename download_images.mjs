// Prenos vseh slik in videa z GitHub Pages strani River Kolpa Apartments
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(import.meta.dirname, "img");
mkdirSync(outDir, { recursive: true });

const BASE = "https://robertpezdirc8-prog.github.io/riverkolpapartments/assets/";
const names = [
  // vrt / hiša 70
  "terasa-studio","letna-kuhinja","pergola-vrt","letna-kuhinja-detajl","miza-pergola",
  "terasa-pregled","jacuzzi-terasa","gugal","vrt-05",
  // notranjost 70
  "noter-01","noter-02","noter-03","hodnik-kisa","noter-10","soba-main","soba-otroci","soba-kisa",
  // izkušnje
  "miza","izkus-01","vrt-pregled","masazna-kad","uta-dan","noc","vrt-lezniki","uta-noc",
  // 30 b
  "zunanjost-30b","travnik-30b","kopalnica-30b","soba-30b-a","soba-30b-b","soba-30b-c",
  "kuhinja-30b","hodnik-30b",
  // reka
  "reka-01","reka-02","reka-03","reka-04","reka-05","reka-06","reka-07","reka-08",
  // posebni
  "poster"
];
const extra = [
  ["deljena-1200x630.jpg", "https://robertpezdirc8-prog.github.io/riverkolpapartments/assets/deljena-1200x630.jpg"],
  ["kolpa-ozadje.mp4", "https://robertpezdirc8-prog.github.io/riverkolpapartments/assets/kolpa-ozadje.mp4"],
];

const results = [];
for (const n of names) {
  try {
    const res = await fetch(BASE + n + ".webp");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) throw new Error("premajhna: " + buf.length);
    writeFileSync(join(outDir, n + ".webp"), buf);
    results.push(`${n}.webp OK ${(buf.length/1024).toFixed(0)} KB`);
  } catch (e) { results.push(`${n}.webp FAIL ${e.message}`); }
}
for (const [name, url] of extra) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(outDir, name), buf);
    results.push(`${name} OK ${(buf.length/1024).toFixed(0)} KB`);
  } catch (e) { results.push(`${name} FAIL ${e.message}`); }
}
console.log(results.join("\n"));
