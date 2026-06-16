import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Login — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return <AuthShell title="Welcome back" subtitle="Sign in to the Knowledge_96 admin console">
    <form onSubmit={e => { e.preventDefault(); navigate({ to: "/admin/dashboard" }); }} className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="email" placeholder="admin@knowledge96.com" defaultValue="Syedmujahid151@gmail.com" className="pl-9" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type={show ? "text" : "password"} placeholder="••••••••" defaultValue="demo1234" className="pl-9 pr-9" required />
          <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-muted-foreground"><Checkbox defaultChecked />Remember me</label>
        <Link to="/admin/forgot-password" className="text-accent hover:underline">Forgot password?</Link>
      </div>
      <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Sign in</Button>
    </form>
  </AuthShell>;
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2 bg-background text-foreground">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_20%,_rgba(230,57,70,0.25),_transparent_50%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground font-bold">K</div>
            <span className="text-lg font-semibold">Knowledge_<span className="text-accent">96</span></span>
          </Link>
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">The dealer command center for premium pre-owned cars.</h2>
            <p className="mt-3 max-w-md text-muted-foreground">Manage inventory, leads, media and SEO from one polished workspace.</p>
          </div>
          <div className="text-xs text-muted-foreground">© Knowledge_96 · Admin</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground font-bold">K</div>
            <span className="text-lg font-semibold">Knowledge_<span className="text-accent">96</span></span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
