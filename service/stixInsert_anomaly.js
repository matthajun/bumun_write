const winston = require('../config/winston')(module);
const sequelize = require('sequelize');
const db = require('../models');
const schedule = require('node-schedule');
const _ = require('loadsh');
const KeyChange = require('../utils/KeyChange');

const stixInsert = require('./stixInsert');

module.exports.searchAndInsert = async function() {
    schedule.scheduleJob('10 * * * * *', async function () {
        let rtnResult = {};
        try {
            const tableName = "stix_amly_type";
            const searchName = "kdn_amly_H007";
            const event_tableName = "stix_anomaly";

            const stix_table = db[tableName.toUpperCase()];
            const h007_table = db[searchName.toUpperCase()];

            let tableInfos = [];

            const result = await db.sequelize.transaction(async (t) => {
                winston.info("********************************************************************************");
                winston.info("*******************query start *************************");
                //console.log(db[tableName.toUpperCase()]);
                let rslt = await h007_table.findAll({include: [
                        stix_table
                    ]},{where: {stix_tag_a: 'C'}}).then(async users => {
                    if (users) {
                        console.log(users)
                        /*let childTable = [];
                        for (user of users) {
                            user.update({stix_tag_a: 'E'});
                            childTable.push(user.dataValues);
                        }
                        tableInfos = {tableName: event_tableName, tableData: _.cloneDeep(childTable)};
*/
                    }
                });
                if (rslt instanceof Error) {
                    throw new rslt;
                }
                winston.info("********************************************************************************");
                winston.info("*******************query end *************************");
            });

            console.log(tableInfos);
            //KeyChange.KeyChange_anomaly(tableInfos.tableData);

            //console.log(tableInfos);

            //stixInsert.ParseandInsert(tableInfos);

        } catch (error) {
            // If the execution reaches this line, an error occurred.
            // The transaction has already been rolled back automatically by Sequelize!
            winston.error(error.stack);
            rtnResult = error;
        } finally {
            return rtnResult;
        }
    })
};