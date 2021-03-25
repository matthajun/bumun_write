const express = require('express');
const router = express.Router();
const winston = require('../config/winston')(module);
const makejson = require('../utils/makejson');

const reqInsert = require('../service/reqInsert');

router.post('/v1', async (req, res, next) => {
    try {
        winston.debug("*************** tableName : " + req.body.tableName);
        let result =  {};
        result = await reqInsert.parseAndInsert(req);

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