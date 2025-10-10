'use client';

import { Package, City } from '@/lib/supabase';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Check } from 'lucide-react';
import Link from 'next/link';

interface PackageWithCity extends Package {
  cities: City;
}

interface PackageCardProps {
  package: PackageWithCity;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image_url}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {pkg.name}
        </Badge>
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{pkg.cities.name}</span>
        </div>
        <h3 className="text-xl font-bold line-clamp-1">
          {pkg.cities.name} - {pkg.name}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {pkg.description}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>{pkg.duration_days} Hari</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Yang Didapatkan:</p>
          <ul className="space-y-1">
            {pkg.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#dcac56' }} />
                <span>{feature}</span>
              </li>
            ))}
            {pkg.features.length > 3 && (
              <li className="text-sm text-primary font-medium">
                +{pkg.features.length - 3} lainnya
              </li>
            )}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Mulai dari</p>
          <p className="text-2xl font-bold text-primary">{formatPrice(pkg.price)}</p>
        </div>
        <Link href={`/packages/${pkg.id}`}>
          <Button size="lg">
            Lihat Detail
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
