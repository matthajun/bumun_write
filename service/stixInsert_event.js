const winston = require('../config/winston')(module);
const sequelize = require('sequelize');

const schedule = require('node-schedule');
const _ = require('loadsh');
const KeyChange = require('../utils/KeyChange');

const stixInsert = require('./stixInsert');
const db = require('../models');

const tableName = 'kdn_amly_H007';
const event_tableName = "stix_event";
let event_tableInfos = {};

module.exports.searchAndInsert = async function() {
    schedule.scheduleJob('*/10 * * * * *', async function () {
        let rtnResult = {};
        try {
                const result = await db.sequelize.transaction(async (t) => {
                winston.info("********************************************************************************");
                winston.info("*******************query start *************************");

                let rslt = await db[tableName.toUpperCase()].findAll({where: {trans_tag_e: 'C'}}).then(async users => {
                    if (users) {
                        console.log(users);
                        let childTable = [];
                        for (user of users) {
                            //user.update({stix_tag_e: 'E'});
                            childTable.push(user.dataValues);
                        }
                        event_tableInfos = {tableName: event_tableName, tableData: _.cloneDeep(childTable)};
                    }
                    else {console.log("실패")}
                });
                if (rslt instanceof Error) {
                    throw new rslt;
                }
                winston.info("********************************************************************************");
                winston.info("*******************query end *************************");
            });

            console.log(event_tableInfos);
            KeyChange.KeyChange_event(event_tableInfos.tableData);
            stixInsert.ParseandInsert(event_tableInfos);
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