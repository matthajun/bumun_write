const sequelize = require('sequelize');
const db = require('../models');

module.exports.KeyChange_event = function (table) {
    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[0].replace("message_id", "flag");
        obj[key] = obj[keys[0]];
        delete obj["message_id"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[16].replace("packet_time", "timeAgent");
        obj[key] = obj[keys[16]];
        delete obj["packet_time"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[0].replace("keeper_id", "nameAgent");
        obj[key] = obj[keys[0]];
        delete obj["keeper_id"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[3].replace("make_id", "idOrganizationAgent");
        obj[key] = obj[keys[3]];
        delete obj["make_id"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[12].replace("payload", "original");
        obj[key] = obj[keys[12]];
        delete obj["payload"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[3].replace("anomaly_type", "nameAttack");
        obj[key] = obj[keys[3]];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[6].replace("src_ip", "ipAttacker");
        obj[key] = obj[keys[6]];
        delete obj["src_ip"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[8].replace("dst_ip", "ipVictim");
        obj[key] = obj[keys[8]];
        delete obj["dst_ip"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[6].replace("src_mac", "macAttacker");
        obj[key] = obj[keys[6]];
        delete obj["src_mac"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[7].replace("dst_mac", "macVictim");
        obj[key] = obj[keys[7]];
        delete obj["dst_mac"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[6].replace("src_port", "portAttacker");
        obj[key] = obj[keys[6]];
        delete obj["src_port"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[6].replace("dst_port", "portVictim");
        obj[key] = obj[keys[6]];
        delete obj["dst_port"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[4].replace("protocol_type", "protocol");
        obj[key] = obj[keys[4]];
        delete obj["protocol_type"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[3].replace("anomaly_type", "levelRisk");
        obj[key] = obj[keys[3]];
        delete obj["anomaly_type"];
    });

    table.forEach(obj => {
        var i = 0;
        var keys = Object.keys(obj);
        for (key of keys) {
            delete obj[key];
            i++;
            if (i == 7) break;
        }
    });

};

module.exports.KeyChange_anomaly = function (table) {
  /*  table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[0].replace("message_id", "flag");
        obj[key] = obj[keys[0]];
        delete obj["message_id"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[16].replace("packet_time", "timeAgent");
        obj[key] = obj[keys[16]];
        delete obj["packet_time"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[0].replace("keeper_id", "nameAgent");
        obj[key] = obj[keys[0]];
        delete obj["keeper_id"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[3].replace("make_id", "idOrganizationAgent");
        obj[key] = obj[keys[3]];
        delete obj["make_id"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[12].replace("payload", "original");
        obj[key] = obj[keys[12]];
        delete obj["payload"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[0].replace("send_time", "timeStart");
        obj[key] = obj[keys[0]];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[0].replace("send_time", "timeEnd");
        obj[key] = obj[keys[0]];
        delete obj["send_time"];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[2].replace("anomaly_type", "score");
        obj[key] = obj[keys[2]];
    });

    table.forEach(obj => {
        var keys = Object.keys(obj);
        var key = keys[2].replace("anomaly_type", "category");
        obj[key] = obj[keys[2]];
    });


    table.forEach(obj => {
        var i = 0;
        var keys = Object.keys(obj);
        for (key of keys) {
            delete obj[key];
            i++;
            if (i == 13) break;
        }
    });

 */
};
