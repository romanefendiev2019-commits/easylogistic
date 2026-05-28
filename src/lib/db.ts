/**
 * База данных:
 * - Локально (без DATABASE_URL) → JSON-файл data/submissions.json
 * - На Vercel (с DATABASE_URL от Neon) → PostgreSQL через @neondatabase/serverless
 */

export interface Submission {
  id: string;
  createdAt: string;
  status: "new" | "done";
  name: string;
  email: string;
  phone: string;
  containerType: string;
  quantity: string;
  portFrom: string;
  portTo: string;
  specialCargo: string;
  message: string;
}

export type SubmissionInput = Omit<Submission, "id" | "createdAt" | "status">;

// ─── Neon (продакшен) ────────────────────────────────────────────────────────

async function getNeon() {
  const { neon } = await import("@neondatabase/serverless");
  return neon(process.env.DATABASE_URL!);
}

async function ensureTable() {
  const sql = await getNeon();
  await sql`
    CREATE TABLE IF NOT EXISTS submissions (
      id            TEXT PRIMARY KEY,
      created_at    TEXT NOT NULL,
      status        TEXT NOT NULL DEFAULT 'new',
      name          TEXT NOT NULL,
      email         TEXT NOT NULL,
      phone         TEXT NOT NULL,
      container_type TEXT DEFAULT '',
      quantity      TEXT DEFAULT '',
      port_from     TEXT DEFAULT '',
      port_to       TEXT DEFAULT '',
      special_cargo TEXT DEFAULT '',
      message       TEXT DEFAULT ''
    )
  `;
}

// ─── JSON-файл (локально) ────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const DB_FILE = join(DATA_DIR, "submissions.json");

function ensureFile() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, "[]", "utf-8");
}

function readAll(): Submission[] {
  ensureFile();
  try { return JSON.parse(readFileSync(DB_FILE, "utf-8")); }
  catch { return []; }
}

// ─── Публичные функции ───────────────────────────────────────────────────────

export async function saveSubmission(data: SubmissionInput): Promise<Submission> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  if (process.env.DATABASE_URL) {
    await ensureTable();
    const sql = await getNeon();
    await sql`
      INSERT INTO submissions
        (id, created_at, status, name, email, phone, container_type, quantity, port_from, port_to, special_cargo, message)
      VALUES
        (${id}, ${createdAt}, 'new', ${data.name}, ${data.email}, ${data.phone},
         ${data.containerType}, ${data.quantity}, ${data.portFrom}, ${data.portTo},
         ${data.specialCargo}, ${data.message})
    `;
    return { ...data, id, createdAt, status: "new" };
  }

  const submission: Submission = { ...data, id, createdAt, status: "new" };
  const all = readAll();
  all.unshift(submission);
  writeFileSync(DB_FILE, JSON.stringify(all, null, 2), "utf-8");
  return submission;
}

export async function getSubmissions(): Promise<Submission[]> {
  if (process.env.DATABASE_URL) {
    await ensureTable();
    const sql = await getNeon();
    const rows = await sql`SELECT * FROM submissions ORDER BY created_at DESC`;
    return rows.map((r) => ({
      id: r.id as string,
      createdAt: r.created_at as string,
      status: (r.status as "new" | "done") ?? "new",
      name: r.name as string,
      email: r.email as string,
      phone: r.phone as string,
      containerType: r.container_type as string,
      quantity: r.quantity as string,
      portFrom: r.port_from as string,
      portTo: r.port_to as string,
      specialCargo: r.special_cargo as string,
      message: r.message as string,
    }));
  }
  return readAll();
}

export async function updateStatus(id: string, status: "new" | "done"): Promise<boolean> {
  if (process.env.DATABASE_URL) {
    await ensureTable();
    const sql = await getNeon();
    await sql`UPDATE submissions SET status = ${status} WHERE id = ${id}`;
    return true;
  }

  const all = readAll();
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  all[idx].status = status;
  writeFileSync(DB_FILE, JSON.stringify(all, null, 2), "utf-8");
  return true;
}
