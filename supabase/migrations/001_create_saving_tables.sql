-- =============================================
-- Saving Scheme Tables — DDL Migration
-- =============================================

-- 1. saving_goals: defines each saving goal per year
CREATE TABLE IF NOT EXISTS saving_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  name TEXT NOT NULL,
  instrument TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'piggy-bank',
  parent_goal_id UUID REFERENCES saving_goals(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Unique constraint: one goal name per instrument per year
ALTER TABLE saving_goals ADD CONSTRAINT saving_goals_year_name_instrument_unique 
  UNIQUE (year, name, instrument);

-- 2. saving_entries: monthly balance snapshots
CREATE TABLE IF NOT EXISTS saving_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES saving_goals(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  amount NUMERIC NOT NULL DEFAULT 0,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- One entry per goal per month
ALTER TABLE saving_entries ADD CONSTRAINT saving_entries_goal_month_unique 
  UNIQUE (goal_id, year, month);

-- Index for fast year-based queries
CREATE INDEX IF NOT EXISTS idx_saving_goals_year ON saving_goals(year);
CREATE INDEX IF NOT EXISTS idx_saving_entries_year ON saving_entries(year);
CREATE INDEX IF NOT EXISTS idx_saving_entries_goal_id ON saving_entries(goal_id);

-- 3. RLS Policies
ALTER TABLE saving_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE saving_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for saving_goals" ON saving_goals
  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for saving_entries" ON saving_entries
  FOR ALL USING (true) WITH CHECK (true);
