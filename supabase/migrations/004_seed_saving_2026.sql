-- ========== 2026 GOALS ==========
INSERT INTO saving_goals (year, name, instrument, icon, sort_order) VALUES
(2026, 'Dapur Damara', 'Bibit', 'Sprout', 1),
(2026, 'Pregnancy & Children', 'Bibit', 'Sprout', 2),
(2026, 'Kanopi', 'Crypto/Saham Bagas', 'TrendingUp', 3),
(2026, 'Annual Saving / Gift (Family)', 'Flexi Saver 1', 'Wallet', 4),
(2026, 'Urgent Cost 1', 'Bank Mandiri', 'Landmark', 5),
(2026, 'Urgent Cost 2', 'Jenius X-Card', 'CreditCard', 6);

-- Uang Dingin Bersama parent (USD)
INSERT INTO saving_goals (year, name, instrument, icon, sort_order) VALUES
(2026, 'Uang Dingin Bersama', 'Valas (100 USD)', 'DollarSign', 7);

-- Sub-instruments for Uang Dingin Bersama
INSERT INTO saving_goals (year, name, instrument, icon, parent_goal_id, sort_order)
SELECT 2026, 'Uang Dingin Bersama', 'Valas (74 SGD)', 'Banknote', id, 8
FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';

INSERT INTO saving_goals (year, name, instrument, icon, parent_goal_id, sort_order)
SELECT 2026, 'Uang Dingin Bersama', 'Valas (1,3196 JPY)', 'Banknote', id, 9
FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';

INSERT INTO saving_goals (year, name, instrument, icon, parent_goal_id, sort_order)
SELECT 2026, 'Uang Dingin Bersama', 'Valas (10 EUR)', 'Banknote', id, 10
FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';

INSERT INTO saving_goals (year, name, instrument, icon, parent_goal_id, sort_order)
SELECT 2026, 'Uang Dingin Bersama', 'Valas (5000 KRW)', 'Banknote', id, 11
FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';

INSERT INTO saving_goals (year, name, instrument, icon, parent_goal_id, sort_order)
SELECT 2026, 'Uang Dingin Bersama', 'Valas (10 RM)', 'Banknote', id, 12
FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';

INSERT INTO saving_goals (year, name, instrument, icon, parent_goal_id, sort_order)
SELECT 2026, 'Uang Dingin Bersama', 'LM 10gr', 'Coins', id, 13
FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';

INSERT INTO saving_goals (year, name, instrument, icon, sort_order) VALUES
(2026, 'Uang Dingin', 'Crypto Dean', 'Bitcoin', 14),
(2026, 'Tabungan Bersama', 'Emas Dean', 'Gem', 15),
(2026, 'Tabungan Ihya', 'Emas Bagas', 'Gem', 16),
(2026, 'Household Maintenance', 'Flexi Saver 2', 'WalletCards', 17);

-- ========== 2026 ENTRIES ==========
-- Dapur Damara 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 26973069 FROM saving_goals WHERE year=2026 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 27121836 FROM saving_goals WHERE year=2026 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 25959860 FROM saving_goals WHERE year=2026 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 26076021 FROM saving_goals WHERE year=2026 AND name='Dapur Damara';

-- Pregnancy & Children 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 19750071 FROM saving_goals WHERE year=2026 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 19789836 FROM saving_goals WHERE year=2026 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 19420579 FROM saving_goals WHERE year=2026 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 19674779 FROM saving_goals WHERE year=2026 AND name='Pregnancy & Children';

-- Kanopi 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 0 FROM saving_goals WHERE year=2026 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 0 FROM saving_goals WHERE year=2026 AND name='Kanopi';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 0 FROM saving_goals WHERE year=2026 AND name='Kanopi';

-- Annual Saving 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 1736039 FROM saving_goals WHERE year=2026 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 1407539 FROM saving_goals WHERE year=2026 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 1235039 FROM saving_goals WHERE year=2026 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 1030339 FROM saving_goals WHERE year=2026 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 5, 200825 FROM saving_goals WHERE year=2026 AND name='Annual Saving / Gift (Family)';

-- Urgent Cost 1 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 176982 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 104000 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 103482 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 116000 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 1';

-- Urgent Cost 2 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 2786000 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 2525500 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 2661100 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 2199546 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 5, 133883 FROM saving_goals WHERE year=2026 AND name='Urgent Cost 2';

-- Uang Dingin Bersama - USD 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 1683300 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 1678000 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 1690500 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 1720000 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (100 USD)';

-- Uang Dingin Bersama - SGD 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 979817 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (74 SGD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 981302 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (74 SGD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 978245 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (74 SGD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 996289 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (74 SGD)';

-- Uang Dingin Bersama - JPY 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 1426468 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (1,3196 JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 1412777 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (1,3196 JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 1403838 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (1,3196 JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 1421243 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (1,3196 JPY)';

-- Uang Dingin Bersama - EUR 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 196204 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (10 EUR)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 201099 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (10 EUR)';

-- Uang Dingin Bersama - KRW 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 56448 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (5000 KRW)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 57993 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (5000 KRW)';

-- Uang Dingin Bersama - RM 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 42640 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (10 RM)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 43390 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='Valas (10 RM)';

-- Uang Dingin Bersama - LM 10gr 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 32457590 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='LM 10gr';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 27995000 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='LM 10gr';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 28050000 FROM saving_goals WHERE year=2026 AND name='Uang Dingin Bersama' AND instrument='LM 10gr';

-- Uang Dingin 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 0 FROM saving_goals WHERE year=2026 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 0 FROM saving_goals WHERE year=2026 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 0 FROM saving_goals WHERE year=2026 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 0 FROM saving_goals WHERE year=2026 AND name='Uang Dingin';

-- Tabungan Bersama 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 61887250 FROM saving_goals WHERE year=2026 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 61463250 FROM saving_goals WHERE year=2026 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 62975706 FROM saving_goals WHERE year=2026 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 63538698 FROM saving_goals WHERE year=2026 AND name='Tabungan Bersama';

-- Tabungan Ihya 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 0 FROM saving_goals WHERE year=2026 AND name='Tabungan Ihya';

-- Household Maintenance 2026
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 1, 2212929 FROM saving_goals WHERE year=2026 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 2, 1552429 FROM saving_goals WHERE year=2026 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 3, 1554129 FROM saving_goals WHERE year=2026 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 4, 403437 FROM saving_goals WHERE year=2026 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2026, 5, 334708 FROM saving_goals WHERE year=2026 AND name='Household Maintenance';
