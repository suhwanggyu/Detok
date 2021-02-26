const express = require('express');
const router = express.Router();
var Web3 = require("web3");
require('dotenv').config();
let web3 = new Web3(process.env.RPC);
const fs = require('fs');





//let jud = judge.deployed();

router.post('/', function(req, res, next){
    console.log(req.body.type);
    const jsonfile = "./contracts/" + req.body.type + ".json";
    let parsed = JSON.parse(fs.readFileSync(jsonfile));
    res.status(200).json(parsed);
});


module.exports = router;