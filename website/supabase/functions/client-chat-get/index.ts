const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: "Supabase service credentials are not configured" }, 500);
  }

  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const token = asText(payload.token);
  if (!token) return json({ error: "Missing conversation token" }, 400);

  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
  };

  const conversationUrl = new URL("/rest/v1/cms_conversations", supabaseUrl);
  conversationUrl.searchParams.set("client_access_token", `eq.${token}`);
  conversationUrl.searchParams.set("select", "id,title,status,priority,last_message_at,created_at,cms_clients(id,name,email,company)");
  conversationUrl.searchParams.set("limit", "1");

  const conversationResponse = await fetch(conversationUrl, { headers });
  const conversations = await conversationResponse.json().catch(() => []);

  if (!conversationResponse.ok) {
    return json({ error: "Could not load conversation", details: conversations }, conversationResponse.status);
  }

  const conversation = conversations[0];
  if (!conversation) return json({ error: "Conversation not found" }, 404);

  const markReadUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  markReadUrl.searchParams.set("conversation_id", `eq.${conversation.id}`);
  markReadUrl.searchParams.set("sender_role", "eq.admin");
  markReadUrl.searchParams.set("read_at", "is.null");

  await fetch(markReadUrl, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ read_at: new Date().toISOString() }),
  });

  const messagesUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  messagesUrl.searchParams.set("conversation_id", `eq.${conversation.id}`);
  messagesUrl.searchParams.set("select", "id,conversation_id,sender_role,sender_name,sender_email,body,read_at,created_at");
  messagesUrl.searchParams.set("order", "created_at.asc");

  const messagesResponse = await fetch(messagesUrl, { headers });
  const messages = await messagesResponse.json().catch(() => []);

  if (!messagesResponse.ok) {
    return json({ error: "Could not load messages", details: messages }, messagesResponse.status);
  }

  return json({ conversation, messages });
});
