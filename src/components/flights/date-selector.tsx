'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

interface DateSelectorProps {
  label: string;
  sublabel?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  minDate?: Date;
}

export default function DateSelector({
  label,
  sublabel,
  value,
  onChange,
  minDate,
}: DateSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal h-auto py-3 px-4"
          >
            <div className="flex items-center gap-2 w-full">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col items-start">
                {value ? (
                  <>
                    <span className="font-bold text-lg">
                      {format(value, 'dd MMM yy')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(value, 'EEEE')}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-muted-foreground font-bold">DD MMM YY</span>
                    {sublabel && (
                      <span className="text-xs text-muted-foreground">{sublabel}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            disabled={(date) => {
              if (minDate) {
                return date < minDate;
              }
              return date < new Date(new Date().setHours(0, 0, 0, 0));
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
