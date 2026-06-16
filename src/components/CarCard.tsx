import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Calendar, Gauge, Fuel, MapPin, Settings2, ArrowUpRight } from "lucide-react";
import type { Car } from "@/lib/cars";
import { formatPrice, formatKm } from "@/lib/cars";
import { cn } from "@/lib/utils";

type Props = {
  car: Car;
  variant?: "featured" | "detailed";
  index?: number;
};

export function CarCard({ car, variant = "featured", index = 0 }: Props) {
  const detailed = variant === "detailed";
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_oklch(0.62_0.22_25/0.4)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface)]">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          width={1024}
          height={640}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-foreground backdrop-blur-md">
          {car.year}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent-foreground">
          {car.fuel}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {car.brand}
            </p>
            <h3 className="mt-1 truncate text-xl font-semibold text-foreground">
              {car.model}
            </h3>
            {detailed && (
              <p className="mt-1 truncate text-sm text-muted-foreground">{car.variant}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Price</p>
            <p className="text-lg font-bold text-accent">{formatPrice(car.price)}</p>
          </div>
        </div>

        <div className={cn("mt-5 grid gap-3 text-xs text-muted-foreground", detailed ? "grid-cols-2" : "grid-cols-3")}>
          <Spec icon={<Calendar className="h-3.5 w-3.5" />} value={`${car.year}`} />
          <Spec icon={<Gauge className="h-3.5 w-3.5" />} value={formatKm(car.km)} />
          <Spec icon={<Fuel className="h-3.5 w-3.5" />} value={car.fuel} />
          {detailed && <Spec icon={<Settings2 className="h-3.5 w-3.5" />} value={car.transmission} />}
        </div>

        {detailed && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-accent" /> {car.location}
          </div>
        )}

        <Link
          to="/car/$slug"
          params={{ slug: car.id }}
          className="mt-6 flex w-full items-center justify-between rounded-xl border border-border bg-[color:var(--surface)] px-4 py-3 text-sm font-medium text-foreground transition group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground"
        >
          View Details
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5 truncate">
      <span className="text-accent">{icon}</span>
      <span className="truncate text-foreground/80">{value}</span>
    </div>
  );
}
