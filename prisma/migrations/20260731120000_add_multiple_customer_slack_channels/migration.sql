-- Allow each customer to select up to two Slack notification channels.
ALTER TABLE "Service"
ADD COLUMN IF NOT EXISTS "slackChannels" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- Preserve existing single-channel customer configuration.
UPDATE "Service"
SET "slackChannels" = ARRAY["slackChannel"]
WHERE "slackChannel" IS NOT NULL
  AND "slackChannel" <> ''
  AND cardinality("slackChannels") = 0;

ALTER TABLE "Service"
ADD CONSTRAINT "Service_slackChannels_max_two"
CHECK (cardinality("slackChannels") <= 2);

-- Store one Slack message reference per incident and configured channel so
-- acknowledgement and resolution update both original messages.
CREATE TABLE IF NOT EXISTS "IncidentSlackMessage" (
    "id" TEXT NOT NULL,
    "incidentId" TEXT NOT NULL,
    "configuredChannel" TEXT NOT NULL,
    "slackChannelId" TEXT NOT NULL,
    "slackMessageTs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncidentSlackMessage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "IncidentSlackMessage_incidentId_configuredChannel_key"
ON "IncidentSlackMessage"("incidentId", "configuredChannel");

CREATE INDEX IF NOT EXISTS "IncidentSlackMessage_incidentId_idx"
ON "IncidentSlackMessage"("incidentId");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'IncidentSlackMessage_incidentId_fkey'
  ) THEN
    ALTER TABLE "IncidentSlackMessage"
    ADD CONSTRAINT "IncidentSlackMessage_incidentId_fkey"
    FOREIGN KEY ("incidentId") REFERENCES "Incident"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
