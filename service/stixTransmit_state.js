const winston = require('../config/winston')(module);
const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const makejson = require('../utils/makejson');

const sequelize = require('sequelize');
const db = require('../models');

exports.SelectTransmit = () => {
    schedule.scheduleJob('8 * * * * *', function() {
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
                            winston.error(err.stack);
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