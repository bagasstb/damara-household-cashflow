-- =============================================
-- Reminders Table — DDL Migration
-- =============================================

CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  due_date TIMESTAMPTZ NOT NULL,
  is_paid BOOLEAN DEFAULT false,
  category TEXT NOT NULL DEFAULT 'lainnya',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast due_date queries
CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON reminders(due_date ASC);
CREATE INDEX IF NOT EXISTS idx_reminders_is_paid ON reminders(is_paid);

-- RLS Policies
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for reminders" ON reminders
  FOR ALL USING (true) WITH CHECK (true);
