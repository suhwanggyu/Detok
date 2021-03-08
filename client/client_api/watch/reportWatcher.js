let Watcher = require('./watcher');
let mysqlSavar = require ('./mysqlSaver');
require('dotenv').config();
var Web3 = require("web3");
let web3 = new Web3(process.env.RPC);
const fs = require('fs');
const { kMaxLength } = require("buffer");
const jsonfile = "./contracts/Notify.json";

async function action1(event, connector) {
    console.log("Report Detect!");
    try{
        await connector.query('insert into report(`domain`, `reporterAddress`, `judge`, `defendeeName`, `ip`, `step`, `decision`, `detailed`) values ("' + 
        web3.utils.toUtf8(event.returnValues.domain) +'","' + 
        event.returnValues.reporterAddress + '",null,"' +
        web3.utils.toUtf8(event.returnValues.defendeeName) + '","' + 
        web3.utils.toUtf8(event.returnValues.ip) + '",' + 
        1 + ',null,null);' );
    } catch(e){
        console.log(e);
    }
}


async function action2(event, connector) {
    console.log("BlackList Register Detect!");
    try{
        await connector.query('insert into blacklistIP values ("' + 
        web3.utils.toUtf8(event.returnValues.defendeeName) +'","' + 
        web3.utils.toUtf8(event.returnValues.ip) + '","' +
        event.returnValues.reporterAddress + '");'
        );
    } catch(e) {
        console.log(e);
    }
}

function watcher(connector){

    //watchReport(connector);
    
    let saver = new mysqlSavar(connector);
    saver.saveAction("ASK", action1);
    saver.saveAction("BLACK", action2);
    let tmp = new Watcher(web3);
    tmp.setContractByJson(fs.readFileSync(jsonfile));
    tmp.setSaver(saver);
    tmp.listenEvents("Reporting", "ASK");
    tmp.listenEvents("addingBlackList", "BLACK");
}



module.exports = watcher;