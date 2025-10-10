"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

type Destination = {
  city: string;
  country: string;
  airportCode: string;
  imageUrl: string;
  href: string;
};

const destinations: Destination[] = [
  {
    city: "São Paulo",
    country: "Brazil",
    airportCode: "GRU",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-888996.webp?",
    href: "/",
  },
  {
    city: "Delhi",
    country: "India",
    airportCode: "DEL",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-194514.webp?",
    href: "/",
  },
  {
    city: "Guangzhou",
    country: "China",
    airportCode: "CAN",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-450997.webp?",
    href: "/",
  },
  {
    city: "Jakarta",
    country: "Indonesia",
    airportCode: "CGK",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-963010.webp?",
    href: "/",
  },
  {
    city: "Tokyo",
    country: "Japan",
    airportCode: "HND",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-766941.webp?",
    href: "/",
  },
  {
    city: "Toronto",
    country: "Canada",
    airportCode: "YYZ",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-993014.webp?",
    href: "https://golob-travel-agency.vercel.app/flights/search/from%3DCGK_Soekarno-Hatta%2BInternational%2BAirport_Jakarta%26to%3DYYZ_Lester%2BB.%2BPearson%2BInternational%2BAirport_Toronto%26tripType%3Done_way%26desiredDepartureDate%3D2025-10-11%26desiredReturnDate%3D%26class%3Deconomy%26passengers%3Dadults-1_children-0_infants-0",
  },
  {
    city: "Atlanta",
    country: "United States",
    airportCode: "ATL",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-172936.webp?",
    href: "https://golob-travel-agency.vercel.app/flights/search/from%3DGRU_S%25C3%25A3o%2BPaulo%25E2%2580%2593Guarulhos%2BInternational%2BAirport_S%25C3%25A3o%2BPaulo%26to%3DATL_Hartsfield-Jackson%2BAtlanta%2BInternational%2BAirport_Atlanta%26tripType%3Done_way%26desiredDepartureDate%3D2025-10-11%26desiredReturnDate%3D%26class%3Deconomy%26passengers%3Dadults-1_children-0_infants-0",
  },
  {
    city: "Istanbul",
    country: "Turkey",
    airportCode: "IST",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-578554.webp?",
    href: "https://golob-travel-agency.vercel.app/flights/search/from%3DDXB_Dubai%2BInternational%2BAirport_Dubai%26to%3DIST_Istanbul%2BAirport_Istanbul%26tripType%3Done_way%26desiredDepartureDate%3D2025-10-11%26desiredReturnDate%3D%26class%3Deconomy%26passengers%3Dadults-1_children-0_infants-0",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    airportCode: "DXB",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-697449.webp?",
    href: "https://golob-travel-agency.vercel.app/flights/search/from%3DCGK_Soekarno-Hatta%2BInternational%2BAirport_Jakarta%26to%3DDXB_Dubai%2BInternational%2BAirport_Dubai%26tripType%3Done_way%26desiredDepartureDate%3D2025-10-11%26desiredReturnDate%3D%26class%3Deconomy%26passengers%3Dadults-1_children-0_infants-0",
  },
  {
    city: "London",
    country: "United Kingdom",
    airportCode: "LHR",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/photo-1566073771259-6a8506099945-22.webp?",
    href: "https://golob-travel-agency.vercel.app/flights/search/from%3DYYZ_Lester%2BB.%2BPearson%2BInternational%2BAirport_Toronto%26to%3DLHR_London%2BHeathrow%2BAirport_London%26tripType%3Done_way%26desiredDepartureDate%3D2025-10-11%26desiredReturnDate%3D%26class%3Deconomy%26passengers%3Dadults-1_children-0_infants-0",
  },
];

const PopularFlightDestinations = () => {
  const t = useTranslations('destinations');
  return (
    <section className="mx-auto">
      <div className="mx-auto mb-5 flex items-center justify-between max-md:flex-col max-md:gap-4 md:mb-10">
        <div className="md:w-1/2">
          <h2 className="mb-2 text-[2rem] font-semibold text-dark-charcoal max-md:text-center md:mb-4">
            {t('popularFlights')}
          </h2>
          <p className="text-medium-gray max-md:text-center">
            {t('exploreDeals')}
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <Link href={destination.href} key={destination.city}>
            <div className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <Image
                  alt={`${destination.city}, ${destination.country}`}
                  src={destination.imageUrl}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="mb-1 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{destination.airportCode}</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {destination.city}, {destination.country}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularFlightDestinations;