import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Knowledge_96 | Premium Pre-Owned Cars" },
      { name: "description", content: "Buy certified pre-owned cars with confidence. Explore verified vehicles, transparent pricing and trusted support." },
      { property: "og:title", content: "Knowledge_96 | Premium Pre-Owned Cars" },
      { property: "og:description", content: "Buy certified pre-owned cars with confidence. Explore verified vehicles, transparent pricing and trusted support." },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});
