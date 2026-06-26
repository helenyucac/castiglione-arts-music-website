import type { ElementType } from "react";
import { BookText } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { defaultSocialLinks } from "@/data/siteSettings";

const socialIconMap: Record<string, ElementType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  rednote: BookText,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

export const socialLinks = defaultSocialLinks.map((item) => ({
  label: item.platform,
  href: item.url,
  icon: socialIconMap[item.platform.toLowerCase()] ?? BookText,
}));

type SocialLinksProps = {
  className?: string;
  variant?: "hero" | "footer";
  links?: {
    platform: string;
    url: string;
    openNewTab?: boolean;
  }[];
};

export function SocialLinks({ className = "", variant = "hero", links }: SocialLinksProps) {
  const baseClass =
    variant === "footer"
      ? "grid size-11 place-items-center border transition duration-200 sm:size-12"
      : "grid size-11 place-items-center border transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(17,17,17,0.14)] sm:size-12";
  const iconClass =
    variant === "footer"
      ? "border-white/25 text-white/75 hover:border-white/45 hover:bg-white/5 hover:text-white hover:opacity-75"
      : "border-white/70 bg-white/10 text-white backdrop-blur hover:border-white hover:bg-white hover:text-black";
  const resolvedLinks =
    links?.map((item) => ({
      label: item.platform,
      href: item.url,
      icon: socialIconMap[item.platform.toLowerCase()] ?? BookText,
      openNewTab: item.openNewTab ?? true,
    })) ?? socialLinks.map((item) => ({ ...item, openNewTab: true }));

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {resolvedLinks.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.label}
            href={item.href}
            target={item.openNewTab ? "_blank" : undefined}
            rel={item.openNewTab ? "noopener noreferrer" : undefined}
            aria-label={item.label}
            className={`${baseClass} ${iconClass}`}
          >
            <Icon aria-hidden="true" size={20} />
          </a>
        );
      })}
    </div>
  );
}
