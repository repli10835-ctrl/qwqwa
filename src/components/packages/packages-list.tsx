'use client';

import { useEffect, useState } from 'react';
import { supabase, type Package, type City } from '@/lib/supabase';
import PackageCard from './package-card';

interface PackageWithCity extends Package {
  cities: City;
}

export default function PackagesList() {
  const [packages, setPackages] = useState<PackageWithCity[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupedPackages, setGroupedPackages] = useState<Record<string, PackageWithCity[]>>({});

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*, cities(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const packagesWithCity = data as PackageWithCity[];
      setPackages(packagesWithCity);

      const grouped = packagesWithCity.reduce((acc, pkg) => {
        const cityName = pkg.cities.name;
        if (!acc[cityName]) {
          acc[cityName] = [];
        }
        acc[cityName].push(pkg);
        return acc;
      }, {} as Record<string, PackageWithCity[]>);

      setGroupedPackages(grouped);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {Object.entries(groupedPackages).map(([cityName, cityPackages]) => (
        <section key={cityName} className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">{cityName}</h2>
            <span className="text-muted-foreground">
              ({cityPackages.length} paket)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </section>
      ))}

      {packages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Belum ada paket perjalanan tersedia
          </p>
        </div>
      )}
    </div>
  );
}
