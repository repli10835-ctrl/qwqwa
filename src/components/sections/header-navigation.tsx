"use client";

import Link from "next/link";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./language-toggle";
import { useTranslations } from "next-intl";

type HeaderNavigationProps = {
  mode?: "hero" | "page";
};

export default function HeaderNavigation({ mode = "hero" }: HeaderNavigationProps) {
  const t = useTranslations('nav');
  const isPage = mode === "page";
  const headerClasses = isPage
    ? "bg-white/80 backdrop-blur-md border-b border-black/10 shadow-sm"
    : "bg-white/10 backdrop-blur-md border-b border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.08)]";
  const linkClass = isPage
    ? "flex items-center gap-2 text-foreground hover:text-primary transition-colors"
    : "flex items-center gap-2 text-white hover:text-primary transition-colors";
  const logoTextClass = isPage ? "text-2xl font-bold text-foreground" : "text-2xl font-bold text-white";
  const loginBtnClass = isPage
    ? "text-foreground hover:text-primary hover:bg-black/5"
    : "text-white hover:text-primary hover:bg-white/10";
  const signupBtnClass = isPage
    ? "bg-primary text-primary-foreground hover:bg-[#9BE0C8]"
    : "bg-white text-dark-charcoal hover:bg-white/90";
  const langToggleClass = isPage
    ? "text-foreground hover:text-primary hover:bg-black/5"
    : "text-white hover:text-primary hover:bg-white/10";
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${headerClasses}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/flights"
              className={linkClass}
            >
              <Plane className="h-5 w-5" />
              <span className="font-medium">{t('findFlights')}</span>
            </Link>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Plane className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className={logoTextClass}>
                Gol<span className="text-primary">o</span>be
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageToggle variant="ghost" className={langToggleClass} />
            <Link href="/login">
              <Button variant="ghost" className={loginBtnClass}>
                {t('login')}
              </Button>
            </Link>
            <Link href="/register">
              <Button className={signupBtnClass}>
                {t('signup')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}