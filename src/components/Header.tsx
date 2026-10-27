"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GearIcon } from "./Icons";
import { ThemeMenu } from "./ThemeMenu";

const links = [
  { href: "/", label: "Course" },
  { href: "/cheat-sheet", label: "Cheat sheet" },
  { href: "/practice-exam", label: "Practice exam" },
];

export function Header() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-display text-lg font-bold text-brandink">F</span>
          <span className="font-display text-lg font-semibold leading-tight">
            Food Protection <span className="text-brand">Prep</span>
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-1 text-sm font-semibold">
          {links.map((l) => {
            const active = l.href === "/" ? path === "/" || path.startsWith("/lesson") : path.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className={`rounded-full px-3 py-1.5 ${active ? "bg-brandsoft text-brand" : "hover:bg-surface2"}`}>
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={() => window.dispatchEvent(new Event("fpc:voice-settings"))}
            className="ml-1 flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 hover:bg-surface2"
            aria-label="Voice settings"
          >
            <GearIcon width={16} height={16} />
            <span className="hidden sm:inline">Voice</span>
          </button>
          <ThemeMenu />
        </nav>
      </div>
    </header>
  );
}
