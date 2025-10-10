"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CtaCards = () => {
  const t = useTranslations('nav');
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="relative group overflow-hidden rounded-2xl min-h-[440px]">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-412883.webp?"
          alt="Airport tarmac with plane and ground vehicle"
          fill
          className="absolute -z-10 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex h-full flex-col justify-center bg-black/40 rounded-2xl text-white px-5 py-10">
          <h3 className="mb-2 text-[2.5rem] font-bold">Flights</h3>
          <p className="mb-5 max-w-[40ch] text-lg leading-6 line-clamp-2">
            Search Flights & Places Hire to our most popular destinations
          </p>
          <Link
            href="/flights"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-[#9BE0C8] active:bg-[#82CBB2] focus:bg-[#A5EBD3] h-[48px] px-[16px] rounded-[4px] py-[8px] mt-auto w-fit gap-[6px]"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/svgs/paper-plane-filled-4.svg?"
              alt="paper plane icon"
              width={24}
              height={24}
            />
            {t('findFlights')}
          </Link>
        </div>
      </div>
      <div className="relative group overflow-hidden rounded-2xl min-h-[440px]">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-853309.webp?"
          alt="Luxury resort pool with lounge chairs"
          fill
          className="absolute -z-10 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex h-full flex-col justify-center bg-black/40 rounded-2xl text-white px-5 py-10">
          <h3 className="mb-2 text-[2.5rem] font-bold">Hotels</h3>
          <p className="mb-5 max-w-[40ch] text-lg leading-6 line-clamp-2">
            Search Flights & Places Hire to our most popular destinations
          </p>
          <Link
            href="/hotels"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-[#9BE0C8] active:bg-[#82CBB2] focus:bg-[#A5EBD3] h-[48px] px-[16px] rounded-[4px] py-[8px] mt-auto w-fit gap-[6px]"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/svgs/paper-plane-filled-4.svg?"
              alt="paper plane icon"
              width={24}
              height={24}
            />
            Find Hotels
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaCards;