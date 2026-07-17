import React from "react";
import { Bell, MessageSquare, Plus, Send, UserRound } from "lucide-react";

import {
  AdminPanel,
  EmptyState,
  Field,
  ModuleHeader,
  StatusMessage,
  inputClass,
} from "@/admin/AdminModule";
import { supabase } from "@/lib/supabase/client";
import { registerAdminPushNotifications } from "@/lib/pushNotifications";
import type { CmsConversationWithClient, CmsMessage } from "@/types/database";

type NewThreadForm = {
  name: string;
  email: string;
  company: string;
  title: string;
  message: string;
};

const emptyThread: NewThreadForm = {
  name: "",
  email: "",
  company: "",
  title: "",
  message: "",
};

function formatDate(value: string | null) {
  if (!value) return "No messages";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AdminClientChat() {
  const [conversations, setConversations] = React.useState<CmsConversationWithClient[]>([]);
  const [messages, setMessages] = React.useState<CmsMessage[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [unreadByConversation, setUnreadByConversation] = React.useState<Record<string, number>>({});
  const [newThread, setNewThread] = React.useState<NewThreadForm>(emptyThread);
  const [reply, setReply] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [notificationPermission, setNotificationPermission] = React.useState<NotificationPermission>(() =>
    typeof Notification === "undefined" ? "denied" : Notification.permission,
  );

  const selectedConversation = conversations.find((item) => item.id === selectedId) ?? null;
  const unreadTotal = Object.values(unreadByConversation).reduce((total, count) => total + count, 0);

  const showBrowserNotification = React.useCallback((message: CmsMessage) => {
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;

    const conversation = conversations.find((item) => item.id === message.conversation_id);
    const notification = new Notification("New client message", {
      body: `${message.sender_name || "Client"}: ${message.body.slice(0, 110)}`,
      tag: `cms-chat-${message.conversation_id}`,
    });

    notification.onclick = () => {
      window.focus();
      setSelectedId(message.conversation_id);
      setUnreadByConversation((current) => ({ ...current, [message.conversation_id]: 0 }));
      if (conversation) window.history.replaceState({}, "", "/admin/chat");
    };
  }, [conversations]);

  const requestNotifications = async () => {
    setError("");
    const result = await registerAdminPushNotifications();
    if (result.permission) setNotificationPermission(result.permission);
    if (result.ok) {
      setStatus(result.message);
    } else {
      setError(result.message);
    }
  };

  const loadConversations = React.useCallback(async () => {
    setError("");

    const { data, error: loadError } = await supabase
      .from("cms_conversations")
      .select("*, cms_clients(id, name, email, company)")
      .order("last_message_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (loadError) {
      setError(loadError.message);
      setLoading(false);
      return;
    }

    const nextConversations = (data ?? []) as CmsConversationWithClient[];
    setConversations(nextConversations);
    setSelectedId((current) => current ?? nextConversations[0]?.id ?? null);
    setLoading(false);
  }, []);

  const loadUnreadCounts = React.useCallback(async () => {
    const { data, error: loadError } = await supabase
      .from("cms_messages")
      .select("conversation_id")
      .eq("sender_role", "client")
      .is("read_at", null);

    if (loadError) {
      setError(loadError.message);
      return;
    }

    const nextCounts = ((data ?? []) as Pick<CmsMessage, "conversation_id">[]).reduce<Record<string, number>>(
      (counts, message) => {
        counts[message.conversation_id] = (counts[message.conversation_id] ?? 0) + 1;
        return counts;
      },
      {},
    );

    setUnreadByConversation(nextCounts);
  }, []);

  const loadMessages = React.useCallback(async (conversationId: string | null) => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    const { data, error: loadError } = await supabase
      .from("cms_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (loadError) {
      setError(loadError.message);
      return;
    }

    const nextMessages = (data ?? []) as CmsMessage[];

    if (document.visibilityState === "visible") {
      const unreadClientIds = nextMessages
        .filter((message) => message.sender_role === "client" && !message.read_at)
        .map((message) => message.id);

      if (unreadClientIds.length > 0) {
        const readAt = new Date().toISOString();
        const { error: readError } = await supabase
          .from("cms_messages")
          .update({ read_at: readAt })
          .in("id", unreadClientIds);

        if (readError) {
          setError(readError.message);
        } else {
          setUnreadByConversation((current) => ({ ...current, [conversationId]: 0 }));
          void loadUnreadCounts();
          setMessages(
            nextMessages.map((message) =>
              unreadClientIds.includes(message.id) ? { ...message, read_at: readAt } : message,
            ),
          );
          return;
        }
      }
    }

    setMessages(nextMessages);
  }, [loadUnreadCounts]);

  React.useEffect(() => {
    void loadConversations();
    void loadUnreadCounts();
  }, [loadConversations, loadUnreadCounts]);

  React.useEffect(() => {
    void loadMessages(selectedId);
  }, [loadMessages, selectedId]);

  React.useEffect(() => {
    const channel = supabase
      .channel("cms-client-chat-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "cms_messages",
        },
        (payload) => {
          const message = payload.new as CmsMessage;
          void loadConversations();
          void loadUnreadCounts();

          if (message.conversation_id === selectedId) {
            void loadMessages(selectedId);
          }

          if (message.sender_role === "client") {
            setUnreadByConversation((current) => {
              if (message.conversation_id === selectedId && document.visibilityState === "visible") {
                return { ...current, [message.conversation_id]: 0 };
              }

              return {
                ...current,
                [message.conversation_id]: (current[message.conversation_id] ?? 0) + 1,
              };
            });

            if (message.conversation_id !== selectedId || document.visibilityState !== "visible") {
              showBrowserNotification(message);
            }
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [loadConversations, loadMessages, selectedId, showBrowserNotification]);

  React.useEffect(() => {
    const handleVisible = () => {
      if (document.visibilityState === "visible") {
        void loadMessages(selectedId);
        void loadUnreadCounts();
      }
    };

    document.addEventListener("visibilitychange", handleVisible);
    return () => document.removeEventListener("visibilitychange", handleVisible);
  }, [loadMessages, loadUnreadCounts, selectedId]);

  const updateThread = (field: keyof NewThreadForm, value: string) => {
    setNewThread((current) => ({ ...current, [field]: value }));
  };

  const createConversation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newThread.name.trim();
    const title = newThread.title.trim();

    if (!name || !title) {
      setError("Client name and conversation title are required.");
      return;
    }

    setSaving(true);
    setError("");
    setStatus("");

    const { data: client, error: clientError } = await supabase
      .from("cms_clients")
      .insert({
        name,
        email: newThread.email.trim() || null,
        company: newThread.company.trim() || null,
      })
      .select("id")
      .single();

    if (clientError || !client) {
      setError(clientError?.message ?? "Could not create client.");
      setSaving(false);
      return;
    }

    const { data: conversation, error: conversationError } = await supabase
      .from("cms_conversations")
      .insert({
        client_id: client.id,
        title,
        status: "open",
        priority: "normal",
      })
      .select("id")
      .single();

    if (conversationError || !conversation) {
      setError(conversationError?.message ?? "Could not create conversation.");
      setSaving(false);
      return;
    }

    const firstMessage = newThread.message.trim();

    if (firstMessage) {
      const { error: messageError } = await supabase.from("cms_messages").insert({
        conversation_id: conversation.id,
        sender_role: "admin",
        sender_name: "Balkan Veil",
        body: firstMessage,
      });

      if (messageError) {
        setError(messageError.message);
        setSaving(false);
        return;
      }
    }

    setNewThread(emptyThread);
    setSelectedId(conversation.id);
    setStatus("Conversation created.");
    await loadConversations();
    await loadMessages(conversation.id);
    setSaving(false);
  };

  const sendReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = reply.trim();

    if (!selectedId || !body) return;

    setSaving(true);
    setError("");
    setStatus("");

    const { error: sendError } = await supabase.from("cms_messages").insert({
      conversation_id: selectedId,
      sender_role: "admin",
      sender_name: "Balkan Veil",
      body,
    });

    if (sendError) {
      setError(sendError.message);
      setSaving(false);
      return;
    }

    setReply("");
    setStatus("Message saved.");
    await loadConversations();
    await loadMessages(selectedId);
    setSaving(false);
  };

  const updateConversationStatus = async (nextStatus: string) => {
    if (!selectedId) return;

    setSaving(true);
    setError("");

    const { error: updateError } = await supabase
      .from("cms_conversations")
      .update({ status: nextStatus })
      .eq("id", selectedId);

    if (updateError) {
      setError(updateError.message);
    } else {
      await loadConversations();
    }

    setSaving(false);
  };

  return (
    <main>
      <ModuleHeader
        eyebrow="Client Comms"
        title="CMS Client Chat"
        description="A reusable client conversation layer backed by Supabase tables for clients, threads and messages."
        action={
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void requestNotifications()}
              className="inline-flex items-center gap-2 rounded-[8px] border border-[#D4AF37]/25 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
            >
              <Bell size={14} />
              {notificationPermission === "granted" ? "Alerts On" : "Enable Alerts"}
              {unreadTotal > 0 ? ` (${unreadTotal})` : ""}
            </button>
            <button
              type="button"
              onClick={() => void loadConversations()}
              className="rounded-[8px] border border-[#D4AF37]/25 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
            >
              Refresh
            </button>
          </div>
        }
      />

      <StatusMessage error={error} status={status} />

      <AdminPanel className="mb-6 rounded-[10px] p-5">
        <form onSubmit={createConversation} className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <Field label="Client">
            <input
              value={newThread.name}
              onChange={(event) => updateThread("name", event.target.value)}
              placeholder="Client name"
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              value={newThread.email}
              onChange={(event) => updateThread("email", event.target.value)}
              placeholder="client@email.com"
              type="email"
              className={inputClass}
            />
          </Field>
          <Field label="Company">
            <input
              value={newThread.company}
              onChange={(event) => updateThread("company", event.target.value)}
              placeholder="Company"
              className={inputClass}
            />
          </Field>
          <Field label="Thread">
            <input
              value={newThread.title}
              onChange={(event) => updateThread("title", event.target.value)}
              placeholder="Conversation title"
              className={inputClass}
            />
          </Field>
          <button
            type="submit"
            disabled={saving}
            className="mt-[22px] inline-flex h-[42px] items-center justify-center gap-2 rounded-[8px] border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 text-xs uppercase tracking-[0.18em] text-[#F3EAD2] transition hover:bg-[#D4AF37]/20 disabled:opacity-50"
          >
            <Plus size={15} />
            New
          </button>
          <textarea
            value={newThread.message}
            onChange={(event) => updateThread("message", event.target.value)}
            placeholder="Optional first admin message"
            className={`${inputClass} min-h-20 xl:col-span-5`}
          />
        </form>
      </AdminPanel>

      <div className="grid min-h-[620px] gap-6 xl:grid-cols-[360px_1fr]">
        <AdminPanel className="overflow-hidden rounded-[10px]">
          <div className="border-b border-[#D4AF37]/15 p-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">
              Conversations
            </p>
          </div>

          <div className="max-h-[620px] overflow-auto">
            {loading ? (
              <p className="p-4 text-sm text-[#8E8878]">Loading conversations...</p>
            ) : conversations.length === 0 ? (
              <div className="p-4">
                <EmptyState text="No conversations yet. Create the first client thread above." />
              </div>
            ) : (
              conversations.map((conversation) => {
                const active = conversation.id === selectedId;
                const client = conversation.cms_clients;

                return (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(conversation.id);
                    }}
                    className={[
                      "block w-full border-b border-[#D4AF37]/10 p-4 text-left transition",
                      active ? "bg-[#D4AF37]/10" : "hover:bg-[#D4AF37]/5",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#F3EAD2]">
                          {conversation.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-[#BDB39A]">
                          {client?.name ?? "No client"}{client?.company ? ` / ${client.company}` : ""}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-[6px] border border-[#D4AF37]/20 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#D4AF37]">
                        {conversation.status}
                      </span>
                    </div>
                    {(unreadByConversation[conversation.id] ?? 0) > 0 ? (
                      <p className="mt-3 inline-flex rounded-[6px] bg-[#D4AF37] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black">
                        {unreadByConversation[conversation.id]} new
                      </p>
                    ) : null}
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6F6756]">
                      {formatDate(conversation.last_message_at ?? conversation.created_at)}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </AdminPanel>

        <AdminPanel className="flex min-h-[620px] flex-col overflow-hidden rounded-[10px]">
          {selectedConversation ? (
            <>
              <header className="border-b border-[#D4AF37]/15 p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#8F7835]">
                      Active Thread
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#F3EAD2]">
                      {selectedConversation.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#BDB39A]">
                      {selectedConversation.cms_clients?.name ?? "No client attached"}
                      {selectedConversation.cms_clients?.email ? ` / ${selectedConversation.cms_clients.email}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <select
                      value={selectedConversation.status}
                      onChange={(event) => void updateConversationStatus(event.target.value)}
                      disabled={saving}
                      className="rounded-[8px] border border-[#D4AF37]/20 bg-[#050505] px-4 py-3 text-sm text-[#F3EAD2] outline-none focus:border-[#D4AF37]"
                    >
                      <option value="open">open</option>
                      <option value="waiting">waiting</option>
                      <option value="closed">closed</option>
                    </select>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-[#8E8878]">
                  Client access is handled from the client's own CMS login. Use the same email here as the client's CMS account.
                </p>
              </header>

              <div className="flex-1 space-y-4 overflow-auto p-5">
                {messages.length === 0 ? (
                  <div className="grid h-full place-items-center text-center">
                    <div>
                      <MessageSquare className="mx-auto text-[#D4AF37]" size={28} />
                      <p className="mt-4 text-sm text-[#8E8878]">No messages in this thread yet.</p>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => {
                    const admin = message.sender_role === "admin";

                    return (
                      <div key={message.id} className={admin ? "flex justify-end" : "flex justify-start"}>
                        <article
                          className={[
                            "max-w-[78%] rounded-[8px] border px-4 py-3",
                            admin
                              ? "border-[#D4AF37]/30 bg-[#D4AF37]/10"
                              : "border-[#D4AF37]/15 bg-[#050505]",
                          ].join(" ")}
                        >
                          <div className="mb-2 flex items-center gap-2 text-xs text-[#8F7835]">
                            <UserRound size={13} />
                            <span className="uppercase tracking-[0.16em]">
                              {message.sender_name || message.sender_role}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap text-sm leading-6 text-[#F3EAD2]">{message.body}</p>
                          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6F6756]">
                            {formatDate(message.created_at)}
                            {admin ? ` / ${message.read_at ? `seen ${formatDate(message.read_at)}` : "sent"}` : message.read_at ? " / read" : ""}
                          </p>
                        </article>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={sendReply} className="border-t border-[#D4AF37]/15 p-4">
                <div className="flex flex-col gap-3 md:flex-row">
                  <textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Write an admin message..."
                    className={`${inputClass} min-h-24 flex-1`}
                  />
                  <button
                    type="submit"
                    disabled={saving || !reply.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#F3EAD2] transition hover:bg-[#D4AF37]/20 disabled:opacity-50 md:w-40"
                  >
                    <Send size={15} />
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="grid flex-1 place-items-center p-8 text-center">
              <div>
                <MessageSquare className="mx-auto text-[#D4AF37]" size={32} />
                <h2 className="mt-4 text-2xl font-semibold text-[#F3EAD2]">No thread selected</h2>
                <p className="mt-3 text-sm text-[#8E8878]">
                  Create or select a conversation to start using the CMS chat.
                </p>
              </div>
            </div>
          )}
        </AdminPanel>
      </div>
    </main>
  );
}
