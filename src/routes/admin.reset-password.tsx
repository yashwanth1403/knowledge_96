import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { AuthShell } from "./admin.login";

export const Route = createFileRoute("/admin/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  return (
    <AuthShell title="Choose a new password" subtitle="Use at least 8 characters with a mix of letters and numbers.">
      <form onSubmit={e => { e.preventDefault(); navigate({ to: "/admin/login" }); }} className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="password" className="pl-9" required />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="password" className="pl-9" required />
          </div>
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Update password</Button>
      </form>
    </AuthShell>
  );
}
