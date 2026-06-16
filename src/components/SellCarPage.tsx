import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, MessageCircle, ArrowRight, ClipboardList, ShieldCheck,
  Wallet, Clock, Upload, X, FileText, Sparkles, Quote, Car as CarIcon,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { BUSINESS, telHref, whatsappHref } from "@/lib/leads";
import { cn } from "@/lib/utils";

export function SellCarPage() {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <WhySell />
      <SellerForm />
      <Testimonials />
      <FinalCTA />
    </Layout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.16_0_0)] via-background to-background" />
      <div className="absolute -top-32 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Sell with Knowledge_96
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Sell Your Car At The <span className="text-accent">Best Market Price</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Get instant evaluation and a hassle-free selling experience. Transparent pricing,
              instant payment, and zero paperwork stress.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#seller-form" className="flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition hover:scale-[1.03]">
                Get Valuation <ArrowRight className="h-4 w-4" />
              </a>
              <a href={telHref} className="flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent">
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a href={whatsappHref("Hi Knowledge_96, I'd like to sell my car.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.03]">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                { v: "5,000+", l: "Cars Sold" },
                { v: "30 min", l: "Avg Valuation" },
                { v: "100%", l: "Secure" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-accent">{s.v}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-[0_30px_80px_-30px_oklch(0.62_0.22_25/0.35)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <CarIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Instant Quote</p>
                  <p className="text-sm font-semibold">Free Doorstep Evaluation</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-foreground/85">
                {[
                  "No commissions or hidden charges",
                  "RC transfer fully handled by our team",
                  "Instant bank transfer on agreement",
                  "Doorstep documentation pickup",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" /> {t}
                  </li>
                ))}
              </ul>
              <a href="#seller-form" className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:scale-[1.02] transition">
                Start Now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: <ClipboardList className="h-5 w-5" />, title: "Submit Details", desc: "Share your car details and photos via the form below." },
    { icon: <ShieldCheck className="h-5 w-5" />, title: "Vehicle Inspection", desc: "Free doorstep inspection by our certified team." },
    { icon: <FileText className="h-5 w-5" />, title: "Receive Offer", desc: "Get a transparent, best-in-market price quote." },
    { icon: <Wallet className="h-5 w-5" />, title: "Instant Payment", desc: "Bank transfer on the spot. RC transfer handled by us." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="mb-12 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Process</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">How It Works</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">A simple four-step journey from quote to payment, fully transparent.</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block" />
        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_10px_30px_-10px_oklch(0.62_0.22_25/0.6)]">
                {s.icon}
              </div>
              <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Step {i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySell() {
  const items = [
    { icon: <Wallet className="h-5 w-5" />, title: "Best Market Value", desc: "Our pricing engine and dealer network ensure you get the highest fair price." },
    { icon: <Clock className="h-5 w-5" />, title: "Fast Process", desc: "Evaluation to payment in as little as 24 hours." },
    { icon: <ShieldCheck className="h-5 w-5" />, title: "Trusted Buyers", desc: "Verified buyer network with thousands of successful transactions." },
    { icon: <FileText className="h-5 w-5" />, title: "Secure Documentation", desc: "Complete RC transfer and paperwork handled end-to-end." },
  ];
  return (
    <section className="bg-[color:var(--surface)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Why us</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Why Sell With Knowledge_96</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-border bg-card p-6 transition hover:border-accent/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">{it.icon}</div>
              <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellerForm() {
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const [drag, setDrag] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((list: FileList | null) => {
    if (!list) return;
    const next = Array.from(list).slice(0, 10).map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setFiles((prev) => [...prev, ...next].slice(0, 10));
  }, []);

  return (
    <section id="seller-form" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="mb-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Get Started</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Tell Us About Your Car</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Fill in the details — our team will get back within 30 minutes with an indicative quote.</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-2 md:p-8"
      >
        <Input label="Full Name" name="name" required />
        <Input label="Phone" name="phone" type="tel" required />
        <Input label="Email" name="email" type="email" />
        <Input label="Location" name="location" placeholder="City" />
        <Input label="Car Brand" name="brand" required />
        <Input label="Model" name="model" required />
        <Input label="Variant" name="variant" />
        <Input label="Year" name="year" type="number" min={1990} max={2026} />
        <Input label="KM Driven" name="km" type="number" />
        <Select label="Fuel Type" name="fuel" options={["Petrol", "Diesel", "Hybrid", "Electric", "CNG"]} />
        <Input label="Expected Price (₹)" name="price" type="number" />
        <Input label="Ownership" name="ownership" placeholder="1st / 2nd / 3rd Owner" />

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Description</label>
          <textarea rows={4} className="w-full rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none" placeholder="Service history, condition, modifications…" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Upload Images</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-[color:var(--surface)] px-6 py-10 text-center transition",
              drag ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
            )}
          >
            <Upload className="h-7 w-7 text-accent" />
            <p className="mt-3 text-sm font-medium text-foreground">Drag & drop photos here, or click to browse</p>
            <p className="mt-1 text-xs text-muted-foreground">Up to 10 images · JPG, PNG, WEBP</p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
              {files.map((f, i) => (
                <div key={f.url} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                  <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFiles((prev) => prev.filter((_, idx) => idx !== i)); }}
                    className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-3">
          <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground hover:scale-[1.02] transition">
            Submit Vehicle <ArrowRight className="h-4 w-4" />
          </button>
          <a href={whatsappHref("Hi Knowledge_96, I'd like to sell my car.")} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a href={telHref} className="flex items-center justify-center gap-2 rounded-xl border border-border bg-[color:var(--surface)] px-5 py-3.5 text-sm font-semibold text-foreground">
            <Phone className="h-4 w-4" /> Call
          </a>
        </div>

        {submitted && (
          <p className="md:col-span-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            Thanks! Our team will reach out within 30 minutes with an indicative quote.
          </p>
        )}
      </form>
    </section>
  );
}

function Testimonials() {
  const data = [
    { name: "Rohan Mehta", car: "Sold Audi Q5 · 2020", text: "Smooth experience end-to-end. Got 12% more than the dealer quote I had, and money was in my account the same day." },
    { name: "Priya Nair", car: "Sold BMW 3 Series · 2019", text: "The doorstep inspection was professional and the paperwork was completely taken care of. Zero stress." },
    { name: "Imran Sheikh", car: "Sold Mercedes C-Class · 2021", text: "Honest valuation, no last-minute price drops. Best place to sell a luxury car in the city." },
  ];
  return (
    <section className="bg-[color:var(--surface)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Sellers love us</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Real Stories. Real Payments.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {data.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7"
            >
              <Quote className="h-7 w-7 text-accent/60" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">{t.text}</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.car}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-[oklch(0.18_0_0)] to-[oklch(0.14_0_0)] p-10 text-center md:p-16"
      >
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Ready To Sell Your Car?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Get a transparent quote in minutes. Our specialists are ready to help, 7 days a week.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#seller-form" className="flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground hover:scale-[1.03] transition">
              Submit Vehicle <ArrowRight className="h-4 w-4" />
            </a>
            <a href={telHref} className="flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-7 py-3.5 text-sm font-semibold text-foreground hover:border-accent transition">
              <Phone className="h-4 w-4" /> Call {BUSINESS.phone}
            </a>
            <a href={whatsappHref("Hi Knowledge_96, I'd like to sell my car.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white hover:scale-[1.03] transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
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

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <select
        name={name}
        className="w-full appearance-none rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none"
      >
        {options.map((o) => <option key={o} value={o} className="bg-card">{o}</option>)}
      </select>
    </label>
  );
}
