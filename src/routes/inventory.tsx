import { createFileRoute } from "@tanstack/react-router";
import { InventoryPage } from "@/components/InventoryPage";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Browse Used Cars | Knowledge_96" },
      { name: "description", content: "Explore premium pre-owned vehicles with detailed specifications, transparent pricing and quality inspections." },
      { property: "og:title", content: "Browse Used Cars | Knowledge_96" },
      { property: "og:description", content: "Explore premium pre-owned vehicles with detailed specifications, transparent pricing and quality inspections." },
      { property: "og:url", content: "/inventory" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/inventory" }],
  }),
  component: InventoryPage,
});
