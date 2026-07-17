export type HubClient = {
  id: string;
  hub_key: string;
  name: string;
  email: string | null;
  company: string | null;
  allowed_origins: string[];
  chat_enabled: boolean;
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-chat-hub-key, x-chat-hub-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

export async function authenticateHubClient(request: Request, supabaseUrl: string, serviceRoleKey: string, action: string) {
  const hubKey = request.headers.get("x-chat-hub-key")?.trim() || "";
  const secret = request.headers.get("x-chat-hub-secret")?.trim() || "";
  const origin = request.headers.get("origin") || null;
  const userAgent = request.headers.get("user-agent") || null;

  const log = async (clientId: string | null, success: boolean, error?: string) => {
    await fetch(new URL("/rest/v1/chat_hub_requests", supabaseUrl), {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        client_id: clientId,
        hub_key: hubKey || null,
        action,
        origin,
        user_agent: userAgent,
        success,
        error: error || null,
      }),
    }).catch(() => undefined);
  };

  if (!hubKey || !secret) {
    await log(null, false, "missing_credentials");
    return { error: json({ error: "Missing chat hub credentials" }, 401) };
  }

  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };

  const clientsUrl = new URL("/rest/v1/cms_clients", supabaseUrl);
  clientsUrl.searchParams.set("hub_key", `eq.${hubKey}`);
  clientsUrl.searchParams.set("select", "id,hub_key,name,email,company,allowed_origins,chat_enabled,integration_secret_hash");
  clientsUrl.searchParams.set("limit", "1");

  const clientResponse = await fetch(clientsUrl, { headers });
  const clients = await clientResponse.json().catch(() => []);
  const client = clients[0];

  if (!clientResponse.ok || !client) {
    await log(null, false, "client_not_found");
    return { error: json({ error: "Chat hub client not found" }, 404) };
  }

  if (!client.chat_enabled) {
    await log(client.id, false, "chat_disabled");
    return { error: json({ error: "Chat is disabled for this client" }, 403) };
  }

  if (origin && Array.isArray(client.allowed_origins) && client.allowed_origins.length > 0 && !client.allowed_origins.includes(origin)) {
    await log(client.id, false, "origin_not_allowed");
    return { error: json({ error: "Origin is not allowed" }, 403) };
  }

  const verifyResponse = await fetch(new URL("/rest/v1/rpc", supabaseUrl), { method: "OPTIONS" }).catch(() => null);
  void verifyResponse;

  const passwordUrl = new URL("/rest/v1/cms_clients", supabaseUrl);
  passwordUrl.searchParams.set("id", `eq.${client.id}`);
  passwordUrl.searchParams.set("integration_secret_hash", `eq.crypt.${secret}`);

  // PostgREST cannot compare crypt() through filters portably, so use an RPC-style SQL function below if present.
  const checkUrl = new URL("/rest/v1/rpc/check_chat_hub_secret", supabaseUrl);
  const checkResponse = await fetch(checkUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ target_client_id: client.id, plain_secret: secret }),
  });
  const validSecret = await checkResponse.json().catch(() => false);

  if (!checkResponse.ok || validSecret !== true) {
    await log(client.id, false, "invalid_secret");
    return { error: json({ error: "Invalid chat hub credentials" }, 401) };
  }

  const touchUrl = new URL("/rest/v1/cms_clients", supabaseUrl);
  touchUrl.searchParams.set("id", `eq.${client.id}`);
  await fetch(touchUrl, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({ last_chat_access_at: new Date().toISOString() }),
  }).catch(() => undefined);

  await log(client.id, true);

  return {
    client: {
      id: client.id,
      hub_key: client.hub_key,
      name: client.name,
      email: client.email,
      company: client.company,
      allowed_origins: client.allowed_origins || [],
      chat_enabled: client.chat_enabled,
    } as HubClient,
    headers,
  };
}
