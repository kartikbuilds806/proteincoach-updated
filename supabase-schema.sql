-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  age integer,
  height_cm numeric,
  weight_kg numeric,
  target_weight_kg numeric,
  goal text,
  budget text,
  routine text,
  protein_preference text,
  daily_protein_goal integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for profiles
alter table profiles enable row level security;

-- Create policies for profiles
create policy "Users can view their own profile." on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Protein logs table
create table protein_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  food_name text,
  protein_g integer not null,
  calories integer,
  quantity_g integer,
  meal_type text,
  logged_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for protein_logs
alter table protein_logs enable row level security;

create policy "Users can view their own logs." on protein_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert their own logs." on protein_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own logs." on protein_logs
  for delete using (auth.uid() = user_id);
