const sequelize = require('sequelize');
const db = require('../models');

module.exports.KeyChange_event = function (table) {
    for(let k of table.tableData){
        Object.defineProperty(k, 'flag',
            Object.getOwnPropertyDescriptor(k, 'message_id'));
        delete k['message_id'];

        Object.defineProperty(k, 'timeAgent',
            Object.getOwnPropertyDescriptor(k, 'packet_time'));
        delete k['packet_time'];

        Object.defineProperty(k, 'ipAgent',
            Object.getOwnPropertyDescriptor(k, 'device_ip'));
        delete k['device_ip'];

        Object.defineProperty(k, 'nameAgent',
            Object.getOwnPropertyDescriptor(k, 'keeper_id'));
        delete k['keeper_id'];

        Object.defineProperty(k, 'vendorAgent',
            Object.getOwnPropertyDescriptor(k, 'make_id'));
        delete k['make_id'];

        Object.defineProperty(k, 'idOrganizationAgent',
            Object.getOwnPropertyDescriptor(k, 'unit_id'));
        delete k['unit_id'];

        Object.defineProperty(k, 'original',
            Object.getOwnPropertyDescriptor(k, 'payload'));
        delete k['payload'];

        Object.defineProperty(k, 'nameAttack',
            Object.getOwnPropertyDescriptor(k, 'anomaly_type'));

        Object.defineProperty(k, 'ipAttacker',
            Object.getOwnPropertyDescriptor(k, 'src_ip'));
        delete k['src_ip'];

        Object.defineProperty(k, 'ipVictim',
            Object.getOwnPropertyDescriptor(k, 'dst_ip'));
        delete k['dst_ip'];

        Object.defineProperty(k, 'macAttacker',
            Object.getOwnPropertyDescriptor(k, 'src_mac'));
        delete k['src_mac'];

        Object.defineProperty(k, 'macVictim',
            Object.getOwnPropertyDescriptor(k, 'dst_mac'));
        delete k['dst_mac'];

        Object.defineProperty(k, 'portAttacker',
            Object.getOwnPropertyDescriptor(k, 'src_port'));
        delete k['src_port'];

        Object.defineProperty(k, 'portVictim',
            Object.getOwnPropertyDescriptor(k, 'dst_port'));
        delete k['dst_port'];

        Object.defineProperty(k, 'protocol',
            Object.getOwnPropertyDescriptor(k, 'protocol_type'));
        delete k['protocol_type'];

        Object.defineProperty(k, 'levelRisk',
            Object.getOwnPropertyDescriptor(k, 'anomaly_type'));
        delete k['anomaly_type'];

        delete k['no']; delete k['send_time']; delete k['confirm_code'];  delete k['protocol_detail']; delete k['packet_code'];
        delete k['date_time']; delete k['trans_tag_e']; delete k['trans_tag_a']; delete k['device_mac'];
    }

};

module.exports.KeyChange_anomaly = function (table) {
    for(let k of table.tableData) {
        Object.defineProperty(k, 'category',
            Object.getOwnPropertyDescriptor(k, 'anomaly_type'));

        Object.defineProperty(k, 'ipAgent',
            Object.getOwnPropertyDescriptor(k, 'device_ip'));
        delete k['device_ip'];

        Object.defineProperty(k, 'flag',
            Object.getOwnPropertyDescriptor(k, 'message_id'));
        delete k['message_id'];

        Object.defineProperty(k, 'timeStart',
            Object.getOwnPropertyDescriptor(k, 'send_time'));
        delete k['send_time'];

        Object.defineProperty(k, 'timeEnd',
            Object.getOwnPropertyDescriptor(k, 'timeStart'));

        Object.defineProperty(k, 'score',
            Object.getOwnPropertyDescriptor(k, 'anomaly_type'));
        delete k['anomaly_type'];

        Object.defineProperty(k, 'idOrganizationAgent',
            Object.getOwnPropertyDescriptor(k, 'unit_id'));
        delete k['unit_id'];

        Object.defineProperty(k, 'vendorAgent',
            Object.getOwnPropertyDescriptor(k, 'make_id'));
        delete k['make_id'];

        Object.defineProperty(k, 'nameAgent',
            Object.getOwnPropertyDescriptor(k, 'keeper_id'));
        delete k['keeper_id'];

        Object.defineProperty(k, 'original',
            Object.getOwnPropertyDescriptor(k, 'payload'));
        delete k['payload'];

        Object.defineProperty(k, 'timeAgent',
            Object.getOwnPropertyDescriptor(k, 'packet_time'));
        delete k['packet_time'];

        delete k['no']; delete k['confirm_code']; delete k['make_id']; delete k['protocol_type']; delete k['protocol_detail']; delete k['src_ip']; delete k['src_mac']; delete k['src_port'];
        delete k['dst_ip']; delete k['dst_mac']; delete k['dst_port']; delete k['packet_code']; delete k['date_time']; delete k['trans_tag_e']; delete k['trans_tag_a'];
    }
};

module.exports.KeyChange_state = function (table) {
    for (let k of table.tableData){
        Object.defineProperty(k, 'flag',
            Object.getOwnPropertyDescriptor(k, 'message_id'));
        delete k['message_id'];

        Object.defineProperty(k, 'nameAgent',
            Object.getOwnPropertyDescriptor(k, 'keeper_id'));
        delete k['keeper_id'];

        Object.defineProperty(k, 'timeAgent',
            Object.getOwnPropertyDescriptor(k, 'send_time'));
        delete k['send_time'];

        delete k['confirm_code']; delete k['date_time']; delete k['trans_tag_s'];
    }
};