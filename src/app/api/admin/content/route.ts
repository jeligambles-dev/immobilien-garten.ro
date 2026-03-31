import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/auth";

const DATA_FILE = path.join(process.cwd(), "data/site-content.json");

export async function GET() {
  const data = await readFile(DATA_FILE, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const body = await req.json();
  const current = JSON.parse(await readFile(DATA_FILE, "utf-8"));

  // Merge only the sections that were sent
  const updated = { ...current, ...body };
  await writeFile(DATA_FILE, JSON.stringify(updated, null, 2));

  return NextResponse.json(updated);
}
