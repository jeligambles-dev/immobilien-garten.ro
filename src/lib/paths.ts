import path from "path";
import { mkdir } from "fs/promises";

const IS_PROD = process.env.NODE_ENV === "production";
const PERSISTENT_DIR = IS_PROD ? "/app/persistent" : path.join(process.cwd(), "persistent");

export const UPLOAD_DIR = path.join(PERSISTENT_DIR, "uploads");
export const DATA_DIR = IS_PROD ? PERSISTENT_DIR : path.join(process.cwd(), "data");

export async function ensureDirs() {
  await mkdir(UPLOAD_DIR, { recursive: true }).catch(() => {});
  await mkdir(DATA_DIR, { recursive: true }).catch(() => {});
}
