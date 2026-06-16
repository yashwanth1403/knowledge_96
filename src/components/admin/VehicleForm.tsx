import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionCard } from "./shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Upload, X, Star, Youtube, Instagram, Video, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdminVehicle } from "@/lib/admin-data";
import { toast } from "sonner";

const steps = [
  { n: 1, label: "Basic Info" },
  { n: 2, label: "Specifications" },
  { n: 3, label: "Features" },
  { n: 4, label: "Media" },
  { n: 5, label: "SEO" },
  { n: 6, label: "Review" },
] as const;

const FEATURES = [
  "Sunroof", "Touchscreen", "Cruise Control", "Leather Seats",
  "Reverse Camera", "360 Camera", "ABS", "ESP",
  "Parking Sensors", "Airbags", "Climate Control", "Push Start",
];

const BRANDS = ["BMW", "Mercedes-Benz", "Audi", "Porsche", "Range Rover", "Jaguar", "Volvo", "Lexus", "Bentley", "Maserati"];

type Image = { id: string; url: string; name: string };

export function VehicleForm({ initial, onDone }: { initial?: AdminVehicle; onDone?: () => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    title: initial ? `${initial.year} ${initial.brand} ${initial.model}` : "",
    brand: initial?.brand ?? "",
    model: initial?.model ?? "",
    variant: initial?.variant ?? "",
    year: initial?.year?.toString() ?? "",
    ownership: "1st Owner",
    location: initial?.location ?? "",
    color: "",
    price: initial?.price?.toString() ?? "",
    fuel: initial?.fuel ?? "Petrol",
    transmission: initial?.transmission ?? "Automatic",
    km: initial?.km?.toString() ?? "",
    insurance: "Comprehensive",
    registration: "",
    engine: "",
    seats: "5",
    mileage: "",
    features: [] as string[],
    youtube: "",
    instagram: "",
    seoTitle: initial?.seo.title ?? "",
    seoDescription: initial?.seo.description ?? "",
    keywords: initial?.seo.keywords ?? "",
    slug: initial?.seo.slug ?? "",
  });

  const [images, setImages] = useState<Image[]>([]);
  const [cover, setCover] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const [videos, setVideos] = useState<{ name: string }[]>([]);

  const set = (k: string, v: any) => setData(d => ({ ...d, [k]: v }));
  const toggleFeature = (f: string) =>
    setData(d => ({ ...d, features: d.features.includes(f) ? d.features.filter(x => x !== f) : [...d.features, f] }));

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next: Image[] = Array.from(files).slice(0, 20 - images.length).map((f, i) => ({
      id: `${Date.now()}-${i}`,
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setImages(p => [...p, ...next]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const next = () => setStep(s => Math.min(6, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  const submit = () => {
    toast.success(initial ? "Vehicle updated" : "Vehicle created", { description: `${data.brand} ${data.model} saved.` });
    onDone?.();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div>
        <SectionCard className="lg:sticky lg:top-6">
          <ol className="space-y-1">
            {steps.map(s => {
              const done = step > s.n;
              const active = step === s.n;
              return (
                <li key={s.n}>
                  <button
                    onClick={() => setStep(s.n)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors text-left",
                      active ? "bg-accent/15 text-foreground" : "text-muted-foreground hover:bg-muted/40"
                    )}
                  >
                    <span className={cn(
                      "grid h-7 w-7 place-items-center rounded-full text-xs font-medium",
                      done ? "bg-emerald-500/20 text-emerald-300" : active ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {done ? <Check className="h-3.5 w-3.5" /> : s.n}
                    </span>
                    <span>{s.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </SectionCard>
      </div>

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SectionCard title={steps[step - 1].label}>
              {step === 1 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Title"><Input value={data.title} onChange={e => set("title", e.target.value)} placeholder="2022 BMW X5 xDrive40i" /></Field>
                  <Field label="Brand">
                    <Select value={data.brand} onValueChange={v => set("brand", v)}>
                      <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                      <SelectContent>{BRANDS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                  <Field label="Model"><Input value={data.model} onChange={e => set("model", e.target.value)} /></Field>
                  <Field label="Variant"><Input value={data.variant} onChange={e => set("variant", e.target.value)} /></Field>
                  <Field label="Year"><Input type="number" value={data.year} onChange={e => set("year", e.target.value)} /></Field>
                  <Field label="Ownership">
                    <Select value={data.ownership} onValueChange={v => set("ownership", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["1st Owner", "2nd Owner", "3rd Owner"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                  <Field label="Location"><Input value={data.location} onChange={e => set("location", e.target.value)} /></Field>
                  <Field label="Color"><Input value={data.color} onChange={e => set("color", e.target.value)} /></Field>
                  <Field label="Price (₹)" className="sm:col-span-2"><Input type="number" value={data.price} onChange={e => set("price", e.target.value)} /></Field>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Fuel Type">
                    <Select value={data.fuel} onValueChange={v => set("fuel", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["Petrol", "Diesel", "Electric", "Hybrid"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                  <Field label="Transmission">
                    <Select value={data.transmission} onValueChange={v => set("transmission", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["Automatic", "Manual"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent>
                    </Select>
                  </Field>
                  <Field label="KM Driven"><Input type="number" value={data.km} onChange={e => set("km", e.target.value)} /></Field>
                  <Field label="Insurance"><Input value={data.insurance} onChange={e => set("insurance", e.target.value)} /></Field>
                  <Field label="Registration"><Input value={data.registration} onChange={e => set("registration", e.target.value)} placeholder="TS09 AB 1234" /></Field>
                  <Field label="Engine"><Input value={data.engine} onChange={e => set("engine", e.target.value)} placeholder="2998 cc, 6-cyl" /></Field>
                  <Field label="Seats"><Input type="number" value={data.seats} onChange={e => set("seats", e.target.value)} /></Field>
                  <Field label="Mileage (kmpl)"><Input value={data.mileage} onChange={e => set("mileage", e.target.value)} /></Field>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {FEATURES.map(f => (
                    <label key={f} className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-md border border-border bg-background/40 p-3 transition-colors hover:bg-muted/30",
                      data.features.includes(f) && "border-accent/50 bg-accent/5"
                    )}>
                      <Checkbox checked={data.features.includes(f)} onCheckedChange={() => toggleFeature(f)} />
                      <span className="text-sm">{f}</span>
                    </label>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Vehicle Images</Label>
                    <div
                      onDragOver={e => e.preventDefault()}
                      onDrop={handleDrop}
                      onClick={() => fileRef.current?.click()}
                      className="mt-2 grid cursor-pointer place-items-center rounded-lg border-2 border-dashed border-border bg-background/40 p-10 text-center transition-colors hover:border-accent/50 hover:bg-accent/5"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div className="mt-3 text-sm">Drag & drop images or <span className="text-accent">browse</span></div>
                      <div className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 10MB · max 20 photos</div>
                      <input ref={fileRef} hidden type="file" accept="image/*" multiple onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)} />
                    </div>

                    {images.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                        {images.map((img, i) => (
                          <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="group relative aspect-square overflow-hidden rounded-md border border-border"
                          >
                            <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 hidden items-center justify-center gap-1 bg-black/60 group-hover:flex">
                              <button onClick={() => setCover(i)} title="Set cover" className="rounded p-1.5 text-white hover:bg-white/10"><Star className={cn("h-4 w-4", cover === i && "fill-amber-400 text-amber-400")} /></button>
                              <button title="Reorder" className="rounded p-1.5 text-white hover:bg-white/10"><GripVertical className="h-4 w-4" /></button>
                              <button onClick={() => setImages(p => p.filter(x => x.id !== img.id))} className="rounded p-1.5 text-white hover:bg-white/10"><X className="h-4 w-4" /></button>
                            </div>
                            {cover === i && <span className="absolute top-1 left-1 rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">Cover</span>}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Videos</Label>
                    <div className="mt-2 grid gap-3 md:grid-cols-2">
                      <button onClick={() => videoRef.current?.click()} className="flex items-center gap-3 rounded-lg border border-dashed border-border bg-background/40 p-4 text-left hover:border-accent/50">
                        <Video className="h-5 w-5 text-accent" />
                        <div>
                          <div className="text-sm font-medium">Upload MP4 / MOV</div>
                          <div className="text-xs text-muted-foreground">Walkaround, interior, engine</div>
                        </div>
                      </button>
                      <input ref={videoRef} hidden type="file" accept="video/mp4,video/quicktime" multiple onChange={e => e.target.files && setVideos(p => [...p, ...Array.from(e.target.files!).map(f => ({ name: f.name }))])} />
                      <div className="rounded-lg border border-border bg-background/40 p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium"><Youtube className="h-4 w-4 text-rose-400" />YouTube URL</div>
                        <Input value={data.youtube} onChange={e => set("youtube", e.target.value)} placeholder="https://youtu.be/…" />
                      </div>
                      <div className="rounded-lg border border-border bg-background/40 p-4 space-y-2 md:col-span-2">
                        <div className="flex items-center gap-2 text-sm font-medium"><Instagram className="h-4 w-4 text-pink-400" />Instagram Reel URL</div>
                        <Input value={data.instagram} onChange={e => set("instagram", e.target.value)} placeholder="https://instagram.com/reel/…" />
                      </div>
                    </div>
                    {videos.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        {videos.map((v, i) => <li key={i} className="flex items-center gap-2"><Video className="h-3.5 w-3.5" />{v.name}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="grid gap-4">
                  <Field label="SEO Title"><Input value={data.seoTitle} onChange={e => set("seoTitle", e.target.value)} /></Field>
                  <Field label="Meta Description"><Textarea rows={3} value={data.seoDescription} onChange={e => set("seoDescription", e.target.value)} /></Field>
                  <Field label="Keywords"><Input value={data.keywords} onChange={e => set("keywords", e.target.value)} placeholder="bmw x5, used bmw, luxury suv" /></Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Slug"><Input value={data.slug} onChange={e => set("slug", e.target.value)} placeholder="bmw-x5-xdrive40i-2022" /></Field>
                    <Field label="Canonical URL"><Input placeholder="https://knowledge96.com/car/…" /></Field>
                  </div>
                  <Field label="Open Graph Image">
                    <div className="rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground">Will default to the cover image. Upload custom OG image to override.</div>
                  </Field>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <ReviewRow label="Vehicle" value={`${data.year} ${data.brand} ${data.model} ${data.variant}`} />
                  <ReviewRow label="Price" value={data.price ? `₹${Number(data.price).toLocaleString("en-IN")}` : "—"} />
                  <ReviewRow label="KM / Fuel" value={`${data.km || "—"} km · ${data.fuel}`} />
                  <ReviewRow label="Location" value={data.location || "—"} />
                  <ReviewRow label="Features" value={data.features.join(", ") || "None"} />
                  <ReviewRow label="Images" value={`${images.length} uploaded${images.length ? `, cover #${cover + 1}` : ""}`} />
                  <ReviewRow label="SEO Title" value={data.seoTitle || "—"} />
                </div>
              )}

              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <Button variant="outline" onClick={prev} disabled={step === 1}>Back</Button>
                <div className="text-xs text-muted-foreground">Step {step} of 6</div>
                {step < 6 ? (
                  <Button onClick={next} className="bg-accent hover:bg-accent/90 text-accent-foreground">Continue</Button>
                ) : (
                  <Button onClick={submit} className="bg-accent hover:bg-accent/90 text-accent-foreground">{initial ? "Save Changes" : "Publish Vehicle"}</Button>
                )}
              </div>
            </SectionCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-2">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
}
