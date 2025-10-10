"use client";

import { MapPin, Star, Wifi, Coffee, Waves, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const hotelResults = [
  {
    id: 1,
    name: "The Grand Plaza Hotel",
    location: "Downtown Los Angeles, CA",
    rating: 4.8,
    reviews: 328,
    stars: 5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-985638-pexels-photo-297983.jpeg",
    amenities: ["Free WiFi", "Pool", "Restaurant"],
    price: 189,
    type: "Luxury",
  },
  {
    id: 2,
    name: "Seaside Resort & Spa",
    location: "Santa Monica, CA",
    rating: 4.9,
    reviews: 512,
    stars: 5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-535755-pexels-photo-14024792.jpeg",
    amenities: ["Free WiFi", "Beach Access", "Spa"],
    price: 249,
    type: "Resort",
  },
  {
    id: 3,
    name: "Budget Inn Downtown",
    location: "Central LA, CA",
    rating: 4.2,
    reviews: 156,
    stars: 3,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-665191-pexels-photo-13312426.jpeg",
    amenities: ["Free WiFi", "Parking"],
    price: 79,
    type: "Budget",
  },
  {
    id: 4,
    name: "Boutique Garden Hotel",
    location: "West Hollywood, CA",
    rating: 4.7,
    reviews: 289,
    stars: 4,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/images/next-622162-pexels-photo-6243853.jpeg",
    amenities: ["Free WiFi", "Garden", "Breakfast"],
    price: 159,
    type: "Boutique",
  },
];

export default function HotelResults() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Available Hotels ({hotelResults.length})
        </h2>
        <select className="border border-border rounded-md px-4 py-2 text-sm">
          <option>Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating: High to Low</option>
        </select>
      </div>

      {hotelResults.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Hotel Image */}
            <div className="md:col-span-4 relative h-64 md:h-auto">
              <Image
                src={hotel.image}
                alt={hotel.name}
                fill
                className="object-cover"
              />
              <button className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-semibold">
                {hotel.type}
              </span>
            </div>

            {/* Hotel Details */}
            <div className="md:col-span-8 p-6">
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-star-rating text-star-rating"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md font-bold text-sm">
                      {hotel.rating}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({hotel.reviews} reviews)
                    </span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {hotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="flex items-center gap-1 text-sm text-muted-foreground"
                      >
                        {amenity === "Free WiFi" && <Wifi className="h-4 w-4" />}
                        {amenity === "Pool" && <Waves className="h-4 w-4" />}
                        {amenity === "Beach Access" && <Waves className="h-4 w-4" />}
                        {amenity === "Restaurant" && <Coffee className="h-4 w-4" />}
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-end justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Starting from
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      ${hotel.price}
                      <span className="text-base text-muted-foreground font-normal">
                        /night
                      </span>
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}