"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FlightSearchForm = () => {
  const t = useTranslations('search');
  return (
    <div className="relative left-1/2 top-full w-[90%] -translate-x-1/2 -translate-y-[20%] rounded-lg bg-white px-3 py-4 shadow-lg sm:px-8 md:rounded-2xl lg:-translate-y-[25%] xl:-translate-y-[30%]">
      <Tabs defaultValue="flights" className="w-full">
        <TabsList className="h-auto items-center justify-start gap-1 rounded-md bg-transparent p-0 text-muted-foreground">
          <TabsTrigger
            value="flights"
            className="h-14 w-full gap-[6px] rounded-lg border px-4 font-bold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm sm:h-16 sm:w-auto"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/svgs/airplane-filled.df1ad365-1.svg?"
              alt="airplane_icon"
              width={24}
              height={24}
            />
            <span>{t('searchFlights')}</span>
          </TabsTrigger>
          <TabsTrigger
            value="stays"
            className="h-14 w-full gap-[6px] rounded-lg border px-4 font-bold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm sm:h-16 sm:w-auto"
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/svgs/bed-filled.7c894be5-2.svg?"
              alt="bed_icon"
              width={24}
              height={24}
            />
            <span>Stays</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flights" className="mt-2">
          <form>
            <div className="my-5 grid grid-cols-4 gap-4 xl:grid-cols-5">
              <div className="col-span-full mb-2 ml-2 flex flex-col gap-2">
                <span className="font-bold">Trip Type</span>
                <RadioGroup defaultValue="one_way" className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one_way" id="one_way" />
                    <Label htmlFor="one_way" className="font-medium">One Way</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="round_trip" id="round_trip" disabled />
                    <Label htmlFor="round_trip" className="cursor-not-allowed font-medium text-muted-foreground">Round Trip</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multi_city" id="multi_city" disabled />
                    <Label htmlFor="multi_city" className="cursor-not-allowed font-medium text-muted-foreground">Multi City</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="relative col-span-full flex h-auto flex-col gap-2 rounded-lg border-2 border-primary md:flex-row lg:col-span-2">
                <span className="absolute -top-[10px] left-[10px] z-10 inline-block rounded-md bg-white px-1 text-sm font-medium leading-none">
                  {t('from')} <span className="text-red-600">*</span> - {t('to')} <span className="text-red-600">*</span>
                </span>
                <div className="h-auto min-h-[100px] max-w-full grow cursor-pointer rounded-none border-0 p-4 max-md:mx-1 max-md:border-b-2 md:my-1 md:w-1/2 md:border-r-2">
                  <div className="text-2xl font-bold">City</div>
                  <div className="text-sm">Airport name</div>
                </div>
                <button
                  type="button"
                  aria-label="swap airport names"
                  className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary p-2 transition-all hover:border-2 hover:border-primary hover:bg-primary/90"
                >
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/svgs/swap.35b713ff-3.svg?"
                    alt="swap icon"
                    width={18}
                    height={22}
                    className="min-h-[16px] min-w-[16px] max-md:rotate-90"
                  />
                </button>
                <div className="h-auto min-h-[100px] max-w-full grow cursor-pointer rounded-none border-0 p-4 max-md:mx-1 max-md:border-t-2 md:my-1 md:w-1/2 md:border-l-2">
                  <div className="text-2xl font-bold">City</div>
                  <div className="text-sm">Airport name</div>
                </div>
              </div>

              <div className="relative col-span-full flex h-auto flex-col gap-2 rounded-lg border-2 border-primary md:flex-row lg:col-span-2">
                <span className="absolute -top-[10px] left-[10px] z-10 inline-block rounded-md bg-white px-1 text-sm font-medium leading-none">
                  {t('departure')} <span className="text-red-600">*</span> - {t('return')}
                </span>
                <div className="h-auto min-h-[100px] max-w-full grow cursor-pointer rounded-none border-0 p-4 max-md:mx-1 max-md:border-b-2 md:my-1 md:w-1/2 md:border-r-2">
                  <div className="text-xl font-bold">DD MMM YY</div>
                  <div className="text-md font-medium">Weekday</div>
                </div>
                <div className="h-auto min-h-[100px] max-w-full grow cursor-pointer rounded-none border-0 p-4 max-md:mx-1 max-md:border-t-2 md:my-1 md:w-1/2 md:border-l-2">
                  <div className="text-xl font-bold">DD MMM YY</div>
                  <div className="text-md font-medium">Weekday</div>
                </div>
              </div>

              <div className="relative col-span-4 flex h-auto items-center gap-1 rounded-lg border-2 border-primary xl:col-span-1">
                <span className="absolute -top-[10px] left-[10px] z-10 inline-block rounded-md bg-white px-1 text-sm font-medium leading-none">
                  {t('travelers')} <span className="text-red-600">*</span> - {t('class')} <span className="text-red-600">*</span>
                </span>
                <div className="min-h-[100px] w-full cursor-pointer justify-start rounded-lg p-4">
                  <div className="text-xl font-bold">1 {t('traveler')}</div>
                  <div className="text-md font-medium">{t('economy')}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-6">
              <Button className="h-[48px] w-[150px] gap-1 rounded-sm bg-primary px-[16px] py-[8px] text-primary-foreground hover:bg-[#9BE0C8] active:bg-[#82CBB2]">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/7365a454-8401-4e16-a806-259d074b2966-golob-travel-agency-vercel-app/assets/svgs/paper-plane-filled-4.svg?"
                  alt="paper_plane_icon"
                  width={24}
                  height={24}
                />
                <span>{t('searchFlights')}</span>
              </Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="stays" className="mt-2" />
      </Tabs>
    </div>
  );
};

export default FlightSearchForm;