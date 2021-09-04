-- CreateTable
CREATE TABLE "users" (
    "userId" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");
