-- CreateTable
CREATE TABLE `client_master` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `clientNumber` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `companyName` VARCHAR(191) NULL,
    `taxId` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `zipCode` VARCHAR(191) NULL,
    `isMailingList` BOOLEAN NOT NULL DEFAULT false,
    `lastInvoiceDate` DATE NULL,
    `totalSales` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `honorific` VARCHAR(191) NULL,
    `middleInitial` VARCHAR(191) NULL,
    `areaCode` INTEGER NULL,
    `cOrP` VARCHAR(191) NULL,
    `dateForP` VARCHAR(191) NULL,
    `retailOrWholeSale` VARCHAR(191) NULL,
    `wType` VARCHAR(191) NULL,
    `additionalInfo` VARCHAR(191) NULL,
    `fax` VARCHAR(191) NULL,
    `address2` VARCHAR(191) NULL,

    UNIQUE INDEX `client_master_clientNumber_key`(`clientNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_master` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `year` INTEGER NULL,
    `shipmentNumber` INTEGER NULL,
    `pieceNumber` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `dollarCost` DECIMAL(12, 2) NULL,
    `euroCost` DECIMAL(12, 2) NULL,
    `repairCost` DECIMAL(12, 2) NULL,
    `landedCost` DECIMAL(12, 2) NULL,
    `suggestedRetailPrice` DECIMAL(12, 2) NULL,
    `designerNetPrice` DECIMAL(12, 2) NULL,
    `clientNumber` VARCHAR(191) NULL,
    `dateSold` DATE NULL,
    `invoiceNumber` INTEGER NULL,
    `priceSold` DECIMAL(12, 2) NULL,
    `taxCost` DECIMAL(12, 2) NULL,
    `isConsignment` BOOLEAN NOT NULL DEFAULT false,
    `aOrB` VARCHAR(191) NULL,
    `counter` VARCHAR(191) NULL,
    `frenchFrancsCost` VARCHAR(191) NULL,
    `consignment` VARCHAR(191) NULL,
    `addedToClient` VARCHAR(191) NULL,
    `consignee` VARCHAR(191) NULL,
    `consignCode` VARCHAR(191) NULL,
    `consignDate` VARCHAR(191) NULL,
    `consignValue` VARCHAR(191) NULL,
    `shipmentId` INTEGER NULL,
    `clientMasterId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `year` INTEGER NULL,
    `shipmentNumber` INTEGER NULL,
    `pieceNumber` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `dollarCost` DECIMAL(12, 2) NULL,
    `euroCost` DECIMAL(12, 2) NULL,
    `repairCost` DECIMAL(12, 2) NULL,
    `landedCost` DECIMAL(12, 2) NULL,
    `suggestedRetailPrice` DECIMAL(12, 2) NULL,
    `designerNetPrice` DECIMAL(12, 2) NULL,
    `clientNumber` VARCHAR(191) NULL,
    `dateSold` DATE NULL,
    `invoiceNumber` INTEGER NULL,
    `priceSold` DECIMAL(12, 2) NULL,
    `taxCost` DECIMAL(12, 2) NULL,
    `isConsignment` BOOLEAN NOT NULL DEFAULT false,
    `aOrB` VARCHAR(191) NULL,
    `counter` VARCHAR(191) NULL,
    `frenchFrancsCost` VARCHAR(191) NULL,
    `consignment` VARCHAR(191) NULL,
    `addedToClient` VARCHAR(191) NULL,
    `consignee` VARCHAR(191) NULL,
    `consignCode` VARCHAR(191) NULL,
    `consignDate` VARCHAR(191) NULL,
    `consignValue` VARCHAR(191) NULL,
    `shipmentId` INTEGER NULL,
    `clientMasterId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expenses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `checkNumber` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `amount` DECIMAL(12, 2) NULL,
    `transactionDate` DATE NULL,
    `accountNumber` VARCHAR(191) NULL,
    `accountName` VARCHAR(191) NULL,
    `chartAccountId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `year` INTEGER NULL,
    `shipmentNumber` INTEGER NULL,
    `landedCostRatio` DECIMAL(12, 4) NULL,
    `exchangeRate` DECIMAL(12, 4) NULL,

    UNIQUE INDEX `shipment_year_shipmentNumber_key`(`year`, `shipmentNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chart_account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `accountName` VARCHAR(191) NULL,
    `accountNumber` VARCHAR(191) NULL,

    UNIQUE INDEX `chart_account_accountName_accountNumber_key`(`accountName`, `accountNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inventory_master` ADD CONSTRAINT `inventory_master_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `shipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_master` ADD CONSTRAINT `inventory_master_clientMasterId_fkey` FOREIGN KEY (`clientMasterId`) REFERENCES `client_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_history` ADD CONSTRAINT `inventory_history_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `shipment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_history` ADD CONSTRAINT `inventory_history_clientMasterId_fkey` FOREIGN KEY (`clientMasterId`) REFERENCES `client_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_chartAccountId_fkey` FOREIGN KEY (`chartAccountId`) REFERENCES `chart_account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
