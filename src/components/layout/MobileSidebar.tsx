"use client";

import { useState } from "react";
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

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[var(--nav-bg)] border border-[var(--primary)]/20 rounded-lg p-2 shadow-sm"
        aria-label="Open navigation menu"
      >
        <svg
          className="w-6 h-6 text-[var(--text-strong)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[var(--nav-bg)] border-r border-[var(--primary)]/20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-strong)]"
            aria-label="Close navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation */}
          <nav className="mt-12 space-y-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/rocks" && pathname?.startsWith("/rocks")) ||
                (item.href === "/exec-pack" && pathname?.startsWith("/exec-pack"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--primary-light)] text-[var(--primary)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
