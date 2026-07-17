const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

async function getClientContext(request: Request, supabaseUrl: string, serviceRoleKey: string) {
  const authorization = request.headers.get("authorization") || "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return { error: json({ error: "Missing client session" }, 401) };
  }

  const userResponse = await fetch(new URL("/auth/v1/user", supabaseUrl), {
    headers: { apikey: serviceRoleKey, Authorization: authorization },
  });
  const user = await userResponse.json().catch(() => null);

  if (!userResponse.ok || !user?.id || !user?.email) {
    return { error: json({ error: "Invalid client session" }, 401) };
  }

  const headers = { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json" };
  const clientsUrl = new URL("/rest/v1/cms_clients", supabaseUrl);
  clientsUrl.searchParams.set("or", `(user_id.eq.${user.id},email.ilike.${user.email})`);
  clientsUrl.searchParams.set("select", "id,name,email,company,user_id");
  clientsUrl.searchParams.set("limit", "1");

  const clientResponse = await fetch(clientsUrl, { headers });
  const clients = await clientResponse.json().catch(() => []);

  if (!clientResponse.ok) return { error: json({ error: "Could not load client profile" }, clientResponse.status) };
  const client = clients[0];
  if (!client) return { client: null, user, headers };

  if (!client.user_id) {
    const updateUrl = new URL("/rest/v1/cms_clients", supabaseUrl);
    updateUrl.searchParams.set("id", `eq.${client.id}`);
    await fetch(updateUrl, {
      method: "PATCH",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ user_id: user.id }),
    });
    client.user_id = user.id;
  }

  return { client, user, headers };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "Supabase service credentials are not configured" }, 500);

  const context = await getClientContext(request, supabaseUrl, serviceRoleKey);
  if ("error" in context) return context.error;
  if (!context.client) return json({ client: null, conversations: [], messages: [] });

  const conversationsUrl = new URL("/rest/v1/cms_conversations", supabaseUrl);
  conversationsUrl.searchParams.set("client_id", `eq.${context.client.id}`);
  conversationsUrl.searchParams.set("select", "id,client_id,title,status,priority,last_message_at,created_at");
  conversationsUrl.searchParams.set("order", "last_message_at.desc.nullslast,created_at.desc");

  const conversationsResponse = await fetch(conversationsUrl, { headers: context.headers });
  const conversations = await conversationsResponse.json().catch(() => []);
  if (!conversationsResponse.ok) return json({ error: "Could not load conversations" }, conversationsResponse.status);

  const conversationIds = conversations.map((item: { id: string }) => item.id);
  if (conversationIds.length === 0) return json({ client: context.client, conversations, messages: [] });

  const readUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  readUrl.searchParams.set("conversation_id", `in.(${conversationIds.join(",")})`);
  readUrl.searchParams.set("sender_role", "eq.admin");
  readUrl.searchParams.set("read_at", "is.null");
  await fetch(readUrl, {
    method: "PATCH",
    headers: { ...context.headers, Prefer: "return=minimal" },
    body: JSON.stringify({ read_at: new Date().toISOString() }),
  });

  const messagesUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  messagesUrl.searchParams.set("conversation_id", `in.(${conversationIds.join(",")})`);
  messagesUrl.searchParams.set("select", "id,conversation_id,sender_role,sender_name,sender_email,body,read_at,created_at");
  messagesUrl.searchParams.set("order", "created_at.asc");

  const messagesResponse = await fetch(messagesUrl, { headers: context.headers });
  const messages = await messagesResponse.json().catch(() => []);
  if (!messagesResponse.ok) return json({ error: "Could not load messages" }, messagesResponse.status);

  return json({ client: context.client, conversations, messages });
});
