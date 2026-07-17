self.addEventListener("push", (event) => {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { title: "Balkan Veil", body: event.data ? event.data.text() : "New notification" };
  }

  const title = payload.title || "Balkan Veil";
  const options = {
    body: payload.body || "New CMS update",
    icon: "/assets/veil-admin-mark.png",
    badge: "/assets/veil-admin-mark.png",
    tag: payload.tag || "balkan-veil-cms",
    data: {
      url: payload.url || "/admin/chat",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/admin/chat", self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client && client.url.startsWith(self.location.origin)) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      return clients.openWindow(targetUrl);
    }),
  );
});
