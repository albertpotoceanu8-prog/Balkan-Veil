const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function getUser(request: Request, supabaseUrl: string, serviceRoleKey: string) {
  const authorization = request.headers.get("authorization") || "";
  if (!authorization.toLowerCase().startsWith("bearer ")) return null;
  const userResponse = await fetch(new URL("/auth/v1/user", supabaseUrl), {
    headers: { apikey: serviceRoleKey, Authorization: authorization },
  });
  if (!userResponse.ok) return null;
  return userResponse.json().catch(() => null);
}

async function notifyAdmin(params: { title: string; senderName: string; senderEmail: string | null; body: string }) {
  const apiKey = Deno.env.get("RESEND_API_KEY") || Deno.env.get("key");
  if (!apiKey) return;
  const to = Deno.env.get("CHAT_NOTIFY_TO") || Deno.env.get("INQUIRY_TO_EMAIL") || Deno.env.get("NOTIFY_TO") || "contact@balkanveil.com";
  const from = Deno.env.get("NOTIFY_FROM") ?? "Balkan Veil <onboarding@resend.dev>";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New client message: ${params.title}`,
      html: `<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;"><p style="font:600 12px monospace;color:#b8912f;text-transform:uppercase;letter-spacing:.16em;">Balkan Veil · Client CMS</p><h2>${escapeHtml(params.title)}</h2><p>New message from <strong>${escapeHtml(params.senderName)}</strong>${params.senderEmail ? ` · ${escapeHtml(params.senderEmail)}` : ""}</p><div style="border-left:3px solid #b8912f;padding-left:14px;white-space:pre-wrap;">${escapeHtml(params.body)}</div></div>`,
    }),
  }).catch(() => undefined);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "Supabase service credentials are not configured" }, 500);

  const user = await getUser(request, supabaseUrl, serviceRoleKey);
  if (!user?.id || !user?.email) return json({ error: "Invalid client session" }, 401);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const conversationId = asText(payload.conversationId);
  const body = asText(payload.body);
  if (!conversationId || !body) return json({ error: "Conversation and message are required" }, 400);

  const headers = { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json" };

  const conversationUrl = new URL("/rest/v1/cms_conversations", supabaseUrl);
  conversationUrl.searchParams.set("id", `eq.${conversationId}`);
  conversationUrl.searchParams.set("select", "id,title,status,cms_clients!inner(id,name,email,user_id)");
  conversationUrl.searchParams.set("limit", "1");

  const conversationResponse = await fetch(conversationUrl, { headers });
  const conversations = await conversationResponse.json().catch(() => []);
  if (!conversationResponse.ok) return json({ error: "Could not load conversation" }, conversationResponse.status);

  const conversation = conversations[0];
  const client = conversation?.cms_clients;
  const ownsConversation = client?.user_id === user.id || String(client?.email || "").toLowerCase() === String(user.email).toLowerCase();
  if (!conversation || !ownsConversation) return json({ error: "Conversation not found" }, 404);
  if (conversation.status === "closed") return json({ error: "Conversation is closed" }, 409);

  if (!client.user_id) {
    const clientUrl = new URL("/rest/v1/cms_clients", supabaseUrl);
    clientUrl.searchParams.set("id", `eq.${client.id}`);
    await fetch(clientUrl, {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ user_id: user.id }),
    });
  }

  const messageUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  const messageResponse = await fetch(messageUrl, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({
      conversation_id: conversation.id,
      sender_role: "client",
      sender_name: client.name || "Client",
      sender_email: user.email,
      body,
    }),
  });
  const result = await messageResponse.json().catch(() => []);
  if (!messageResponse.ok) return json({ error: "Could not save message" }, messageResponse.status);

  await notifyAdmin({ title: conversation.title || "Client conversation", senderName: client.name || "Client", senderEmail: user.email, body });

  return json({ ok: true, message: result[0] });
});
