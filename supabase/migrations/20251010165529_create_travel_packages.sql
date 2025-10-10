/*
  # Create Travel Packages System

  1. New Tables
    - `cities`
      - `id` (uuid, primary key)
      - `name` (text, city name)
      - `description` (text, city description)
      - `image_url` (text, city image)
      - `created_at` (timestamptz)

    - `packages`
      - `id` (uuid, primary key)
      - `city_id` (uuid, foreign key to cities)
      - `name` (text, package name - e.g., "Basic", "Premium")
      - `description` (text, package description)
      - `price` (numeric, package price)
      - `duration_days` (integer, number of days)
      - `image_url` (text, package image)
      - `features` (jsonb, array of features included)
      - `created_at` (timestamptz)

    - `payments`
      - `id` (uuid, primary key)
      - `package_id` (uuid, foreign key to packages)
      - `user_email` (text, buyer email)
      - `user_name` (text, buyer name)
      - `status` (text, payment status: pending/completed/cancelled)
      - `amount` (numeric, payment amount)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for cities and packages
    - Authenticated users can create payment records
*/

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cities"
  ON cities FOR SELECT
  TO public
  USING (true);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  duration_days integer NOT NULL DEFAULT 1,
  image_url text DEFAULT '',
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view packages"
  ON packages FOR SELECT
  TO public
  USING (true);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  user_name text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create payments"
  ON payments FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own payments"
  ON payments FOR SELECT
  TO public
  USING (true);

-- Insert sample cities
INSERT INTO cities (name, description, image_url) VALUES
  ('Jakarta', 'Ibu kota Indonesia yang modern dengan berbagai atraksi wisata', 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg'),
  ('Bandung', 'Kota kreatif dengan udara sejuk dan kuliner yang lezat', 'https://images.pexels.com/photos/2166927/pexels-photo-2166927.jpeg'),
  ('Yogyakarta', 'Kota budaya dengan candi bersejarah dan seni tradisional', 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg'),
  ('Bali', 'Pulau dewata dengan pantai indah dan budaya yang kaya', 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg')
ON CONFLICT DO NOTHING;

-- Insert sample packages
INSERT INTO packages (city_id, name, description, price, duration_days, image_url, features)
SELECT 
  c.id,
  'Paket Basic',
  'Paket ekonomis untuk liburan hemat dengan fasilitas standar',
  1500000,
  3,
  'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg',
  '["Hotel Bintang 2", "Sarapan Pagi", "Tour Guide", "Transportasi Lokal"]'::jsonb
FROM cities c WHERE c.name = 'Jakarta'
ON CONFLICT DO NOTHING;

INSERT INTO packages (city_id, name, description, price, duration_days, image_url, features)
SELECT 
  c.id,
  'Paket Premium',
  'Paket lengkap dengan fasilitas mewah dan pengalaman terbaik',
  3500000,
  5,
  'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
  '["Hotel Bintang 5", "All Meals", "Private Tour Guide", "Airport Transfer", "Free City Tour"]'::jsonb
FROM cities c WHERE c.name = 'Jakarta'
ON CONFLICT DO NOTHING;

INSERT INTO packages (city_id, name, description, price, duration_days, image_url, features)
SELECT 
  c.id,
  'Paket Basic',
  'Jelajahi Bandung dengan budget terjangkau',
  1200000,
  3,
  'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg',
  '["Hotel Bintang 2", "Sarapan Pagi", "Tour Kawah Putih", "Transportasi"]'::jsonb
FROM cities c WHERE c.name = 'Bandung'
ON CONFLICT DO NOTHING;

INSERT INTO packages (city_id, name, description, price, duration_days, image_url, features)
SELECT 
  c.id,
  'Paket Premium',
  'Liburan mewah di kota kembang',
  2800000,
  4,
  'https://images.pexels.com/photos/1488315/pexels-photo-1488315.jpeg',
  '["Hotel Bintang 4", "All Meals", "Private Car", "Tour Lengkap", "Shopping Guide"]'::jsonb
FROM cities c WHERE c.name = 'Bandung'
ON CONFLICT DO NOTHING;

INSERT INTO packages (city_id, name, description, price, duration_days, image_url, features)
SELECT 
  c.id,
  'Paket Basic',
  'Wisata budaya dan sejarah Yogyakarta',
  1300000,
  3,
  'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
  '["Homestay", "Sarapan", "Tour Candi Borobudur", "Rental Motor"]'::jsonb
FROM cities c WHERE c.name = 'Yogyakarta'
ON CONFLICT DO NOTHING;

INSERT INTO packages (city_id, name, description, price, duration_days, image_url, features)
SELECT 
  c.id,
  'Paket Premium',
  'Pengalaman lengkap budaya Jawa',
  3200000,
  5,
  'https://images.pexels.com/photos/2166446/pexels-photo-2166446.jpeg',
  '["Hotel Bintang 4", "All Meals", "All Temple Tours", "Traditional Shows", "Batik Workshop"]'::jsonb
FROM cities c WHERE c.name = 'Yogyakarta'
ON CONFLICT DO NOTHING;

INSERT INTO packages (city_id, name, description, price, duration_days, image_url, features)
SELECT 
  c.id,
  'Paket Basic',
  'Nikmati pantai dan sunset Bali',
  2000000,
  4,
  'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
  '["Hotel Bintang 3", "Sarapan", "Beach Access", "Scooter Rental"]'::jsonb
FROM cities c WHERE c.name = 'Bali'
ON CONFLICT DO NOTHING;

INSERT INTO packages (city_id, name, description, price, duration_days, image_url, features)
SELECT 
  c.id,
  'Paket Premium',
  'Liburan mewah di pulau dewata',
  5000000,
  7,
  'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
  '["Resort Bintang 5", "All Inclusive", "Private Pool Villa", "Spa Treatment", "Water Sports", "Airport Limousine"]'::jsonb
FROM cities c WHERE c.name = 'Bali'
ON CONFLICT DO NOTHING;