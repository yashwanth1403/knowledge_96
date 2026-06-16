import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SectionCard } from "@/components/admin/shared";
import { customers, relativeDate } from "@/lib/admin-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({ meta: [{ title: "Customers — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: CustomersPage,
});

function CustomersPage() {
  const [q, setQ] = useState("");
  const list = customers.filter(c =>
    `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AdminLayout title="Customers">
      <SectionCard>
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search customers…" className="pl-9 bg-background/60" />
          </div>
          <div className="text-xs text-muted-foreground">{list.length} customers</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium hidden md:table-cell">Contact</th>
                <th className="pb-3 pr-4 font-medium hidden lg:table-cell">Interested In</th>
                <th className="pb-3 pr-4 font-medium">Leads</th>
                <th className="pb-3 pr-4 font-medium hidden md:table-cell">Last Contact</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map(c => (
                <tr key={c.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent text-sm font-semibold">{c.name.split(" ").map(s => s[0]).join("")}</div>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">
                    <div>{c.phone}</div>
                    <div className="text-xs">{c.email}</div>
                  </td>
                  <td className="py-3 pr-4 hidden lg:table-cell text-muted-foreground">{c.interested.join(", ")}</td>
                  <td className="py-3 pr-4 font-medium">{c.leadCount}</td>
                  <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">{relativeDate(c.lastContact)}</td>
                  <td className="py-3 pr-4">
                    <span className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      c.status === "Active" && "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
                      c.status === "Cold" && "bg-muted text-muted-foreground border-border",
                      c.status === "Converted" && "bg-violet-500/15 text-violet-300 border-violet-500/30",
                    )}>{c.status}</span>
                  </td>
                  <td className="py-3 text-right">
                    <Button size="sm" variant="ghost" asChild><a href={`tel:${c.phone}`}><Phone className="h-4 w-4" /></a></Button>
                    <Button size="sm" variant="ghost" asChild><a href={`mailto:${c.email}`}><Mail className="h-4 w-4" /></a></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AdminLayout>
  );
}
