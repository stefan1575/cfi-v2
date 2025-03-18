/*
  Warnings:

  - A unique constraint covering the columns `[accountName,accountNumber]` on the table `chart_account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientNumber]` on the table `client_master` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,shipmentNumber]` on the table `shipment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountName` to the `chart_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountNumber` to the `chart_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientNumber` to the `client_master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pieceNumber` to the `inventory_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipmentId` to the `inventory_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipmentNumber` to the `inventory_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `inventory_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pieceNumber` to the `inventory_master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipmentId` to the `inventory_master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipmentNumber` to the `inventory_master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `inventory_master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landedCostRatio` to the `shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipmentNumber` to the `shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chart_account` ADD COLUMN `accountName` VARCHAR(191) NOT NULL,
    ADD COLUMN `accountNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `client_master` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `clientNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyName` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `isMailingList` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastInvoiceDate` DATE NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `state` VARCHAR(191) NULL,
    ADD COLUMN `taxId` VARCHAR(191) NULL,
    ADD COLUMN `totalSales` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `zipCode` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `expenses` ADD COLUMN `accountName` VARCHAR(191) NULL,
    ADD COLUMN `accountNumber` VARCHAR(191) NULL,
    ADD COLUMN `amount` DECIMAL(12, 2) NULL,
    ADD COLUMN `chartAccountId` INTEGER NULL,
    ADD COLUMN `checkNumber` VARCHAR(191) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `transactionDate` DATE NULL;

-- AlterTable
ALTER TABLE `inventory_history` ADD COLUMN `clientMasterId` INTEGER NULL,
    ADD COLUMN `clientNumber` VARCHAR(191) NULL,
    ADD COLUMN `dateSold` DATE NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `designerNetPrice` DECIMAL(12, 2) NULL,
    ADD COLUMN `dollarCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `euroCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `invoiceNumber` INTEGER NULL,
    ADD COLUMN `isConsignment` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `landedCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `pieceNumber` INTEGER NOT NULL,
    ADD COLUMN `priceSold` DECIMAL(12, 2) NULL,
    ADD COLUMN `repairCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `shipmentId` INTEGER NOT NULL,
    ADD COLUMN `shipmentNumber` INTEGER NOT NULL,
    ADD COLUMN `suggestedRetailPrice` DECIMAL(12, 2) NULL,
    ADD COLUMN `taxCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `inventory_master` ADD COLUMN `clientMasterId` INTEGER NULL,
    ADD COLUMN `clientNumber` VARCHAR(191) NULL,
    ADD COLUMN `dateSold` DATE NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `designerNetPrice` DECIMAL(12, 2) NULL,
    ADD COLUMN `dollarCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `euroCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `invoiceNumber` INTEGER NULL,
    ADD COLUMN `isConsignment` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `landedCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `pieceNumber` INTEGER NOT NULL,
    ADD COLUMN `priceSold` DECIMAL(12, 2) NULL,
    ADD COLUMN `repairCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `shipmentId` INTEGER NOT NULL,
    ADD COLUMN `shipmentNumber` INTEGER NOT NULL,
    ADD COLUMN `suggestedRetailPrice` DECIMAL(12, 2) NULL,
    ADD COLUMN `taxCost` DECIMAL(12, 2) NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `shipment` ADD COLUMN `exchangeRate` DECIMAL(12, 4) NULL,
    ADD COLUMN `landedCostRatio` DECIMAL(12, 4) NOT NULL,
    ADD COLUMN `shipmentNumber` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `chart_account_accountName_accountNumber_key` ON `chart_account`(`accountName`, `accountNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `client_master_clientNumber_key` ON `client_master`(`clientNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `shipment_year_shipmentNumber_key` ON `shipment`(`year`, `shipmentNumber`);

-- AddForeignKey
ALTER TABLE `inventory_master` ADD CONSTRAINT `inventory_master_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `shipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_master` ADD CONSTRAINT `inventory_master_clientMasterId_fkey` FOREIGN KEY (`clientMasterId`) REFERENCES `client_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_history` ADD CONSTRAINT `inventory_history_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `shipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_history` ADD CONSTRAINT `inventory_history_clientMasterId_fkey` FOREIGN KEY (`clientMasterId`) REFERENCES `client_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_chartAccountId_fkey` FOREIGN KEY (`chartAccountId`) REFERENCES `chart_account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
