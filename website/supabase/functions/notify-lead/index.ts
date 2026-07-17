// Supabase Edge Function: notify-lead
// Triggered by a Database Webhook on INSERT into public.access_requests.
// Sends an email notification to the studio via Resend.
//
// Required secret (Edge Function → Secrets):
//   RESEND_API_KEY   — your Resend API key
// Optional secrets (override defaults):
//   NOTIFY_TO        — recipient address (default albertpotoceanu8@gmail.com)
//   NOTIFY_FROM      — sender (default "Balkan Veil <onboarding@resend.dev>")
//
// Note: with Resend's shared onboarding@resend.dev sender you can only send to the
// address that owns the Resend account. To send from your own domain / to any address,
// verify balkanveil.com in Resend and set NOTIFY_FROM to e.g. "Balkan Veil <leads@balkanveil.com>".

type AccessRequest = {
  id: string;
  name: string | null;
  brand: string | null;
  project_type: string | null;
  budget_range: string | null;
  message: string | null;
  priority: number | null;
  created_at: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | null): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#8a8578;font:600 12px/1.4 monospace;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:6px 0;color:#1a1a1a;font:14px/1.5 -apple-system,Segoe UI,sans-serif;">${escapeHtml(value)}</td>
  </tr>`;
}

Deno.serve(async (req) => {
  try {
    // Shared-secret guard: if WEBHOOK_SECRET is set, the caller must send a matching
    // x-webhook-secret header. Keeps the (JWT-less) function from being spammed.
    const expectedSecret = Deno.env.get("WEBHOOK_SECRET");
    if (expectedSecret && req.headers.get("x-webhook-secret") !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY secret" }), { status: 500 });
    }

    const to = Deno.env.get("NOTIFY_TO") ?? "albertpotoceanu8@gmail.com";
    const from = Deno.env.get("NOTIFY_FROM") ?? "Balkan Veil <onboarding@resend.dev>";

    const payload = await req.json();
    const record = (payload.record ?? payload) as AccessRequest;

    const html = `
      <div style="max-width:560px;margin:0 auto;font-family:-apple-system,Segoe UI,sans-serif;">
        <p style="font:600 12px/1.4 monospace;text-transform:uppercase;letter-spacing:.16em;color:#b8912f;margin:0 0 4px;">Balkan Veil · New Brief</p>
        <h2 style="margin:0 0 18px;font-size:22px;color:#111;">${escapeHtml(record.name ?? "New lead")}</h2>
        <table style="border-collapse:collapse;width:100%;">
          ${row("Brand", record.brand)}
          ${row("Project", record.project_type)}
          ${row("Budget", record.budget_range)}
          ${row("Message", record.message)}
        </table>
        <p style="margin:20px 0 0;font:12px/1.5 monospace;color:#9a958a;">Received ${record.created_at ? new Date(record.created_at).toLocaleString() : ""}</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New brief: ${record.name ?? "Unknown"}`,
        html,
      }),
    });

    const body = await res.text();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Resend failed", detail: body }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
});
