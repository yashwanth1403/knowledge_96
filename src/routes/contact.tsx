import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import contactHero from "@/assets/contact-hero.jpg";

const PHONE = "9014206533";
const EMAIL = "Syedmujahid151@gmail.com";
const WHATSAPP = `https://wa.me/91${PHONE}`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Knowledge_96" },
      {
        name: "description",
        content:
          "Get in touch with Knowledge_96 for vehicle enquiries, financing assistance, and premium pre-owned car services.",
      },
      { property: "og:title", content: "Contact Knowledge_96" },
      {
        property: "og:description",
        content:
          "Reach out to our team for premium pre-owned cars, enquiries, and personalised assistance.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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

function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <Layout>
      <div className="-mt-24">
        {/* HERO */}
        <section ref={heroRef} className="relative flex h-[90vh] items-center overflow-hidden">
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <img src={contactHero} alt="Luxury car key and contract" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
          </motion.div>
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Eyebrow>Contact</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-[84px]"
            >
              Let's Start
              <br />
              <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">
                Your Journey.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              Whether you're buying, selling, or simply exploring, our team is ready to help.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="h-12 bg-accent px-8 text-accent-foreground hover:bg-accent/90">
                <a href={`tel:${PHONE}`}>
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/20 bg-white/5 px-8 backdrop-blur hover:bg-white/10">
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </motion.div>
          </div>
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

        {/* CONTACT CARDS */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE}` },
                { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: Clock, label: "Business Hours", value: "Mon – Sat · 10am – 8pm" },
                { icon: MapPin, label: "Location", value: "Hyderabad, India" },
              ].map((c, i) => {
                const inner = (
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.06]">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">{c.label}</div>
                    <div className="mt-2 break-words text-base font-medium">{c.value}</div>
                  </div>
                );
                return (
                  <Reveal key={c.label} delay={i * 0.08}>
                    {c.href ? (
                      <a href={c.href} className="block h-full">{inner}</a>
                    ) : (
                      inner
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <Eyebrow>Send a message</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Tell us what you're looking for.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Share a few details and a specialist will reach out within one business
                day. For urgent enquiries, call or message us directly on WhatsApp.
              </p>
              <div className="mt-10 space-y-4">
                <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
                  <Phone className="h-4 w-4 text-accent" /> {PHONE}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4 text-accent" /> {EMAIL}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        {/* QUICK CONTACT OPTIONS */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="text-center">
              <Eyebrow>Reach us instantly</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Quick Contact Options
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                { icon: Phone, label: "Call Us", body: "Speak directly with a specialist", action: "Call Now", href: `tel:${PHONE}` },
                { icon: MessageCircle, label: "WhatsApp Us", body: "Fast replies for quick enquiries", action: "Open Chat", href: WHATSAPP, external: true },
                { icon: Mail, label: "Email Us", body: "Detailed enquiries and documents", action: "Send Email", href: `mailto:${EMAIL}` },
              ].map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-10 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50"
                  >
                    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <c.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-8 text-2xl font-semibold tracking-tight">{c.label}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent">
                      {c.action}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-white/10 bg-surface/40 py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal className="text-center">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Frequently asked
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                {[
                  { q: "How can I schedule a vehicle inspection?", a: "Use the contact form above or call us directly. We'll book a convenient time slot at our showroom or arrange an at-home inspection where available." },
                  { q: "Do you offer financing?", a: "Yes. We partner with leading banks and NBFCs to offer flexible loan options tailored to your eligibility, with assistance from start to finish." },
                  { q: "Can I exchange my vehicle?", a: "Absolutely. Our team will evaluate your current car and offer a transparent quote that can be adjusted against your next purchase." },
                  { q: "How long does ownership transfer take?", a: "Typically 7–15 working days, depending on your state's RTO. We handle the entire process and keep you updated at every step." },
                ].map((item, i) => (
                  <AccordionItem key={item.q} value={`item-${i}`} className="border-white/10">
                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline hover:text-accent">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* LOCATION */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <Eyebrow>Visit us</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Visit Our Location
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-surface">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.16_0_0)_0%,oklch(0.22_0_0)_100%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,oklch(0.62_0.22_25/0.25),transparent_50%)]" />
                  <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-accent/30"
                    />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_0_40px_-5px_oklch(0.62_0.22_25/0.7)]">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 rounded-lg border border-white/10 bg-background/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
                    Map preview · embed coming soon
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
                  <div>
                    <Eyebrow>Knowledge_96 Showroom</Eyebrow>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">Walk in for a curated experience.</h3>
                    <p className="mt-4 text-muted-foreground">
                      Test-drive any vehicle from our curated inventory in a relaxed,
                      premium setting. No pressure — just great conversations about cars.
                    </p>
                  </div>
                  <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-4 w-4 text-accent" />
                      <div className="text-sm">
                        <div className="font-medium">Hyderabad, India</div>
                        <div className="text-muted-foreground">Address details on request</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-1 h-4 w-4 text-accent" />
                      <div className="text-sm">
                        <div className="font-medium">Mon – Sat · 10am – 8pm</div>
                        <div className="text-muted-foreground">Sunday by appointment</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-4 w-4 text-accent" />
                      <a href={`tel:${PHONE}`} className="text-sm font-medium hover:text-accent">{PHONE}</a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.62_0.22_25/0.25),transparent_70%)]" />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <Reveal>
              <Eyebrow>We're one call away</Eyebrow>
              <h2 className="mt-5 text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
                Need Immediate Assistance?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
                Our team is ready to assist with enquiries, test drives, or anything you
                need to make the right decision.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="h-12 bg-accent px-8 text-accent-foreground hover:bg-accent/90">
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

type FormState = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  message: string;
};

function FloatingField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  textarea,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const commonClass = `peer w-full rounded-xl border bg-white/[0.03] px-4 pb-2.5 pt-6 text-sm text-foreground outline-none transition-all backdrop-blur-sm placeholder-transparent ${
    error
      ? "border-destructive/60 focus:border-destructive"
      : "border-white/10 focus:border-accent focus:bg-white/[0.05]"
  }`;
  return (
    <div>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            value={value}
            rows={4}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${commonClass} resize-none`}
            placeholder={label}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={commonClass}
            placeholder={label}
          />
        )}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 transition-all ${
            active
              ? "top-2 text-[10px] uppercase tracking-[0.25em] text-accent"
              : "top-4 text-sm text-muted-foreground"
          }`}
        >
          {label}
          {required && <span className="ml-1 text-accent">*</span>}
        </label>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactForm() {
  const [data, setData] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (k: keyof FormState) => (v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) e.name = "Please enter your name";
    if (!/^\d{10}$/.test(data.phone.replace(/\s+/g, ""))) e.phone = "Enter a valid 10-digit phone";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email";
    if (!data.message.trim() || data.message.trim().length < 5) e.message = "Please share a brief message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    toast.success("Message sent — we'll be in touch shortly.");
    setData({ name: "", phone: "", email: "", vehicle: "", message: "" });
    setTimeout(() => setStatus("idle"), 3500);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[520px] flex-col items-center justify-center rounded-2xl border border-accent/30 bg-white/[0.03] p-10 text-center backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent"
        >
          <CheckCircle2 className="h-10 w-10" />
        </motion.div>
        <h3 className="mt-8 text-2xl font-semibold tracking-tight">Message received.</h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          Thank you for reaching out — a Knowledge_96 specialist will get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10"
    >
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative grid gap-5 sm:grid-cols-2">
        <FloatingField id="name" label="Full Name" value={data.name} onChange={update("name")} error={errors.name} required />
        <FloatingField id="phone" label="Phone Number" type="tel" value={data.phone} onChange={update("phone")} error={errors.phone} required />
        <div className="sm:col-span-2">
          <FloatingField id="email" label="Email Address" type="email" value={data.email} onChange={update("email")} error={errors.email} required />
        </div>
        <div className="sm:col-span-2">
          <FloatingField id="vehicle" label="Interested Vehicle" value={data.vehicle} onChange={update("vehicle")} />
        </div>
        <div className="sm:col-span-2">
          <FloatingField id="message" label="Message" value={data.message} onChange={update("message")} error={errors.message} textarea required />
        </div>
        <div className="sm:col-span-2">
          <Button
            type="submit"
            size="lg"
            disabled={status === "loading"}
            className="h-12 w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send Message
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
