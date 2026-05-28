import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export interface Submission {
  id: string;
  createdAt: string;
  status: "new" | "done"; // new = новая, done = обработана
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

const DATA_DIR = join(process.cwd(), "data");
const DB_FILE = join(DATA_DIR, "submissions.json");

function ensureFile() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, "[]", "utf-8");
}

function readAll(): Submission[] {
  ensureFile();
  try {
    return JSON.parse(readFileSync(DB_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function saveSubmission(data: SubmissionInput): Promise<Submission> {
  const submission: Submission = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const all = readAll();
  all.unshift(submission);
  writeFileSync(DB_FILE, JSON.stringify(all, null, 2), "utf-8");
  return submission;
}

export async function getSubmissions(): Promise<Submission[]> {
  return readAll();
}

export async function updateStatus(id: string, status: "new" | "done"): Promise<boolean> {
  const all = readAll();
  const idx = all.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  all[idx].status = status;
  writeFileSync(DB_FILE, JSON.stringify(all, null, 2), "utf-8");
  return true;
}
