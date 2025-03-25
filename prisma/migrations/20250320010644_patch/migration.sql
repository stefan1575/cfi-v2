/*
  Warnings:

  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
*/

-- Drop auth tables since we are migrating a different auth
DROP TABLE `Session`;
DROP TABLE `Token`;
DROP TABLE `User`;

-- Remove deleted rows, this is safe to do since we already have a backup via init migration
DELETE FROM `CLIENT` WHERE `isHidden` = 1;
DELETE FROM `INVENTRY` WHERE `isHidden` = 1;
DELETE FROM `INVSOLD` WHERE `isHidden` = 1;
DELETE FROM `EXCHANGE` WHERE `isHidden` = 1;
DELETE FROM `CHRTACCT` WHERE `isHidden` = 1;
DELETE FROM `EXPENSES` WHERE `isHidden` = 1;

-- Rename since we are going to use the same name the new tables
RENAME TABLE `EXPENSES` TO `expense`;
