import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, X, CarFront } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/lib/cars";
import { cn } from "@/lib/utils";

const brands = ["All", ...Array.from(new Set(cars.map((c) => c.brand)))];
const fuels = ["All", "Petrol", "Diesel", "Hybrid", "Electric"];
const transmissions = ["All", "Automatic", "Manual"];
const years = ["All", "2023", "2022", "2021", "2020"];
const budgets = ["All", "Under ₹50L", "₹50L - ₹75L", "₹75L - ₹1Cr", "Above ₹1Cr"];
const sorts = ["Newest", "Price: Low to High", "Price: High to Low", "KM: Low to High"];

const PAGE_SIZE = 9;

type Filters = {
  q: string; brand: string; fuel: string; transmission: string; year: string; budget: string; sort: string;
};

const defaultFilters: Filters = {
  q: "", brand: "All", fuel: "All", transmission: "All", year: "All", budget: "All", sort: "Newest",
};

function inBudget(price: number, b: string) {
  switch (b) {
    case "Under ₹50L": return price < 5000000;
    case "₹50L - ₹75L": return price >= 5000000 && price < 7500000;
    case "₹75L - ₹1Cr": return price >= 7500000 && price < 10000000;
    case "Above ₹1Cr": return price >= 10000000;
    default: return true;
  }
}

function Select({ label, value, options, onChange }:
  { label: string; value: string; options: readonly string[] | string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-2.5 pr-9 text-sm text-foreground transition focus:border-accent focus:outline-none"
        >
          {options.map((o) => <option key={o} value={o} className="bg-card">{o}</option>)}
        </select>
        <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-muted-foreground" />
      </div>
    </label>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-[color:var(--surface)] p-12 text-center"
    >
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/10 text-accent">
        <CarFront className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold">No vehicles found</h3>
      <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search keywords to discover more cars.</p>
      <button onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:scale-[1.03]">
        <X className="h-4 w-4" /> Clear Filters
      </button>
    </motion.div>
  );
}

export function InventoryPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [page, setPage] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 320);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (isMobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFiltersOpen]);

  useEffect(() => { setPage(1); }, [filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.brand !== "All") count++;
    if (filters.budget !== "All") count++;
    if (filters.fuel !== "All") count++;
    if (filters.transmission !== "All") count++;
    if (filters.year !== "All") count++;
    if (filters.sort !== "Newest") count++;
    return count;
  }, [filters]);

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    let list = cars.filter((c) => {
      if (q && !`${c.brand} ${c.model} ${c.variant}`.toLowerCase().includes(q)) return false;
      if (filters.brand !== "All" && c.brand !== filters.brand) return false;
      if (filters.fuel !== "All" && c.fuel !== filters.fuel) return false;
      if (filters.transmission !== "All" && c.transmission !== filters.transmission) return false;
      if (filters.year !== "All" && String(c.year) !== filters.year) return false;
      if (!inBudget(c.price, filters.budget)) return false;
      return true;
    });
    switch (filters.sort) {
      case "Price: Low to High": list = [...list].sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": list = [...list].sort((a, b) => b.price - a.price); break;
      case "KM: Low to High": list = [...list].sort((a, b) => a.km - b.km); break;
      default: list = [...list].sort((a, b) => b.year - a.year);
    }
    return list;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const update = (k: keyof Filters) => (v: string) => setFilters((f) => ({ ...f, [k]: v }));
  const reset = () => setFilters(defaultFilters);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--surface)] to-background" />
        <div className="absolute -right-32 -top-20 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-accent"
          >Inventory</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="mt-3 text-5xl font-semibold tracking-tight md:text-6xl"
          >Available Cars</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg"
          >
            Browse our premium collection of quality pre-owned vehicles, each backed by a 200-point inspection and transparent pricing.
          </motion.p>
        </div>
      </section>

      {/* Filter bar */}
      <div className={cn(
        "sticky top-16 z-30 transition-all duration-500",
        scrolled ? "glass-nav" : "bg-background"
      )}>
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={filters.q}
                onChange={(e) => update("q")(e.target.value)}
                placeholder="Search by brand, model or variant…"
                className="w-full rounded-xl border border-border bg-[color:var(--surface)] py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              />
            </div>
            {/* Mobile filter toggle button (hamburger/slider style) - visible only on mobile when scrolled */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className={cn(
                "relative flex md:hidden items-center justify-center h-[46px] w-[46px] rounded-xl border border-border bg-[color:var(--surface)] text-foreground transition-all duration-300 active:scale-95",
                scrolled
                  ? "opacity-100 scale-100 ml-2"
                  : "opacity-0 scale-90 pointer-events-none w-0 border-none p-0 ml-0 overflow-hidden"
              )}
              aria-label="Open filter menu"
            >
              <SlidersHorizontal className="h-5 w-5 text-accent" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground shadow-sm">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-border bg-[color:var(--surface)] px-3.5 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4 text-accent" /> Filters
            </div>
          </div>
          {/* Collapse/hide this filter grid on mobile when scrolled */}
          <div className={cn(
            "mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 transition-all duration-300",
            scrolled ? "hidden md:grid" : "grid"
          )}>
            <Select label="Brand" value={filters.brand} options={brands} onChange={update("brand")} />
            <Select label="Budget" value={filters.budget} options={budgets} onChange={update("budget")} />
            <Select label="Fuel" value={filters.fuel} options={fuels} onChange={update("fuel")} />
            <Select label="Transmission" value={filters.transmission} options={transmissions} onChange={update("transmission")} />
            <Select label="Year" value={filters.year} options={years} onChange={update("year")} />
            <Select label="Sort By" value={filters.sort} options={sorts} onChange={update("sort")} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-10">
        <div className="mb-8 flex items-baseline justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{pageItems.length}</span> of{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span> vehicles
          </p>
          {filters !== defaultFilters && filtered.length > 0 && (
            <button onClick={reset} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent">
              Reset filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState onReset={reset} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((c, i) => (
                <CarCard key={c.id} car={c} variant="detailed" index={i} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="inline-flex h-10 items-center gap-1 rounded-full border border-border bg-[color:var(--surface)] px-4 text-sm transition hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "h-10 min-w-10 rounded-full border px-3 text-sm font-medium transition",
                      p === page
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-[color:var(--surface)] text-foreground hover:border-accent"
                    )}
                  >{p}</button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="inline-flex h-10 items-center gap-1 rounded-full border border-border bg-[color:var(--surface)] px-4 text-sm transition hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed bottom-0 left-0 right-0 z-[70] flex max-h-[85vh] flex-col rounded-t-[2rem] border-t border-border bg-card p-6 shadow-2xl md:hidden"
            >
              {/* Drag Handle Indicator */}
              <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-muted-foreground/20" />

              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent/10 px-1.5 text-xs font-semibold text-accent">
                        {activeFiltersCount}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Refine vehicle selection</p>
                </div>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="rounded-full bg-[color:var(--surface)] p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Filters Content */}
              <div className="flex-1 overflow-y-auto pb-6 space-y-5 pr-1">
                <Select label="Brand" value={filters.brand} options={brands} onChange={update("brand")} />
                <Select label="Budget" value={filters.budget} options={budgets} onChange={update("budget")} />
                <Select label="Fuel" value={filters.fuel} options={fuels} onChange={update("fuel")} />
                <Select label="Transmission" value={filters.transmission} options={transmissions} onChange={update("transmission")} />
                <Select label="Year" value={filters.year} options={years} onChange={update("year")} />
                <Select label="Sort By" value={filters.sort} options={sorts} onChange={update("sort")} />
              </div>

              {/* Footer Actions */}
              <div className="border-t border-border pt-4 mt-auto flex items-center gap-3">
                {activeFiltersCount > 0 && (
                  <button
                    onClick={reset}
                    className="flex-1 rounded-xl border border-border bg-[color:var(--surface)] py-3 text-sm font-semibold text-foreground transition active:scale-95"
                  >
                    Reset All
                  </button>
                )}
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-[2] rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-glow hover:opacity-90 transition active:scale-95"
                >
                  Show {filtered.length} {filtered.length === 1 ? "Car" : "Cars"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}
