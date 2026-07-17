const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendAdminEmailNotification(params: {
  title: string;
  senderName: string;
  senderEmail: string | null;
  body: string;
}) {
  const apiKey = Deno.env.get("RESEND_API_KEY") || Deno.env.get("key");
  if (!apiKey) return;

  const to =
    Deno.env.get("CHAT_NOTIFY_TO") ||
    Deno.env.get("INQUIRY_TO_EMAIL") ||
    Deno.env.get("NOTIFY_TO") ||
    "contact@balkanveil.com";
  const from = Deno.env.get("NOTIFY_FROM") ?? "Balkan Veil <onboarding@resend.dev>";

  const html = `
    <div style="max-width:560px;margin:0 auto;font-family:-apple-system,Segoe UI,sans-serif;">
      <p style="font:600 12px/1.4 monospace;text-transform:uppercase;letter-spacing:.16em;color:#b8912f;margin:0 0 4px;">Balkan Veil · Client Chat</p>
      <h2 style="margin:0 0 18px;font-size:22px;color:#111;">${escapeHtml(params.title)}</h2>
      <p style="margin:0 0 12px;color:#555;font:14px/1.5 -apple-system,Segoe UI,sans-serif;">
        New message from <strong>${escapeHtml(params.senderName)}</strong>${params.senderEmail ? ` · ${escapeHtml(params.senderEmail)}` : ""}
      </p>
      <div style="border-left:3px solid #b8912f;padding:10px 0 10px 14px;color:#1a1a1a;font:14px/1.6 -apple-system,Segoe UI,sans-serif;white-space:pre-wrap;">${escapeHtml(params.body)}</div>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New client message: ${params.title}`,
      html,
    }),
  }).catch(() => undefined);
}

async function sendAdminPushNotifications(params: {
  conversationId: string;
  title: string;
  senderName: string;
  body: string;
}) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY");
  const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY");
  const vapidSubject = Deno.env.get("VAPID_SUBJECT") ?? "mailto:contact@balkanveil.com";

  if (!supabaseUrl || !serviceRoleKey || !vapidPublicKey || !vapidPrivateKey) return;

  const webpush = await import("npm:web-push@3.6.7");
  webpush.default.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

  const subscriptionsUrl = new URL("/rest/v1/admin_push_subscriptions", supabaseUrl);
  subscriptionsUrl.searchParams.set("select", "endpoint,p256dh,auth");

  const subscriptionsResponse = await fetch(subscriptionsUrl, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });

  const subscriptions = await subscriptionsResponse.json().catch(() => []);
  if (!subscriptionsResponse.ok || !Array.isArray(subscriptions)) return;

  const notificationPayload = JSON.stringify({
    title: "New client message",
    body: `${params.senderName}: ${params.body.slice(0, 120)}`,
    tag: `cms-chat-${params.conversationId}`,
    url: "/admin/chat",
  });

  await Promise.allSettled(
    subscriptions.map(async (subscription) => {
      const pushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      };

      try {
        await webpush.default.sendNotification(pushSubscription, notificationPayload);
      } catch (error) {
        const statusCode = typeof error === "object" && error && "statusCode" in error ? Number(error.statusCode) : 0;
        if (statusCode === 404 || statusCode === 410) {
          const deleteUrl = new URL("/rest/v1/admin_push_subscriptions", supabaseUrl);
          deleteUrl.searchParams.set("endpoint", `eq.${subscription.endpoint}`);
          await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
              apikey: serviceRoleKey,
              Authorization: `Bearer ${serviceRoleKey}`,
            },
          });
        }
      }
    }),
  );
}

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
  const body = asText(payload.body);
  const senderName = asText(payload.senderName) || "Client";
  const senderEmail = asText(payload.senderEmail) || null;

  if (!token || !body) return json({ error: "Token and message are required" }, 400);

  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };

  const conversationUrl = new URL("/rest/v1/cms_conversations", supabaseUrl);
  conversationUrl.searchParams.set("client_access_token", `eq.${token}`);
  conversationUrl.searchParams.set("select", "id,status,title");
  conversationUrl.searchParams.set("limit", "1");

  const conversationResponse = await fetch(conversationUrl, { headers });
  const conversations = await conversationResponse.json().catch(() => []);

  if (!conversationResponse.ok) {
    return json({ error: "Could not load conversation", details: conversations }, conversationResponse.status);
  }

  const conversation = conversations[0];
  if (!conversation) return json({ error: "Conversation not found" }, 404);
  if (conversation.status === "closed") return json({ error: "Conversation is closed" }, 409);

  const messageUrl = new URL("/rest/v1/cms_messages", supabaseUrl);
  const messageResponse = await fetch(messageUrl, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      conversation_id: conversation.id,
      sender_role: "client",
      sender_name: senderName,
      sender_email: senderEmail,
      body,
    }),
  });

  const result = await messageResponse.json().catch(() => []);

  if (!messageResponse.ok) {
    return json({ error: "Could not save message", details: result }, messageResponse.status);
  }

  await sendAdminEmailNotification({
    title: conversation.title ?? "Client conversation",
    senderName,
    senderEmail,
    body,
  });

  await sendAdminPushNotifications({
    conversationId: conversation.id,
    title: conversation.title ?? "Client conversation",
    senderName,
    body,
  });

  return json({ ok: true, message: result[0] });
});
