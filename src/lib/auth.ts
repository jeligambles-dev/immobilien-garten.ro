import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET = process.env.ADMIN_PASSWORD || "change-me";

export function generateToken(): string {
  const payload = `admin:${Date.now()}:${crypto.randomBytes(16).toString("hex")}`;
  const hmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64");
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 4) return false;
    const [role, timestamp, , storedHmac] = parts;
    if (role !== "admin") return false;
    // Token expires after 24 hours
    const age = Date.now() - parseInt(timestamp);
    if (age > 24 * 60 * 60 * 1000) return false;
    const payload = parts.slice(0, 3).join(":");
    const expectedHmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(storedHmac), Buffer.from(expectedHmac));
  } catch {
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token");
  if (!token?.value) return false;
  return verifyToken(token.value);
}
