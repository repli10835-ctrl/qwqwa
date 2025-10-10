'use client';

import { useState } from 'react';
import HeaderNavigation from "@/components/sections/header-navigation";
import Footer from "@/components/sections/footer";
import PackagesList from "@/components/packages/packages-list";
import FlightHero from "@/components/flights/flight-hero";
import NewFlightSearchForm, { SearchParams } from "@/components/flights/new-flight-search-form";

export default function FlightsPage() {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation mode="page" />

      <FlightHero />

      <main className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 -mt-20 relative z-10">
          <NewFlightSearchForm onSearch={handleSearch} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-20 mt-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-3">Paket Perjalanan Tersedia</h2>
            <p className="text-muted-foreground text-lg">
              Pilih paket perjalanan terbaik untuk destinasi impian Anda
            </p>
          </div>

          <PackagesList />
        </div>
      </main>

      <Footer />
    </div>
  );
}