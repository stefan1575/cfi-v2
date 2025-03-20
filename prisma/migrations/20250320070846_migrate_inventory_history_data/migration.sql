/*
 Warnings:
 
 - Made the column `dollarCost` on table `inventory_history` required. This step will fail if there are existing NULL values in that column.
 - Made the column `euroCost` on table `inventory_history` required. This step will fail if there are existing NULL values in that column.
 - Made the column `repairCost` on table `inventory_history` required. This step will fail if there are existing NULL values in that column.
 - Made the column `landedCost` on table `inventory_history` required. This step will fail if there are existing NULL values in that column.
 - Made the column `suggestedRetailPrice` on table `inventory_history` required. This step will fail if there are existing NULL values in that column.
 - Made the column `designerNetPrice` on table `inventory_history` required. This step will fail if there are existing NULL values in that column.
 - Made the column `priceSold` on table `inventory_history` required. This step will fail if there are existing NULL values in that column.
 - Made the column `taxCost` on table `inventory_history` required. This step will fail if there are existing NULL values in that column.
 
 */
-- AlterTable
ALTER TABLE
  `inventory_history`
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

-- inventory_history
INSERT INTO
  `inventory_history` (
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
  `invsold`;

-- AlterTable
ALTER TABLE
  `inventory_history`
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