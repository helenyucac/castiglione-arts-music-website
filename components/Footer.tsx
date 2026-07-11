import Link from "next/link";
import { FooterNewsletterForm } from "@/components/FooterNewsletterForm";
import { SocialLinks } from "@/components/SocialLinks";
import {
  getResolvedFooterNavigationLinks,
  getResolvedFooterSocialLinks,
  getResolvedSiteSettings,
} from "@/lib/wix/globalConfig";

function FooterHeadline({ headline }: { headline: string }) {
  const accentWord = "meaningful";
  const accentIndex = headline.toLowerCase().indexOf(accentWord);

  if (accentIndex === -1) {
    return <span className="block">{headline}</span>;
  }

  const beforeAccent = headline.slice(0, accentIndex).trim();
  const accent = headline.slice(accentIndex, accentIndex + accentWord.length);
  const afterAccent = headline.slice(accentIndex + accentWord.length).trim();

  return (
    <>
      <span className="block">{beforeAccent}</span>
      <span className="block">
        <span className="text-[#d24a37]">{accent}</span>
        {afterAccent ? ` ${afterAccent}` : null}
      </span>
    </>
  );
}

function normalizeFooterText(value?: string) {
  return value?.replace(/\\n/g, "\n");
}

export async function Footer() {
  const [siteSettings, footerNav, footerSocialLinks] = await Promise.all([
    getResolvedSiteSettings(),
    getResolvedFooterNavigationLinks(),
    getResolvedFooterSocialLinks(),
  ]);
  const footerHeadline =
    normalizeFooterText(siteSettings.footerHeadline) ?? "Let's create something meaningful together.";
  const footerSubtext = normalizeFooterText(siteSettings.footerSubtext);
  const footerEmailPlaceholder = normalizeFooterText(siteSettings.footerEmailPlaceholder);
  const footerCopyright = normalizeFooterText(siteSettings.footerCopyright);

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
            className="m-0 mb-5 max-w-[608px] text-center text-[48px] font-medium leading-[48px] tracking-[-0.96px] text-white antialiased"
            style={{
              fontFamily: 'Fraunces, "Cormorant Garamond", serif',
            }}
          >
            <FooterHeadline headline={footerHeadline} />
          </h2>

          <p
            className="mt-8 max-w-xl text-[17px] font-normal leading-[1.65] text-white/60 antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {footerSubtext}
          </p>

          <FooterNewsletterForm placeholder={footerEmailPlaceholder ?? "Email address"} />
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.12)]">
        <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p
            className="text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-white/60 antialiased"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {footerCopyright}
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
            <nav className="flex flex-wrap items-center gap-x-8 gap-y-4" aria-label="Footer navigation">
              {footerNav.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  target={item.openNewTab ? "_blank" : undefined}
                  rel={item.openNewTab ? "noopener noreferrer" : undefined}
                  className="text-[11px] font-medium uppercase leading-none tracking-[0.28em] text-white/70 antialiased transition-opacity duration-150 hover:opacity-70"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <SocialLinks
              className="justify-start sm:justify-end"
              links={footerSocialLinks.map((item) => ({
                platform: item.platform,
                url: item.url,
                openNewTab: item.openNewTab,
              }))}
              variant="footer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
