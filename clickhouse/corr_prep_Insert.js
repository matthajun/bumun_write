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
        const contents = `${value.version}`+'\',\''+`${value.hash}`+'\',\''+`${value.message_id}`+'\',\''+`${value.plant_id}`
            +'\',\''+`${value.plant_name}`+'\',\''+`${value.machine_no}`+'\',\''+`${value.manufacturer_name}`+'\',\''+`${value.log_type}`+'\',\''+`${value.log_category}`
            +'\',\''+`${value.format}`+'\',\''+`${value.device_id}`+'\',\''+`${value.device_name}`+'\',\''+`${value.loged_time}`+'\',\''+`${value.event_level}`+'\',\''+`${value.type01}`
            +'\',\'' +`${value.type02}`+'\',\''+`${value.type03}`+'\',\''+`${value.code01}`+'\',\''+`${value.code02}`+'\',\''+`${value.code03}`
            +'\',\'' +`${value.value01}`+'\',\''+`${value.value02}`+'\',\''+`${value.value03}`+'\',\''+`${value.value04}`+'\',\''+`${value.value05}`
            +'\',\'' +`${value.value06}`+'\',\''+`${value.value07}`+'\',\''+`${value.event_info}`+'\',\''+`${value.stat_time}`+'\',\''+`${value.sent_time}`
            +'\',\'' +`${value.date_time}`+'\',\''+`${value.time}`+'\',\''+`${value.single_rule_log}`+'\',\''+`${value.ip_address}`+'\',\''+`${value.single_rule}`
            +'\',\'' +`${value.keeper_id}`+'\',\''+`${value.send_time}`+'\',\''+`${value.unit_id}`+'\',\''+`${value.make_id}`+'\',\''+`${value.anomaly_type}`
            +'\',\'' +`${value.protocol_type}`+'\',\''+`${value.protocol_detail}`+'\',\''+`${value.src_ip}`+'\',\''+`${value.src_mac}`+'\',\''+`${value.src_port}`
            +'\',\'' +`${value.dst_ip}`+'\',\''+`${value.dst_mac}`+'\',\''+`${value.dst_port}`+'\',\''+`${value.payload}`+'\',\''+`${value.packet_code}`
            +'\',\'' +`${value.packet_time}`+'\',\'' +`${value.single_rule_packet}` +'\',\'' +`${value.id}` ;

        const query = `insert into dti.${tableName} VALUES (\'${contents}\')`;
        queries.push(query);
    }

    let rtnResult = {};
    try {

        const trans = await db.sequelize.transaction(async (t) => {
            //console.log(queries);
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