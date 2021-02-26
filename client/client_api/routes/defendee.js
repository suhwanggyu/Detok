const express = require('express');
const router = express.Router();
var connector = require('../watch/connector');

/* @author Wanggyu, suh
   @dev need to use library for preventing sql injection
*/
router.post('/isCopyrighter', async function(req, res, next){
    let [result] = await connector.query(
        'select name from copyrighter where address = "' +
        req.body.address + '";'
    );
    console.log(result);
    res.status(200).json({'result':result});
});


router.post('/copyrighter', async function(req, res, next){
    let [result] = await connector.query(
        'select copyrighter.name as copyrighterName, defendee.name as defendeeName,' + 
        ' logo, rewardAmount, rating, inspectCount, imgdist, detailed, mode from copyrighter, defendee '
        +'where address = copyrighterAddress and address = "' +
        req.body.address + '";'
    );
    
    console.log(result);
    res.status(200).json({'result':result});
});


router.post('/search',async function(req, res, next){
    let [result] = await connector.query(
    'select defendee.name as name, copyrighter.name as copyrighterName, imgdist, rewardAmount, detailed, logo ' +
    'from defendee, copyrighter where copyrighterAddress = address and (defendee.name like "%' +
    req.body.searchName + '%" or copyrighter.name like "%'+ req.body.searchName +'%");');
    console.log(result);
    res.status(200).json({'result':result});
    
});

router.post('/selectPicture',async function(req,res,next){
    if(req.body.searchName){
        let [result] = await connector.query(
            'select imgdist from defendee where name = "' +
            req.body.searchName + '";'
        );
        if(result[0]['imgdist'] !==''){
            res.json({'dist':result[0]['imgdist']});
        }
    }
    
});

router.post('/searchOrdered',async function(req, res, next){
    let [result] = await connector.query(
    'select defendee.name as name, copyrighter.name as copyrighterName, imgdist, rewardAmount, detailed, logo ' +
    'from defendee, copyrighter where copyrighterAddress = address and (defendee.name like "%' +
    req.body.searchName + '%" or copyrighter.name like "%'+ req.body.searchName +'%") ' +
    'order by rewardAmount DESC limit 3'+';');
    console.log(result);
    res.status(200).json({'result':result});
    
});

router.post('/searchFollowed',async function(req, res, next){
    let [result] = await connector.query(
    'select defendee.name as name, copyrighter.name as copyrighterName, imgdist, rewardAmount, detailed, logo ' +
    'from defendee, copyrighter where copyrighterAddress = address and (defendee.name like "%' +
    req.body.searchName + '%" or copyrighter.name like "%'+ req.body.searchName +'%") ' +
    'order by rewardAmount DESC limit 3'+';');
    console.log(result);
    res.status(200).json({'result':result});
    
});


module.exports = router;