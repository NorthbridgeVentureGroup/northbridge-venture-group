import NorthbridgeLogo from "@/components/NorthbridgeLogo";
import { corporateOriginHref } from "@/lib/corporate-navigation";
import { primaryPublicNavLinks, secondaryPublicNavLinks } from "@/lib/public-navigation";
import { openNordyHref } from "@/lib/nordy/routes";

const footerNavLinks = [...primaryPublicNavLinks, ...secondaryPublicNavLinks];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-10 sm:gap-14">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-20">
            <div className="flex flex-col gap-3">
              <a href={corporateOriginHref("/")} className="inline-block w-fit">
                <NorthbridgeLogo className="h-8 sm:h-9" />
              </a>
              <p className="text-silver text-sm max-w-[320px] leading-relaxed">
                Northbridge Venture Group builds companies, software, and intelligent
                systems — ventures, Engineering & AI, and Digital products.
              </p>
              <p className="text-silver text-xs sm:text-sm max-w-sm leading-relaxed">
                Questions?{" "}
                <a
                  href="mailto:contact@northbridgeventuregroup.com"
                  className="underline underline-offset-4 hover:text-white transition-colors"
                >
                  contact@northbridgeventuregroup.com
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
              <div>
                <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-silver/80 mb-3">
                  Navigation
                </h4>
                <ul className="space-y-2.5">
                  {footerNavLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={corporateOriginHref(link.href)}
                        className="text-sm text-white/75 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-silver/80 mb-3">
                  Start Here
                </h4>
                <p className="text-sm text-white/60 leading-relaxed max-w-[220px]">
                  Talk to Nordi to explore Northbridge or qualify a Digital or
                  Engineering & AI project.
                </p>
                <a
                  href={corporateOriginHref(openNordyHref("HOME"))}
                  className="inline-flex min-h-11 items-center mt-4 text-sm font-medium text-red hover:text-red-hover transition-colors"
                >
                  Talk to Nordi →
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-white/10">
            <p className="text-[11px] sm:text-xs text-silver/60">
              © {new Date().getFullYear()} Northbridge Venture Group. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
