const winston = require('../config/winston')(module);
const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const makejson = require('../utils/makejson');

const sequelize = require('sequelize');
const db = require('../models');
const setTime = require('../utils/setDateTime');

exports.SelectTransmit = () => {
    schedule.scheduleJob('7 * * * * *', function() {
        const tableName = process.env.STIX_STATE;

        const result = db.sequelize.transaction(async (t) => {
            let rslt = await db[tableName.toUpperCase()].findAll({where: {trans_tag : 'C'}}).then(users => {
                if(users){
                    for (user of users) {
                        user.update({trans_tag: 'E'});
                        let selectedData = user.dataValues;
                        let value = makejson.makeSTIXData_state(selectedData);
                        let options = {
                            uri: process.env.SANGWI_ADDRESS,
                            method: 'POST',
                            body: value,
                            json: true
                        };
                        httpcall.httpReq(options, async function (err) {
                            let data = {
                                date_time: setTime.setDateTimeforHistory(),
                                tableName: 'State',
                                tableData: JSON.stringify(value)
                            };
                            await db['MOTIE_STIX_HISTORY'].create(data);
                        });
                    }
                }
            });
            if(rslt instanceof Error){
                throw new Erroe(rslt);
            }
        });
    })
};