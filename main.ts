// The Word You'd Delete From the Dictionary — make.fun entry.
// Writes the one word to erase from the dictionary forever to
// /output/entry.txt. Node 24, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// A nonsense meme word that somehow made it into the dictionary.
// Erasing it restores order: no caption needed, the word is the joke.
const word = "skibidi";

// Gate: the sealed scorer only accepts 1-77 UTF-8 characters of text
// that is not only whitespace, and the judge only reads one word, so
// any whitespace at all — inside the word or around it — is refused.
const bytes = Buffer.byteLength(word, "utf8");
if (
  word.length < 1 ||
  word.length > 77 ||
  bytes > 77 ||
  word.trim().length === 0 ||
  word.trim().split(/\s+/).length !== 1 ||
  /\s/.test(word)
) {
  throw new Error(
    `word fails the gate (${word.length} chars, ${bytes} bytes)`,
  );
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the word, nothing added.
writeFileSync("/output/entry.txt", word, "utf8");

// Read back what was written: the file the judge sees must be the word,
// byte for byte, with nothing extra.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== word || Buffer.byteLength(written, "utf8") !== bytes) {
  throw new Error("entry.txt does not match the word");
}

console.log(`wrote ${word.length}-character word to /output/entry.txt`);
