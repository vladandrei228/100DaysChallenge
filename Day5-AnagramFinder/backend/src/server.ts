import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 3001);
const CACHE_TTL_MS = 1000 * 60 * 5;

// simple cache: normalizedWord -> { result: string[], ts: number }
const cache = new Map<string, { result: string[]; ts: number }>();

function normalize(w: string) { return w.trim().toLowerCase(); }
function isAlpha(w: string) { return /^[a-z]+$/.test(w); }

// ---------- load words.txt (must exist) ----------
let localWords: string[] | null = null;
const localPath = path.join(__dirname, "../data/words.txt");
try {
  if (fs.existsSync(localPath)) {
    const raw = fs.readFileSync(localPath, "utf8");
    // keep only lowercase alpha-only words, unique
    localWords = Array.from(new Set(raw.split(/\r?\n/).map(s => s.trim().toLowerCase()).filter(Boolean)));
    console.log(`Loaded local words: ${localWords.length}`);
  } else {
    console.warn("No backend/data/words.txt found. Put your wordlist there.");
  }
} catch (err) {
  console.error("Failed to load local words:", err);
}

// ---------- TODO: Build signature map for fast lookup ----------
// Idea: for each word in localWords, compute signature (sorted chars) -> push word
// Example: signatureMap: Map<string, string[]>
let signatureMap: Map<string, string[]> | null = null;

// TODO: implement buildSignatureMap() that sets signatureMap efficiently
function buildSignatureMap() {
  // TODO: implement: iterate localWords, for each word compute sig
  // push into map; after building you can quickly compute anagrams by signatureMap.get(sig)
  signatureMap = new Map();
  if (!localWords) return;
  // <<< YOU IMPLEMENT THIS >>>
  for(const w of localWords){
    const sig = w.split('').sort().join('');
    if(signatureMap.has(sig)){
      signatureMap.get(sig)?.push(w);
    }else{
      signatureMap.set(sig, [w]);
    }
  }
}

// Build on startup if words loaded
if (localWords) buildSignatureMap();

// ---------- helper: compute local anagrams ----------
function computeAnagramsLocal(word: string, limit = 100): string[] {
  // TODO: implement using signatureMap:
  // - compute signature for `word`
  // - lookup candidates = signatureMap.get(sig) || []
  // - filter out identical word, ensure alpha-only, dedupe, sort
  // - return up to `limit`
  if(!signatureMap){
    return [];
  }
  const sig = word.split('').sort().join('');
  const candidates = signatureMap?.get(sig) || [];
  const res = candidates.filter(w => w !== word).filter(isAlpha).filter((w, i, arr) => arr.indexOf(w) === i).slice(0, limit);

  return res;
}

app.get("/", async (req, res) => {
    return res.send("Running...")
})

// ---------- API route ----------
/**
 * GET /api/anagrams?word=<w>&limit=<n>&source=local|remote|auto
 *
 * TODOs:
 * - Validate input (letters only, length >= 2)
 * - Check cache and return cached result if fresh
 * - If source=local or (source=auto && localWords exists) -> compute local anagrams
 * - Else call remote Datamuse using fetch (optional)
 * - Dedupe/sort results, cache them, and return JSON
 */
app.get("/api/anagrams", async (req, res) => {
  try {
    const raw = (req.query.word as string) || "";
    const limitParam = parseInt((req.query.limit as string) || "100", 10);
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(1000, limitParam) : 100;
    const pref = (req.query.source as string) || "auto"; // local|remote|auto

    const word = normalize(raw);
    if (!word || word.length < 2) return res.status(400).json({ error: "Provide a word (min 2 letters)." });
    if (!isAlpha(word)) return res.status(400).json({ error: "Letters a-z only." });

    // TODO: 1) cache lookup 
    const cached =cache.get(word);
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
  return res.json({
    source: "cache",
    word,
    anagrams: cached.result.slice(0, limit),
  });
}

    // TODO: 2)compute local via computeAnagramsLocal

    if (pref === "local" || (pref === "auto" && localWords)) {
  const localRes = computeAnagramsLocal(word, limit);

  // save in cache
  cache.set(word, { result: localRes, ts: Date.now() });

  return res.json({
    source: "local",
    word,
    anagrams: localRes,
  });
}



    return res.json({ source: "unsolved", word, anagrams: [] });
  } catch (err) {
    console.error("Error /api/anagrams:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/_clear-cache", (_req, res) => { cache.clear(); res.json({ ok: true }); });
app.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.listen(PORT, () => console.log(`Backend listening at http://localhost:${PORT}`));
