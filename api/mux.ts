// Mux Video REST helper — uses global fetch with Basic auth.
// Gracefully reports "not configured" when env vars are absent so the site
// works fine without live streaming until keys are added on Railway.

const MUX_API = "https://api.mux.com/video/v1";

export function muxConfigured(): boolean {
  return Boolean(process.env.MUX_TOKEN_ID && process.env.MUX_TOKEN_SECRET);
}

function authHeader(): string {
  const id = process.env.MUX_TOKEN_ID ?? "";
  const secret = process.env.MUX_TOKEN_SECRET ?? "";
  return "Basic " + Buffer.from(`${id}:${secret}`).toString("base64");
}

async function muxRequest<T = any>(method: string, path: string, body?: unknown): Promise<T> {
  if (!muxConfigured()) {
    throw new Error(
      "Mux is not configured yet. Add MUX_TOKEN_ID and MUX_TOKEN_SECRET environment variables (get them free at mux.com) to enable video uploads and live streaming."
    );
  }
  const res = await fetch(`${MUX_API}${path}`, {
    method,
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Mux API error (${res.status}): ${text.slice(0, 300)}`);
  }
  const json = (await res.json()) as { data: T };
  return json.data;
}

// ─── Live streams ────────────────────────────────────────────────────────────
export interface MuxLiveStream {
  id: string;
  stream_key: string;
  status: string;
  playback_ids: Array<{ id: string; policy: string }>;
}

export async function createLiveStream(): Promise<MuxLiveStream> {
  return muxRequest<MuxLiveStream>("POST", "/live-streams", {
    playback_policy: ["public"],
    new_asset_settings: { playback_policy: ["public"] },
    reduced_latency: true,
  });
}

export async function getLiveStream(streamId: string): Promise<MuxLiveStream> {
  return muxRequest<MuxLiveStream>("GET", `/live-streams/${streamId}`);
}

export async function disableLiveStream(streamId: string): Promise<void> {
  await muxRequest("PUT", `/live-streams/${streamId}/disable`);
}

// ─── Direct uploads (recorded video posts) ───────────────────────────────────
export interface MuxUpload {
  id: string;
  url: string;
  asset_id: string | null;
  status: string;
}

export async function createDirectUpload(corsOrigin: string): Promise<MuxUpload> {
  return muxRequest<MuxUpload>("POST", "/uploads", {
    cors_origin: corsOrigin,
    new_asset_settings: { playback_policy: ["public"] },
  });
}

export async function getUpload(uploadId: string): Promise<MuxUpload> {
  return muxRequest<MuxUpload>("GET", `/uploads/${uploadId}`);
}

export interface MuxAsset {
  id: string;
  status: string;
  playback_ids: Array<{ id: string; policy: string }>;
}

export async function getAsset(assetId: string): Promise<MuxAsset> {
  return muxRequest<MuxAsset>("GET", `/assets/${assetId}`);
}

export const MUX_RTMP_URL = "rtmp://global-live.mux.com:5222/app";
