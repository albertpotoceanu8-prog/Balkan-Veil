import React from "react";
import { ArrowLeft, Bell, RefreshCw, Send, ShieldCheck } from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import type { CmsMessage } from "@/types/database";

type ClientConversation = {
  id: string;
  title: string;
  status: string;
  priority: string;
  last_message_at: string | null;
  created_at: string;
  cms_clients: {
    id: string;
    name: string;
    email: string | null;
    company: string | null;
  } | null;
};

type ClientChatPageProps = {
  token: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ClientChatPage({ token }: ClientChatPageProps) {
  const [conversation, setConversation] = React.useState<ClientConversation | null>(null);
  const [messages, setMessages] = React.useState<CmsMessage[]>([]);
  const [senderName, setSenderName] = React.useState("");
  const [senderEmail, setSenderEmail] = React.useState("");
  const [reply, setReply] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [notificationPermission, setNotificationPermission] = React.useState<NotificationPermission>(() =>
    typeof Notification === "undefined" ? "denied" : Notification.permission,
  );
  const bottomRef = React.useRef<HTMLDivElement | null>(null);
  const knownMessageIdsRef = React.useRef<Set<string>>(new Set());
  const loadedOnceRef = React.useRef(false);

  const showBrowserNotification = React.useCallback((message: CmsMessage) => {
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    if (document.visibilityState === "visible") return;

    const notification = new Notification("New Balkan Veil message", {
      body: `${message.sender_name || "Balkan Veil"}: ${message.body.slice(0, 110)}`,
      tag: `client-chat-${message.conversation_id}`,
    });

    notification.onclick = () => window.focus();
  }, []);

  const requestNotifications = async () => {
    if (typeof Notification === "undefined") {
      setStatus("Browser notifications are not supported here.");
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    setStatus(permission === "granted" ? "Notifications enabled." : "Notifications were not enabled.");
  };

  const loadThread = React.useCallback(async () => {
    setError("");

    const { data, error: loadError } = await supabase.functions.invoke("client-chat-get", {
      body: { token },
    });

    if (loadError) {
      setError(loadError.message);
      setLoading(false);
      return;
    }

    setConversation(data.conversation as ClientConversation);
    const nextMessages = (data.messages ?? []) as CmsMessage[];
    const newAdminMessages = nextMessages.filter(
      (message) =>
        loadedOnceRef.current &&
        message.sender_role === "admin" &&
        !knownMessageIdsRef.current.has(message.id),
    );

    setMessages(nextMessages);
    nextMessages.forEach((message) => knownMessageIdsRef.current.add(message.id));
    loadedOnceRef.current = true;

    newAdminMessages.forEach(showBrowserNotification);

    const client = data.conversation?.cms_clients;
    if (client?.name) setSenderName((current) => current || client.name);
    if (client?.email) setSenderEmail((current) => current || client.email);

    setLoading(false);
  }, [showBrowserNotification, token]);

  React.useEffect(() => {
    void loadThread();
  }, [loadThread]);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      void loadThread();
    }, 3000);

    return () => window.clearInterval(interval);
  }, [loadThread]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = reply.trim();

    if (!body) return;

    setSending(true);
    setError("");
    setStatus("");

    const { error: sendError } = await supabase.functions.invoke("client-chat-send", {
      body: {
        token,
        body,
        senderName: senderName.trim() || "Client",
        senderEmail: senderEmail.trim() || null,
      },
    });

    if (sendError) {
      setError(sendError.message);
      setSending(false);
      return;
    }

    setReply("");
    setStatus("Message sent.");
    await loadThread();
    setSending(false);
  };

  return (
    <main className="min-h-screen bg-[#020100] px-4 py-6 text-[#F3EAD2] md:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col overflow-hidden rounded-[10px] border border-[#D4AF37]/20 bg-[#070705] shadow-[0_25px_120px_rgba(0,0,0,0.45)]">
        <header className="border-b border-[#D4AF37]/15 bg-[#0E0D0A] p-5 md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <a href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8F7835] transition hover:text-[#D4AF37]">
                <ArrowLeft size={14} />
                Balkan Veil
              </a>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">
                Private Client Thread
              </p>
              <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                {loading ? "Loading conversation" : conversation?.title ?? "Conversation unavailable"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9F9683]">
                This private thread is connected to the Balkan Veil CMS. Replies are stored with the project conversation.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void requestNotifications()}
                className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#D4AF37]/25 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
              >
                <Bell size={14} />
                {notificationPermission === "granted" ? "Alerts On" : "Enable Alerts"}
              </button>
              <button
                type="button"
                onClick={() => void loadThread()}
                className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#D4AF37]/25 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>
        </header>

        {error && (
          <div className="border-b border-red-400/20 bg-red-400/10 px-5 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {status && (
          <div className="border-b border-green-400/20 bg-green-400/10 px-5 py-3 text-sm text-green-200">
            {status}
          </div>
        )}

        <section className="grid flex-1 overflow-hidden lg:grid-cols-[320px_1fr]">
          <aside className="border-b border-[#D4AF37]/15 bg-[#080705] p-5 lg:border-b-0 lg:border-r">
            <div className="rounded-[8px] border border-[#D4AF37]/15 bg-black/30 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-[8px] border border-[#D4AF37]/30 text-[#D4AF37]">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{conversation?.cms_clients?.name ?? (senderName || "Client")}</p>
                  <p className="mt-1 text-xs text-[#8E8878]">{conversation?.status ?? "open"} thread</p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8F7835]">
                  Your name
                </span>
                <input
                  value={senderName}
                  onChange={(event) => setSenderName(event.target.value)}
                  className="w-full rounded-[8px] border border-[#D4AF37]/20 bg-[#050505] px-3 py-2.5 text-sm text-[#F3EAD2] outline-none focus:border-[#D4AF37]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#8F7835]">
                  Email
                </span>
                <input
                  value={senderEmail}
                  onChange={(event) => setSenderEmail(event.target.value)}
                  type="email"
                  className="w-full rounded-[8px] border border-[#D4AF37]/20 bg-[#050505] px-3 py-2.5 text-sm text-[#F3EAD2] outline-none focus:border-[#D4AF37]"
                />
              </label>
            </div>
          </aside>

          <div className="flex min-h-[580px] flex-col">
            <div className="flex-1 space-y-4 overflow-auto p-5 md:p-7">
              {loading ? (
                <p className="text-sm text-[#8E8878]">Loading messages...</p>
              ) : messages.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <p className="text-2xl font-semibold">No messages yet.</p>
                    <p className="mt-3 text-sm text-[#8E8878]">Send the first reply below.</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => {
                  const fromClient = message.sender_role === "client";

                  return (
                    <div key={message.id} className={fromClient ? "flex justify-end" : "flex justify-start"}>
                      <article
                        className={[
                          "max-w-[82%] rounded-[10px] border px-4 py-3",
                          fromClient
                            ? "border-[#D4AF37]/30 bg-[#D4AF37]/10"
                            : "border-[#D4AF37]/15 bg-[#0E0D0A]",
                        ].join(" ")}
                      >
                        <p className="text-xs uppercase tracking-[0.16em] text-[#8F7835]">
                          {message.sender_name || message.sender_role}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{message.body}</p>
                        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6F6756]">
                          {formatDate(message.created_at)}
                        </p>
                      </article>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="border-t border-[#D4AF37]/15 bg-[#080705] p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row">
                <textarea
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  disabled={conversation?.status === "closed"}
                  placeholder={conversation?.status === "closed" ? "This conversation is closed." : "Write your reply..."}
                  className="min-h-24 flex-1 rounded-[8px] border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm text-[#F3EAD2] outline-none placeholder:text-[#665f4e] focus:border-[#D4AF37] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={sending || !reply.trim() || conversation?.status === "closed"}
                  className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#F3EAD2] transition hover:bg-[#D4AF37]/20 disabled:opacity-50 md:w-40"
                >
                  <Send size={15} />
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
