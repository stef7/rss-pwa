import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RSS PWA",
    start_url: "/",
    display: "standalone",
    background_color: "#F78422",
    theme_color: "#FFFFFF",
    icons: [
      {
        src: "/rss.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
