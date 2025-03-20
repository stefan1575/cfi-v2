-- expenses
INSERT INTO
    `expenses` (
        `id` `accountNumber`,
        `transactionDate`,
        `checkNumber`,
        `description`,
        `accountName`,
        `amount`
    )
SELECT
    `id` AS `id`,
    `Account Number` AS `accountNumber`,
    `Transaction Date` AS `transactionDate`,
    `Check Number` AS `checkNumber`,
    `Description` AS `description`,
    `Account Name` AS `accountName`,
    `Amount` AS `amount`
FROM
    `expense`;