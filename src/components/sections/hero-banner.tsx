"use client";

import { useTranslations } from "next-intl";

const HeroBanner = () => {
  const t = useTranslations('hero');
  return (
    <section className="relative flex h-[600px] w-full items-center">
      <div
        className="absolute inset-0 z-0 bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=70&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundPosition: "center 40%",
        }}
        aria-hidden="true"
      />
      <div className="relative z-20 w-full text-center text-white">
        <h1 className="text-white text-[3rem] font-bold uppercase md:text-[4rem] md:tracking-[.15em] lg:text-[5rem]">
          {t('title')}
        </h1>
        <p className="text-white text-[1rem] font-semibold lg:text-[1.25rem]">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;