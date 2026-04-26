-- =============================================
-- Seed Saving Data — 2024, 2025, 2026
-- =============================================

-- Helper function to parse Rp values
-- We'll insert raw numeric values directly

-- ========== 2024 GOALS ==========
INSERT INTO saving_goals (year, name, instrument, icon, sort_order) VALUES
(2024, 'Dapur Damara', 'Bibit', 'Sprout', 1),
(2024, 'Pregnancy & Children', 'Bibit', 'Sprout', 2),
(2024, 'Kanopi', 'Crypto/Saham Bagas', 'TrendingUp', 3),
(2024, 'Annual Saving / Gift (Family)', 'Flexi Saver 1', 'Wallet', 4),
(2024, 'Urgent Cost 1', 'Bank Mandiri', 'Landmark', 5),
(2024, 'Urgent Cost 2', 'Jenius X-Card', 'CreditCard', 6),
(2024, 'Uang Dingin', 'Crypto Dean', 'Bitcoin', 7),
(2024, 'Tabungan Bersama', 'Emas Dean', 'Gem', 8),
(2024, 'Tabungan Ihya', 'Emas Bagas', 'Gem', 9),
(2024, 'Household Maintenance', 'Flexi Saver 2', 'WalletCards', 10);

-- ========== 2024 ENTRIES ==========
-- Dapur Damara 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 1, 982137 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 2, 2511185 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 3, 4020268 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 4, 7049197 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 5, 7064917 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 6, 8871777 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 7, 10503342 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 8, 10437452 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 11598585 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 14653275 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 16265155 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 12, 17798540 FROM saving_goals WHERE year=2024 AND name='Dapur Damara';

-- Pregnancy & Children 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 1, 982137 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 2, 2517463 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 3, 4024342 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 4, 7055929 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 5, 7052604 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 6, 8842431 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 7, 10561032 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 8, 11580970 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 12290752 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 13762668 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 12, 14239082 FROM saving_goals WHERE year=2024 AND name='Pregnancy & Children';

-- Kanopi 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 1, 11000000 FROM saving_goals WHERE year=2024 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 2, 11700000 FROM saving_goals WHERE year=2024 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 3, 11700000 FROM saving_goals WHERE year=2024 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 4, 15900000 FROM saving_goals WHERE year=2024 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 5, 15900000 FROM saving_goals WHERE year=2024 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 6, 21000000 FROM saving_goals WHERE year=2024 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 16892251 FROM saving_goals WHERE year=2024 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 2000000 FROM saving_goals WHERE year=2024 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 26549446 FROM saving_goals WHERE year=2024 AND name='Kanopi';

-- Annual Saving / Gift (Family) 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 1, 2405646 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 2, 2359919 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 3, 1814075 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 4, 2017441 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 5, 2020859 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 6, 805811 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 7, 1166070 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 8, 1586922 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 2324014 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 2364141 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 2622970 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 12, 1952748 FROM saving_goals WHERE year=2024 AND name='Annual Saving / Gift (Family)';

-- Urgent Cost 1 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 1, 1403654 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 2, 1209155 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 3, 1191185 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 4, 923769 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 5, 357769 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 6, 683270 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 7, 509883 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 8, 686171 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 271960 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 504580 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 250000 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 12, 182000 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 1';

-- Urgent Cost 2 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 1, 2750000 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 2, 2900000 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 3, 3050000 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 4, 1645100 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 5, 3490200 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 6, 3740200 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 7, 3293200 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 8, 3999933 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 4982722 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 5486531 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 4421231 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 12, 2922302 FROM saving_goals WHERE year=2024 AND name='Urgent Cost 2';

-- Uang Dingin 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 1, 4673789 FROM saving_goals WHERE year=2024 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 2, 4681674 FROM saving_goals WHERE year=2024 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 3, 3995829 FROM saving_goals WHERE year=2024 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 4, 4607514 FROM saving_goals WHERE year=2024 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 5, 4713039 FROM saving_goals WHERE year=2024 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 1760000 FROM saving_goals WHERE year=2024 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 2573041 FROM saving_goals WHERE year=2024 AND name='Uang Dingin';

-- Tabungan Bersama 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 1, 8155065 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 2, 8741599 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 3, 9807209 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 4, 13419060 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 5, 13239104 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 6, 13748710 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 7, 15024057 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 8, 16121494 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 18340331 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 19724710 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 492000 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 12, 14398726 FROM saving_goals WHERE year=2024 AND name='Tabungan Bersama';

-- Tabungan Ihya 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 8, 536269 FROM saving_goals WHERE year=2024 AND name='Tabungan Ihya';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 3260953 FROM saving_goals WHERE year=2024 AND name='Tabungan Ihya';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 3400000 FROM saving_goals WHERE year=2024 AND name='Tabungan Ihya';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 3923259 FROM saving_goals WHERE year=2024 AND name='Tabungan Ihya';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 12, 4482277 FROM saving_goals WHERE year=2024 AND name='Tabungan Ihya';

-- Household Maintenance 2024
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 8, 575000 FROM saving_goals WHERE year=2024 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 9, 1150823 FROM saving_goals WHERE year=2024 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 10, 10691 FROM saving_goals WHERE year=2024 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 11, 621241 FROM saving_goals WHERE year=2024 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2024, 12, 1299348 FROM saving_goals WHERE year=2024 AND name='Household Maintenance';
