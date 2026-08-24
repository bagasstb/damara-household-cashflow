-- =============================================
-- Migration: Add GID column to cycles table
-- =============================================

ALTER TABLE cycles ADD COLUMN IF NOT EXISTS gid TEXT;

-- Backfill GID for existing cycles
UPDATE cycles SET gid = '785117583' WHERE id = 'adf25554-3000-45d2-b4c7-32af8ac7d4d1'; -- Januari
UPDATE cycles SET gid = '1940177080' WHERE id = 'c53e05a8-27b2-4d56-a070-664dc2d88701'; -- Februari
UPDATE cycles SET gid = '2121841467' WHERE id = '23bbf648-9c4c-4c6e-821f-cd9f5eac5d21'; -- Maret
UPDATE cycles SET gid = '580115797' WHERE id = 'cbe90e1c-a803-4693-be84-e1d7cee2948f'; -- April
UPDATE cycles SET gid = '1745037782' WHERE id = 'ba4003dc-79ec-4e44-8978-3fade9551ed2'; -- Mei
UPDATE cycles SET gid = '1084811949' WHERE id = 'd55ad3d8-d395-432b-b265-d622fd5bbd2b'; -- Juni
UPDATE cycles SET gid = '1132619206' WHERE id = '5ca99fd1-2c26-454f-99de-5aea19d5c756'; -- Juli
