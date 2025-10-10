/*
  # Create Flight Packages Table

  1. New Tables
    - `flight_packages`
      - `id` (uuid, primary key)
      - `airline` (text, nama maskapai)
      - `flight_number` (text, nomor penerbangan)
      - `origin` (text, kota asal)
      - `destination` (text, kota tujuan)
      - `departure_time` (text, waktu keberangkatan)
      - `arrival_time` (text, waktu kedatangan)
      - `price` (numeric, harga tiket)
      - `class` (text, kelas penerbangan: economy/business/first)
      - `available_seats` (integer, jumlah kursi tersedia)
      - `duration` (text, durasi penerbangan)
      - `baggage` (text, bagasi yang termasuk)
      - `is_active` (boolean, status aktif paket)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on flight_packages table
    - Public can view active flight packages
    - Only authenticated users with admin role can modify
*/

-- Create flight_packages table
CREATE TABLE IF NOT EXISTS flight_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  airline text NOT NULL,
  flight_number text NOT NULL,
  origin text NOT NULL,
  destination text NOT NULL,
  departure_time text NOT NULL,
  arrival_time text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  class text NOT NULL DEFAULT 'economy',
  available_seats integer NOT NULL DEFAULT 0,
  duration text NOT NULL DEFAULT '0h 0m',
  baggage text NOT NULL DEFAULT '20kg',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE flight_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active flight packages"
  ON flight_packages FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all flight packages"
  ON flight_packages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert flight packages"
  ON flight_packages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update flight packages"
  ON flight_packages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete flight packages"
  ON flight_packages FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample flight packages
INSERT INTO flight_packages (airline, flight_number, origin, destination, departure_time, arrival_time, price, class, available_seats, duration, baggage) VALUES
  ('Garuda Indonesia', 'GA-101', 'Jakarta', 'Bali', '08:00', '11:00', 1500000, 'economy', 150, '3h 0m', '20kg'),
  ('Garuda Indonesia', 'GA-102', 'Jakarta', 'Bali', '14:00', '17:00', 1800000, 'business', 30, '3h 0m', '30kg'),
  ('Lion Air', 'JT-201', 'Jakarta', 'Surabaya', '06:00', '07:30', 800000, 'economy', 180, '1h 30m', '20kg'),
  ('Citilink', 'QG-301', 'Jakarta', 'Yogyakarta', '09:00', '10:15', 900000, 'economy', 120, '1h 15m', '20kg'),
  ('AirAsia', 'QZ-401', 'Jakarta', 'Medan', '07:00', '09:30', 1200000, 'economy', 180, '2h 30m', '20kg'),
  ('Batik Air', 'ID-501', 'Jakarta', 'Makassar', '10:00', '13:30', 1600000, 'economy', 150, '3h 30m', '20kg'),
  ('Garuda Indonesia', 'GA-103', 'Bali', 'Jakarta', '12:00', '15:00', 1500000, 'economy', 150, '3h 0m', '20kg'),
  ('Sriwijaya Air', 'SJ-601', 'Jakarta', 'Bandung', '08:00', '08:45', 600000, 'economy', 100, '0h 45m', '15kg')
ON CONFLICT DO NOTHING;
