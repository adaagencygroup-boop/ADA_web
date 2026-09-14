DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'candidateStatus') THEN
        CREATE TYPE "candidateStatus" AS ENUM ('pending', 'passed', 'failed');
    END IF;
END $$;

ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "status" "candidateStatus" NOT NULL DEFAULT 'pending';
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "feedbackContent" TEXT;
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "feedbackAttachmentURL" TEXT;
ALTER TABLE "candidates" ADD COLUMN IF NOT EXISTS "feedbackSentAt" TIMESTAMPTZ;
