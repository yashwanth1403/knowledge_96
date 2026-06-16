import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SectionCard, StatusBadge } from "@/components/admin/shared";
import { leads as allLeads, type Lead, type LeadStatus, relativeDate } from "@/lib/admin-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Trash2, Download, Phone, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({ meta: [{ title: "Leads — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: LeadsPage,
});

const STATUSES: ("All" | LeadStatus)[] = ["All", "New", "Contacted", "Follow Up", "Interested", "Negotiation", "Won", "Lost"];

function LeadsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | LeadStatus>("All");
  const [sort, setSort] = useState<"newest" | "oldest" | "name">("newest");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState("");

  const filtered = useMemo(() => {
    let list = allLeads.filter(l =>
      (filter === "All" || l.status === filter) &&
      (query === "" || `${l.name} ${l.email} ${l.phone} ${l.vehicle}`.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "newest") list = [...list].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sort === "oldest") list = [...list].sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, filter, sort]);

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(l => l.id)));
  };

  return (
    <AdminLayout
      title="Leads"
      actions={
        <>
          {selected.size > 0 && (
            <>
              <span className="text-xs text-muted-foreground">{selected.size} selected</span>
              <Button size="sm" variant="outline"><Trash2 className="h-4 w-4 mr-1.5" />Delete</Button>
              <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1.5" />Export</Button>
            </>
          )}
        </>
      }
    >
      <SectionCard>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, phone, vehicle…" className="pl-9 bg-background/60" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={v => setFilter(v as any)}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={v => setSort(v as any)}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name">Name A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="pb-3 pr-2"><Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} /></th>
                <th className="pb-3 pr-4 font-medium">Lead ID</th>
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium hidden lg:table-cell">Contact</th>
                <th className="pb-3 pr-4 font-medium">Vehicle</th>
                <th className="pb-3 pr-4 font-medium hidden md:table-cell">Source</th>
                <th className="pb-3 pr-4 font-medium hidden md:table-cell">Date</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <motion.tr
                  key={l.id}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
                  className="border-b border-border/60 hover:bg-muted/30 cursor-pointer transition-colors"
                  onClick={() => setOpen(l)}
                >
                  <td className="py-3 pr-2" onClick={e => e.stopPropagation()}>
                    <Checkbox
                      checked={selected.has(l.id)}
                      onCheckedChange={(c) => {
                        const next = new Set(selected);
                        c ? next.add(l.id) : next.delete(l.id);
                        setSelected(next);
                      }}
                    />
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{l.id}</td>
                  <td className="py-3 pr-4 font-medium">{l.name}</td>
                  <td className="py-3 pr-4 hidden lg:table-cell text-muted-foreground">
                    <div>{l.phone}</div>
                    <div className="text-xs">{l.email}</div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{l.vehicle}</td>
                  <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">{l.source}</td>
                  <td className="py-3 pr-4 hidden md:table-cell text-muted-foreground">{relativeDate(l.date)}</td>
                  <td className="py-3 pr-4"><StatusBadge status={l.status} /></td>
                  <td className="py-3 text-right" onClick={e => e.stopPropagation()}>
                    <Button size="sm" variant="ghost" asChild><a href={`tel:${l.phone}`}><Phone className="h-4 w-4" /></a></Button>
                    <Button size="sm" variant="ghost" asChild><a href={`mailto:${l.email}`}><Mail className="h-4 w-4" /></a></Button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="py-12 text-center text-muted-foreground">No leads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-card">
          {open && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{open.id}</span>
                  <StatusBadge status={open.status} />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-4 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold">{open.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{open.phone}</span>
                    <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{open.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button size="sm" asChild><a href={`tel:${open.phone}`}><Phone className="h-4 w-4 mr-1.5" />Call</a></Button>
                  <Button size="sm" variant="outline" asChild><a href={`https://wa.me/${open.phone.replace(/\D/g, "")}`}><MessageCircle className="h-4 w-4 mr-1.5" />WhatsApp</a></Button>
                  <Button size="sm" variant="outline" asChild><a href={`mailto:${open.email}`}><Mail className="h-4 w-4 mr-1.5" />Email</a></Button>
                </div>

                <div className="rounded-lg border border-border bg-background/50 p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Interested Vehicle</div>
                  <div className="mt-1 font-medium">{open.vehicle}</div>
                  <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Enquiry</div>
                  <p className="mt-1 text-sm">{open.message}</p>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Update status</label>
                  <Select defaultValue={open.status}>
                    <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.filter(s => s !== "All").map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <Tabs defaultValue="notes">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="notes">Internal Notes</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>
                  <TabsContent value="notes" className="mt-3 space-y-3">
                    {open.notes.map(n => (
                      <div key={n.id} className="rounded-md border border-border bg-background/40 p-3">
                        <div className="flex justify-between text-xs text-muted-foreground"><span>{n.author}</span><span>{relativeDate(n.at)}</span></div>
                        <p className="mt-1 text-sm">{n.text}</p>
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Textarea value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add a note…" />
                      <Button size="sm" onClick={() => setNewNote("")}>Add Note</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="timeline" className="mt-3">
                    <ol className="relative ml-2 space-y-3 border-l border-border pl-4">
                      {open.timeline.map(t => (
                        <li key={t.id} className="relative">
                          <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                          <div className="text-sm">{t.event}</div>
                          <div className="text-xs text-muted-foreground">{relativeDate(t.at)}</div>
                        </li>
                      ))}
                    </ol>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
}
