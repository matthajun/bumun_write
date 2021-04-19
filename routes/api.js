const express = require('express');
const router = express.Router();
const winston = require('../config/winston')(module);
const makejson = require('../utils/makejson');

const reqInsert = require('../service/reqInsert');
const H007 = require('../clickhouse/H007');
const L005 = require('../clickhouse/L005');

router.post('/v1', async (req, res, next) => {
    try {
        let tableName = req.body.tableName;
        winston.debug("*************** tableName : " + tableName);
        let result =  {};

        switch (tableName) {
            case 'kdn_amly_H007':
                req.body.tableName = process.env.CH_H007;
                result = H007.parseAndInsert(req);
                break;

            case 'kdn_lgsys_L005':
                req.body.tableName = process.env.CH_L005;
                result = L005.parseAndInsert(req);
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