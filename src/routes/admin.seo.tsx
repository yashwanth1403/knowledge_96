import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SectionCard } from "@/components/admin/shared";
import { seoPages, adminVehicles } from "@/lib/admin-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

export const Route = createFileRoute("/admin/seo")({
  head: () => ({ meta: [{ title: "SEO Manager — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: SeoPage,
});

function SeoPage() {
  const [editing, setEditing] = useState<any>(null);

  return (
    <AdminLayout title="SEO Manager">
      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">Site Pages</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="mt-4">
          <SectionCard>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="pb-3 pr-4 font-medium">Page</th>
                    <th className="pb-3 pr-4 font-medium">SEO Title</th>
                    <th className="pb-3 pr-4 font-medium hidden lg:table-cell">Meta Description</th>
                    <th className="pb-3 pr-4 font-medium hidden md:table-cell">Slug</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {seoPages.map(p => (
                    <tr key={p.page} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4 font-medium">{p.page}</td>
                      <td className="py-3 pr-4 max-w-xs truncate">{p.title}</td>
                      <td className="py-3 pr-4 hidden lg:table-cell text-muted-foreground max-w-md truncate">{p.description}</td>
                      <td className="py-3 pr-4 hidden md:table-cell font-mono text-xs text-muted-foreground">{p.slug}</td>
                      <td className="py-3 pr-4">
                        <span className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          p.status === "Optimized" && "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
                          p.status === "Needs Review" && "bg-amber-500/15 text-amber-300 border-amber-500/30",
                          p.status === "Draft" && "bg-muted text-muted-foreground border-border",
                        )}>{p.status}</span>
                      </td>
                      <td className="py-3 text-right">
                        <Button size="sm" variant="ghost" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="vehicles" className="mt-4">
          <SectionCard>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="pb-3 pr-4 font-medium">Vehicle</th>
                    <th className="pb-3 pr-4 font-medium">SEO Title</th>
                    <th className="pb-3 pr-4 font-medium hidden lg:table-cell">Keywords</th>
                    <th className="pb-3 pr-4 font-medium hidden md:table-cell">Slug</th>
                    <th className="pb-3 font-medium text-right">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {adminVehicles.map(v => (
                    <tr key={v.id} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4 font-medium">{v.brand} {v.model}</td>
                      <td className="py-3 pr-4 max-w-xs truncate">{v.seo.title}</td>
                      <td className="py-3 pr-4 hidden lg:table-cell text-muted-foreground max-w-md truncate">{v.seo.keywords}</td>
                      <td className="py-3 pr-4 hidden md:table-cell font-mono text-xs text-muted-foreground">{v.seo.slug}</td>
                      <td className="py-3 text-right">
                        <Button size="sm" variant="ghost" onClick={() => setEditing({ page: `${v.brand} ${v.model}`, ...v.seo })}><Pencil className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editing} onOpenChange={o => !o && setEditing(null)}>
        <DialogContent className="max-w-xl bg-card">
          {editing && (
            <>
              <DialogHeader><DialogTitle>Edit SEO — {editing.page}</DialogTitle></DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">SEO Title</Label>
                  <Input defaultValue={editing.title} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Meta Description</Label>
                  <Textarea rows={3} defaultValue={editing.description} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Keywords</Label>
                  <Input defaultValue={editing.keywords} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Slug</Label>
                    <Input defaultValue={editing.slug} />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Canonical</Label>
                    <Input defaultValue={editing.canonical ?? ""} />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setEditing(null)}>Save</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
