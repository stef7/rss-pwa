console.debug("Service worker", self);

self.addEventListener("push", function (event) {
  console.debug("Notification push", event);
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon || "/rss.svg",
    // badge: "/badge.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.debug("Notification click", event);
  event.notification.close();
  event.waitUntil(clients.openWindow(self.registration.scope));
});
