"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Star } from "lucide-react";

export default function HotelFilters() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Filters</h3>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Price per Night</h4>
        <Slider
          defaultValue={[0, 500]}
          max={500}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>$0</span>
          <span>$500+</span>
        </div>
      </div>

      {/* Star Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Star Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center space-x-2">
              <Checkbox id={`${stars}-star`} />
              <Label htmlFor={`${stars}-star`} className="text-sm cursor-pointer flex items-center">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-star-rating text-star-rating" />
                ))}
                <span className="ml-2">& Up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Type */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Hotel Type</h4>
        <div className="space-y-2">
          {[
            "Resort",
            "Boutique",
            "Budget",
            "Luxury",
            "Business",
          ].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <Label htmlFor={type} className="text-sm cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Amenities</h4>
        <div className="space-y-2">
          {[
            "Free WiFi",
            "Swimming Pool",
            "Parking",
            "Restaurant",
            "Gym",
            "Spa",
            "Pet Friendly",
          ].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox id={amenity} />
              <Label htmlFor={amenity} className="text-sm cursor-pointer">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}