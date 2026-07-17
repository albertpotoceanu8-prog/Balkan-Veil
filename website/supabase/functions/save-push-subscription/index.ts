const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

type PushSubscriptionPayload = {
  endpoint?: string;
  keys?: {
    p256dh?: string;
    auth?: string;
  };
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: "Supabase service credentials are not configured" }, 500);
  }

  const authorization = request.headers.get("authorization") || "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return json({ error: "Missing admin session" }, 401);
  }

  const userResponse = await fetch(new URL("/auth/v1/user", supabaseUrl), {
    headers: {
      apikey: serviceRoleKey,
      Authorization: authorization,
    },
  });

  const user = await userResponse.json().catch(() => null);
  if (!userResponse.ok || !user?.id) {
    return json({ error: "Invalid admin session" }, 401);
  }

  let payload: { subscription?: PushSubscriptionPayload };

  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const subscription = payload.subscription;
  const endpoint = subscription?.endpoint?.trim();
  const p256dh = subscription?.keys?.p256dh?.trim();
  const auth = subscription?.keys?.auth?.trim();

  if (!endpoint || !p256dh || !auth) {
    return json({ error: "Invalid push subscription" }, 400);
  }

  const subscriptionsUrl = new URL("/rest/v1/admin_push_subscriptions", supabaseUrl);
  subscriptionsUrl.searchParams.set("on_conflict", "endpoint");

  const saveResponse = await fetch(subscriptionsUrl, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      endpoint,
      user_id: user.id,
      p256dh,
      auth,
      user_agent: request.headers.get("user-agent"),
    }),
  });

  if (!saveResponse.ok) {
    const details = await saveResponse.text();
    return json({ error: "Could not save push subscription", details }, saveResponse.status);
  }

  return json({ ok: true });
});
