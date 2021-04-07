const express = require('express');
const router = express.Router();
const winston = require('../config/winston')(module);
const makejson = require('../utils/makejson');

const reqInsert = require('../service/reqInsert');
const chInsert = require('../service/clickhouseInsert');

router.post('/v1', async (req, res, next) => {
    try {
        let tableName = req.body.tableName;
        winston.debug("*************** tableName : " + tableName);
        let result =  {};

        switch (tableName) {
            case 'kdn_amly_H007':
            case 'kdn_manag_I001':
            case 'kdn_manag_I002':
            case 'kdn_lgsys_L005':
                chInsert.parseAndInsert(req);
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

module.exports = router;