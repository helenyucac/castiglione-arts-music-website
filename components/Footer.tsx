import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";

const footerNav = [
  { label: "About Us", href: "/about" },
  { label: "Tours", href: "/tours" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-black bg-white text-black">
      <div className="mx-auto w-full max-w-[1760px] px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-10 border-b border-black pb-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Castiglione home">
              <Image
                src="/media/castiglione-logo.webp"
                alt="Castiglione"
                width={496}
                height={137}
                className="h-10 w-auto object-contain sm:h-[52px]"
              />
            </Link>
            <p className="mt-6 max-w-md text-lg leading-8">
              Australia-based touring production for orchestral anime and gaming
              concerts, classic concerts, and cultural live experiences.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-normal">Follow</p>
              <SocialLinks className="justify-start" variant="footer" />
            </div>

            <div>
              <div className="grid gap-3">
                {footerNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-black uppercase leading-none underline-offset-4 hover:underline sm:text-xl"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 text-sm font-bold uppercase tracking-normal">
          <p>© 2026 Castiglione Arts & Culture</p>
        </div>
      </div>
    </footer>
  );
}
