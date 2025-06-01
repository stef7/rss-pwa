"use server";

import webPush, { PushSubscription } from "web-push";

webPush.setVapidDetails(
  `https://${
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || "localhost:3000"
  }/`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(title: string, body: string) {
  // if (!subscription) {
  //   throw new Error("No subscription available");
  // }

  // try {
  await webPush.sendNotification(
    subscription!,
    JSON.stringify({
      title,
      body,
      icon: "/rss.svg",
    }),
  );
  return { success: true };
  // } catch (error) {
  //   console.error("Error sending push notification:", error);
  //   return { success: false, error: "Failed to send notification" };
  // }
}
