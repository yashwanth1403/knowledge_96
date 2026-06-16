import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { VehicleDetailsPage } from "@/components/VehicleDetailsPage";
import { getCarBySlug } from "@/lib/carDetails";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/car/$slug")({
  loader: ({ params }) => {
    const car = getCarBySlug(params.slug);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.car;
    const title = c
      ? `${c.brand} ${c.model} ${c.year} For Sale | Knowledge_96`
      : "Vehicle | Knowledge_96";
    const desc = "Explore detailed specifications, inspection reports, images and pricing for this verified pre-owned vehicle.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: c ? `/car/${c.id}` : "/inventory" },
        ...(c ? [{ property: "og:image", content: c.image }] : []),
      ],
      links: c ? [{ rel: "canonical", href: `/car/${c.id}` }] : [],
    };
  },
  component: CarRoute,
  notFoundComponent: () => (
    <Layout>
      <section className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-semibold">Vehicle not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This vehicle may have been sold or the link is incorrect.
        </p>
        <Link to="/inventory" className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">
          Browse Inventory
        </Link>
      </section>
    </Layout>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <Layout>
        <section className="mx-auto flex min-h-[40vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-semibold">Couldn't load this vehicle</h1>
          <button onClick={reset} className="mt-5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">
            Try again
          </button>
        </section>
      </Layout>
    );
  },
});

function CarRoute() {
  const { car } = Route.useLoaderData();
  return <VehicleDetailsPage car={car} />;
}
