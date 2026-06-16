import { Link } from "@tanstack/react-router";
import { Car, Facebook, Instagram, Twitter, Youtube, Phone, Mail } from "lucide-react";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--surface)] mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground">
                <Car className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Knowledge<span className="text-accent">_96</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Premium pre-owned vehicles, expertly curated for the discerning driver.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Company
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/inventory" className="hover:text-accent transition-colors">Our Inventory</Link></li>
              <li><Link to="/sell-car" className="hover:text-accent transition-colors">Sell Your Car</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/inventory" className="hover:text-accent transition-colors">Browse Cars</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">Why Us</Link></li>
              <li><Link to="/admin" className="hover:text-accent transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:9014206533" className="hover:text-accent transition-colors">9014206533</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:Syedmujahid151@gmail.com" className="hover:text-accent transition-colors break-all">
                  Syedmujahid151@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Facebook, href: "https://facebook.com/knowledge96", label: "Facebook" },
                { Icon: Instagram, href: "https://www.instagram.com/knowledge_96_telugu/", label: "Instagram" },
                { Icon: Twitter, href: "https://x.com/knowledge96", label: "Twitter" },
                { Icon: Youtube, href: "https://youtube.com/@knowledge96", label: "Youtube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} Knowledge_96. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Phone: 9014206533</span>
            <span>Email: Syedmujahid151@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
