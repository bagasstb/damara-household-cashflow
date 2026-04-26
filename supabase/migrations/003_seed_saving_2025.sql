-- ========== 2025 GOALS ==========
INSERT INTO saving_goals (year, name, instrument, icon, sort_order) VALUES
(2025, 'Dapur Damara', 'Bibit', 'Sprout', 1),
(2025, 'Pregnancy & Children', 'Bibit', 'Sprout', 2),
(2025, 'Kanopi', 'Crypto/Saham Bagas', 'TrendingUp', 3),
(2025, 'Annual Saving / Gift (Family)', 'Flexi Saver 1', 'Wallet', 4),
(2025, 'Urgent Cost 1', 'Bank Mandiri', 'Landmark', 5),
(2025, 'Urgent Cost 2', 'Jenius X-Card', 'CreditCard', 6);

-- Uang Dingin Bersama parent
INSERT INTO saving_goals (year, name, instrument, icon, sort_order) VALUES
(2025, 'Uang Dingin Bersama', 'Valas (USD)', 'DollarSign', 7);

-- Uang Dingin Bersama sub-instruments
INSERT INTO saving_goals (year, name, instrument, icon, parent_goal_id, sort_order)
SELECT 2025, 'Uang Dingin Bersama', 'Valas (SGD)', 'Banknote', id, 8
FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';

INSERT INTO saving_goals (year, name, instrument, icon, parent_goal_id, sort_order)
SELECT 2025, 'Uang Dingin Bersama', 'Valas (JPY)', 'Banknote', id, 9
FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';

INSERT INTO saving_goals (year, name, instrument, icon, sort_order) VALUES
(2025, 'Uang Dingin', 'Crypto Dean', 'Bitcoin', 10),
(2025, 'Tabungan Bersama', 'Emas Dean', 'Gem', 11),
(2025, 'Tabungan Ihya', 'Emas Bagas', 'Gem', 12),
(2025, 'Household Maintenance', 'Flexi Saver 2', 'WalletCards', 13);

-- ========== 2025 ENTRIES ==========
-- Dapur Damara 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 19029575 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 20407246 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 22051318 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 23286631 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 24767015 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 24767015 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 0 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 26211136 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 26351858 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 26492836 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 26659136 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 26819976 FROM saving_goals WHERE year=2025 AND name='Dapur Damara';

-- Pregnancy & Children 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 15012537 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 15876033 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 16403987 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 17006470 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 17850829 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 18766697 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 18766697 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 19201422 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 19317139 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 19693541 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 19655885 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 19729545 FROM saving_goals WHERE year=2025 AND name='Pregnancy & Children';

-- Kanopi 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 34000000 FROM saving_goals WHERE year=2025 AND name='Kanopi';

-- Annual Saving / Gift (Family) 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 1771447 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 227104 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 288320 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 2723320 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 2969000 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 2894400 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 3274104 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 3356705 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 3665106 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 3373106 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 2922106 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 2682808 FROM saving_goals WHERE year=2025 AND name='Annual Saving / Gift (Family)';

-- Urgent Cost 1 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 376621 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 0 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 222000 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 1023160 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 0 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 748100 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 2249130 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 1668030 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 1250000 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 109182 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 123000 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 1';

-- Urgent Cost 2 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 541644 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 1055101 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 1420175 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 1942175 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 770327 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 690727 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 520431 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 1147433 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 4402834 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 8436834 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 8000634 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 7642567 FROM saving_goals WHERE year=2025 AND name='Urgent Cost 2';

-- Uang Dingin Bersama - USD 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 1626500 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 1626500 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 1626500 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 1626500 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 1626500 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 1626500 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 1626500 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 1627200 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 1677000 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 1662500 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 1666000 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 1676000 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (USD)';

-- Uang Dingin Bersama - SGD 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 949900 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (SGD)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 967003 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (SGD)';

-- Uang Dingin Bersama - JPY 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 1483400 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 1483400 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 1483400 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 1483400 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 1483400 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 1483400 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 1483400 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 1456248 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 1480702 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 1435661 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 1402048 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 1419462 FROM saving_goals WHERE year=2025 AND name='Uang Dingin Bersama' AND instrument='Valas (JPY)';

-- Uang Dingin 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 1833818 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 0 FROM saving_goals WHERE year=2025 AND name='Uang Dingin';

-- Tabungan Bersama 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 15690498 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 23638966 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 25465324 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 36627079 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 36423379 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 36217985 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 0 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 39010459 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 39302149 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 52352563 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 49175466 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 52766560 FROM saving_goals WHERE year=2025 AND name='Tabungan Bersama';

-- Household Maintenance 2025
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 1, 1550870 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 2, 1106704 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 3, 1656714 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 4, 3241714 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 5, 3691714 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 6, 1615414 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 7, 4970 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 8, 448871 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 9, 454073 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 10, 1232073 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 11, 668073 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
INSERT INTO saving_entries (goal_id, year, month, amount) SELECT id, 2025, 12, 1395765 FROM saving_goals WHERE year=2025 AND name='Household Maintenance';
