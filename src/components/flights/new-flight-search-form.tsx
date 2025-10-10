'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plane } from 'lucide-react';
import CitySelector from './city-selector';
import DateSelector from './date-selector';
import { type City } from '@/lib/supabase';

interface FlightSearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  from: City | null;
  to: City | null;
  departDate: Date | undefined;
  returnDate: Date | undefined;
  tripType: 'one-way' | 'round-trip' | 'multi-city';
}

export default function NewFlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip' | 'multi-city'>('one-way');
  const [fromCity, setFromCity] = useState<City | null>(null);
  const [toCity, setToCity] = useState<City | null>(null);
  const [departDate, setDepartDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

  const handleSearch = () => {
    onSearch({
      from: fromCity,
      to: toCity,
      departDate,
      returnDate,
      tripType,
    });
  };

  return (
    <Card className="shadow-xl border-none">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Where are you flying?</h2>
          </div>

          <RadioGroup
            value={tripType}
            onValueChange={(value) => setTripType(value as any)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label htmlFor="one-way" className="cursor-pointer font-normal">
                One Way
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip" className="cursor-pointer font-normal">
                Round Trip
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multi-city" id="multi-city" />
              <Label htmlFor="multi-city" className="cursor-pointer font-normal">
                Multi City
              </Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CitySelector
              label="From"
              value={fromCity}
              onChange={setFromCity}
              placeholder="Select departure city"
            />

            <CitySelector
              label="To"
              value={toCity}
              onChange={setToCity}
              placeholder="Select destination"
            />

            <DateSelector
              label="Depart"
              sublabel="Saturday"
              value={departDate}
              onChange={setDepartDate}
            />

            {tripType === 'round-trip' && (
              <DateSelector
                label="Return"
                sublabel="Weekday"
                value={returnDate}
                onChange={setReturnDate}
                minDate={departDate}
              />
            )}
          </div>

          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleSearch}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8"
            >
              <Plane className="w-5 h-5 mr-2" />
              Show Flights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
