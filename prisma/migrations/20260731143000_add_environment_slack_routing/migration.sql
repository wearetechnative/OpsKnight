ALTER TABLE "SlackIntegration"
ADD COLUMN IF NOT EXISTS "productionChannel" TEXT,
ADD COLUMN IF NOT EXISTS "nonProductionChannel" TEXT;

ALTER TABLE "Incident"
ADD COLUMN IF NOT EXISTS "environment" TEXT;

-- Preserve correct routing for currently open incidents created before this
-- column existed. Webhook custom_details are stored in the description JSON.
UPDATE "Incident"
SET "environment" = 'PRODUCTION'
WHERE "environment" IS NULL
  AND "description" ~* 'Environment\s*:\s*Production';

UPDATE "Incident"
SET "environment" = 'NON_PRODUCTION'
WHERE "environment" IS NULL
  AND "description" ~* 'Environment\s*:\s*(Non-Production|Unknown)';

ALTER TABLE "Incident"
ADD CONSTRAINT "Incident_environment_value"
CHECK ("environment" IS NULL OR "environment" IN ('PRODUCTION', 'NON_PRODUCTION'));
