-- CreateTable
CREATE TABLE "tasks" (
    "taskId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "task" TEXT NOT NULL,
    "done" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("taskId")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD FOREIGN KEY ("authorId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
