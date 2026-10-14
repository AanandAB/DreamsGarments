import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const COOKIE = "dreams_admin_session";
const secret = () => { const s = process.env.SESSION_SECRET; if (!s || s.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters"); return s; };
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
export function createSession(email: string) { const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url"); return `${payload}.${sign(payload)}`; }
export function verifySession(token?: string) { if (!token) return null; const [payload, signature] = token.split("."); if (!payload || !signature) return null; const expected = sign(payload); const a = Buffer.from(signature); const b = Buffer.from(expected); if (a.length !== b.length || !timingSafeEqual(a,b)) return null; try { const data = JSON.parse(Buffer.from(payload,"base64url").toString()); return data.exp > Date.now() ? { email: String(data.email) } : null; } catch { return null; } }
export async function getAdminSession() { const jar = await cookies(); return verifySession(jar.get(COOKIE)?.value); }
export async function requireAdmin() { const session = await getAdminSession(); if (!session) redirect("/admin/login"); return session; }
export const sessionCookie = COOKIE;
export async function requireAdminApi(){return await getAdminSession();}
