import { PushNotificationManager } from "@/components/PushNotificationManager";

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="px-[max(2dvw,1em)] py-[max(1dvh,.5em)] bg-background/50 backdrop-blur-md rounded-es-lg rounded-ee-lg sticky top-0 place-self-center-safe">
        <h1 className="text-3xl">RSS PWA</h1>
      </header>
      <main className="px-[max(2dvw,1em)] py-[max(1dvh,.5em)] grow"></main>
      <footer className="px-[max(2dvw,1em)] py-[max(1dvh,.5em)] bg-background/50 backdrop-blur-md rounded-ss-lg sticky bottom-0 place-self-end-safe">
        <PushNotificationManager />
      </footer>
    </div>
  );
}
