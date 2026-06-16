import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Phone, ShieldCheck, BadgeCheck, Wallet, Tag, CheckCircle2,
  Search, ClipboardCheck, FileSignature, Car as CarIcon, ChevronDown, Star, Quote,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { featuredCars } from "@/lib/cars";
import heroCar from "@/assets/hero-car.jpg";

/* --------------------------- HERO --------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative -mt-24 min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[color:var(--surface)]" />
        <div className="absolute -right-32 top-1/4 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-2 lg:pt-24">
        <motion.div style={{ opacity }} className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Premium Pre-Owned Cars
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Drive Your <span className="italic text-accent">Dream Car</span><br />
            With Confidence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Quality inspected pre-owned vehicles with transparent pricing and trusted support — curated for the way you drive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link to="/inventory"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition hover:scale-[1.03] hover:shadow-[0_15px_40px_-10px_oklch(0.62_0.22_25/0.6)]">
              Browse Inventory
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/sell-car"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent hover:bg-card">
              Sell Your Car
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground"
          >
            {["Verified Vehicles", "Transparent Pricing", "Finance Assistance"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y }} className="relative z-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-accent/30 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card">
              <img src={heroCar} alt="Featured luxury vehicle" width={1280} height={960}
                   className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Featured</p>
                  <p className="text-lg font-semibold text-foreground">Mercedes-Benz S-Class</p>
                </div>
                <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">₹89.5 L</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll <ChevronDown className="h-4 w-4 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --------------------------- COUNTER --------------------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function TrustBar() {
  const items = [
    { value: 500, suffix: "+", label: "Cars Sold" },
    { value: 100, suffix: "+", label: "Happy Customers" },
    { value: 100, suffix: "%", label: "Verified Vehicles" },
    { value: 24, suffix: "h", label: "Ownership Transfer" },
  ];
  return (
    <section className="border-y border-border bg-[color:var(--surface)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4 md:gap-10 md:py-16">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center md:text-left"
          >
            <p className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              <Counter to={it.value} suffix={it.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{it.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- SECTION HEAD --------------------------- */
function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-xs font-medium uppercase tracking-[0.3em] text-accent"
      >{eyebrow}</motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl"
      >{title}</motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-base text-muted-foreground"
        >{subtitle}</motion.p>
      )}
    </div>
  );
}

/* --------------------------- FEATURED --------------------------- */
function FeaturedInventory() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Curated Selection</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Featured Vehicles</h2>
          <p className="mt-3 max-w-md text-muted-foreground">Explore our most popular vehicles, hand-picked for performance and value.</p>
        </div>
        <Link to="/inventory" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCars.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
      </div>
    </section>
  );
}

/* --------------------------- WHY --------------------------- */
function WhyChoose() {
  const features = [
    { icon: BadgeCheck, title: "Verified Cars", desc: "Every vehicle in our inventory passes multi-point checks before listing." },
    { icon: ShieldCheck, title: "Quality Inspection", desc: "200-point inspection by certified technicians covering engine to interiors." },
    { icon: Wallet, title: "Easy Financing", desc: "Flexible EMI options with leading banks and instant pre-approvals." },
    { icon: Tag, title: "Transparent Pricing", desc: "No hidden costs. The price you see is the price you pay." },
  ];
  return (
    <section className="border-t border-border bg-[color:var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Why Knowledge_96" title="Built On Trust" subtitle="Premium service at every step of your ownership journey." />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition group-hover:bg-accent/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- PROCESS --------------------------- */
function Process() {
  const steps = [
    { icon: Search, title: "Choose Vehicle", desc: "Browse our curated inventory and shortlist your favorites." },
    { icon: ClipboardCheck, title: "Book Inspection", desc: "Schedule a personal walkthrough and a complete test drive." },
    { icon: FileSignature, title: "Complete Documentation", desc: "We handle the paperwork, financing and ownership transfer." },
    { icon: CarIcon, title: "Drive Home", desc: "Take delivery of your fully serviced premium vehicle." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow="How It Works" title="A Simple, Confident Process" />
      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center md:text-left"
            >
              <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-background text-accent md:mx-0">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Step 0{i + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TESTIMONIALS --------------------------- */
const testimonials = [
  { name: "Rohan Mehta", role: "Hyderabad", text: "From the test drive to delivery, the entire process felt premium. The car was in immaculate condition — exactly as advertised.", rating: 5 },
  { name: "Ananya Iyer", role: "Bengaluru", text: "Transparent pricing and zero pressure. Knowledge_96 made buying a pre-owned car feel like buying brand new.", rating: 5 },
  { name: "Vikram Singh", role: "Mumbai", text: "Sold my Audi within a week at a fair price. Professional team, quick paperwork, hassle-free experience.", rating: 5 },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="border-t border-border bg-[color:var(--surface)]">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Testimonials" title="What Our Customers Say" />
        <div className="relative mt-14 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 text-center md:p-14"
            >
              <Quote className="mx-auto h-8 w-8 text-accent" />
              <blockquote className="mt-6 text-xl leading-relaxed text-foreground md:text-2xl">
                "{testimonials[idx].text}"
              </blockquote>
              <div className="mt-7 flex justify-center gap-1 text-accent">
                {Array.from({ length: testimonials[idx].rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent" />
                ))}
              </div>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-foreground">{testimonials[idx].name}</span>
                <span className="text-muted-foreground"> · {testimonials[idx].role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- FINAL CTA --------------------------- */
function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 md:px-16 md:py-24"
      >
        <div className="absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full bg-accent/25 blur-[140px]" />
        <div className="absolute -bottom-32 -left-20 h-[360px] w-[360px] rounded-full bg-accent/10 blur-[140px]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Ready When You Are</span>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Find Your Perfect <span className="italic text-accent">Pre-Owned Car</span> Today
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Talk to our advisors or browse the latest arrivals in our inventory.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/inventory" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition hover:scale-[1.03]">
              Browse Inventory <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:9014206533" className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-accent">
              <Phone className="h-4 w-4 text-accent" /> Call 9014206533
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------- PAGE --------------------------- */
export function HomePage() {
  return (
    <Layout>
      <Hero />
      <TrustBar />
      <FeaturedInventory />
      <WhyChoose />
      <Process />
      <Testimonials />
      <FinalCTA />
    </Layout>
  );
}
