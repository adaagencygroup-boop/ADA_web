CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE TYPE "revokedReason" AS ENUM ('userLogout', 'userLogoutOthers', 'passwordChange', 'expired', 'tokenReuseDetected');
CREATE TYPE "notificationType" AS ENUM ('system', 'contacts', 'recruitments', 'news');
CREATE TYPE "employmentType" AS ENUM ('fulltime', 'parttime', 'remote', 'hybrid');
CREATE TYPE "backupStatus" AS ENUM ('pending', 'running', 'success', 'failed');
CREATE TYPE "otpPurpose" AS ENUM ('emailVerification', 'forgotPassword');
CREATE TYPE "backupFrequency" AS ENUM ('daily', 'weekly', 'monthly');
CREATE TYPE "recruitmentStatus" AS ENUM ('draft', 'hiring', 'closed');
CREATE TYPE "sessionStatus" AS ENUM ('active', 'revoked', 'expired');
CREATE TYPE "deviceType" AS ENUM ('mobile', 'desktop', 'tablet');
CREATE TYPE "contactStatus" AS ENUM ('pending', 'responded');
CREATE TYPE "deviceStatus" AS ENUM ('active', 'blocked');
CREATE TYPE "newsStatus" AS ENUM ('draft', 'published');
CREATE TYPE "loginStatus" AS ENUM ('success', 'failed');
CREATE TYPE "userRole" AS ENUM ('admin', 'staff');
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "username" VARCHAR(50) NOT NULL UNIQUE,
  "fullname" VARCHAR(150) NOT NULL,
  "email" CITEXT NOT NULL UNIQUE,
  "phone" VARCHAR(20),
  "passwordHash" TEXT NOT NULL,
  "emailVerifiedAt" TIMESTAMPTZ,
  "role" "userRole" NOT NULL DEFAULT 'staff',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE "userOTPs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "codeHash" TEXT NOT NULL,
  "purpose" "otpPurpose" NOT NULL,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "usedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "chkUserOTPsExpiresAt" CHECK ("expiresAt" > "createdAt"),
  CONSTRAINT "chkUserOTPsUsedAt" CHECK ("usedAt" IS NULL OR "usedAt" >= "createdAt")
);
CREATE TABLE "userDevices" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "deviceFingerprint" VARCHAR(255) NOT NULL,
  "deviceName" VARCHAR(128),
  "deviceType" "deviceType" NOT NULL,
  "OS" VARCHAR(64),
  "browser" VARCHAR(64),
  "firstSeenAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "lastSeenAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "status" "deviceStatus" NOT NULL DEFAULT 'active',
  UNIQUE ("userId", "deviceFingerprint"),
  CONSTRAINT "chkUserDevicesLastSeenAt" CHECK ("lastSeenAt" >= "firstSeenAt")
);
CREATE TABLE "userSessions" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "deviceId" UUID REFERENCES "userDevices"("id") ON DELETE SET NULL,
  "refreshTokenHash" TEXT NOT NULL,
  "accessTokenJTI" VARCHAR(255),
  "tokenFamilyId" VARCHAR(255) NOT NULL,
  "issuedIPAddress" VARCHAR(45),
  "IPAddress" VARCHAR(45),
  "userAgent" TEXT,
  "status" "sessionStatus" NOT NULL DEFAULT 'active',
  "issuedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "lastSeenAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "revokedAt" TIMESTAMPTZ,
  "revokedReason" "revokedReason",
  CONSTRAINT "chkUserSessionsExpiresAt" CHECK ("expiresAt" > "issuedAt"),
  CONSTRAINT "chkUserSessionsLastSeenAt" CHECK ("lastSeenAt" >= "issuedAt"),
  CONSTRAINT "chkUserSessionsRevocationState" CHECK (
    ("status" = 'active' AND "revokedAt" IS NULL AND "revokedReason" IS NULL)
    OR
    ("status" = 'revoked' AND "revokedAt" IS NOT NULL AND "revokedReason" IS NOT NULL)
    OR
    ("status" = 'expired' AND "revokedAt" IS NOT NULL AND "revokedReason" = 'expired')
  )
);
CREATE TABLE "loginHistories" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "sessionId" UUID REFERENCES "userSessions"("id") ON DELETE SET NULL,
  "deviceId" UUID REFERENCES "userDevices"("id") ON DELETE SET NULL,
  "IPAddress" VARCHAR(45),
  "geoCountry" VARCHAR(64),
  "geoCity" VARCHAR(128),
  "isNewIP" BOOLEAN NOT NULL DEFAULT false,
  "userAgent" TEXT,
  "status" "loginStatus" NOT NULL,
  "failureReason" VARCHAR(128),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE "backupSchedules" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "isEnabled" BOOLEAN NOT NULL DEFAULT true,
  "frequency" "backupFrequency" NOT NULL,
  "timeOfDay" TIME NOT NULL,
  "dayOfWeek" SMALLINT,
  "dayOfMonth" SMALLINT,
  CONSTRAINT "chkBackupSchedulesDayOfWeek" CHECK ("dayOfWeek" BETWEEN 0 AND 6),
  CONSTRAINT "chkBackupSchedulesDayOfMonth" CHECK ("dayOfMonth" BETWEEN 1 AND 31),
  CONSTRAINT "chkBackupSchedulesFrequencyFields" CHECK (
    ("frequency" = 'daily' AND "dayOfWeek" IS NULL AND "dayOfMonth" IS NULL)
    OR
    ("frequency" = 'weekly' AND "dayOfWeek" IS NOT NULL AND "dayOfMonth" IS NULL)
    OR
    ("frequency" = 'monthly' AND "dayOfWeek" IS NULL AND "dayOfMonth" IS NOT NULL)
  )
);
CREATE TABLE "backupHistories" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "fileURL" TEXT,
  "fileSizeBytes" BIGINT,
  "status" "backupStatus" NOT NULL DEFAULT 'pending',
  "errorMessage" TEXT,
  "startedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "finishedAt" TIMESTAMPTZ,
  CONSTRAINT "chkBackupHistoriesFileSize" CHECK ("fileSizeBytes" IS NULL OR "fileSizeBytes" >= 0),
  CONSTRAINT "chkBackupHistoriesFinishedAt" CHECK ("finishedAt" IS NULL OR "finishedAt" >= "startedAt")
);
CREATE TABLE "newsCategories" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(100) NOT NULL UNIQUE,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE "news" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "authorId" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "categoryId" UUID REFERENCES "newsCategories"("id") ON DELETE SET NULL,
  "title" VARCHAR(255) NOT NULL,
  "slug" VARCHAR(255) NOT NULL UNIQUE,
  "coverImageURL" TEXT,
  "content" TEXT NOT NULL,
  "status" "newsStatus" NOT NULL DEFAULT 'draft',
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "chkNewsViewCount" CHECK ("viewCount" >= 0)
);
CREATE TABLE "contacts" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "customerFullname" VARCHAR(150) NOT NULL,
  "customerPhone" VARCHAR(20),
  "customerEmail" CITEXT,
  "message" TEXT NOT NULL,
  "note" TEXT,
  "status" "contactStatus" NOT NULL DEFAULT 'pending',
  "feedbackContent" TEXT,
  "feedbackAttachmentURL" TEXT,
  "feedbackSentAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "deletedAt" TIMESTAMPTZ
);
CREATE TABLE "notifications" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL,
  "type" "notificationType" NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE "notificationRecipients" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "notificationId" UUID NOT NULL REFERENCES "notifications"("id") ON DELETE CASCADE,
  "userId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "readAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE ("notificationId", "userId"),
  CONSTRAINT "chkNotificationRecipientsReadState" CHECK (
    ("isRead" = false AND "readAt" IS NULL)
    OR
    ("isRead" = true AND "readAt" IS NOT NULL)
  )
);
CREATE TABLE "departments" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE "recruitments" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "recruiterId" UUID REFERENCES "users"("id") ON DELETE SET NULL,
  "jobTitle" VARCHAR(150) NOT NULL,
  "slug" VARCHAR(255) NOT NULL UNIQUE,
  "departmentId" UUID REFERENCES "departments"("id") ON DELETE SET NULL,
  "location" VARCHAR(100),
  "employmentType" "employmentType" NOT NULL,
  "workingHours" VARCHAR(100),
  "description" TEXT,
  "requirements" TEXT,
  "benefits" TEXT,
  "coverImageURL" TEXT,
  "status" "recruitmentStatus" NOT NULL DEFAULT 'draft',
  "minSalary" NUMERIC(12,2),
  "maxSalary" NUMERIC(12,2),
  "isNegotiable" BOOLEAN NOT NULL DEFAULT false,
  "requiredCandidateNum" INTEGER NOT NULL DEFAULT 1,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "expiresAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT "chkRecruitmentsRequiredCandidateNum" CHECK ("requiredCandidateNum" > 0),
  CONSTRAINT "chkRecruitmentsViewCount" CHECK ("viewCount" >= 0),
  CONSTRAINT "chkRecruitmentsMinSalary" CHECK ("minSalary" IS NULL OR "minSalary" >= 0),
  CONSTRAINT "chkRecruitmentsMaxSalary" CHECK ("maxSalary" IS NULL OR "maxSalary" >= 0),
  CONSTRAINT "chkRecruitmentsSalaryRange" CHECK ("minSalary" IS NULL OR "maxSalary" IS NULL OR "minSalary" <= "maxSalary")
);
CREATE TABLE "candidates" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "recruitmentId" UUID NOT NULL REFERENCES "recruitments"("id") ON DELETE RESTRICT,
  "fullname" VARCHAR(150) NOT NULL,
  "email" CITEXT,
  "phone" VARCHAR(20),
  "resumeURL" TEXT,
  "message" TEXT,
  "note" TEXT,
  "appliedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX "uxUserSessionsAccessTokenJTI" ON "userSessions" ("accessTokenJTI") WHERE "accessTokenJTI" IS NOT NULL;
CREATE UNIQUE INDEX "uxCandidatesRecruitmentIdEmail" ON "candidates" ("recruitmentId", "email") WHERE "email" IS NOT NULL;
CREATE UNIQUE INDEX "uxUserOTPsOneActive" ON "userOTPs" ("userId", "purpose") WHERE "usedAt" IS NULL;
CREATE UNIQUE INDEX "uxUserSessionsRefreshTokenHash" ON "userSessions" ("refreshTokenHash");
CREATE UNIQUE INDEX "uxBackupSchedulesSingleRow" ON "backupSchedules" ((true));
CREATE INDEX "idxContactsCustomerPhone" ON "contacts" ("customerPhone") WHERE "deletedAt" IS NULL AND "customerPhone" IS NOT NULL;
CREATE INDEX "idxContactsCustomerEmail" ON "contacts" ("customerEmail") WHERE "deletedAt" IS NULL AND "customerEmail" IS NOT NULL;
CREATE INDEX "idxContactsPendingCreatedAt" ON "contacts" ("createdAt" DESC) WHERE "status" = 'pending' AND "deletedAt" IS NULL;
CREATE INDEX "idxNewsFeaturedPublished" ON "news" ("createdAt" DESC) WHERE "isFeatured" = true AND "status" = 'published';
CREATE INDEX "idxNewsCategoryPublishedCreatedAt" ON "news" ("categoryId", "createdAt" DESC) WHERE "status" = 'published';
CREATE INDEX "idxNotificationRecipientsUserIdRead" ON "notificationRecipients" ("userId", "isRead", "createdAt" DESC);
CREATE INDEX "idxBackupHistoriesActive" ON "backupHistories" ("startedAt") WHERE "status" IN ('pending', 'running');
CREATE INDEX "idxUserOTPsActive" ON "userOTPs" ("userId", "purpose", "createdAt" DESC) WHERE "usedAt" IS NULL;
CREATE INDEX "idxContactsStatusCreatedAt" ON "contacts" ("status", "createdAt" DESC) WHERE "deletedAt" IS NULL;
CREATE INDEX "idxUserSessionsActiveUser" ON "userSessions" ("userId", "issuedAt" DESC) WHERE "status" = 'active';
CREATE INDEX "idxLoginHistoriesNewIP" ON "loginHistories" ("userId", "createdAt" DESC) WHERE "isNewIP" = true;
CREATE INDEX "idxRecruitmentsHiringCreatedAt" ON "recruitments" ("createdAt" DESC) WHERE "status" = 'hiring';
CREATE INDEX "idxCandidatesRecruitmentIdAppliedAt" ON "candidates" ("recruitmentId", "appliedAt" DESC);
CREATE INDEX "idxBackupSchedulesIsEnabledFrequency" ON "backupSchedules" ("isEnabled", "frequency");
CREATE INDEX "idxRecruitmentsHiringExpiresAt" ON "recruitments" ("expiresAt") WHERE "status" = 'hiring';
CREATE INDEX "idxNewsPublishedCreatedAt" ON "news" ("createdAt" DESC) WHERE "status" = 'published';
CREATE INDEX "idxBackupSchedulesFrequencyTime" ON "backupSchedules" ("frequency", "timeOfDay");
CREATE INDEX "idxBackupHistoriesStatusStartedAt" ON "backupHistories" ("status", "startedAt" DESC);
CREATE INDEX "idxNotificationRecipientsNotificationId" ON "notificationRecipients" ("notificationId");
CREATE INDEX "idxLoginHistoriesUserIdCreatedAt" ON "loginHistories" ("userId", "createdAt" DESC);
CREATE INDEX "idxRecruitmentsDepartmentIdStatus" ON "recruitments" ("departmentId", "status");
CREATE INDEX "idxRecruitmentsStatusCreatedAt" ON "recruitments" ("status", "createdAt" DESC);
CREATE INDEX "idxCandidatesPhone" ON "candidates" ("phone") WHERE "phone" IS NOT NULL;
CREATE INDEX "idxCandidatesEmail" ON "candidates" ("email") WHERE "email" IS NOT NULL;
CREATE INDEX "idxNotificationTypeCreatedAt" ON "notifications" ("type", "createdAt" DESC);
CREATE INDEX "idxUserSessionsStatusExpiresAt" ON "userSessions" ("status", "expiresAt");
CREATE INDEX "idxBackupHistoriesStartedAt" ON "backupHistories" ("startedAt" DESC);
CREATE INDEX "idxUserSessionsTokenFamilyId" ON "userSessions" ("tokenFamilyId");
CREATE INDEX "idxLoginHistoriesCreatedAt" ON "loginHistories" ("createdAt" DESC);
CREATE INDEX "idxRecruitmentsDepartmentId" ON "recruitments" ("departmentId");
CREATE INDEX "idxUserSessionsLastSeenAt" ON "userSessions" ("lastSeenAt" DESC);
CREATE INDEX "idxUserSessionsUserIdStatus" ON "userSessions" ("userId", "status");
CREATE INDEX "idxUserDevicesUserIdStatus" ON "userDevices" ("userId", "status");
CREATE INDEX "idxNewsStatusCreatedAt" ON "news" ("status", "createdAt" DESC);
CREATE INDEX "idxUserDevicesLastSeenAt" ON "userDevices" ("lastSeenAt" DESC);
CREATE INDEX "idxUserOTPsUserIdPurpose" ON "userOTPs" ("userId", "purpose");
CREATE INDEX "idxNotificationCreatedAt" ON "notifications" ("createdAt" DESC);
CREATE INDEX "idxNewsCategoriesIsActive" ON "newsCategories" ("isActive");
CREATE INDEX "idxRecruitmentsRecruiterId" ON "recruitments" ("recruiterId");
CREATE INDEX "idxLoginHistoriesSessionId" ON "loginHistories" ("sessionId");
CREATE INDEX "idxLoginHistoriesDeviceId" ON "loginHistories" ("deviceId");
CREATE INDEX "idxRecruitmentsExpiresAt" ON "recruitments" ("expiresAt");
CREATE INDEX "idxUserSessionsExpiresAt" ON "userSessions" ("expiresAt");
CREATE INDEX "idxUserSessionsDeviceId" ON "userSessions" ("deviceId");
CREATE INDEX "idxUsersEmailVerifiedAt" ON "users" ("emailVerifiedAt");
CREATE INDEX "idxUserOTPsExpiresAt" ON "userOTPs" ("expiresAt");
CREATE INDEX "idxUsersCreatedAt" ON "users" ("createdAt" DESC);
CREATE INDEX "idxNewsCategoryId" ON "news" ("categoryId");
CREATE INDEX "idxNewsAuthorId" ON "news" ("authorId");
CREATE OR REPLACE FUNCTION "setUpdatedAt"()
RETURNS TRIGGER
AS $$
BEGIN
    NEW."updatedAt" = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "trgRecruitmentsUpdatedAt" BEFORE UPDATE ON "recruitments" FOR EACH ROW EXECUTE FUNCTION "setUpdatedAt"();
CREATE TRIGGER "trgCandidatesUpdatedAt" BEFORE UPDATE ON "candidates" FOR EACH ROW EXECUTE FUNCTION "setUpdatedAt"();
CREATE TRIGGER "trgContactsUpdatedAt" BEFORE UPDATE ON "contacts" FOR EACH ROW EXECUTE FUNCTION "setUpdatedAt"();
CREATE TRIGGER "trgUsersUpdatedAt" BEFORE UPDATE ON "users" FOR EACH ROW EXECUTE FUNCTION "setUpdatedAt"();
CREATE TRIGGER "trgNewsUpdatedAt" BEFORE UPDATE ON "news" FOR EACH ROW EXECUTE FUNCTION "setUpdatedAt"();
CREATE VIEW "recruitmentApplicantCounts" AS
SELECT "recruitmentId", COUNT(*) AS "applicantCount"
FROM "candidates"
GROUP BY "recruitmentId";
CREATE VIEW "userLastLogin" AS
SELECT DISTINCT ON ("userId")
"userId",
"createdAt" AS "lastLoginAt",
"IPAddress"
FROM "loginHistories"
WHERE "status" = 'success'
ORDER BY "userId", "createdAt" DESC;