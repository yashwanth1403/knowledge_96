import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SectionCard } from "@/components/admin/shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Admin | Knowledge_96" }, { name: "robots", content: "noindex" }] }),
  component: SettingsPage,
});

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <SectionCard>
      <div className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </SectionCard>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={cn("space-y-1.5", full && "sm:col-span-2")}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function SettingsPage() {
  return (
    <AdminLayout
      title="Settings"
      actions={<Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => toast.success("Settings saved")}>Save Changes</Button>}
    >
      <div className="space-y-6">
        <Section title="Business Information" description="Public business details shown across the site.">
          <Field label="Business Name"><Input defaultValue="Knowledge_96" /></Field>
          <Field label="Tagline"><Input defaultValue="Premium Pre-Owned Cars" /></Field>
          <Field label="About" full><Textarea rows={3} defaultValue="India's trusted destination for certified pre-owned luxury vehicles." /></Field>
        </Section>

        <Section title="Contact Details">
          <Field label="Phone"><Input defaultValue="9014206533" /></Field>
          <Field label="Email"><Input defaultValue="Syedmujahid151@gmail.com" /></Field>
          <Field label="WhatsApp Number"><Input defaultValue="9014206533" /></Field>
          <Field label="Showroom Address" full><Textarea rows={2} defaultValue="Hyderabad, Telangana, India" /></Field>
        </Section>

        <Section title="Social Media Links">
          <Field label="Instagram"><Input defaultValue="https://www.instagram.com/knowledge_96_telugu/" /></Field>
          <Field label="Facebook"><Input placeholder="https://facebook.com/knowledge96" /></Field>
          <Field label="YouTube"><Input placeholder="https://youtube.com/@knowledge96" /></Field>
          <Field label="X / Twitter"><Input placeholder="https://x.com/knowledge96" /></Field>
        </Section>

        <Section title="Email Settings" description="Transactional and notification emails.">
          <Field label="From Address"><Input defaultValue="hello@knowledge96.com" /></Field>
          <Field label="Reply-To"><Input defaultValue="Syedmujahid151@gmail.com" /></Field>
          <div className="flex items-center justify-between sm:col-span-2 rounded-md border border-border bg-background/40 px-3 py-2.5">
            <div>
              <div className="text-sm font-medium">Send new-lead alerts</div>
              <div className="text-xs text-muted-foreground">Email admin instantly when a new lead arrives.</div>
            </div>
            <Switch defaultChecked />
          </div>
        </Section>

        <Section title="SEO Defaults">
          <Field label="Default Meta Title"><Input defaultValue="Knowledge_96 | Premium Pre-Owned Luxury Cars" /></Field>
          <Field label="Default Keywords"><Input defaultValue="luxury pre-owned cars, used BMW, used Mercedes" /></Field>
          <Field label="Default Meta Description" full><Textarea rows={2} defaultValue="Discover certified pre-owned luxury cars at India's most trusted dealership." /></Field>
        </Section>

        <Section title="Website Branding">
          <Field label="Primary Color"><Input type="text" defaultValue="#E63946" /></Field>
          <Field label="Theme"><Input defaultValue="Dark Luxury" /></Field>
          <Field label="Favicon" full><Input type="file" accept="image/*" /></Field>
        </Section>
      </div>
    </AdminLayout>
  );
}
