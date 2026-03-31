import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink, readdir } from "fs/promises";
import path from "path";
import { isAdmin } from "@/lib/auth";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/portfolio");

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Niciun fișier" }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
  if (!allowed.includes(ext)) {
    return NextResponse.json(
      { error: "Format invalid. Acceptăm: JPG, PNG, WebP, AVIF" },
      { status: 400 }
    );
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: "Fișierul depășește 10MB" },
      { status: 400 }
    );
  }

  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filepath, buffer);

  return NextResponse.json({
    url: `/uploads/portfolio/${filename}`,
    filename,
  });
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const files = await readdir(UPLOAD_DIR).catch(() => [] as string[]);
  const images = files
    .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map((f) => ({
      filename: f,
      url: `/uploads/portfolio/${f}`,
    }));

  return NextResponse.json(images);
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { filename } = await req.json();
  if (!filename || filename.includes("..")) {
    return NextResponse.json({ error: "Fișier invalid" }, { status: 400 });
  }

  const filepath = path.join(UPLOAD_DIR, filename);
  await unlink(filepath).catch(() => {});

  return NextResponse.json({ success: true });
}
