import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, copyFile } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/auth";
import { DATA_DIR, ensureDirs } from "@/lib/paths";

const ORIG_FILE = path.join(process.cwd(), "data/portfolio.json");

async function getDataFile() {
  await ensureDirs();
  const f = path.join(DATA_DIR, "portfolio.json");
  try { await readFile(f); } catch { await copyFile(ORIG_FILE, f).catch(() => { writeFile(f, "[]"); }); }
  return f;
}

interface PortfolioItem { id: string; title: string; category: string; description: string; image: string | null; createdAt: string; }

async function read(): Promise<PortfolioItem[]> { return JSON.parse(await readFile(await getDataFile(), "utf-8")); }
async function write(items: PortfolioItem[]) { await writeFile(await getDataFile(), JSON.stringify(items, null, 2)); }

export async function GET() { return NextResponse.json(await read()); }

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  const body = await req.json();
  const items = await read();
  const item: PortfolioItem = { id: Date.now().toString(), title: body.title || "", category: body.category || "Gazon", description: body.description || "", image: body.image || null, createdAt: new Date().toISOString() };
  items.push(item);
  await write(items);
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  const body = await req.json();
  const items = await read();
  const idx = items.findIndex((i) => i.id === body.id);
  if (idx === -1) return NextResponse.json({ error: "Nu există" }, { status: 404 });
  items[idx] = { ...items[idx], ...body };
  await write(items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  const { id } = await req.json();
  const items = (await read()).filter((i) => i.id !== id);
  await write(items);
  return NextResponse.json({ success: true });
}
