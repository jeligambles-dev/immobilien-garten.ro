import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, copyFile } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/auth";
import { DATA_DIR, ensureDirs } from "@/lib/paths";

const ORIG_FILE = path.join(process.cwd(), "data/site-content.json");

async function getDataFile() {
  await ensureDirs();
  const f = path.join(DATA_DIR, "site-content.json");
  try { await readFile(f); } catch { await copyFile(ORIG_FILE, f).catch(() => { writeFile(f, "{}"); }); }
  return f;
}

export async function GET() {
  return NextResponse.json(JSON.parse(await readFile(await getDataFile(), "utf-8")));
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  const body = await req.json();
  const current = JSON.parse(await readFile(await getDataFile(), "utf-8"));
  const updated = { ...current, ...body };
  await writeFile(await getDataFile(), JSON.stringify(updated, null, 2));
  return NextResponse.json(updated);
}
