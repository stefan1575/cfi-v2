/*
 Warnings:
 
 - You are about to alter the column `dollarCost` on the `inventory_master` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
 - You are about to alter the column `euroCost` on the `inventory_master` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
 - You are about to alter the column `repairCost` on the `inventory_master` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
 - You are about to alter the column `landedCost` on the `inventory_master` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
 - You are about to alter the column `suggestedRetailPrice` on the `inventory_master` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
 - You are about to alter the column `designerNetPrice` on the `inventory_master` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
 - You are about to alter the column `priceSold` on the `inventory_master` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
 - You are about to alter the column `taxCost` on the `inventory_master` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Double`.
 
 */
-- AlterTable
ALTER TABLE
  `inventory_master`
MODIFY
  `dollarCost` DOUBLE NULL,
MODIFY
  `euroCost` DOUBLE NULL,
MODIFY
  `repairCost` DOUBLE NULL,
MODIFY
  `landedCost` DOUBLE NULL,
MODIFY
  `suggestedRetailPrice` DOUBLE NULL,
MODIFY
  `designerNetPrice` DOUBLE NULL,
MODIFY
  `priceSold` DOUBLE NULL,
MODIFY
  `taxCost` DOUBLE NULL;

-- inventory_master
INSERT INTO
  `inventory_master` (
    `id`,
    `year`,
    `shipmentNumber`,
    `pieceNumber`,
    `description`,
    `aOrB`,
    `counter`,
    `dateSold`,
    `frenchFrancsCost`,
    `euroCost`,
    `dollarCost`,
    `repairCost`,
    `landedCost`,
    `suggestedRetailPrice`,
    `designerNetPrice`,
    `invoiceNumber`,
    `priceSold`,
    `clientNumber`,
    `taxCost`,
    `consignment`,
    `addedToClient`,
    `consignee`,
    `consignCode`,
    `consignDate`,
    `consignValue`,
    `isConsignment`
  )
SELECT
  `id` as `id`,
  `Yr` as `year`,
  `Mo` as `shipmentNumber`,
  `Piece number` as `pieceNumber`,
  `Description` as `description`,
  `A or B` as `aOrB`,
  `cntr` as `counter`,
  DATE(`Date sold`) as `dateSold`,
  `Cost in FF` as `frenchFrancsCost`,
  `CostInEuro` as `euroCost`,
  (`Landing cost` - `Repairs`) as `dollarCost`,
  `Repairs` as `repairCost`,
  `Landing cost` as `landedCost`,
  `Sug Retail price` as `suggestedRetailPrice`,
  `Designer Net price` as `designerNetPrice`,
  `Invoice number` as `invoiceNumber`,
  `Sale Price` as `priceSold`,
  `Client number` as `clientNumber`,
  `Taxable item` as `taxCost`,
  `Consignment` as `consignment`,
  `Added To Client` `addedToClient`,
  `Consignee` as `consignee`,
  `ConsigneeCode` as `consignCode`,
  DATE(`ConsignDate`) as `consignDate`,
  `ConsignValue` as `consignValue`,
  CASE
    WHEN `Type` = 10 THEN 1
    ELSE 0
  END as `isConsignment`
FROM
  `inventry`;

-- AlterTable
ALTER TABLE
  `inventory_master`
MODIFY
  `dollarCost` DECIMAL(12, 2) NULL,
MODIFY
  `euroCost` DECIMAL(12, 2) NULL,
MODIFY
  `repairCost` DECIMAL(12, 2) NULL,
MODIFY
  `landedCost` DECIMAL(12, 2) NULL,
MODIFY
  `suggestedRetailPrice` DECIMAL(12, 2) NULL,
MODIFY
  `designerNetPrice` DECIMAL(12, 2) NULL,
MODIFY
  `priceSold` DECIMAL(12, 2) NULL,
MODIFY
  `taxCost` DECIMAL(12, 2) NULL;