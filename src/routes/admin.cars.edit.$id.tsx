import { createFileRoute, useNavigate, notFound } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { adminVehicles } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/cars/edit/$id")({
  head: ({ params }) => ({ meta: [{ title: `Edit ${params.id} — Admin | Knowledge_96` }, { name: "robots", content: "noindex" }] }),
  loader: ({ params }) => {
    const car = adminVehicles.find(v => v.id === params.id);
    if (!car) throw notFound();
    return { car };
  },
  notFoundComponent: () => (
    <AdminLayout title="Vehicle not found">
      <p className="text-muted-foreground">No vehicle matches this ID.</p>
    </AdminLayout>
  ),
  errorComponent: ({ error }) => (
    <AdminLayout title="Error">
      <p className="text-muted-foreground">{error.message}</p>
    </AdminLayout>
  ),
  component: EditCarPage,
});

function EditCarPage() {
  const { car } = Route.useLoaderData();
  const navigate = useNavigate();
  return (
    <AdminLayout title={`Edit: ${car.brand} ${car.model}`}>
      <VehicleForm initial={car} onDone={() => navigate({ to: "/admin/cars" })} />
    </AdminLayout>
  );
}
