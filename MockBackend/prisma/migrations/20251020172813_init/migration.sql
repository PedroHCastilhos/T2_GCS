/*
  Warnings:

  - You are about to drop the column `profile_image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Local` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_image";

-- DropTable
DROP TABLE "public"."Local";
