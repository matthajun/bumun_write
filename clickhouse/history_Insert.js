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
    winston.info("******************* CH query start *************************");

    for(let value of Array) {
        const contents = `${value.model_id}` + ',\'' + `${value.model_type}` + '\',\'' + `${value.train_time}` + '\',\'' + `${value.validation_time}`
            + '\',\'' + `${value.version}` + '\',' + `${value.loss}` + ',' + `${value.epoch}` + ',[' + `${value.data_shape}`;

        const query = `insert into dti.${tableName} VALUES (${contents}])`;

        winston.info("******************* CH query start *************************");
        const r = await clickhouse.query(query).toPromise();
        winston.info("******************* CH query end *************************");
    }
};