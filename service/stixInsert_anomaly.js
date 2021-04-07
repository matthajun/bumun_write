const winston = require('../config/winston')(module);
const sequelize = require('sequelize');
const db = require('../models');
const schedule = require('node-schedule');
const _ = require('loadsh');
const KeyChange = require('../utils/KeyChange');

const stixInsert = require('./stixInsert');
const {QueryTypes} = require('sequelize');

module.exports.searchAndInsert = async function() {
    schedule.scheduleJob('10 */5 * * * *', async function () {
        let rtnResult = {};
        try {
            const tableName = process.env.H007;
            const stix_amly= process.env.STIX_ANOMALY;

            let tableInfos = [];

            const result = await db.sequelize.transaction(async (t) => {
                winston.info("********************************************************************************");
                winston.info("*******************query start *************************");
                let rslt = await db.sequelize.query(
                    'select * from kdn_amly_H007 ' +
                    'inner join stix_anomaly_ip on kdn_amly_H007.make_id = stix_anomaly_ip.make_id ' +
                    'inner join stix_anomaly_type on kdn_amly_H007.anomaly_type = stix_anomaly_type.anomaly_type ' +
                    'where trans_tag_a= \'C\' '
                    ,{
                        type: QueryTypes.SELECT
                    }
                ).then(async users =>{
                    let results = {tableName: stix_amly, tableData: users};
                    KeyChange.KeyChange_anomaly(results);
                    stixInsert.ParseandInsert(results);
                    let rt = await db[tableName.toUpperCase()].update({trans_tag_a: 'E'},
                        {
                            where: {
                                trans_tag_a: 'C'
                            }
                        });
                    if(rt instanceof Error){
                        throw new rt;
                    }
                });

                if (rslt instanceof Error) {
                    throw new rslt;
                }
                winston.info("********************************************************************************");
                winston.info("*******************query end *************************");
            });

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