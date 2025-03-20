-- AlterTable
ALTER TABLE `client_master` ADD COLUMN `additionalInfo` VARCHAR(191) NULL,
    ADD COLUMN `address2` VARCHAR(191) NULL,
    ADD COLUMN `areaCode` INTEGER NULL,
    ADD COLUMN `cOrP` VARCHAR(191) NULL,
    ADD COLUMN `dateForP` VARCHAR(191) NULL,
    ADD COLUMN `fax` VARCHAR(191) NULL,
    ADD COLUMN `honorific` VARCHAR(191) NULL,
    ADD COLUMN `middleInitial` VARCHAR(191) NULL,
    ADD COLUMN `retailOrWholeSale` VARCHAR(191) NULL,
    ADD COLUMN `wType` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `inventory_history` ADD COLUMN `aOrB` VARCHAR(191) NULL,
    ADD COLUMN `addedToClient` VARCHAR(191) NULL,
    ADD COLUMN `cntr` VARCHAR(191) NULL,
    ADD COLUMN `consignCode` VARCHAR(191) NULL,
    ADD COLUMN `consignDate` VARCHAR(191) NULL,
    ADD COLUMN `consignValue` VARCHAR(191) NULL,
    ADD COLUMN `consignment` VARCHAR(191) NULL,
    ADD COLUMN `frenchFrancsCost` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `inventory_master` ADD COLUMN `aOrB` VARCHAR(191) NULL,
    ADD COLUMN `addedToClient` VARCHAR(191) NULL,
    ADD COLUMN `cntr` VARCHAR(191) NULL,
    ADD COLUMN `consignCode` VARCHAR(191) NULL,
    ADD COLUMN `consignDate` VARCHAR(191) NULL,
    ADD COLUMN `consignValue` VARCHAR(191) NULL,
    ADD COLUMN `consignment` VARCHAR(191) NULL,
    ADD COLUMN `frenchFrancsCost` VARCHAR(191) NULL;
