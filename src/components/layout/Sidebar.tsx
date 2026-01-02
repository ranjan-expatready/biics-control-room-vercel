"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/rocks", label: "Rocks", icon: "🎯" },
  { href: "/risks", label: "Risks", icon: "⚠️" },
  { href: "/decisions", label: "Decisions", icon: "💡" },
  { href: "/exec-pack", label: "Exec Pack", icon: "📊" },
  { href: "/offering", label: "Offering", icon: "📋" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-[var(--primary)]/20 bg-[var(--nav-bg)] p-6">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/rocks" && pathname?.startsWith("/rocks")) ||
            (item.href === "/exec-pack" && pathname?.startsWith("/exec-pack"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--primary-light)] text-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--muted)]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

