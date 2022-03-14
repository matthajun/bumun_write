const express = require('express');
const router = express.Router();
const winston = require('../config/winston')(module);
const makejson = require('../utils/makejson');

const reqInsert = require('../service/reqInsert');
const H007 = require('../clickhouse/H007');
const I002 = require('../clickhouse/I002');

const result_Insert = require('../clickhouse/corr_result_Insert');
const prep_Insert = require('../clickhouse/corr_prep_Insert');
const log = require('../clickhouse/log_Insert');
const packet = require('../clickhouse/packet_Insert');
const op_prep = require('../clickhouse/op_prep_Insert');
const op_result = require('../clickhouse/op_result_Insert');
const history = require('../clickhouse/history_Insert');

const policyInsert = require('../service/policyInsert');
const communiInsert = require('../service/communiInsert');
const signaureInsert = require('../service/signatureInsert');
const logInsert = require('../service/logInsert');
const assetInsert = require('../service/assetInsert');
const assetIpInsert = require('../service/assetIpInsert');
const dataRequestInsert = require('../service/dataRequestInsert');

const ruleSingle = require('../service/ruleSingleInsert');
const ruleMulti = require('../service/ruleMultiInsert');
const ruleMap = require('../service/ruleMapInsert');

const confirmutils = require('../utils/confirmutils');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.DOWNLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const uploader = multer({storage: storage});

const L005 = require('../clickhouse/L005');
const L009 = require('../clickhouse/L009');

router.post('/v1', async (req, res, next) => {
    try {
        let tableName = req.body.tableName;
        let tableData = req.body.tableData;
        winston.debug("*************** Received tableName : " + tableName);

        if(tableName !== 'motie_ai_op_result'){
            winston.debug(JSON.stringify(req.body));
        }

        let result =  {};

        //confirm_code check 실행
        const reqData = req.body;
        const reqConfirmCode = reqData.confirm_code;
        const localMakeConfirmCode = await confirmutils.makeConfirmCode(reqData.tableData);

        if (reqConfirmCode !== localMakeConfirmCode) {
            winston.error(`우리쪽 값 ${localMakeConfirmCode} ,  받은 값 ${reqConfirmCode}`);
            const errCode = "93";
            throw Error(`{"res_cd":"${errCode}"}`);
        }

        switch (tableName) {
            case 'motie_manag_I002':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await I002.parseAndInsert(req);
                break;

            case 'motie_ai_corr_result_v2':
                result = await result_Insert.parseAndInsert(req);
                break;

            case 'motie_ai_corr_prep_v2':
                result = await prep_Insert.parseAndInsert(req);
                break;

            case 'motie_ai_single_log':
                result = await log.parseAndInsert(req);
                break;

            case 'motie_ai_single_packet':
                result = await packet.parseAndInsert(req);
                break;

            case 'motie_ai_op_prep':
                result = await op_prep.parseAndInsert(req);
                break;

            case 'motie_ai_op_result':
                result = await op_result.parseAndInsert(req);
                break;

            case 'motie_ai_history':
                result = await history.parseAndInsert(req);
                break;

            case 'black_white_list':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await policyInsert.parseAndInsert(req);
                break;

            case 'communi_white_list':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await communiInsert.parseAndInsert(req);
                break;

            case 'motie_signature':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await signaureInsert.parseAndInsert(req);
                break;

            case 'motie_log_system':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await logInsert.parseAndInsert(req);
                break;

            case 'motie_asset':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await assetInsert.parseAndInsert(req);
                break;

            case 'motie_asset_ip':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await assetIpInsert.parseAndInsert(req);
                break;

            case 'motie_data_request':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await dataRequestInsert.parseAndInsert(req);
                break;

            case 'motie_rule_single':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await ruleSingle.parseAndInsert(req);
                break;

            case 'motie_rule_multi':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await ruleMulti.parseAndInsert(req);
                break;

            case 'motie_rule_mapping':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await ruleMap.parseAndInsert(req);
                break;


                //단-부 트랜잭션 데이터 들어올 시
            case 'MOTIE_FAIL_H007':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await H007.parseAndInsert(req);
                break;

            case 'MOTIE_FAIL_L005':
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await L005.parseAndInsert(req);
                break;

            case 'MOTIE_FAIL_L009':
                req.body.tableName = process.env.CH_L009;
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await L009.parseAndInsert(req);
                break;

            case 'MOTIE_FAIL_L011':
                req.body.tableName = process.env.CH_L011;
                winston.debug("*************** Received Data : " + JSON.stringify(tableData));
                result = await L009.parseAndInsert(req);
                break;


            default:
                result = await reqInsert.parseAndInsert(req);
                break;
        }

        if(result instanceof Error){   //Insert가 안되었을때
            throw new Error(result);
        }else{  //우선은 응답을 날리지만, 필요 없을 부분일 것으로 생각 됨
            res.json(makejson.makeResData(null,req));
        }

    } catch (err) {
        next(err);
    }
});

router.post('/pcap', uploader.single('my_file'), async (req, res, next)=> {
    try {
        let result = {};

        winston.info('******************** pcap 파일을 수신하여 저장합니다. file is downloading.********************');
        winston.info(req.file.filename);

        if(result instanceof Error){
            throw new Error(result);
        }else{
            res.json({error:false});
        }

    } catch(err) {
        res.json({error:true});
        next(err);
    }
});

module.exports = router;
