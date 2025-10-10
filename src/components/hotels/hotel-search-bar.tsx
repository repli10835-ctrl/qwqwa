"use client";

import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HotelSearchBar() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Destination */}
        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-medium text-foreground">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter city or hotel name"
              className="pl-10"
              defaultValue="Los Angeles, USA"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-10"
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-10"
            />
          </div>
        </div>

        {/* Guests & Rooms */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Guests & Rooms</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="2 Guests, 1 Room"
              className="pl-10"
              defaultValue="2 Guests, 1 Room"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-5">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            Search Hotels
          </Button>
        </div>
      </div>
    </div>
  );
}