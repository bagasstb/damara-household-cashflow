-- =============================================
-- Ihya Assistance Table — DDL Migration
-- =============================================

CREATE TABLE IF NOT EXISTS ihya_assistances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast date-based queries
CREATE INDEX IF NOT EXISTS idx_ihya_assistances_date ON ihya_assistances(date DESC);

-- RLS Policies
ALTER TABLE ihya_assistances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for ihya_assistances" ON ihya_assistances
  FOR ALL USING (true) WITH CHECK (true);
