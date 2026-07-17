import { supabase } from "@/lib/supabase/client";

const fallbackVapidPublicKey = "BHQk_6qZTUfW4JLs3V95zoJUMzh_bfJ6Ws5GnBuFjP_11B_nzXyOCJWhb9JiESNCZhMZ2JF0Lpqohz5Nr1Q4LIM";
const vapidPublicKey = (import.meta.env.VITE_VAPID_PUBLIC_KEY || fallbackVapidPublicKey).trim();

function urlBase64ToUint8Array(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = `${value}${padding}`.replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function registerAdminPushNotifications() {
  if (!("Notification" in window)) {
    return { ok: false, message: "Browser notifications are not supported here." };
  }

  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return { ok: false, message: "Push notifications are not supported in this browser." };
  }

  if (!vapidPublicKey) {
    return { ok: false, message: "Push notifications are not configured." };
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    return { ok: false, message: "Push notifications were not enabled.", permission };
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;

  if (!accessToken) {
    return { ok: false, message: "You must be logged in to enable push notifications.", permission };
  }

  const registration = await navigator.serviceWorker.register("/sw.js");
  const existing = await registration.pushManager.getSubscription();
  const subscription =
    existing ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    }));

  const { error } = await supabase.functions.invoke("save-push-subscription", {
    body: { subscription: subscription.toJSON() },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (error) {
    return { ok: false, message: error.message, permission };
  }

  return { ok: true, message: "Push notifications enabled.", permission };
}
