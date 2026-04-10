// Traitors Birthday — Phase Controller
// Deploy this as an HTTP val on val.town
// Endpoint: GET returns current phase, POST advances it (requires PIN)

import { blob } from "https://esm.town/v/std/blob";

const ADMIN_PIN = "1234"; // Change this to your own secret PIN

export default async function handler(req: Request): Promise<Response> {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  // GET — return current phase (public, no auth)
  if (req.method === "GET") {
    const data = await blob.getJSON("traitors-phase") as { phase: number } | undefined;
    return Response.json(data || { phase: 1 }, { headers });
  }

  // POST — set phase (requires PIN)
  if (req.method === "POST") {
    try {
      const body = await req.json() as { pin: string; phase: number };

      if (body.pin !== ADMIN_PIN) {
        return Response.json({ error: "wrong pin" }, { status: 401, headers });
      }

      const phase = Math.max(1, Math.min(6, body.phase));
      await blob.setJSON("traitors-phase", { phase });
      return Response.json({ phase }, { headers });
    } catch {
      return Response.json({ error: "bad request" }, { status: 400, headers });
    }
  }

  return Response.json({ error: "method not allowed" }, { status: 405, headers });
}
