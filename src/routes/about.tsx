import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Tag,
  Banknote,
  HeartHandshake,
  Search,
  ClipboardCheck,
  FileSignature,
  KeyRound,
  Phone,
  MessageCircle,
  ChevronDown,
  Quote,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import aboutHero from "@/assets/about-hero.jpg";
import aboutStory from "@/assets/about-story.jpg";

const PHONE = "9014206533";
const WHATSAPP = `https://wa.me/91${PHONE}`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Knowledge_96 | Premium Pre-Owned Cars" },
      {
        name: "description",
        content:
          "Learn about Knowledge_96, our passion for quality pre-owned vehicles, transparent pricing, and exceptional customer service.",
      },
      { property: "og:title", content: "About Knowledge_96 | Premium Pre-Owned Cars" },
      {
        property: "og:description",
        content:
          "Knowledge_96 — driven by trust, powered by passion. Discover our story, mission, and process.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-accent">
      {children}
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
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
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <Layout>
      <div className="-mt-24">
        {/* SECTION 1 — CINEMATIC HERO */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
            <img
              src={aboutHero}
              alt="Luxury pre-owned vehicle in cinematic showroom"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
          </motion.div>

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow>About Knowledge_96</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-[88px]"
            >
              Driven By Trust.
              <br />
              <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">
                Powered By Passion.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              Knowledge_96 delivers carefully selected pre-owned vehicles with complete
              transparency and unmatched customer experience.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8">
                <Link to="/inventory">Browse Inventory</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/20 bg-white/5 px-8 backdrop-blur hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 2 — OUR STORY */}
        <section className="relative py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={aboutStory}
                  alt="Knowledge_96 dealership showroom"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <Eyebrow>Our Journey</Eyebrow>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                A passion for cars,
                <br />
                a promise to customers.
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground">
                <p>
                  Knowledge_96 was born from a simple belief — buying a pre-owned car
                  should feel as confident and exciting as buying a brand new one. Every
                  vehicle that enters our showroom is chosen by enthusiasts who refuse to
                  compromise.
                </p>
                <p>
                  From the first call to the final handover, our customer-first approach
                  ensures clarity at every step. We source from trusted owners, verify
                  every history record, and put each car through rigorous multi-point
                  inspections.
                </p>
                <p>
                  The result is a curated collection where quality is non-negotiable and
                  trust is the standard.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SECTION 3 — MISSION & VISION */}
        <section className="relative py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/50 to-surface/0" />
          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal className="text-center">
              <Eyebrow>What guides us</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Mission &amp; Vision
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {[
                {
                  label: "Our Mission",
                  title: "Redefine pre-owned ownership.",
                  body: "To make premium pre-owned cars accessible through transparent pricing, certified quality, and a buying experience that customers actually enjoy.",
                },
                {
                  label: "Our Vision",
                  title: "The most trusted name in pre-owned luxury.",
                  body: "To become the country's most respected destination for pre-owned vehicles — known for honesty, craftsmanship, and lifelong customer relationships.",
                },
              ].map((c, i) => (
                <Reveal key={c.label} delay={i * 0.1}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.06]">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    <Eyebrow>{c.label}</Eyebrow>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h3>
                    <p className="mt-5 text-muted-foreground">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY CHOOSE */}
        <section className="py-32">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="max-w-2xl">
              <Eyebrow>Why Knowledge_96</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Built on details that matter.
              </h2>
            </Reveal>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ShieldCheck, title: "Verified Vehicles", desc: "200-point inspection, history-checked, and certified before they reach our showroom floor." },
                { icon: Tag, title: "Transparent Pricing", desc: "Honest pricing with full disclosure — no hidden fees, no last-minute surprises." },
                { icon: Banknote, title: "Finance Assistance", desc: "Flexible loan options through partner banks tailored to your eligibility and budget." },
                { icon: HeartHandshake, title: "End-to-End Support", desc: "From test drive to RC transfer, we handle the paperwork so you can enjoy the drive." },
              ].map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — STATS */}
        <section className="relative overflow-hidden border-y border-white/10 bg-surface py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.62_0.22_25/0.15),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-12 text-center md:grid-cols-4">
              {[
                { value: 500, suffix: "+", label: "Cars Sold" },
                { value: 100, suffix: "+", label: "Happy Customers" },
                { value: 100, suffix: "%", label: "Transparency" },
                { value: 24, suffix: "/7", label: "Support" },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1}>
                  <div className="text-5xl font-semibold tracking-tight md:text-6xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — PROCESS */}
        <section className="py-32">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="max-w-2xl">
              <Eyebrow>Our Process</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                From inspection to handover.
              </h2>
            </Reveal>
            <div className="relative mt-20">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent md:left-1/2" />
              <div className="space-y-16">
                {[
                  { icon: Search, title: "Vehicle Selection", desc: "Hand-picked from trusted sources, matching only the highest standards in our catalog." },
                  { icon: ClipboardCheck, title: "Inspection", desc: "Multi-point mechanical, cosmetic, and documentation checks by certified specialists." },
                  { icon: FileSignature, title: "Documentation", desc: "Complete RC transfer, insurance, and verified service history handled in-house." },
                  { icon: KeyRound, title: "Delivery", desc: "Detailed walkthrough, ceremonial handover, and lifetime relationship from day one." },
                ].map((step, i) => (
                  <Reveal key={step.title} delay={i * 0.1}>
                    <div className={`relative grid gap-6 md:grid-cols-2 md:items-center ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}>
                      <div className={`pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                        <div className="text-xs uppercase tracking-[0.4em] text-accent">Step {String(i + 1).padStart(2, "0")}</div>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{step.title}</h3>
                        <p className="mt-3 text-muted-foreground">{step.desc}</p>
                      </div>
                      <div className="hidden md:block" />
                      <div className="absolute left-0 top-2 md:left-1/2 md:-translate-x-1/2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-background text-accent shadow-[0_0_30px_-5px_oklch(0.62_0.22_25/0.4)]">
                          <step.icon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — TESTIMONIALS */}
        <TestimonialsCarousel />

        {/* SECTION 8 — FINAL CTA */}
        <section className="relative overflow-hidden py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.62_0.22_25/0.25),transparent_70%)]" />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <Reveal>
              <Eyebrow>Your next chapter</Eyebrow>
              <h2 className="mt-5 text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
                Ready To Find Your Next Car?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
                Walk through our curated inventory or talk to a specialist — your perfect
                car is a conversation away.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8">
                  <Link to="/inventory">Browse Inventory</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-white/20 bg-white/5 px-8 hover:bg-white/10">
                  <a href={`tel:${PHONE}`}>
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 border-white/20 bg-white/5 px-8 hover:bg-white/10">
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </Layout>
  );
}

const TESTIMONIALS = [
  {
    name: "Rohan Mehta",
    role: "BMW 5 Series Owner",
    quote:
      "The level of transparency was unlike any used-car experience I've had. Inspection report, history, even minor scratches — all documented before I asked.",
  },
  {
    name: "Aisha Khan",
    role: "Mercedes C-Class Owner",
    quote:
      "From the test drive to the RC transfer, every step felt premium. They genuinely care about the car you're driving home.",
  },
  {
    name: "Karthik Reddy",
    role: "Audi Q3 Owner",
    quote:
      "The team helped me with financing, paperwork, and a thorough walkthrough. I felt I was buying from a friend, not a dealer.",
  },
];

function TestimonialsCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="border-y border-white/10 bg-surface/60 py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <Eyebrow>Customer Trust</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Loved by drivers across the country.
          </h2>
        </Reveal>
        <div className="relative mt-16 min-h-[260px]">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={false}
              animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : 20 }}
              transition={{ duration: 0.7 }}
              className={`${i === idx ? "" : "pointer-events-none"} absolute inset-0`}
            >
              <Quote className="mx-auto h-8 w-8 text-accent/60" />
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-foreground/90 md:text-2xl">
                "{t.quote}"
              </p>
              <div className="mt-8">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-accent" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
