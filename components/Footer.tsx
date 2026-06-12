import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";

const footerNav = [
  { label: "About", href: "/about" },
  { label: "Partnership", href: "/partnerships" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-[#111111] text-white">
      <div className="mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center py-24 text-center sm:py-28 lg:py-36">
          <p
            className="mb-7 text-[11px] font-semibold uppercase leading-none tracking-[0.36em] text-[#d24a37] antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            CONTACT
          </p>

          <h2
            className="m-0 text-[clamp(3rem,6.2vw,5.4rem)] font-medium leading-[0.92] tracking-[-0.04em] text-white antialiased"
            style={{
              fontFamily:
                'Fraunces, Canela, "Canela Deck", "Cormorant Garamond", serif',
            }}
          >
            <span className="block">Let&apos;s create something</span>
            <span className="block">
              <span className="text-[#d24a37]">meaningful</span> together.
            </span>
          </h2>

          <p
            className="mt-8 max-w-xl text-[17px] font-normal leading-[1.65] text-white/60 antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Stay connected with our latest programs, touring projects and
            partnership opportunities.
          </p>

          <form className="mt-12 flex w-full max-w-2xl flex-col gap-4 border-b border-white/25 pb-4 sm:flex-row sm:items-end sm:gap-8">
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              placeholder="Email address"
              className="min-h-10 flex-1 bg-transparent text-left text-[17px] leading-none text-white outline-none placeholder:text-white/40"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <button
              type="button"
              className="flex min-h-10 flex-col items-start justify-center text-left text-[11px] font-semibold uppercase leading-none tracking-[0.28em] text-white transition-opacity duration-150 hover:opacity-70 sm:items-center sm:text-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span>SUBSCRIBE</span>
              <span className="mt-2 text-base leading-none">→</span>
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.12)]">
        <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p
            className="text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-white/60 antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2026 CASTIGLIONE ARTS & CULTURE
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-4" aria-label="Footer navigation">
              {footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-white/70 antialiased transition-opacity duration-150 hover:opacity-70"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <SocialLinks className="justify-start sm:justify-end" variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
