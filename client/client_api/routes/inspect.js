var express = require('express');
var router = express.Router();
var connector = require('../watch/connector');

/* GET users listing. */
router.post('/', async function(req, res, next) {
    let [result] = await connector.query(
        'select count(*) from inspector where address = "' +
        req.body.address + '";'
    );
    if(result[0]['count(*)'] == 1)  
        res.status(200).json({'isInspector':true});
    else
        res.status(200).json({'isInspector':false});
});


router.post('/inspectTarget', async function(req, res, next) {
    let [result] = await connector.query(
        'select domain, defendeeName, imgdist, rewardAmount, defendee.detailed, copyrighter.name as copyrighterName, logo from report, defendee, copyrighter ' +
        'where step = 1 and copyrighterAddress = address and ' +  
        'defendee.name = defendeeName and reporterAddress != "' + req.body.myAddress + '" and id not in ' +
        '(select reportid from inspect where inspectorAddress = "' + req.body.myAddress +'") ' + 
        'and id not in (select reportid from inspecttmp where address = "' + req.body.myAddress + '") '
        +'order by rand() limit 1'
    );
    if(result[0] !== undefined){
        res.status(200).json({'result':result});
    }
    else{
        res.status(404).json({});
    }
});

router.post('/inspectTmp', async function(req, res, next){
    let [target] = await connector.query(
        'select id from report where defendeeName = "' +
        req.body.defendeeName + '" and domain = "' +
        req.body.domain + '";'
    );
    let [result] = await connector.query(
        'insert into inspecttmp values ("' + req.body.address + '",' 
        + target[0]['id'] +');'
    );
    res.status(200).json({});
})

router.post('/inspectorInfo', async function(req,res,next){
    let [target] = await connector.query(
        'select rate from inspector where address = "' + req.body.myAddress + '";'
    );
    if(target[0] !== undefined){
        let tier = "Defender";
        switch ( true ) {
            case target[0]['rate'] < 10000:
                tier = "Hypocrite";
                break;
            case target[0]['rate'] < 20000:
                tier = "Normal";
                break;
            case target[0]['rate'] < 30000:
                tier = "Defender";
                break;
            case target[0]['rate'] < 40000:
                tier = "Superior";
                break;
            case target[0]['rate'] < 50000:
                tier = "Diamond";
                break;
            case target[0]['rate'] < 60000:
                tier = "Prosecutor";
                break;
            default:
                tier = "Guardian";
                break;
        }
        res.status(200).json({'rate':tier});
    }
    else
        res.status(404).json({});
})
module.exports = router;
