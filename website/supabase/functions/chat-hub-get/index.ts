import { authenticateHubClient, corsHeaders, json } from "../_shared/chat-hub-auth.ts";

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "Supabase service credentials are not configured" }, 500);

  const auth = await authenticateHubClient(request, supabaseUrl, serviceRoleKey, "chat_hub_get");
  if ("error" in auth) return auth.error;

  const conversationsUrl = new URL("/rest/v1/cms_conversations", supabaseUrl);
  conversationsUrl.searchParams.set("client_id", `eq.${auth.client.id}`);
  conversationsUrl.searchParams.set("select", "id,client_id,title,status,priority,last_message_at,created_at");
  conversationsUrl.searchParams.set("order", "last_message_at.desc.nullslast,created_at.desc");

  const conversationsResponse = await fetch(conversationsUrl, { headers: auth.headers });
  const conversations = await conversationsResponse.json().catch(() => []);
  if (!conversationsResponse.ok) return json({ error: "Could not load conversations" }, conversationsResponse.status);

  const conversationIds = conversations.map((item: { id: string }) => item.id);
  if (conversationIds.length === 0) return json({ client: auth.client, conversations, messages: [] });

  const markReadUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  markReadUrl.searchParams.set("conversation_id", `in.(${conversationIds.join(",")})`);
  markReadUrl.searchParams.set("sender_role", "eq.admin");
  markReadUrl.searchParams.set("read_at", "is.null");
  await fetch(markReadUrl, {
    method: "PATCH",
    headers: { ...auth.headers, Prefer: "return=minimal" },
    body: JSON.stringify({ read_at: new Date().toISOString() }),
  }).catch(() => undefined);

  const messagesUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  messagesUrl.searchParams.set("conversation_id", `in.(${conversationIds.join(",")})`);
  messagesUrl.searchParams.set("select", "id,conversation_id,sender_role,sender_name,sender_email,body,read_at,created_at");
  messagesUrl.searchParams.set("order", "created_at.asc");

  const messagesResponse = await fetch(messagesUrl, { headers: auth.headers });
  const messages = await messagesResponse.json().catch(() => []);
  if (!messagesResponse.ok) return json({ error: "Could not load messages" }, messagesResponse.status);

  return json({ client: auth.client, conversations, messages });
});
