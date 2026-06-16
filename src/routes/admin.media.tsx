import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SectionCard } from "@/components/admin/shared";
import { adminVehicles } from "@/lib/admin-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Upload, Folder, Image as ImageIcon, Video, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/admin/media")({
  head: () => ({ meta: [{ title: "Media Library — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: MediaPage,
});

const folders = [
  { name: "Vehicle Photos", count: 142 },
  { name: "Walkaround Videos", count: 18 },
  { name: "Branding", count: 24 },
  { name: "Marketing", count: 36 },
];

function MediaPage() {
  const [type, setType] = useState("all");
  const [q, setQ] = useState("");
  const items = adminVehicles
    .flatMap((v, i) => [
      { kind: "image" as const, url: v.image, name: `${v.brand}-${v.model}-${i}.jpg`, vehicle: `${v.brand} ${v.model}` },
      ...(i % 3 === 0 ? [{ kind: "video" as const, url: v.image, name: `${v.brand}-walkaround.mp4`, vehicle: `${v.brand} ${v.model}` }] : []),
    ])
    .filter(it => (type === "all" || it.kind === type) && it.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AdminLayout
      title="Media Library"
      actions={<Button className="bg-accent hover:bg-accent/90 text-accent-foreground"><Upload className="h-4 w-4 mr-1.5" />Upload</Button>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {folders.map(f => (
          <motion.div key={f.name} whileHover={{ y: -2 }} className="rounded-xl border border-border bg-card p-5 hover:bg-muted/30 cursor-pointer transition-colors">
            <Folder className="h-6 w-6 text-accent" />
            <div className="mt-3 font-medium">{f.name}</div>
            <div className="text-xs text-muted-foreground">{f.count} files</div>
          </motion.div>
        ))}
      </div>

      <SectionCard className="mt-6">
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search media…" className="pl-9 bg-background/60" />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Files</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02 }}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-card"
            >
              <img src={it.url} alt={it.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              <div className="absolute top-2 left-2 rounded bg-black/60 p-1 text-white">
                {it.kind === "image" ? <ImageIcon className="h-3 w-3" /> : <Video className="h-3 w-3" />}
              </div>
              <button className="absolute top-2 right-2 rounded bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100"><MoreVertical className="h-3 w-3" /></button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <div className="truncate text-xs text-white">{it.name}</div>
                <div className="truncate text-[10px] text-white/60">{it.vehicle}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionCard>
    </AdminLayout>
  );
}
