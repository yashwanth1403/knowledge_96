import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard, SectionCard, StatusBadge } from "@/components/admin/shared";
import { Car, Tag, BadgeCheck, Users, TrendingUp, Eye, ArrowRight } from "lucide-react";
import {
  leadGrowth, leadSources, inventoryStatus, vehicleCategories,
  recentActivity, adminVehicles, leads,
} from "@/lib/admin-data";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: DashboardPage,
});

const accent = "hsl(0 73% 56%)"; // matches --accent red
const sourceColors = ["#E63946", "#6366F1", "#10B981", "#F59E0B", "#0EA5E9"];

function DashboardPage() {
  const stats = [
    { label: "Total Cars", value: adminVehicles.length, hint: "in catalogue", icon: <Car className="h-4 w-4" />, trend: { dir: "up" as const, text: "+2 this week" } },
    { label: "Active Listings", value: adminVehicles.filter(v => v.status === "Published").length, hint: "published", icon: <Tag className="h-4 w-4" />, trend: { dir: "up" as const, text: "+5.2%" } },
    { label: "Sold Vehicles", value: 47, hint: "all-time", icon: <BadgeCheck className="h-4 w-4" />, trend: { dir: "up" as const, text: "+8 MoM" } },
    { label: "New Leads", value: leads.filter(l => l.status === "New").length, hint: "this week", icon: <Users className="h-4 w-4" />, trend: { dir: "up" as const, text: "+12%" } },
    { label: "Monthly Leads", value: 104, hint: "Jun 2026", icon: <TrendingUp className="h-4 w-4" />, trend: { dir: "up" as const, text: "+16.8%" } },
    { label: "Website Views", value: "38.4K", hint: "last 30 days", icon: <Eye className="h-4 w-4" />, trend: { dir: "up" as const, text: "+22%" } },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      actions={
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link to="/admin/cars/new">Add Vehicle</Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <SectionCard title="Lead Growth" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadGrowth} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 8 }} />
                <Area type="monotone" dataKey="leads" stroke={accent} fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="won" stroke="#10B981" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Lead Sources">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadSources} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {leadSources.map((_, i) => <Cell key={i} fill={sourceColors[i % sourceColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <SectionCard title="Inventory Status">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 8 }} />
                <Bar dataKey="value" fill={accent} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Vehicle Categories">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={vehicleCategories}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" stroke="#888" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #333", borderRadius: 8 }} />
                <Bar dataKey="value" fill="#6366F1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Recent Activity"
          action={<Link to="/admin/leads" className="text-xs text-accent hover:underline inline-flex items-center gap-1">View all <ArrowRight className="h-3 w-3" /></Link>}
        >
          <ul className="space-y-3">
            {recentActivity.map(a => (
              <li key={a.id} className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  a.type === "lead" ? "bg-sky-400" : a.type === "vehicle" ? "bg-violet-400" : a.type === "sold" ? "bg-emerald-400" : "bg-amber-400"
                }`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.at}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard
        title="Latest Leads"
        className="mt-6"
        action={<Link to="/admin/leads" className="text-xs text-accent hover:underline inline-flex items-center gap-1">All leads <ArrowRight className="h-3 w-3" /></Link>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Vehicle</th>
                <th className="pb-3 font-medium">Source</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map(l => (
                <tr key={l.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3">
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.phone}</div>
                  </td>
                  <td className="py-3 text-muted-foreground">{l.vehicle}</td>
                  <td className="py-3 text-muted-foreground">{l.source}</td>
                  <td className="py-3"><StatusBadge status={l.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </AdminLayout>
  );
}
