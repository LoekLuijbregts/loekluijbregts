import type { Config } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// Gangenbord voor /NYE/ (oud en nieuw 2026-2027 bij Irina en Loek).
// Iedereen kan zich aanmelden zonder account. Wie zich aanmeldt krijgt een eigen sleutel terug
// waarmee hij zijn eigen regel weer kan weghalen. De gastheer beheert alles met de beheersleutel;
// hieronder staat alleen de SHA-256-hash daarvan, de sleutel zelf staat nergens in de repo.
//
// GET    /api/nye                 -> { entries, teksten }
// POST   /api/nye                 -> nieuwe aanmelding, geeft { id, token }
// DELETE /api/nye?id=...          -> header x-nye-token (eigen regel) of x-nye-beheer
// PUT    /api/nye?teksten=1       -> fototeksten opslaan, header x-nye-beheer
// GET    /api/nye?beheer=1        -> { ok } controleert de beheersleutel

const BEHEER_HASH = "ab7d82b3eb1c5736aa62f2cc67f006cdaaaf535eabb87492ba7fa5447bcf2489";
const GANGEN = ["amuse", "voor", "hoofd", "tussen", "na"];
const MAX_ENTRIES = 120;
const PREFIX = "a/";

type Entry = {
  id: string;
  naam: string;
  personen: number;
  gang: string;
  gerecht: string;
  drank: string;
  t: number;
  tokenHash: string;
};

const store = () => getStore({ name: "nye-2026", consistency: "strong" });

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function randomId(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(36).padStart(2, "0")).join("").slice(0, bytes * 2);
}

async function isBeheer(req: Request): Promise<boolean> {
  const key = req.headers.get("x-nye-beheer");
  if (!key) return false;
  return (await sha256(key)) === BEHEER_HASH;
}

const noStore = { "cache-control": "no-store" };

async function listEntries() {
  const s = store();
  const { blobs } = await s.list({ prefix: PREFIX });
  const all = await Promise.all(blobs.map((b) => s.get(b.key, { type: "json" }) as Promise<Entry | null>));
  return all
    .filter((e): e is Entry => !!e)
    .sort((a, b) => a.t - b.t)
    .map(({ tokenHash, ...publiek }) => publiek);
}

export default async (req: Request) => {
  const url = new URL(req.url);
  const s = store();

  try {
    if (req.method === "GET") {
      if (url.searchParams.has("beheer")) {
        return Response.json({ ok: await isBeheer(req) }, { headers: noStore });
      }
      const [entries, teksten] = await Promise.all([listEntries(), s.get("teksten", { type: "json" })]);
      return Response.json({ entries, teksten: teksten ?? {} }, { headers: noStore });
    }

    if (req.method === "POST") {
      let body: Record<string, unknown>;
      try {
        body = await req.json();
      } catch {
        return Response.json({ error: "bad_request" }, { status: 400 });
      }
      // Honeypot: echte gasten vullen dit veld nooit in.
      if (clean(body.website, 10)) return Response.json({ id: "ok", token: "" }, { status: 201 });

      const naam = clean(body.naam, 60);
      const gang = clean(body.gang, 10);
      const personen = Math.max(1, Math.min(12, parseInt(String(body.personen), 10) || 1));
      if (!naam) return Response.json({ error: "naam" }, { status: 422 });
      if (!GANGEN.includes(gang)) return Response.json({ error: "gang" }, { status: 422 });

      const { blobs } = await s.list({ prefix: PREFIX });
      if (blobs.length >= MAX_ENTRIES) return Response.json({ error: "vol" }, { status: 429 });

      const id = Date.now().toString(36) + randomId(4);
      const token = randomId(12);
      const entry: Entry = {
        id,
        naam,
        personen,
        gang,
        gerecht: clean(body.gerecht, 80),
        drank: clean(body.drank, 80),
        t: Date.now(),
        tokenHash: await sha256(token),
      };
      await s.setJSON(PREFIX + id, entry);
      return Response.json({ id, token }, { status: 201, headers: noStore });
    }

    if (req.method === "DELETE") {
      const id = clean(url.searchParams.get("id"), 40);
      if (!id || !/^[a-z0-9]+$/.test(id)) return Response.json({ error: "id" }, { status: 400 });
      const entry = (await s.get(PREFIX + id, { type: "json" })) as Entry | null;
      if (!entry) return Response.json({ ok: true }, { headers: noStore });
      const token = req.headers.get("x-nye-token") || "";
      const eigen = token && (await sha256(token)) === entry.tokenHash;
      if (!eigen && !(await isBeheer(req))) return Response.json({ error: "forbidden" }, { status: 403 });
      await s.delete(PREFIX + id);
      return Response.json({ ok: true }, { headers: noStore });
    }

    if (req.method === "PUT" && url.searchParams.has("teksten")) {
      if (!(await isBeheer(req))) return Response.json({ error: "forbidden" }, { status: 403 });
      let body: Record<string, unknown>;
      try {
        body = await req.json();
      } catch {
        return Response.json({ error: "bad_request" }, { status: 400 });
      }
      const teksten: Record<string, string> = {};
      for (const [k, v] of Object.entries(body ?? {})) {
        if (/^[a-z0-9-]{1,40}$/.test(k)) teksten[k] = clean(v, 200);
      }
      await s.setJSON("teksten", teksten);
      return Response.json({ ok: true, teksten }, { headers: noStore });
    }

    return new Response("Method not allowed", { status: 405 });
  } catch (err) {
    console.error("nye", err);
    return Response.json({ error: "failed" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/nye",
};
