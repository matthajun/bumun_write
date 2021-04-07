const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const makejson = require('../utils/makejson');

const sequelize = require('sequelize');
const db = require('../models');

exports.SelectTransmit = () => {
    schedule.scheduleJob('*/5 * * * *', function() {
        const tableName = process.env.STIX_ANOMALY;

        const result = db.sequelize.transaction(async (t) => {
            let rslt = await db[tableName.toUpperCase()].findAll({where: {trans_tag : 'C'}}).then(users => {
                if(users){
                    for (user of users) {
                        user.update({trans_tag: 'E'});
                        let selectedData = user.dataValues;

                        let value = makejson.makeSTIXData_anomaly(selectedData);

                        let options = {
                            uri: process.env.SANGWI_ADDRESS,
                            method: 'POST',
                            body: value,
                            json: true
                        };
                        //console.log(options);
                        httpcall.httpReq(options, async function (err, res) {
                            if (result instanceof Error) {
                                throw new Error(result);
                            }
                        });
                    }
                }
            });
            if(rslt instanceof Error){
                throw new rslt;
            }
        });
    })
};