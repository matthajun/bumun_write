const winston = require('../config/winston')(module);

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
        const contents = `${value.message_id}`+'\',\''+`${value.keeper_id}`+'\',\''+`${value.send_time}`+'\',\''+`${value.unit_id}`
            +'\',\''+`${value.make_id}`+'\',\''+`${value.anomaly_type}`+'\',\''+`${value.protocol_type}`+'\',\''+`${value.protocol_detail}`+'\',\''+`${value.src_ip}`+'\',\''+`${value.src_mac}`
            +'\',\''+`${value.src_port}`+'\',\''+`${value.dst_ip}`+'\',\''+`${value.dst_mac}`+'\',\''+`${value.dst_port}`+'\',\''+`${value.payload}`+'\',\''+`${value.packet_code}`
            +'\',\''+`${value.policy_name}`+'\',\''+`${value.packet_time}` +'\',\''+`${value.event_time}`+'\',\''+`${value.date_time}`;

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