-- shipment
INSERT INTO
    `shipment` (
        `id`,
        `year`,
        `shipmentNumber`,
        `landedCostRatio`,
        `exchangeRate`
    )
SELECT
    `id` AS `id`,
    `Yr` AS `year`,
    `Mo` AS `shipmentNumber`,
    `Landing Cost Ratio` AS `landedCostRatio`,
    `Exchange Rate In Francs` AS `exchangeRate`
FROM
    `exchange`;