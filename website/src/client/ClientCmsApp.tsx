import React from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut, RefreshCw, Send, ShieldCheck } from "lucide-react";

import { supabase, supabaseConfigured } from "@/lib/supabase/client";
import type { CmsClient, CmsConversation, CmsMessage } from "@/types/database";

type ClientChatData = {
  client: Pick<CmsClient, "id" | "name" | "email" | "company"> | null;
  conversations: Pick<CmsConversation, "id" | "client_id" | "title" | "status" | "priority" | "last_message_at" | "created_at">[];
  messages: CmsMessage[];
};

function formatDate(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function ClientLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (authError) setError("Could not access client CMS. Check credentials.");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#020100] px-4 text-[#F3EAD2]">
      <form onSubmit={submit} className="w-full max-w-md border border-[#D4AF37]/20 bg-[#0E0D0A] p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Client CMS</p>
        <h1 className="mt-4 text-3xl font-semibold">Project Access</h1>
        <p className="mt-3 text-sm leading-6 text-[#8E8878]">Access your client workspace and direct conversation with Balkan Veil.</p>

        <label className="mt-7 block">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required className="mt-3 w-full rounded-[8px] border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm outline-none focus:border-[#D4AF37]" />
        </label>
        <label className="mt-5 block">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">Password</span>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required className="mt-3 w-full rounded-[8px] border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm outline-none focus:border-[#D4AF37]" />
        </label>
        {error ? <p className="mt-5 text-sm text-red-300">{error}</p> : null}
        <button type="submit" disabled={loading} className="mt-7 w-full rounded-[8px] bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-black disabled:opacity-70">
          {loading ? "Checking..." : "Enter Client CMS"}
        </button>
      </form>
    </main>
  );
}

export function ClientCmsApp() {
  const [session, setSession] = React.useState<Session | null>(null);
  const [authLoading, setAuthLoading] = React.useState(true);
  const [data, setData] = React.useState<ClientChatData>({ client: null, conversations: [], messages: [] });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [reply, setReply] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState("");
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  const selectedConversation = data.conversations.find((item) => item.id === selectedId) ?? data.conversations[0] ?? null;
  const messages = selectedConversation ? data.messages.filter((message) => message.conversation_id === selectedConversation.id) : [];

  const loadChat = React.useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError("");

    const { data: response, error: loadError } = await supabase.functions.invoke("client-cms-chat-get", {
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: {},
    });

    if (loadError) {
      setError(loadError.message);
      setLoading(false);
      return;
    }

    const nextData = response as ClientChatData;
    setData(nextData);
    setSelectedId((current) => current ?? nextData.conversations[0]?.id ?? null);
    setLoading(false);
  }, [session]);

  React.useEffect(() => {
    if (!supabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    let active = true;
    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (!active) return;
      setSession(sessionData.session);
      setAuthLoading(false);
    });
    const { data: authData } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));

    return () => {
      active = false;
      authData.subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (session) void loadChat();
  }, [loadChat, session]);

  React.useEffect(() => {
    if (!session) return undefined;
    const interval = window.setInterval(() => void loadChat(), 3000);
    return () => window.clearInterval(interval);
  }, [loadChat, session]);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, selectedId]);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = reply.trim();
    if (!session || !selectedConversation || !body) return;

    setSending(true);
    setError("");
    const { error: sendError } = await supabase.functions.invoke("client-cms-chat-send", {
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: { conversationId: selectedConversation.id, body },
    });

    if (sendError) {
      setError(sendError.message);
      setSending(false);
      return;
    }

    setReply("");
    await loadChat();
    setSending(false);
  };

  if (!supabaseConfigured) {
    return <main className="grid min-h-screen place-items-center bg-[#020100] text-[#F3EAD2]">Supabase is not configured.</main>;
  }

  if (authLoading) {
    return <main className="grid min-h-screen place-items-center bg-[#020100] text-[#D4AF37]">Loading Client CMS</main>;
  }

  if (!session) return <ClientLogin />;

  return (
    <main className="min-h-screen bg-[#020100] px-4 py-6 text-[#F3EAD2] md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-[10px] border border-[#D4AF37]/20 bg-[#070705] lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-[#D4AF37]/15 bg-[#0E0D0A] p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Client CMS</p>
              <h1 className="mt-3 text-2xl font-semibold">{data.client?.company || data.client?.name || "Workspace"}</h1>
              <p className="mt-2 text-sm text-[#8E8878]">{session.user.email}</p>
            </div>
            <button type="button" onClick={() => void supabase.auth.signOut()} className="rounded-[8px] border border-[#D4AF37]/20 p-2 text-[#D4AF37]">
              <LogOut size={16} />
            </button>
          </div>

          <button type="button" onClick={() => void loadChat()} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#D4AF37]/25 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#D4AF37]">
            <RefreshCw size={14} />
            Refresh
          </button>

          <div className="mt-6 space-y-3">
            {data.conversations.map((conversation) => (
              <button key={conversation.id} type="button" onClick={() => setSelectedId(conversation.id)} className={`block w-full rounded-[8px] border p-4 text-left ${conversation.id === selectedConversation?.id ? "border-[#D4AF37]/40 bg-[#D4AF37]/10" : "border-[#D4AF37]/10 bg-black/20"}`}>
                <p className="truncate text-sm font-semibold">{conversation.title}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6F6756]">{conversation.status} / {formatDate(conversation.last_message_at || conversation.created_at)}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-h-[650px] flex-col">
          <header className="border-b border-[#D4AF37]/15 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[8px] border border-[#D4AF37]/30 text-[#D4AF37]"><ShieldCheck size={18} /></div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">Balkan Veil Direct</p>
                <h2 className="mt-1 text-xl font-semibold">{selectedConversation?.title || "No conversation yet"}</h2>
              </div>
            </div>
          </header>

          {error ? <div className="border-b border-red-400/20 bg-red-400/10 px-5 py-3 text-sm text-red-200">{error}</div> : null}

          <div className="flex-1 space-y-4 overflow-auto p-5">
            {loading ? <p className="text-sm text-[#8E8878]">Loading messages...</p> : null}
            {!loading && !selectedConversation ? (
              <div className="grid h-full place-items-center text-center">
                <p className="max-w-md text-sm leading-6 text-[#8E8878]">No chat has been opened for this client account yet. Balkan Veil creates client chats manually from the internal CMS.</p>
              </div>
            ) : null}
            {messages.map((message) => {
              const fromClient = message.sender_role === "client";
              return (
                <div key={message.id} className={fromClient ? "flex justify-end" : "flex justify-start"}>
                  <article className={`max-w-[82%] rounded-[10px] border px-4 py-3 ${fromClient ? "border-[#D4AF37]/30 bg-[#D4AF37]/10" : "border-[#D4AF37]/15 bg-[#0E0D0A]"}`}>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#8F7835]">{message.sender_name || message.sender_role}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{message.body}</p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6F6756]">{formatDate(message.created_at)}</p>
                  </article>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={sendMessage} className="border-t border-[#D4AF37]/15 bg-[#080705] p-4">
            <div className="flex flex-col gap-3 md:flex-row">
              <textarea value={reply} onChange={(event) => setReply(event.target.value)} disabled={!selectedConversation || selectedConversation.status === "closed"} placeholder={!selectedConversation ? "No conversation is available." : "Write your reply..."} className="min-h-24 flex-1 rounded-[8px] border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm text-[#F3EAD2] outline-none placeholder:text-[#665f4e] focus:border-[#D4AF37] disabled:opacity-50" />
              <button type="submit" disabled={sending || !reply.trim() || !selectedConversation || selectedConversation.status === "closed"} className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#F3EAD2] disabled:opacity-50 md:w-40">
                <Send size={15} />
                Send
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
