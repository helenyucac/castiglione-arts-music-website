"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "OUR STORY", href: "/about" },
  { label: "PROGRAMS", href: "/tours" },
  { label: "WHAT'S ON", href: "/tours" },
  { label: "PARTNERSHIP", href: "/partnerships" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-20 w-full max-w-[1760px] items-center justify-between px-5 sm:px-7 lg:px-10"
      >
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center pr-5 text-left sm:pr-8"
          aria-label="Castiglione home"
        >
          <Image
            src="/media/castiglione-logo.webp"
            alt="Castiglione"
            width={496}
            height={137}
            priority
            className="h-10 w-auto object-contain sm:h-[52px]"
          />
        </Link>

        <div className="hidden flex-1 items-center justify-start lg:flex">
          {navItems.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="mr-10 flex min-h-20 items-center text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.2px] text-[#111111] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] last:mr-0 hover:text-[rgb(90,90,90)]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item.label}
            </Link>
          ))}
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
        {navItems.map((item) => (
          <Link
            key={`${item.label}-${item.href}`}
            href={item.href}
            className="block px-5 py-5 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.2px] text-[#111111] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-[rgb(90,90,90)]"
            style={{ fontFamily: "Inter, sans-serif" }}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
