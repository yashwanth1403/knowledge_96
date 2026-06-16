import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Calendar, Gauge, Fuel, Settings2, MapPin, Phone, MessageCircle,
  CalendarCheck, X, ChevronLeft, ChevronRight, ShieldCheck,
  CheckCircle2, AlertCircle, Star, Palette, FileText, Cog, Users,
  Mail, ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { formatPrice, formatKm } from "@/lib/cars";
import type { CarDetail, InspectionStatus } from "@/lib/carDetails";
import { getRelated } from "@/lib/carDetails";
import { BUSINESS, telHref, whatsappHref } from "@/lib/leads";
import { cn } from "@/lib/utils";

export function VehicleDetailsPage({ car }: { car: CarDetail }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const related = useMemo(() => getRelated(car.id), [car.id]);
  const waMsg = `Hi Knowledge_96, I'm interested in the ${car.year} ${car.brand} ${car.model} (${car.variant}).`;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-2 md:px-8">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/inventory" className="hover:text-foreground">Inventory</Link>
          <span>/</span>
          <span className="text-foreground">{car.brand} {car.model}</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:px-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Gallery */}
        <div>
          <motion.div
            layout
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-[color:var(--surface)]"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={car.images[active]}
                alt={`${car.brand} ${car.model} view ${active + 1}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full cursor-zoom-in object-cover"
                onClick={() => setLightbox(active)}
              />
            </AnimatePresence>
            <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-foreground backdrop-blur-md">
              {car.year}
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent-foreground">
              Verified
            </span>
            <button
              onClick={() => setActive((a) => (a === 0 ? car.images.length - 1 : a - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 backdrop-blur-md hover:bg-accent hover:text-accent-foreground"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActive((a) => (a === car.images.length - 1 ? 0 : a + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 backdrop-blur-md hover:bg-accent hover:text-accent-foreground"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>

          <div className="mt-4 grid grid-cols-6 gap-2">
            {car.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border transition",
                  i === active ? "border-accent ring-2 ring-accent/40" : "border-border opacity-60 hover:opacity-100"
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{car.brand}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              {car.model}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{car.variant}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-accent">{formatPrice(car.price)}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Inclusive of all charges</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Pill icon={<Calendar className="h-4 w-4" />} label="Year" value={`${car.year}`} />
              <Pill icon={<Gauge className="h-4 w-4" />} label="KM" value={formatKm(car.km)} />
              <Pill icon={<Fuel className="h-4 w-4" />} label="Fuel" value={car.fuel} />
              <Pill icon={<Settings2 className="h-4 w-4" />} label="Trans." value={car.transmission} />
              <Pill icon={<ShieldCheck className="h-4 w-4" />} label="Owner" value={car.ownership} />
              <Pill icon={<MapPin className="h-4 w-4" />} label="Location" value={car.location} />
            </div>

            {/* Primary CTAs */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={telHref}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground transition hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a
                href={whatsappHref(waMsg)}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href="#enquiry"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[color:var(--surface)] px-5 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent"
              >
                <CalendarCheck className="h-4 w-4" /> Book Inspection
              </a>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-[color:var(--surface)] p-4 text-xs text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <span>200-point quality inspection · Verified ownership · Free RC transfer assistance</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <Section title="Vehicle Specifications" eyebrow="Specifications">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { i: <Calendar className="h-4 w-4" />, l: "Year", v: `${car.year}` },
            { i: <Fuel className="h-4 w-4" />, l: "Fuel", v: car.fuel },
            { i: <Settings2 className="h-4 w-4" />, l: "Transmission", v: car.transmission },
            { i: <ShieldCheck className="h-4 w-4" />, l: "Ownership", v: car.ownership },
            { i: <Gauge className="h-4 w-4" />, l: "Mileage", v: car.mileage },
            { i: <Palette className="h-4 w-4" />, l: "Color", v: car.color },
            { i: <FileText className="h-4 w-4" />, l: "Insurance", v: car.insurance },
            { i: <FileText className="h-4 w-4" />, l: "Registration", v: car.registration },
            { i: <Cog className="h-4 w-4" />, l: "Engine", v: car.engine },
            { i: <Users className="h-4 w-4" />, l: "Seats", v: `${car.seats}` },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="text-accent">{s.i}</span> {s.l}
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{s.v}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <Section title="Features & Comforts" eyebrow="Loaded with">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {car.features.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.025 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition hover:border-accent/40"
            >
              <Star className="h-4 w-4 flex-none text-accent" />
              <span className="text-sm text-foreground/90">{f}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* DESCRIPTION */}
      <Section title="About this Vehicle" eyebrow="Description">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            {car.description.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </Section>

      {/* INSPECTION REPORT */}
      <Section title="Quality Inspection Report" eyebrow="200-Point Check">
        <div className="grid gap-3 md:grid-cols-2">
          {car.inspection.map((row, i) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{row.category}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{row.note}</p>
              </div>
              <StatusBadge status={row.status} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FINANCE ESTIMATOR */}
      <FinanceEstimator price={car.price} />

      {/* RELATED */}
      <Section title="Similar Vehicles" eyebrow="You may also like">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
        </div>
      </Section>

      {/* ENQUIRY FORM */}
      <EnquiryForm carLabel={`${car.year} ${car.brand} ${car.model}`} waMsg={waMsg} />

      {/* Sticky mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a href={telHref} className="flex items-center justify-center gap-1.5 rounded-lg bg-accent px-2 py-2.5 text-xs font-semibold text-accent-foreground">
            <Phone className="h-3.5 w-3.5" /> Call
          </a>
          <a href={whatsappHref(waMsg)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-2 py-2.5 text-xs font-semibold text-white">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <a href="#enquiry" className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-[color:var(--surface)] px-2 py-2.5 text-xs font-semibold text-foreground">
            <Mail className="h-3.5 w-3.5" /> Enquire
          </a>
        </div>
      </div>
      {/* spacer for sticky bar */}
      <div className="h-20 lg:hidden" />

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              key={lightbox}
              src={car.images[lightbox]}
              alt=""
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

function Pill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-[color:var(--surface)] p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="text-accent">{icon}</span> {label}
      </div>
      <p className="mt-1.5 truncate text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Section({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: InspectionStatus }) {
  const map: Record<InspectionStatus, { cls: string; icon: React.ReactNode }> = {
    Excellent: { cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
    Good: { cls: "bg-sky-500/15 text-sky-300 border-sky-500/30", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
    "Needs Attention": { cls: "bg-amber-500/15 text-amber-300 border-amber-500/30", icon: <AlertCircle className="h-3.5 w-3.5" /> },
  };
  const v = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest", v.cls)}>
      {v.icon} {status}
    </span>
  );
}

function FinanceEstimator({ price }: { price: number }) {
  const [down, setDown] = useState(Math.round(price * 0.2));
  const [tenure, setTenure] = useState(60);
  const [rate, setRate] = useState(9.5);
  const loan = Math.max(price - down, 0);
  const r = rate / 100 / 12;
  const emi = r === 0 ? loan / tenure : Math.round((loan * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1));

  return (
    <Section title="Finance Estimator" eyebrow="EMI Calculator">
      <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
        <div className="space-y-5">
          <Field label="Vehicle Price" value={formatPrice(price)} />
          <Range label="Down Payment" value={down} min={Math.round(price * 0.1)} max={Math.round(price * 0.6)} step={50000} onChange={setDown} format={formatPrice} />
          <Range label="Loan Tenure (months)" value={tenure} min={12} max={84} step={6} onChange={setTenure} format={(v) => `${v} months`} />
          <Range label="Interest Rate (%)" value={rate} min={7} max={14} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} />
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-xl bg-[color:var(--surface)] p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Estimated EMI</p>
            <p className="mt-2 text-4xl font-bold text-accent">₹{emi.toLocaleString("en-IN")}</p>
            <p className="mt-1 text-xs text-muted-foreground">per month for {tenure} months</p>
          </div>
          <div className="space-y-1 text-sm text-foreground/80">
            <div className="flex justify-between"><span className="text-muted-foreground">Loan Amount</span><span>{formatPrice(loan)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total Payable</span><span>₹{(emi * tenure).toLocaleString("en-IN")}</span></div>
          </div>
          <a href={telHref} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground hover:scale-[1.02] transition">
            <Phone className="h-4 w-4" /> Talk to Finance Expert
          </a>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-[color:var(--surface)] px-4 py-3">
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

function Range({ label, value, min, max, step, onChange, format }:
  { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
        <span className="font-semibold text-accent">{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[oklch(0.62_0.22_25)]"
      />
    </div>
  );
}

function EnquiryForm({ carLabel, waMsg }: { carLabel: string; waMsg: string }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Section title="Enquire About This Vehicle" eyebrow="Get in touch">
      <div id="enquiry" className="grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Input name="name" label="Full Name" required />
          <Input name="phone" label="Phone" type="tel" required />
          <Input name="email" label="Email" type="email" />
          <Input name="vehicle" label="Interested Vehicle" defaultValue={carLabel} />
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Message</label>
            <textarea rows={4} className="w-full rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none" placeholder="I'd like to book a test drive…" />
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:scale-[1.02] transition">
              Submit Enquiry <ArrowRight className="h-4 w-4" />
            </button>
            <a href={whatsappHref(waMsg)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={telHref} className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-foreground">
              <Phone className="h-4 w-4" /> Call
            </a>
          </div>
          {submitted && (
            <p className="sm:col-span-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              Thanks! Our team will reach out within 30 minutes.
            </p>
          )}
        </form>

        <aside className="space-y-4 rounded-xl bg-[color:var(--surface)] p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Direct Contact</p>
            <h3 className="mt-2 text-xl font-semibold">Speak with our specialist</h3>
            <p className="mt-1 text-sm text-muted-foreground">Available 9 AM – 9 PM, all days.</p>
          </div>
          <a href={telHref} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent">
            <Phone className="h-5 w-5 text-accent" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Call</p>
              <p className="text-sm font-semibold text-foreground">{BUSINESS.phone}</p>
            </div>
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-accent">
            <Mail className="h-5 w-5 text-accent" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</p>
              <p className="text-sm font-semibold text-foreground break-all">{BUSINESS.email}</p>
            </div>
          </a>
        </aside>
      </div>
    </Section>
  );
}

function Input({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <input
        name={name}
        {...rest}
        className="w-full rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
      />
    </label>
  );
}
