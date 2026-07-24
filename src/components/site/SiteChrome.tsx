"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navGroups } from "./nav-data";
import { Wordmark } from "./Wordmark";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-8" aria-label="Site">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="overline-label mb-3 text-fg-muted">{group.title}</p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.soon ? "#" : item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    aria-disabled={item.soon || undefined}
                    tabIndex={item.soon ? -1 : undefined}
                    className={[
                      "flex min-h-9 items-center justify-between rounded-md px-3 text-body-sm transition-colors duration-150",
                      active
                        ? "bg-accent-subtle text-accent"
                        : item.soon
                          ? "pointer-events-none text-fg-disabled"
                          : "text-fg-secondary hover:bg-surface-sunken hover:text-fg",
                    ].join(" ")}
                  >
                    <span>{item.title}</span>
                    {active && (
                      <span
                        aria-hidden
                        className="size-1.5 rounded-full bg-accent shadow-glow-accent-soft"
                      />
                    )}
                    {item.soon && (
                      <span className="rounded-full border border-border-subtle px-2 py-0.5 text-[10px] tracking-[0.15em] text-fg-disabled uppercase">
                        Soon
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet whenever the route actually changes (render-time adjustment).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <div className="min-h-dvh">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-(--layout-sidebar) flex-col gap-10 overflow-y-auto border-r border-border-subtle px-6 py-8 lg:flex">
        <Wordmark />
        <NavLinks />
        <p className="mt-auto text-caption text-fg-disabled">
          Design System · v0.1
        </p>
      </aside>

      {/* Mobile top bar */}
      <header className="glass sticky top-0 z-40 flex h-14 items-center justify-between px-5 lg:hidden">
        <Wordmark />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="flex size-11 items-center justify-center rounded-md text-fg-secondary transition-colors hover:text-fg"
        >
          <List size={22} weight="light" />
        </button>
      </header>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="animate-fade-in absolute inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="animate-slide-in glass absolute inset-y-0 left-0 flex w-72 flex-col gap-10 overflow-y-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="flex size-11 items-center justify-center rounded-md text-fg-secondary transition-colors hover:text-fg"
              >
                <X size={20} weight="light" />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Content column */}
      <main className="px-6 pt-10 pb-24 lg:pl-[calc(var(--layout-sidebar)+3rem)] lg:pr-12 lg:pt-16">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
