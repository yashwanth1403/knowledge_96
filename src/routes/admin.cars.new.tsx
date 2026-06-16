import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { VehicleForm } from "@/components/admin/VehicleForm";

export const Route = createFileRoute("/admin/cars/new")({
  head: () => ({ meta: [{ title: "Add Vehicle — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: NewCarPage,
});

function NewCarPage() {
  const navigate = useNavigate();
  return (
    <AdminLayout title="Add Vehicle">
      <VehicleForm onDone={() => navigate({ to: "/admin/cars" })} />
    </AdminLayout>
  );
}
