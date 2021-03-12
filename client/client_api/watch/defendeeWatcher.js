var Web3 = require("web3");
require('dotenv').config();
var provider = new Web3.providers.WebsocketProvider(process.env.RPC);
let web3 = new Web3(provider);

provider.on('end', e => {
    console.log('WS closed');
    console.log('Attempting to reconnect...');
    provider = new Web3.providers.WebsocketProvider(process.env.RPC);

    provider.on('connect', function () {
        console.log('WSS Reconnected');
    });
    
    web3.setProvider(provider);
});

  
const fs = require('fs');
const jsonfile = "./contracts/JudgeByMedia.json";
let parsed = JSON.parse(fs.readFileSync(jsonfile));
let abi = parsed.abi;
console.log(parsed.networks[process.env.ID] ,process.env.ID);
let judge = new web3.eth.Contract(abi, parsed.networks[process.env.ID].address);
let connWork = require('./connector_work');
const url = require('url');

function watcher(connector){
    watchRegisterCopyrighter(connector);
    watchRegisterDefendee(connector);
    watchJudge(connector);
}

function watchRegisterCopyrighter(connector){
    judge.getPastEvents(
        "RegisterCopyrighter",
        { fromBlock: "0", toBlock: "latest" },
        async (errors, events) => {
            for(var event of events){
                try{
                    await connector.query('insert into copyrighter(`address`,`name`,`logo`) values ("' + 
                    event.returnValues.copyrighter +'", "' + 
                    web3.utils.toUtf8(event.returnValues.name)+ '", 1);'
                    );
                } catch(e){
                    console.log("Already exist");
                }
            }

            if (!errors) {
            }
        }
    );

    judge.events.RegisterCopyrighter(async (err,event) =>{
        try{
            console.log("Copyrighter registering Detect!");
            await connector.query('insert into copyrighter(`address`,`name`,`logo`) values ("' + 
                event.returnValues.copyrighter +'", "' + 
                web3.utils.toUtf8(event.returnValues.name) + '", 1);'
            );
        } catch(e){
            console.log(e);
        }
    });
}

function watchRegisterDefendee(connector){
    judge.getPastEvents(
        "RegisterDefendee",
        { fromBlock: "0", toBlock: "latest" },
        async (errors, events) => {
            for(var event of events){
                try{
                    await connector.query('insert into defendee values ("' + 
                    web3.utils.toUtf8(event.returnValues.name) + '",' + 
                    event.returnValues.rewardAmount/(10**18) + ',' +
                    event.returnValues.rating + ',' +
                    event.returnValues.inspectCount + ',"","",' + 
                    0 + ',"' + event.returnValues.copyrighterAddress
                    + '");');
                } catch(e){
                    console.log("already exist");
                }
            }

            if (!errors) {
            }
        }
    );

    judge.events.RegisterDefendee(async (err,event) => {
        console.log("Defendee registering Detect!");
        await connector.query('insert into defendee values ("' + 
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
    judge.getPastEvents(
        "Judge",
        { fromBlock: "0", toBlock: "latest" },
        async (errors, events) => {
            for(var event of events){
                try{
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
                } catch (e) {
                    console.log("Already exist");
                }
            }

            if (!errors) {
            }
        }
    );

    judge.events.Judge(async (err,event) =>{
        try{
            console.log("Judge Detect!");
            let domain = await web3.utils.toUtf8(event.returnValues.domain);
            let defendeeName = await web3.utils.toUtf8(event.returnValues.defendeeName);
            await connector.query(
                'update report set judge = ' + event.returnValues.decision + ', step = 3 where domain = "' + domain +
                '" and defendeeName = "' + defendeeName + '";'
            );
            let [result] = await connector.query('select domain, keyword, name from reporttmp where domain="'+ domain+'" and name="'+defendeeName+'";');
            console.log(result);
            await connWork.query(
                'insert into seed values ("' + result[0]['domain']+ '","' + 
                    result[0]['keyword'] + '","' +
                    result[0]['name'] + '",0);'
            );
            let parse = url.parse(result[0]['domain']);
            let sql = 'insert into searchArea (`host`,`seed`,`keyword`) values (?,?,?)';
            await connWork.query(sql,[parse.hostname, result[0]['domain'], result[0]['keyword']]);
        } catch(e){
            console.log(e);
        }
    });
}


module.exports = watcher;