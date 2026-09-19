INSERT INTO "backupSchedules" ("isEnabled", "frequency", "timeOfDay")
SELECT true, 'daily', '02:00:00'
WHERE NOT EXISTS (SELECT 1 FROM "backupSchedules");