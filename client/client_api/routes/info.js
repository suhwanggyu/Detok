const express = require('express');
const router = express.Router();
const connector = require('../watch/connector');


/* @author Wanggyu, suh
 */
router.post('/searchReport',async function(req, res, next){
    let [result] = await connector.query(
    'select defendee.name as name, imgdist, rewardAmount, defendee.detailed, domain, step ' +
    'from defendee, report where  report.defendeeName = defendee.name and '
    +'reporterAddress = "'+ req.body.myAddress +'"; ');
    res.status(200).json({'result':result});
    
});

router.post('/searchInspect',async function(req, res, next){
    let [result] = await connector.query(
    'select defendee.name as name, imgdist, rewardAmount, defendee.detailed, domain, step ' +
    'from defendee, report, inspect where report.defendeeName = defendee.name and id=reportid and '
    +'InspectorAddress = "'+ req.body.myAddress +'"; ');
    res.status(200).json({'result':result});
    
});


module.exports = router;