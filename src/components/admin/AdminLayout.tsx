import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Users, Car, PlusCircle, Image as ImageIcon, UserCircle2,
  Search as SearchIcon, Settings, LogOut, Menu, X, Bell, Sun, Moon, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoAsset from "@/assets/knowledge96-logo.png";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/cars", label: "Cars", icon: Car },
  { to: "/admin/cars/new", label: "Add Vehicle", icon: PlusCircle },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/customers", label: "Customers", icon: UserCircle2 },
  { to: "/admin/seo", label: "SEO Manager", icon: SearchIcon },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function AdminLayout({ children, title, actions }: { children: ReactNode; title: string; actions?: ReactNode }) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-surface",
        mobile ? "w-72 h-full" : collapsed ? "w-[72px]" : "w-64",
        "transition-[width] duration-300"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        <Link to="/admin/dashboard" className="flex items-center gap-2 overflow-hidden">
          <img
            src={logoAsset}
            alt="Knowledge_96"
            className="h-8 w-auto object-contain shrink-0 rounded-md"
          />
          {!collapsed && <span className="truncate font-semibold tracking-tight">Knowledge_<span className="text-accent">96</span></span>}
        </Link>
        {mobile ? (
          <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        ) : (
          <button onClick={() => setCollapsed(c => !c)} className="hidden lg:block text-muted-foreground hover:text-foreground">
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {nav.map(item => {
          const active =
            item.to === "/admin/cars"
              ? pathname.startsWith("/admin/cars") && pathname !== "/admin/cars/new"
              : item.to === "/admin/cars/new"
              ? pathname === "/admin/cars/new"
              : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-accent/15 text-foreground"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId={mobile ? "admin-active-m" : "admin-active"}
                  className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-accent"
                />
              )}
              <Icon className="h-4 w-4 shrink-0" />
              {(!collapsed || mobile) && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          onClick={() => navigate({ to: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {(!collapsed || mobile) && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="hidden lg:flex"><Sidebar /></div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top nav */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface/60 px-4 backdrop-blur lg:px-6">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden flex-1 max-w-md md:block">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search leads, vehicles, customers…" className="pl-9 bg-background/60" />
          </div>
          <div className="flex-1 md:hidden" />
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-1.5 hidden sm:inline-flex">
              <Link to="/admin/cars/new"><PlusCircle className="h-4 w-4" />Quick Add</Link>
            </Button>
            <button className="relative grid h-9 w-9 place-items-center rounded-md hover:bg-muted/40 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
            </button>
            <button onClick={() => setDark(d => !d)} className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted/40 text-muted-foreground hover:text-foreground">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="ml-1 flex items-center gap-2 pl-2 border-l border-border">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent/60 text-xs font-semibold text-accent-foreground">SM</div>
              <div className="hidden md:block leading-tight">
                <div className="text-xs font-medium">Syed Mujahid</div>
                <div className="text-[10px] text-muted-foreground">Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Admin</div>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight lg:text-3xl">{title}</h1>
              </div>
              <div className="flex items-center gap-2">{actions}</div>
            </div>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
