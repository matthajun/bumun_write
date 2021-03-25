const CRC32 = require('crc-32');

module.exports.makeConfirmCode  = function (strData){
    return CRC32.str('"body":' + strData).toString(16);
};
