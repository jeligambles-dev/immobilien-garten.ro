import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/auth";
import { UPLOAD_DIR, ensureDirs } from "@/lib/paths";

const MAX_BYTES = 80 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

  await ensureDirs();
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Niciun fișier" }, { status: 400 });

  const ext = path.extname(file.name).toLowerCase();
  if (![".mp4", ".webm"].includes(ext)) {
    return NextResponse.json({ error: "Format invalid. Acceptăm: MP4, WebM" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Fișierul depășește 80MB" }, { status: 400 });
  }

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  await writeFile(path.join(UPLOAD_DIR, filename), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/api/uploads/${filename}`, filename, size: file.size });
}
