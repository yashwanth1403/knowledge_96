// Mock data for the Knowledge_96 admin dashboard
import { cars as publicCars, type Car } from "./cars";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Follow Up"
  | "Interested"
  | "Negotiation"
  | "Won"
  | "Lost";

export type LeadSource =
  | "Website"
  | "WhatsApp"
  | "Phone"
  | "Walk-in"
  | "Referral"
  | "Instagram"
  | "Facebook";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  source: LeadSource;
  status: LeadStatus;
  date: string;
  message: string;
  notes: { id: string; author: string; text: string; at: string }[];
  timeline: { id: string; event: string; at: string }[];
};

export type AdminVehicle = Car & {
  status: "Published" | "Draft" | "Sold" | "Reserved";
  views: number;
  leads: number;
  addedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    slug: string;
    canonical: string;
  };
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  interested: string[];
  leadCount: number;
  lastContact: string;
  status: "Active" | "Cold" | "Converted";
};

const names = [
  "Arjun Mehta", "Priya Sharma", "Rahul Verma", "Sneha Reddy", "Vikram Singh",
  "Anjali Nair", "Karthik Iyer", "Pooja Desai", "Aditya Rao", "Neha Kapoor",
  "Rohan Bhatia", "Isha Malhotra", "Siddharth Joshi", "Tanvi Shetty", "Yash Patel",
  "Meera Pillai", "Aryan Gupta", "Riya Saxena", "Devansh Khan", "Aisha Bose",
  "Nikhil Menon", "Sara Khanna", "Kunal Mishra", "Ritika Jain", "Harsh Vora",
];

const sources: LeadSource[] = ["Website", "WhatsApp", "Phone", "Walk-in", "Referral", "Instagram", "Facebook"];
const statuses: LeadStatus[] = ["New", "Contacted", "Follow Up", "Interested", "Negotiation", "Won", "Lost"];

function rand<T>(arr: T[], i: number) { return arr[i % arr.length]; }

export const adminVehicles: AdminVehicle[] = publicCars.map((c, i) => ({
  ...c,
  status: (["Published", "Published", "Published", "Draft", "Sold", "Reserved"] as const)[i % 6],
  views: 800 + ((i * 137) % 4200),
  leads: 3 + (i % 18),
  addedAt: new Date(2026, 4, (i % 28) + 1).toISOString(),
  seo: {
    title: `${c.year} ${c.brand} ${c.model} ${c.variant} | Knowledge_96`,
    description: `Buy certified pre-owned ${c.year} ${c.brand} ${c.model} ${c.variant} in ${c.location}. Inspected, finance available.`,
    keywords: `${c.brand}, ${c.model}, used ${c.brand} ${c.model}, pre-owned luxury cars ${c.location}`,
    slug: c.id,
    canonical: `https://knowledge96.com/car/${c.id}`,
  },
}));

export const leads: Lead[] = Array.from({ length: 28 }, (_, i) => {
  const v = adminVehicles[i % adminVehicles.length];
  const name = names[i % names.length];
  const date = new Date(2026, 5, ((i * 3) % 15) + 1, 9 + (i % 9), (i * 7) % 60);
  return {
    id: `LD-${(1000 + i).toString()}`,
    name,
    phone: `+91 9${(800000000 + i * 1234567).toString().slice(0, 9)}`,
    email: `${name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
    vehicle: `${v.year} ${v.brand} ${v.model}`,
    source: rand(sources, i),
    status: rand(statuses, i + 2),
    date: date.toISOString(),
    message: `Hi, I'm interested in the ${v.brand} ${v.model}. Is it still available? Can I schedule a test drive this weekend?`,
    notes: [
      { id: "n1", author: "Admin", text: "Called once, no answer. Try evening.", at: new Date(date.getTime() + 3600_000).toISOString() },
    ],
    timeline: [
      { id: "t1", event: "Lead created", at: date.toISOString() },
      { id: "t2", event: "Auto-email sent", at: new Date(date.getTime() + 60_000).toISOString() },
      { id: "t3", event: "Status updated", at: new Date(date.getTime() + 7200_000).toISOString() },
    ],
  };
});

export const customers: Customer[] = names.slice(0, 8).map((n, i) => ({
  id: `CU-${(2000 + i).toString()}`,
  name: n,
  phone: `+91 98${(7000000 + i * 12345).toString().slice(0, 8)}`,
  email: `${n.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
  interested: adminVehicles.slice(i % 4, (i % 4) + 2).map(v => `${v.brand} ${v.model}`),
  leadCount: 1 + (i % 5),
  lastContact: new Date(2026, 5, ((i * 4) % 14) + 1).toISOString(),
  status: (["Active", "Cold", "Converted"] as const)[i % 3],
}));

// Analytics
export const leadGrowth = [
  { month: "Jan", leads: 42, won: 8 },
  { month: "Feb", leads: 58, won: 12 },
  { month: "Mar", leads: 71, won: 15 },
  { month: "Apr", leads: 65, won: 14 },
  { month: "May", leads: 89, won: 21 },
  { month: "Jun", leads: 104, won: 27 },
];

export const leadSources = [
  { name: "Website", value: 38 },
  { name: "WhatsApp", value: 27 },
  { name: "Instagram", value: 14 },
  { name: "Referral", value: 11 },
  { name: "Phone", value: 10 },
];

export const inventoryStatus = [
  { name: "Published", value: adminVehicles.filter(v => v.status === "Published").length },
  { name: "Draft", value: adminVehicles.filter(v => v.status === "Draft").length },
  { name: "Sold", value: adminVehicles.filter(v => v.status === "Sold").length },
  { name: "Reserved", value: adminVehicles.filter(v => v.status === "Reserved").length },
];

export const vehicleCategories = [
  { name: "SUV", value: 6 },
  { name: "Sedan", value: 4 },
  { name: "Coupe", value: 1 },
  { name: "Hatchback", value: 1 },
];

export const recentActivity = [
  { id: "a1", type: "lead", text: "New lead from Arjun Mehta — BMW X5", at: "2 min ago" },
  { id: "a2", type: "vehicle", text: "Vehicle added — 2023 Mercedes-Benz GLE", at: "1 hr ago" },
  { id: "a3", type: "sold", text: "Vehicle sold — 2021 Audi A6", at: "3 hr ago" },
  { id: "a4", type: "contact", text: "Customer contacted — Priya Sharma", at: "5 hr ago" },
  { id: "a5", type: "lead", text: "New lead from WhatsApp — Range Rover Sport", at: "Yesterday" },
  { id: "a6", type: "vehicle", text: "Vehicle published — 2022 Porsche 718", at: "Yesterday" },
];

export const seoPages = [
  { page: "Home", title: "Knowledge_96 | Premium Pre-Owned Luxury Cars", description: "India's trusted destination for certified pre-owned luxury vehicles.", keywords: "luxury used cars, pre-owned BMW, used Mercedes", slug: "/", status: "Optimized" },
  { page: "Inventory", title: "Luxury Used Cars Inventory | Knowledge_96", description: "Browse certified pre-owned luxury vehicles from top brands.", keywords: "used luxury cars, pre-owned inventory", slug: "/inventory", status: "Optimized" },
  { page: "Sell Your Car", title: "Sell Your Luxury Car | Best Price | Knowledge_96", description: "Get an instant valuation. Hassle-free sale in 24 hours.", keywords: "sell used car, car valuation", slug: "/sell-car", status: "Needs Review" },
  { page: "About", title: "About Knowledge_96 | Premium Car Dealership", description: "Learn about India's most trusted luxury pre-owned car dealership.", keywords: "about knowledge_96, luxury dealership", slug: "/about", status: "Draft" },
  { page: "Contact", title: "Contact Knowledge_96 | Visit Our Showroom", description: "Reach out for test drives, valuations, and enquiries.", keywords: "contact dealership, showroom Hyderabad", slug: "/contact", status: "Optimized" },
];

export function formatPriceShort(p: number) {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)} Cr`;
  return `₹${(p / 100000).toFixed(2)} L`;
}

export function relativeDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
