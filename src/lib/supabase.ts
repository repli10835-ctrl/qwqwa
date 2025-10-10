import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface City {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
}

export interface Package {
  id: string;
  city_id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  image_url: string;
  features: string[];
  created_at: string;
  cities?: City;
}

export interface Payment {
  id: string;
  package_id: string;
  user_email: string;
  user_name: string;
  status: string;
  amount: number;
  created_at: string;
}
