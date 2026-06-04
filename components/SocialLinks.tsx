import type { ElementType } from "react";
import { BookText } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

export const socialLinks: { label: string; href: string; icon: ElementType }[] = [
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "TikTok", href: "#", icon: FaTiktok },
  { label: "YouTube", href: "#", icon: FaYoutube },
  { label: "Rednote", href: "#", icon: BookText },
];

type SocialLinksProps = {
  className?: string;
  variant?: "hero" | "footer";
};

export function SocialLinks({ className = "", variant = "hero" }: SocialLinksProps) {
  const iconClass =
    variant === "footer"
      ? "border-black text-black hover:bg-black hover:text-white"
      : "border-white/70 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white hover:text-black";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialLinks.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className={`grid size-11 place-items-center border transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(17,17,17,0.14)] sm:size-12 ${iconClass}`}
          >
            <Icon aria-hidden="true" size={20} />
          </a>
        );
      })}
    </div>
  );
}
