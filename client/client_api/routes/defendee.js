const express = require('express');
const router = express.Router();
var connector = require('../watch/connector');
const multer = require('multer');
const moment = require('moment');
require('dotenv').config();
const path = require('path');
/* @author Wanggyu, suh
   @dev need to use library for preventing sql injection
*/
router.post('/isCopyrighter', async function(req, res, next){
    let [result] = await connector.query(
        'select name from copyrighter where address = "' +
        req.body.address + '";'
    );
    res.status(200).json({'result':result});
});


router.post('/copyrighter', async function(req, res, next){
    let [result] = await connector.query(
        'select copyrighter.name as copyrighterName, defendee.name as defendeeName,' + 
        ' logo, rewardAmount, rating, inspectCount, imgdist, detailed, mode from copyrighter, defendee '
        +'where address = copyrighterAddress and address = "' +
        req.body.address + '";'
    );
    
    res.status(200).json({'result':result});
});


router.post('/search',async function(req, res, next){
    let [result] = await connector.query(
    'select defendee.name as name, copyrighter.name as copyrighterName, imgdist, rewardAmount, detailed, logo ' +
    'from defendee, copyrighter where copyrighterAddress = address and (defendee.name like "%' +
    req.body.searchName + '%" or copyrighter.name like "%'+ req.body.searchName +'%");');
    res.status(200).json({'result':result});
    
});

router.post('/search/address',async function(req, res, next){
    let [result] = await connector.query(
    'select defendee.name as name, copyrighter.name as copyrighterName, imgdist, rewardAmount, detailed, logo ' +
    'from defendee, copyrighter where copyrighterAddress = address and address= "' +req.body.searchName + '";');
    res.status(200).json({'result':result});
});






router.post('/address',  async function(req, res, next){
    try{
		let [result] = await connector.query(
			'update defendee set detailed = "'+ req.body.detailed + '" where name = "'+ req.body.name +'";');
		res.status(200).json({'result':result});
	}
	catch(e) {
		console.log(e);	
	}
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/');  // 파일이 저장되는 경로입니다.
    },
    filename: function(req, file, cb) {
      cb(null,  new Date().valueOf() + path.extname(file.originalname));  // 저장되는 파일명
    }
});

const upload = multer({ storage: storage });

router.post('/img', upload.single('file'), async function(req, res, next){
    try{
		let [result] = await connector.query(
			'update defendee set imgdist = "'+ process.env.ME + req.file.filename + '" where name = "'+ req.body.name +'";');
		res.status(200).json({'result':result});
	} catch(e) {
		console.log(e);	
	}
});

router.post('/selectPicture', async function(req,res,next){
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
    res.status(200).json({'result':result});
    
});

router.post('/searchFollowed',async function(req, res, next){
    let [result] = await connector.query(
    'select defendee.name as name, copyrighter.name as copyrighterName, imgdist, rewardAmount, detailed, logo ' +
    'from defendee, copyrighter where copyrighterAddress = address and (defendee.name like "%' +
    req.body.searchName + '%" or copyrighter.name like "%'+ req.body.searchName +'%") ' +
    'order by rewardAmount DESC limit 3'+';');
    res.status(200).json({'result':result});
    
});


module.exports = router;
