"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-medium text-white/80">Moritz Renner</div>
          <div>Personal portfolio and project showcase.</div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/impressum" className="transition hover:text-white">
            Impressum
          </Link>
          <Link href="/datenschutz" className="transition hover:text-white">
            Datenschutz
          </Link>
          <Link href="/CV" className="transition hover:text-white">
            CV
          </Link>
        </div>
      </div>
    </footer>
  );
}
