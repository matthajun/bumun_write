const winston = require('../config/winston')(module);
const setDateTime = require('../utils/setDateTime');

const {ClickHouse} = require('clickhouse');
const clickhouse = new ClickHouse({
    host: process.env.CH_ADDRESS,
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

const tableName = process.env.CH_L005;

module.exports.parseAndInsert = async function(req) {
    let queries = [];

    for (let value of req.body.tableData) {
        value.date_time = setDateTime.setDateTime();

        const contents = `${value.message_id}` + '\',\'' + `${value.tid}` + '\',\'' + `${value.normal_seq}` + '\',\'' + `${value.plant_id}` + '\',\'' + `${value.plant_name}`
            + '\',\'' + `${value.machine_no}` + '\',\'' + `${value.manufacturer_name}` + '\',\'' + `${value.log_type}` + '\',\'' + `${value.log_category}`
            + '\',\'' + `${value.format}` + '\',\'' + `${value.device_id}` + '\',\'' + `${value.device_name}` + '\',\'' + `${value.loged_time}` + '\',\'' + `${value.event_level}`
            + '\',\'' + `${value.type01}` + '\',\'' + `${value.type02}` + '\',\'' + `${value.type03}` + '\',\'' + `${value.code01}` + '\',\'' + `${value.code02}`
            + '\',\'' + `${value.code03}` + '\',\'' + `${value.value01}` + '\',\'' + `${value.value02}` + '\',\'' + `${value.value03}`
            + '\',\'' + `${value.value04}` + '\',\'' + `${value.value05}` + '\',\'' + `${value.value06}` + '\',\'' + `${value.value07}`
            + '\',\'' + JSON.stringify(value.event_info) + '\',\'' + `${value.stat_time}` + '\',\'' + `${value.sent_time}` + '\',\'' + `${value.date_time}`;

        const query = `insert into dti.${tableName} VALUES (\'${contents}\')`;
        queries.push(query);
    }



    let rtnResult = {};
    try {

        winston.info("******************* CH query start *************************");
        for (const query of queries) {
            const r = await clickhouse.query(query).toPromise();
        }
        winston.info("******************* CH query end *************************");

    } catch (error) {
        winston.error(error.stack);
        rtnResult = error;
    } finally {
        return rtnResult;
    }
};