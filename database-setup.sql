-- Personal Coach App Database Setup
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journal entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  mood TEXT CHECK (mood IN ('happy', 'calm', 'sad', 'frustrated', 'angry', 'anxious', 'thoughtful', 'tired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relationships table
CREATE TABLE IF NOT EXISTS public.relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('family', 'friend', 'colleague', 'romantic', 'other')),
  status TEXT CHECK (status IN ('good', 'strained', 'broken', 'healing')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health metrics table
CREATE TABLE IF NOT EXISTS public.health_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  sleep_hours DECIMAL(3,1),
  exercise_minutes INTEGER,
  water_glasses INTEGER,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Life compass table
CREATE TABLE IF NOT EXISTS public.life_compass (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('health', 'relationships', 'career', 'spirituality', 'finances', 'personal_growth')),
  goal TEXT NOT NULL,
  current_status TEXT,
  target_date DATE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON public.journal_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_relationships_user_id ON public.relationships(user_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_user_id ON public.health_metrics(user_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_date ON public.health_metrics(date DESC);
CREATE INDEX IF NOT EXISTS idx_life_compass_user_id ON public.life_compass(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.life_compass ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Journal entries policies
CREATE POLICY "Users can view own journal entries" ON public.journal_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries" ON public.journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries" ON public.journal_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries" ON public.journal_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Relationships policies
CREATE POLICY "Users can view own relationships" ON public.relationships
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own relationships" ON public.relationships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own relationships" ON public.relationships
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own relationships" ON public.relationships
  FOR DELETE USING (auth.uid() = user_id);

-- Health metrics policies
CREATE POLICY "Users can view own health metrics" ON public.health_metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health metrics" ON public.health_metrics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health metrics" ON public.health_metrics
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own health metrics" ON public.health_metrics
  FOR DELETE USING (auth.uid() = user_id);

-- Life compass policies
CREATE POLICY "Users can view own life compass" ON public.life_compass
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own life compass" ON public.life_compass
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own life compass" ON public.life_compass
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own life compass" ON public.life_compass
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at
  BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_relationships_updated_at
  BEFORE UPDATE ON public.relationships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_life_compass_updated_at
  BEFORE UPDATE ON public.life_compass
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column(); 