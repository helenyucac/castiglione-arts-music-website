"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "OUR STORY", href: "/about", activePath: "/about" },
  { label: "PROGRAMS", href: "#programs" },
  { label: "WHAT'S ON", href: "#whats-on" },
  { label: "PARTNERSHIP", href: "/partnerships", activePath: "/partnerships" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(17,17,17,0.06)] bg-[#f5f1ea]">
      <nav
        aria-label="Main navigation"
        className="mx-auto grid min-h-14 w-full max-w-[1540px] grid-cols-[1fr_auto] items-center px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10"
      >
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center justify-self-start text-left"
          aria-label="Castiglione home"
        >
          <Image
            src="/media/castiglione-logo.webp"
            alt="Castiglione"
            width={496}
            height={137}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center justify-center gap-10 lg:flex">
          {navItems.map((item) => {
            const isActive = item.activePath === pathname;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`flex min-h-14 items-center text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.2px] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActive
                    ? "text-[rgb(217,74,40)]"
                    : "text-[#111111] hover:text-[rgb(217,74,40)]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center justify-end gap-7 lg:flex">
          <p
            className="m-0 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.2px] text-[#111111] antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            EN <span className="text-[rgba(17,17,17,0.35)]">|</span> 中文
          </p>
          <Link
            href="/partnerships"
            className="inline-flex min-h-9 items-center border border-[rgba(17,17,17,0.3)] bg-transparent px-6 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[#111111] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[rgb(217,74,40)] hover:text-[rgb(217,74,40)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ENQUIRE
          </Link>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center justify-self-end border border-[rgba(17,17,17,0.3)] bg-transparent text-[#111111] transition-colors hover:border-[rgb(217,74,40)] hover:text-[rgb(217,74,40)] lg:hidden"
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
        className={`border-t border-[rgba(17,17,17,0.06)] bg-[#f5f1ea] lg:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="px-4 py-4 sm:px-6">
          {navItems.map((item) => {
            const isActive = item.activePath === pathname;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`block py-4 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[2.2px] antialiased transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isActive
                    ? "text-[rgb(217,74,40)]"
                    : "text-[#111111] hover:text-[rgb(217,74,40)]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mt-3 flex items-center justify-between border-t border-[rgba(17,17,17,0.06)] pt-5">
            <p
              className="m-0 text-[11px] font-semibold uppercase leading-[16.5px] tracking-[1.2px] text-[#111111] antialiased"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              EN <span className="text-[rgba(17,17,17,0.35)]">|</span> 中文
            </p>
            <Link
              href="/partnerships"
              className="inline-flex min-h-9 items-center border border-[rgba(17,17,17,0.3)] px-5 text-[11px] font-semibold uppercase leading-none tracking-[2.2px] text-[#111111] antialiased transition-colors hover:border-[rgb(217,74,40)] hover:text-[rgb(217,74,40)]"
              style={{ fontFamily: "Inter, sans-serif" }}
              onClick={() => setIsOpen(false)}
            >
              ENQUIRE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
