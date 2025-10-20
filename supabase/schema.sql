-- PetMatch AI Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  country TEXT,
  locale TEXT DEFAULT 'es-MX',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pets table
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT,
  age INTEGER,
  weight DECIMAL(10,2),
  gender TEXT,
  photo_url TEXT,
  medical_conditions TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Love Stories table
CREATE TABLE IF NOT EXISTS love_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT FALSE,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Providers table
CREATE TABLE IF NOT EXISTS service_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  business_name TEXT NOT NULL,
  description TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  address TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  price_range TEXT,
  photos TEXT[] DEFAULT '{}',
  availability JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GeoAds table
CREATE TABLE IF NOT EXISTS geo_ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name TEXT NOT NULL,
  country TEXT NOT NULL,
  ad_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Airline Policies table
CREATE TABLE IF NOT EXISTS airline_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  airline_code TEXT NOT NULL,
  airline_name TEXT NOT NULL,
  country TEXT NOT NULL,
  cabin_allowed BOOLEAN DEFAULT FALSE,
  cargo_allowed BOOLEAN DEFAULT FALSE,
  max_weight_cabin DECIMAL(10,2),
  max_weight_cargo DECIMAL(10,2),
  carrier_dimensions TEXT,
  fees JSONB DEFAULT '{}',
  restrictions TEXT[] DEFAULT '{}',
  documentation_required TEXT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  species TEXT NOT NULL,
  ingredients JSONB NOT NULL,
  instructions TEXT[] NOT NULL,
  nutrition_info JSONB NOT NULL,
  allergens TEXT[] DEFAULT '{}',
  difficulty TEXT NOT NULL,
  prep_time INTEGER NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Microinfluencers table
CREATE TABLE IF NOT EXISTS microinfluencers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  instagram_handle TEXT NOT NULL,
  followers_count INTEGER NOT NULL,
  engagement_rate DECIMAL(5,2) NOT NULL,
  niche TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT FALSE,
  commission_rate DECIMAL(5,2) DEFAULT 20.0,
  total_earnings DECIMAL(10,2) DEFAULT 0.0,
  referral_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Smart Collars table
CREATE TABLE IF NOT EXISTS smart_collars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  device_id TEXT UNIQUE NOT NULL,
  battery_level INTEGER DEFAULT 100,
  last_location JSONB,
  activity_data JSONB DEFAULT '{}',
  health_metrics JSONB DEFAULT '{}',
  subscription_tier TEXT NOT NULL,
  subscription_expires TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor TEXT NOT NULL,
  duration_hours INTEGER NOT NULL,
  level TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL,
  language TEXT NOT NULL,
  topics TEXT[] DEFAULT '{}',
  certificate BOOLEAN DEFAULT FALSE,
  enrolled_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  photos TEXT[] DEFAULT '{}',
  verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'pending',
  total_price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  stripe_payment_id TEXT UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  plan_type TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Forum Comments table
CREATE TABLE IF NOT EXISTS forum_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ESG Metrics table
CREATE TABLE IF NOT EXISTS esg_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  carbon_footprint DECIMAL(10,2) DEFAULT 0.0,
  trees_planted INTEGER DEFAULT 0,
  donations_made DECIMAL(10,2) DEFAULT 0.0,
  recycling_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adoption Tracking table
CREATE TABLE IF NOT EXISTS adoption_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  adoption_date DATE NOT NULL,
  day_count INTEGER DEFAULT 0,
  milestones JSONB DEFAULT '{}',
  nft_minted BOOLEAN DEFAULT FALSE,
  nft_token_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webinars table
CREATE TABLE IF NOT EXISTS webinars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor TEXT NOT NULL,
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  meeting_link TEXT,
  recording_url TEXT,
  language TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webinar Registrations table
CREATE TABLE IF NOT EXISTS webinar_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  webinar_id UUID REFERENCES webinars(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  attended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(webinar_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_pets_user_id ON pets(user_id);
CREATE INDEX idx_love_stories_verified ON love_stories(verified);
CREATE INDEX idx_service_providers_city ON service_providers(city, service_type);
CREATE INDEX idx_service_providers_verified ON service_providers(verified);
CREATE INDEX idx_geo_ads_country ON geo_ads(country, active);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX idx_reviews_provider_id ON reviews(provider_id);
CREATE INDEX idx_forum_posts_category ON forum_posts(category);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE love_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies (examples - adjust based on your needs)
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own pets" ON pets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pets" ON pets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view verified love stories" ON love_stories
  FOR SELECT USING (verified = true);

CREATE POLICY "Users can insert their own love stories" ON love_stories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view verified service providers" ON service_providers
  FOR SELECT USING (verified = true);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_love_stories_updated_at BEFORE UPDATE ON love_stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_providers_updated_at BEFORE UPDATE ON service_providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO geo_ads (brand_name, country, ad_type, title, description, image_url, link_url, start_date, end_date)
VALUES 
  ('Purina México', 'MX', 'banner', 'Nutrición Premium para tu Mascota', 'Envío gratis en pedidos mayores a $500 MXN', 'https://example.com/purina.jpg', 'https://www.purina.com.mx', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days'),
  ('Royal Canin España', 'ES', 'banner', 'Alimentación Científica', 'Descubre la nutrición perfecta para tu mascota', 'https://example.com/royal.jpg', 'https://www.royalcanin.com/es', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days');

-- Insert sample airline policies
INSERT INTO airline_policies (airline_code, airline_name, country, cabin_allowed, cargo_allowed, max_weight_cabin, max_weight_cargo, fees)
VALUES 
  ('AM', 'Aeroméxico', 'MX', true, true, 10.0, 45.0, '{"cabin": 1500, "cargo": 3000, "currency": "MXN"}'::jsonb),
  ('AA', 'American Airlines', 'US', true, true, 9.0, 45.0, '{"cabin": 125, "cargo": 200, "currency": "USD"}'::jsonb),
  ('IB', 'Iberia', 'ES', true, true, 8.0, 45.0, '{"cabin": 50, "cargo": 150, "currency": "EUR"}'::jsonb);

-- Insert sample recipes
INSERT INTO recipes (title, description, species, ingredients, instructions, nutrition_info, difficulty, prep_time)
VALUES 
  ('Pollo y Arroz Saludable', 'Receta balanceada para perros adultos', 'perro', 
   '{"pollo": "500g", "arroz": "200g", "zanahoria": "100g", "aceite_oliva": "1 cucharada"}'::jsonb,
   ARRAY['Cocinar el pollo sin sal', 'Hervir el arroz', 'Picar las zanahorias', 'Mezclar todo con aceite de oliva'],
   '{"calorias": 350, "proteinas": 25, "grasas": 10, "carbohidratos": 40}'::jsonb,
   'fácil', 30);

COMMENT ON TABLE profiles IS 'User profiles with locale and country information';
COMMENT ON TABLE pets IS 'Pet profiles linked to users';
COMMENT ON TABLE love_stories IS 'User-submitted adoption stories with verification';
COMMENT ON TABLE service_providers IS 'Verified pet service professionals directory';
COMMENT ON TABLE geo_ads IS 'Country-specific advertising campaigns';
COMMENT ON TABLE airline_policies IS 'Pet travel policies by airline';
COMMENT ON TABLE recipes IS 'Pet nutrition recipes and meal plans';
COMMENT ON TABLE microinfluencers IS 'Influencer program participants';
COMMENT ON TABLE smart_collars IS 'IoT device tracking and subscriptions';
COMMENT ON TABLE courses IS 'Educational courses and certifications';
