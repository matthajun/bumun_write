const winston = require('../config/winston')(module);
const sequelize = require('sequelize');
const db = require('../models');

const {ClickHouse} = require('clickhouse');
const clickhouse = new ClickHouse({
    url: process.env.CH_ADDRESS,
    port: 8125,
    debug: false,
    basicAuth: null,
    isUseGzip: false,
    format: "json",
    config: {
        session_timeout                         : 30,
        output_format_json_quote_64bit_integers : 0,
        enable_http_compression                 : 0,
        database                                : 'dti',
    },
});

module.exports.parseAndInsert = async function(req) {
    let Array = req.body.tableData;
    let queries = [];
    const tableName = req.body.tableName;

    for(let value of Array){
        const contents = Object.values(req.body.tableData);

        const query = `insert into dti.${tableName} VALUES (\'${contents}\')`;
        queries.push(query);
    }

    let rtnResult = {};
    try {

        const trans = await db.sequelize.transaction(async (t) => {
            winston.info("********************************************************************************");
            winston.info("******************* CH query start *************************");
            for (const query of queries) {
                const r = await clickhouse.query(query).toPromise();
            }
            winston.info("********************************************************************************");
            winston.info("******************* CH query end *************************");
        })

    } catch (error) {
        winston.error(error.stack);
        rtnResult = error;
    } finally {
        return rtnResult;
    }
};