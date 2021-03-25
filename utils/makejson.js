const confirmutils = require('./confirmutils');
const rescodes = require('./rescodes');
const _ = require('loadsh');
const winston = require('../config/winston')(module);
const setDateTime = require('./setDateTime');

module.exports.makeReqData = function (id){
    let reqData = {};
    let reqBody = {};

    const time = setDateTime.setDateTime();

    const reqHeaderData = {"message_id": id, "keeper_id": process.env.KEEPER_ID, "send_time": time};
    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_H004 = function (id, policy_type){
    let reqData = {};
    let reqBody = {"policy_type": policy_type };

    const time = setDateTime.setDateTime();

    const reqHeaderData = {"message_id": id, "keeper_id": process.env.KEEPER_ID, "send_time": time};
    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_H008 = function (id, body){
    let reqData = {};
    let reqBody = body;

    const time = setDateTime.setDateTime();

    const reqHeaderData = {"message_id": id, "keeper_id": process.env.KEEPER_ID, "send_time": time};
    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_L001 = function (id){
    let reqData = {};

    const time = setDateTime.setDateTime();

    const reqHeaderData = {"message_id": id, "logger_id": ''};
    const reqBody = {"loged_start_time": time, "loged_end_time": time};

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_L002 = function (id){
    let reqData = {};

    const reqHeaderData = {"message_id": id, "logger_id": ''};
    const reqBody = {"format_array": ''};

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_L003 = function (id){
    let reqData = {};

    const reqHeaderData = {"message_id": id, "logger_id": ''};
    const reqBody = {"plant_id_array": '', "device_id_array": ''};

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeResData = function (err, req){
    let resData={};
    let resBody={};
    const reqHeaderData = _.cloneDeep(req.body.header);
    if(!err){
        resBody = {"result":{"res_cd":"00","res_msg":"정상처리"}};
    }else{
        let errMessage;
        let errResult;
        try{
            errMessage = JSON.parse(err.message);
            if(errMessage.res_cd){
                errResult = errMessage;
            }else{
                errResult = {"res_cd":"99"};
            }
        }catch (e) {
            winston.error(err.stack, {e});
            errResult = {"res_cd":"99"};
        }

        resBody["result"] = errResult;
        resBody.result["res_msg"] = rescodes[resBody.result.res_cd];
    }
    resData.header = reqHeaderData;
    resData.body = resBody;
    return resData;
};