import { createFileRoute } from "@tanstack/react-router";
import { SellCarPage } from "@/components/SellCarPage";

export const Route = createFileRoute("/sell-car")({
  head: () => ({
    meta: [
      { title: "Sell Your Car | Knowledge_96" },
      { name: "description", content: "Get the best value for your vehicle with a fast and transparent selling process." },
      { property: "og:title", content: "Sell Your Car | Knowledge_96" },
      { property: "og:description", content: "Get the best value for your vehicle with a fast and transparent selling process." },
      { property: "og:url", content: "/sell-car" },
    ],
    links: [{ rel: "canonical", href: "/sell-car" }],
  }),
  component: SellCarPage,
});
