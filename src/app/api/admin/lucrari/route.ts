import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/auth";

const DATA_FILE = path.join(process.cwd(), "data/lucrari.json");

interface Lucrare {
  id: string;
  title: string;
  description: string;
  photos: string[];
  services: string[];
  location: string;
  createdAt: string;
}

async function read(): Promise<Lucrare[]> {
  const data = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

async function write(items: Lucrare[]) {
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2));
}

export async function GET() {
  return NextResponse.json(await read());
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  const body = await req.json();
  const items = await read();
  const item: Lucrare = {
    id: Date.now().toString(),
    title: body.title || "",
    description: body.description || "",
    photos: body.photos || [],
    services: body.services || [],
    location: body.location || "Timișoara",
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
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
  let items = await read();
  items = items.filter((i) => i.id !== id);
  await write(items);
  return NextResponse.json({ success: true });
}
