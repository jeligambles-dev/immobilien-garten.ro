import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/auth";

const DATA_FILE = path.join(process.cwd(), "data/portfolio.json");

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  createdAt: string;
}

async function readPortfolio(): Promise<PortfolioItem[]> {
  const data = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

async function writePortfolio(items: PortfolioItem[]) {
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2));
}

export async function GET() {
  const items = await readPortfolio();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const body = await req.json();
  const items = await readPortfolio();

  const newItem: PortfolioItem = {
    id: Date.now().toString(),
    title: body.title || "Proiect nou",
    category: body.category || "Gazon",
    description: body.description || "",
    image: body.image || null,
    createdAt: new Date().toISOString(),
  };

  items.push(newItem);
  await writePortfolio(items);

  return NextResponse.json(newItem);
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const body = await req.json();
  const items = await readPortfolio();
  const idx = items.findIndex((i) => i.id === body.id);

  if (idx === -1) {
    return NextResponse.json({ error: "Nu există" }, { status: 404 });
  }

  items[idx] = { ...items[idx], ...body };
  await writePortfolio(items);

  return NextResponse.json(items[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { id } = await req.json();
  let items = await readPortfolio();
  items = items.filter((i) => i.id !== id);
  await writePortfolio(items);

  return NextResponse.json({ success: true });
}
