'use client';

export default function FlightHero() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Airplane at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-20 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Make your travel wishlist, we'll do the rest
          </h1>
          <p className="text-xl text-white/90">
            Special offers to suit your plan
          </p>
        </div>
      </div>
    </div>
  );
}
