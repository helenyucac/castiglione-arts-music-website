import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";

const footerNav = [
  { label: "About Us", href: "/about" },
  { label: "Tours", href: "/tours" },
  { label: "Lucid Live", href: "https://lucidlivemusic.com/event/", isExternal: true },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-black bg-white text-black">
      <div className="mx-auto w-full max-w-[1760px] px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-10 border-b border-black pb-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-12 place-items-center bg-black text-sm font-black uppercase text-white">
                CA
              </span>
              <span className="text-xl font-black uppercase leading-none">
                Castiglione
                <span className="block font-semibold">Arts & Music</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-lg leading-8">
              Australia-based touring production for orchestral anime and gaming
              concerts, classical recitals, and cultural live experiences.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-normal">Follow</p>
              <SocialLinks className="justify-start" variant="footer" />
            </div>

            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-normal">Navigate</p>
              <div className="grid gap-3">
                {footerNav.map((item) =>
                  item.isExternal ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-black uppercase leading-none underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-xl font-black uppercase leading-none underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-sm font-bold uppercase tracking-normal sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Castiglione Arts & Music.</p>
          <p>Melbourne / Sydney / Brisbane / Perth / Beyond</p>
        </div>
      </div>
    </footer>
  );
}
