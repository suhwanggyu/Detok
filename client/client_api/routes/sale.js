var express = require('express');
var router = express.Router();
var connector = require('../watch/connector');
var moment = require('moment');


router.post('/list',async function (req, res, next){
    console.log("list searching...")
    let [result] = await connector.query(
        'select itemId, sellerAddress, sellerName, detailed, tokenamount, logo from saleitems where sellerName like "' +
        req.body.name + '%";'
    );
    console.log(result);
    res.status(200).json({'result':result});
});

router.post('/buy',async function (req, res, next){
    console.log("Buy item");
    console.log(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    let [result] = await connector.query(
        'insert into ordered(`customerAddress`, `sellId`, `buyDate`, `decision`, `userId`) values ("' 
        + req.body.orderAddress + '",' + req.body.itemId +',"' +
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + '",1,"'+req.body.userId + '");'
    );
    console.log(result);
    res.status(200).json({});
});

router.post('/cancel',async function (req, res, next){
    console.log("Buy item");
    console.log(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    let [result] = await connector.query(
        'insert into ordered(`customerAddress`, `sellId`, `buyDate`, `decision`, `userId`) values ("' 
        + req.body.orderAddress + '",' + req.body.itemId +',"' +
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss") + '",0,"'+req.body.userId + '");'
    );
    console.log(result);
    res.status(200).json({});
});




module.exports = router;