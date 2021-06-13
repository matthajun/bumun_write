var moment = require('moment');

module.exports.setDateTime = function () {
    return moment().format("YYYYMMDDHHmmss");
};

module.exports.setDateTimeforHistory = function () {
    return moment().format("YYYY.MM.DD, HH:mm:ss");
};