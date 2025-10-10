"use client";

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, Users, BadgePercent, BarChart3 as TrendingUp, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const stats = [
  {
    icon: Star,
    value: "5.0",
    label: "Average Rating",
    bgColor: "bg-chart-1/20",
  },
  {
    icon: Users,
    value: "1+",
    label: "Satisfied Customers",
    bgColor: "bg-primary/20",
  },
  {
    icon: BadgePercent,
    value: "100%",
    label: "Satisfaction Rate",
    bgColor: "bg-chart-2/40",
  },
  {
    icon: TrendingUp,
    value: "1+",
    label: "5-Star Reviews",
    bgColor: "bg-chart-3/40",
  },
];

const reviews = [
  {
    name: "Mojahid",
    title: "Verified Customer",
    rating: 5.0,
    text: "Using this travel agency’s website has been a seamless experience. The platform is user-friendly and professional, making it easy to search and book flights and hotels. Customer support is responsive and helpful, pricing is fair and transparent with no hidden fees, and bookings are accurate and reliable. Communication via emails and notifications is clear and timely. Overall, it provides a trustworthy, smooth, and stress-free travel booking experience.",
  },
  {
    name: "Jane Doe",
    title: "Verified Customer",
    rating: 4.9,
    text: "An absolutely fantastic service. The website is incredibly intuitive, and I found some of the best travel deals I've ever seen. The entire process, from searching for destinations to final booking, was smooth and hassle-free. The customer support team was also very quick to respond to my queries. I'll definitely be using this agency for all my future travels.",
  }
];

const StatCard = React.memo(({ icon: Icon, value, label, bgColor }) => (
  <div className={`p-4 rounded-xl border border-gray-200 flex flex-col items-center justify-center gap-2 text-center shadow-sm ${bgColor}`}>
    <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
    <p className="text-3xl font-bold text-dark-charcoal">{value}</p>
    <p className="text-sm text-medium-gray">{label}</p>
  </div>
));
StatCard.displayName = 'StatCard';

const ReviewText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortText = text.length > 250 ? text.substring(0, 250) + "..." : text;

  return (
    <p className="mt-5 text-justify text-base text-medium-gray">
      {isExpanded ? text : shortText}
      {text.length > 250 && (
         <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-1 font-semibold text-primary underline underline-offset-4"
        >
            {isExpanded ? 'View less' : 'View more'}
        </button>
      )}
    </p>
  );
};

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mx-auto mt-8 max-w-4xl">
        <button
          className="embla__prev absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary p-3 text-white shadow-lg transition-opacity hover:opacity-80 disabled:opacity-30 sm:-left-6 md:-left-10 lg:-left-16"
          onClick={scrollPrev}
          aria-label="Previous review"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {reviews.map((review, index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={index}>
              <div className="mx-auto w-full rounded-2xl border bg-white p-6 shadow-xl sm:w-11/12 md:w-10/12 lg:w-[70%]">
                <Quote className="h-8 w-10 text-primary opacity-30" fill="currentColor" />
                <ReviewText text={review.text} />
                <div className="mt-5 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-star-rating text-star-rating" />
                  ))}
                  <span className="ml-2 font-semibold text-dark-charcoal text-base">({review.rating.toFixed(1)})</span>
                </div>
                <div className="mt-5 flex items-center gap-4">
                  <div className="h-14 w-14 flex-shrink-0 rounded-full bg-dark-charcoal" />
                  <div>
                    <p className="text-lg font-bold text-dark-charcoal">{review.name}</p>
                    <p className="text-sm text-medium-gray">{review.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        <button
          className="embla__next absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary p-3 text-white shadow-lg transition-opacity hover:opacity-80 disabled:opacity-30 sm:-right-6 md:-right-10 lg:-right-16"
          onClick={scrollNext}
          aria-label="Next review"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
    </div>
  );
};


export default function CustomerReviewsCarousel() {
  return (
    <section className="mx-auto">
      <div className="mx-auto mb-5 text-center md:mb-10 md:max-w-2xl">
        <h2 className="mb-2 text-3xl font-semibold text-dark-charcoal md:mb-4 md:text-4xl">
          Customer Reviews
        </h2>
        <p className="text-medium-gray">
          Discover what our valued customers say about their Golobe experience
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="my-10 flex items-center justify-between border-b">
        <button className="relative border-b-2 border-primary py-2 px-1 font-semibold text-dark-charcoal">
          Customer Reviews
        </button>
        <p className="text-sm text-medium-gray">
          Showing {reviews.length} verified customer reviews
        </p>
      </div>

      <EmblaCarousel />
    </section>
  );
}