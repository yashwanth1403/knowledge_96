import { createFileRoute, Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { AuthShell } from "./admin.login";
import { useState } from "react";

export const Route = createFileRoute("/admin/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell title="Reset your password" subtitle="We'll send a recovery link to your email.">
      {sent ? (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          If an account exists, a reset link is on its way.
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" placeholder="admin@knowledge96.com" className="pl-9" required />
            </div>
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send reset link</Button>
        </form>
      )}
      <Link to="/admin/login" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />Back to login</Link>
    </AuthShell>
  );
}
