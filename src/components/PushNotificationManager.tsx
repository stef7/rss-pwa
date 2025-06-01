"use client";

import {
  subscribeUser,
  unsubscribeUser,
  sendNotification,
} from "@/app/actions";
import { useEffect, useLayoutEffect, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\\-/g, "+")
    .replace(/_/g, "/");
  if (typeof window !== "object") return Buffer.from(base64, "base64");
  const bytes = window.atob(base64);
  const array = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; ++i) array[i] = bytes.charCodeAt(i);
  return array;
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState<boolean>();
  useLayoutEffect(() => {
    setIsSupported("serviceWorker" in navigator && "PushManager" in window);
  }, []);

  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  useEffect(() => {
    if (!isSupported) return;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then(setRegistration);
  }, [isSupported]);

  const [subscription, setSubscription] = useState<PushSubscription | null>();
  useEffect(() => {
    registration?.pushManager.getSubscription().then(setSubscription);
  }, [registration]);

  async function subscribeToPush() {
    if (!registration) return;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    return await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    return await unsubscribeUser();
  }

  async function sendTestNotification() {
    return await sendNotification("Test", "Test notification");
  }

  if (!isSupported) return false;

  return (
    <p>
      Push notifications:{" "}
      {subscription ? (
        <>
          <button onClick={unsubscribeFromPush}>On</button>
          <button onClick={sendTestNotification}>Test</button>
        </>
      ) : (
        <>
          <button onClick={subscribeToPush}>Off</button>
          <button onClick={sendTestNotification}>Test</button>
        </>
      )}
    </p>
  );
}
