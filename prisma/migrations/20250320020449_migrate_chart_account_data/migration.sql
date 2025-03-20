-- chart_account
INSERT INTO
    `chart_account` (`id`, `accountNumber`, `accountName`)
SELECT
    `id` AS `id`,
    `Account Number` AS `accountNumber`,
    `Account Name` AS `accountName`
FROM
    `chrtacct`;