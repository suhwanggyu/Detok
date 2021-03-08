const express = require('express');
const router = express.Router();
var connector = require('../watch/connector');
var dns = require('dns');
const url = require('url');

router.post('/ip', function(req,res,next){
    let parse = url.parse(req.body.domain);
    console.log(parse);
    dns.lookup(parse.hostname, async function (err, addresses, family) {
        if(err) res.status(400).json({'ip':"fail", 'family':"fail"});
        else{
            let [result] = await connector.query(
                'insert into reporttmp values ("' + parse.href + '","' 
                + req.body.name +'","'+ req.body.keyword +'");'
            );

            res.status(200).json({'ip':addresses, 'family':family});
        }
    });
});

router.post('/judgeTarget', async function(req, res, next) {
    let [result] = await connector.query(
        'select * from report, copyrighter,defendee where step = 2 and address = "' + req.body.myAddress + '" and ' +
        'defendee.copyrighterAddress = address and report.defendeeName = defendee.name;'
    );
    let [defendeeName] = await connector.query(
        'select name from defendee where copyrighterAddress = "' + req.body.myAddress + '";'
    );
    if(result !== undefined){
        res.status(200).json({'result':result, 'defendee':defendeeName});
    }
    else{
        res.status().json({'result':undefined});
    }
});


/*
router.post('/judgeTmp', async function(req, res, next) {
    let [target] = await connector.query(
        'select id from report where defendeeName = "' +
        req.body.defendeeName + '" and domain = "' +
        req.body.domain + '";'
    );
    if(req.body.decision){
        let [result] = await connector.query(
            'update report set step = 3 where id = ' + target[0]['id'] +';'
        );
    }
    else{
        let [result] = await connector.query(
            'update report set step = 0 where id = ' + target[0]['id'] +';'
        );
    }
    res.status(200).json({});
});*/
module.exports = router;