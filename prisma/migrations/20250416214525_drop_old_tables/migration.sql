/*
  Warnings:

  - You are about to drop the `az_temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chrtacct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clientlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `codes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consignee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consignmentitems_temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conversionerrors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `costcont` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deposit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deposit_copy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deposit_date` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deposit_individual` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `depositprint_temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dummy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exchange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expreport_temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exprpt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invdet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invmas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invsol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invsold` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invsotmp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `monthly_deposit_totals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nm_temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paste errors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pcs_monthly` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pcs_ytd` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salerpt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesreport_temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salestohistory_temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `savetest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `temp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tempsal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testtbl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `totals` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `client_master` MODIFY `areaCode` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `inventory_history` MODIFY `year` VARCHAR(191) NULL,
    MODIFY `shipmentNumber` VARCHAR(191) NULL,
    MODIFY `pieceNumber` VARCHAR(191) NULL,
    MODIFY `invoiceNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `inventory_master` MODIFY `year` VARCHAR(191) NULL,
    MODIFY `shipmentNumber` VARCHAR(191) NULL,
    MODIFY `pieceNumber` VARCHAR(191) NULL,
    MODIFY `invoiceNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `shipment` MODIFY `year` VARCHAR(191) NULL,
    MODIFY `shipmentNumber` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `az_temp`;

-- DropTable
DROP TABLE `chrtacct`;

-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `clientlist`;

-- DropTable
DROP TABLE `codes`;

-- DropTable
DROP TABLE `consignee`;

-- DropTable
DROP TABLE `consignmentitems_temp`;

-- DropTable
DROP TABLE `conversionerrors`;

-- DropTable
DROP TABLE `costcont`;

-- DropTable
DROP TABLE `deposit`;

-- DropTable
DROP TABLE `deposit_copy`;

-- DropTable
DROP TABLE `deposit_date`;

-- DropTable
DROP TABLE `deposit_individual`;

-- DropTable
DROP TABLE `depositprint_temp`;

-- DropTable
DROP TABLE `dummy`;

-- DropTable
DROP TABLE `exchange`;

-- DropTable
DROP TABLE `expense`;

-- DropTable
DROP TABLE `expreport_temp`;

-- DropTable
DROP TABLE `exprpt`;

-- DropTable
DROP TABLE `invdet`;

-- DropTable
DROP TABLE `inventry`;

-- DropTable
DROP TABLE `invlist`;

-- DropTable
DROP TABLE `invmas`;

-- DropTable
DROP TABLE `invsol`;

-- DropTable
DROP TABLE `invsold`;

-- DropTable
DROP TABLE `invsotmp`;

-- DropTable
DROP TABLE `monthly_deposit_totals`;

-- DropTable
DROP TABLE `nm_temp`;

-- DropTable
DROP TABLE `paste errors`;

-- DropTable
DROP TABLE `pcs_monthly`;

-- DropTable
DROP TABLE `pcs_ytd`;

-- DropTable
DROP TABLE `salerpt`;

-- DropTable
DROP TABLE `salesreport_temp`;

-- DropTable
DROP TABLE `salestohistory_temp`;

-- DropTable
DROP TABLE `savetest`;

-- DropTable
DROP TABLE `temp`;

-- DropTable
DROP TABLE `tempsal`;

-- DropTable
DROP TABLE `testtbl`;

-- DropTable
DROP TABLE `totals`;
