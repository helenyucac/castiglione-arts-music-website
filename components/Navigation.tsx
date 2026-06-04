"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "About Us", href: "/about" },
  { label: "Tours", href: "/tours" },
  { label: "Lucid Live", href: "https://lucidlivemusic.com/event/", isExternal: true },
  { label: "Contact Us", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-20 w-full max-w-[1760px] items-center justify-between px-4 sm:px-6 lg:px-10"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 pr-4 text-left"
          aria-label="Castiglione Arts & Music home"
        >
          <span className="grid size-11 shrink-0 place-items-center bg-black text-sm font-black uppercase tracking-normal text-white transition-colors group-hover:bg-[#d7263d]">
            CA
          </span>
          <span className="max-w-52 text-base font-black uppercase leading-[0.92] tracking-normal sm:text-lg">
            Castiglione
            <span className="block font-semibold">Arts & Music</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-stretch justify-start gap-1 lg:flex">
          {navItems.map((item) =>
            item.isExternal ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-20 items-center px-8 text-sm font-bold uppercase tracking-normal transition-colors hover:bg-black hover:text-white xl:px-10"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-20 items-center px-8 text-sm font-bold uppercase tracking-normal transition-colors hover:bg-black hover:text-white xl:px-10"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center border border-black bg-transparent transition-colors hover:bg-black hover:text-white lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`bg-white lg:hidden ${isOpen ? "block" : "hidden"}`}
      >
        {navItems.map((item) =>
          item.isExternal ? (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-5 text-lg font-black uppercase tracking-normal transition-colors hover:bg-black hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-5 text-lg font-black uppercase tracking-normal transition-colors hover:bg-black hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ),
        )}
      </div>
    </header>
  );
}
