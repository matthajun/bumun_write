const winston = require('../config/winston')(module);
const sequelize = require('sequelize');
const db = require('../models');

module.exports.ParseandInsert = async function (table) {
    let rtnResult = {};

    try {
        const result2 = await db.sequelize.transaction(async (t) => {
            winston.info("********************************************************************************");
            winston.info("*******************query start *************************");
            for (const chileTableData of table.tableData) {
                let rslt = await db[table.tableName.toUpperCase()].create(chileTableData, {transaction: t});
                //rslt = new Error("임의 발생");
                if (rslt instanceof Error) {
                    throw new rslt;
                }
            }
            winston.info("********************************************************************************");
            winston.info("*******************query end *************************");
        });
    } catch (error) {
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
        winston.error(error.stack);
        rtnResult =  error;
    } finally {
        return rtnResult;
    }
};