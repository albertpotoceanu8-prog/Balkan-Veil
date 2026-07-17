import { authenticateHubClient, corsHeaders, json } from "../_shared/chat-hub-auth.ts";

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "Supabase service credentials are not configured" }, 500);

  const auth = await authenticateHubClient(request, supabaseUrl, serviceRoleKey, "chat_hub_send");
  if ("error" in auth) return auth.error;

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const conversationId = asText(payload.conversationId);
  const body = asText(payload.body);
  const senderName = asText(payload.senderName) || auth.client.name || "Client";
  const senderEmail = asText(payload.senderEmail) || auth.client.email;
  if (!conversationId || !body) return json({ error: "Conversation and message are required" }, 400);

  const conversationUrl = new URL("/rest/v1/cms_conversations", supabaseUrl);
  conversationUrl.searchParams.set("id", `eq.${conversationId}`);
  conversationUrl.searchParams.set("client_id", `eq.${auth.client.id}`);
  conversationUrl.searchParams.set("select", "id,title,status");
  conversationUrl.searchParams.set("limit", "1");

  const conversationResponse = await fetch(conversationUrl, { headers: auth.headers });
  const conversations = await conversationResponse.json().catch(() => []);
  if (!conversationResponse.ok) return json({ error: "Could not load conversation" }, conversationResponse.status);

  const conversation = conversations[0];
  if (!conversation) return json({ error: "Conversation not found" }, 404);
  if (conversation.status === "closed") return json({ error: "Conversation is closed" }, 409);

  const messageUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  const messageResponse = await fetch(messageUrl, {
    method: "POST",
    headers: { ...auth.headers, Prefer: "return=representation" },
    body: JSON.stringify({
      conversation_id: conversation.id,
      sender_role: "client",
      sender_name: senderName,
      sender_email: senderEmail,
      body,
    }),
  });

  const result = await messageResponse.json().catch(() => []);
  if (!messageResponse.ok) return json({ error: "Could not save message" }, messageResponse.status);

  return json({ ok: true, message: result[0] });
});
