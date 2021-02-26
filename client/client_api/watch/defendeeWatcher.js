var Web3 = require("web3");
require('dotenv').config();
let web3 = new Web3(process.env.RPC);
const fs = require('fs');
const jsonfile = "./contracts/JudgeByMedia.json";
let parsed = JSON.parse(fs.readFileSync(jsonfile));
let abi = parsed.abi;
let judge = new web3.eth.Contract(abi, parsed.networks[5777].address);
let connWork = require('./connector_work');
const url = require('url');
function watcher(connector){
    watchRegisterCopyrighter(connector);
    watchRegisterDefendee(connector);
    watchJudge(connector);
}

function watchRegisterCopyrighter(connector){
    judge.events.RegisterCopyrighter((err,event) =>{
        console.log("Copyrighter registering Detect!");
        connector.query('insert into copyrighter(`address`,`name`,`logo`) values ("' + 
        event.returnValues.copyrighter +'", "' + 
        web3.utils.toUtf8(event.returnValues.name)+ '", 1);'
        );
    });
}

function watchRegisterDefendee(connector){
    judge.events.RegisterDefendee((err,event) => {
        console.log("Defendee registering Detect!");
        connector.query('insert into defendee values ("' + 
        web3.utils.toUtf8(event.returnValues.name) + '",' + 
        event.returnValues.rewardAmount/(10**18) + ',' +
        event.returnValues.rating + ',' +
        event.returnValues.inspectCount + ',"","",' + 
        0 + ',"' + event.returnValues.copyrighterAddress
        + '");');
    });
}

/* TODO : report table에 기록하기 */
async function watchJudge(connector){
    judge.events.Judge(async (err,event) =>{
        console.log("Judge Detect!");
        let domain = await web3.utils.toUtf8(event.returnValues.domain);
        let defendeeName = await web3.utils.toUtf8(event.returnValues.defendeeName);
        await connector.query(
            'update report set judge = ' + event.returnValues.decision + ', step = 3 where domain = "' + domain +
            '" and defendeeName = "' + defendeeName + '";'
        );
        let [result] = await connector.query('select domain, keyword, name from reporttmp where domain="'+ domain+'" and name="'+defendeeName+'";');
        await connWork.query(
            'insert into seed values ("' + result[0]['domain']+ '","' + 
                result[0]['keyword'] + '","' +
                result[0]['name'] + '",0);'
        );
        let parse = url.parse(result[0]['domain']);
        let sql = 'insert into searchArea (`host`,`seed`,`keyword`) values (?,?,?)';
        await connWork.query(sql,[parse.hostname, result[0]['domain'], result[0]['keyword']]);
    });
}


module.exports = watcher;