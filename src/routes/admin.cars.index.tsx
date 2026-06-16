import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SectionCard, VehicleStatusBadge } from "@/components/admin/shared";
import { adminVehicles, formatPriceShort } from "@/lib/admin-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, Pencil, Copy, Trash2, MoreVertical, BadgeCheck, Search, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/cars/")({
  head: () => ({ meta: [{ title: "Vehicles — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: CarsListPage,
});

function CarsListPage() {
  const [q, setQ] = useState("");
  const list = adminVehicles.filter(v =>
    `${v.brand} ${v.model} ${v.variant} ${v.year}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AdminLayout
      title="Vehicles"
      actions={
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link to="/admin/cars/new">+ Add Vehicle</Link>
        </Button>
      }
    >
      <SectionCard>
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search vehicles…" className="pl-9 bg-background/60" />
          </div>
          <div className="text-xs text-muted-foreground">{list.length} vehicles</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="pb-3 pr-4 font-medium">Vehicle</th>
                <th className="pb-3 pr-4 font-medium hidden md:table-cell">Brand</th>
                <th className="pb-3 pr-4 font-medium hidden md:table-cell">Year</th>
                <th className="pb-3 pr-4 font-medium">Price</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium hidden lg:table-cell">Views</th>
                <th className="pb-3 pr-4 font-medium hidden lg:table-cell">Leads</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((v, i) => (
                <motion.tr
                  key={v.id}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-border/60 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={v.image} alt={`${v.brand} ${v.model}`} className="h-12 w-16 rounded-md object-cover" loading="lazy" />
                      <div className="min-w-0">
                        <div className="font-medium truncate">{v.brand} {v.model}</div>
                        <div className="text-xs text-muted-foreground truncate">{v.variant}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">{v.brand}</td>
                  <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">{v.year}</td>
                  <td className="py-3 pr-4 font-medium">{formatPriceShort(v.price)}</td>
                  <td className="py-3 pr-4"><VehicleStatusBadge status={v.status} /></td>
                  <td className="py-3 pr-4 hidden lg:table-cell text-muted-foreground">{v.views.toLocaleString()}</td>
                  <td className="py-3 pr-4 hidden lg:table-cell text-muted-foreground">{v.leads}</td>
                  <td className="py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild><Link to="/car/$slug" params={{ slug: v.id }}><Eye className="h-4 w-4 mr-2" />View</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link to="/admin/cars/edit/$id" params={{ id: v.id }}><Pencil className="h-4 w-4 mr-2" />Edit</Link></DropdownMenuItem>
                        <DropdownMenuItem><Copy className="h-4 w-4 mr-2" />Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><BadgeCheck className="h-4 w-4 mr-2" />Mark Sold</DropdownMenuItem>
                        <DropdownMenuItem>{v.status === "Published" ? <><EyeOff className="h-4 w-4 mr-2" />Unpublish</> : <><Eye className="h-4 w-4 mr-2" />Publish</>}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-rose-400"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AdminLayout>
  );
}
