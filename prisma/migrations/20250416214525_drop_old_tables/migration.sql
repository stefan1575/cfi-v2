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
DROP TABLE `AZ_Temp`;

-- DropTable
DROP TABLE `CHRTACCT`;

-- DropTable
DROP TABLE `CLIENT`;

-- DropTable
DROP TABLE `ClientList`;

-- DropTable
DROP TABLE `CODES`;

-- DropTable
DROP TABLE `Consignee`;

-- DropTable
DROP TABLE `ConsignmentItems_temp`;

-- DropTable
DROP TABLE `ConversionErrors`;

-- DropTable
DROP TABLE `COSTCONT`;

-- DropTable
DROP TABLE `DEPOSIT`;

-- DropTable
DROP TABLE `DEPOSIT_copy`;

-- DropTable
DROP TABLE `Deposit_Date`;

-- DropTable
DROP TABLE `DEPOSIT_Individual`;

-- DropTable
DROP TABLE `DepositPrint_temp`;

-- DropTable
DROP TABLE `DUMMY`;

-- DropTable
DROP TABLE `EXCHANGE`;

-- DropTable
DROP TABLE `expense`;

-- DropTable
DROP TABLE `ExpReport_temp`;

-- DropTable
DROP TABLE `EXPRPT`;

-- DropTable
DROP TABLE `INVDET`;

-- DropTable
DROP TABLE `INVENTRY`;

-- DropTable
DROP TABLE `InvList`;

-- DropTable
DROP TABLE `INVMAS`;

-- DropTable
DROP TABLE `INVSOL`;

-- DropTable
DROP TABLE `INVSOLD`;

-- DropTable
DROP TABLE `INVSOTMP`;

-- DropTable
DROP TABLE `MONTHLY_DEPOSIT_TOTALS`;

-- DropTable
DROP TABLE `NM_temp`;

-- DropTable
DROP TABLE `Paste Errors`;

-- DropTable
DROP TABLE `PCS_MONTHLY`;

-- DropTable
DROP TABLE `PCS_YTD`;

-- DropTable
DROP TABLE `SALERPT`;

-- DropTable
DROP TABLE `SalesReport_temp`;

-- DropTable
DROP TABLE `SalesToHistory_temp`;

-- DropTable
DROP TABLE `SAVETEST`;

-- DropTable
DROP TABLE `TEMP`;

-- DropTable
DROP TABLE `TEMPSAL`;

-- DropTable
DROP TABLE `TESTTBL`;

-- DropTable
DROP TABLE `TOTALS`;
