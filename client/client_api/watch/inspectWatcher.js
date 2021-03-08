var Web3 = require("web3");
require('dotenv').config();
let web3 = new Web3(process.env.RPC);
const fs = require('fs');
const jsonfile = "./contracts/Inspect.json";
let parsed = JSON.parse(fs.readFileSync(jsonfile));
let abi = parsed.abi;
let ins = new web3.eth.Contract(abi, parsed.networks[process.env.ID].address);

function watcher(connector){
    watchInspect(connector);
    watchRegisterInspect(connector);
}

async function watchInspect(connector){
    ins.getPastEvents(
        "Inspect",
        { fromBlock: "0", toBlock: "latest" },
        async (errors, events) => {
            for(var event of events){
                try{
                    let domain = await web3.utils.toUtf8(event.returnValues.domain);
                    let defendeeName = await web3.utils.toUtf8(event.returnValues.defendeeName);
                    let [target] = await connector.query(
                        'select id from report where domain = "' + domain +
                        '" and defendeeName = "' + defendeeName + '";'
                    );
                    console.log(target);
                    if(target[0]['id'] == null){
                        return false;
                    } 
                    else {
                        await connector.query(
                            'insert into inspect values ("' + event.returnValues.inspector+ '",' + 
                            target[0]['id'] + ',' +
                            event.returnValues.decision + ',null);'
                        );
                        const check = await checkCount(target[0]['id'], connector);
                        if(check){
                            let result = await resultOfInspect(target[0]['id'], connector);
                            if(result){
                                connector.query(
                                    'update report set step = 2 where id = ' + target[0]['id'] + ';'
                                );
                                console.log("This report go to step2");
                            } else {
                                connector.query(
                                    'update report set step = 0 where id = ' + target[0]['id'] + ';'
                                );
                                console.log("This report go to step0");
                            }
                        }
                    }
                } catch (e){
                    console.log("Already recover");
                }
            }
            if (!errors) {
            }
        }
       
    );

    ins.events.Inspect(async (err,event) => {
        try{
            console.log("Inspect Detect!");
            let domain = await web3.utils.toUtf8(event.returnValues.domain);
            let defendeeName = await web3.utils.toUtf8(event.returnValues.defendeeName);
            let [target] = await connector.query(
                'select id from report where domain = "' + domain +
                '" and defendeeName = "' + defendeeName + '";'
            );
            if(target[0]['id'] == null){
                return false;
            } 
            else {
                await connector.query(
                    'insert into inspect values ("' + event.returnValues.inspector+ '",' + 
                    target[0]['id'] + ',' +
                    event.returnValues.decision + ',null);'
                );
                const check = await checkCount(target[0]['id'], connector)
                console.log(check);
                if(check){
                    let result = await resultOfInspect(target[0]['id'], connector);
                    if(result){
                        connector.query(
                            'update report set step = 2 where id = ' + target[0]['id'] + ';'
                        );
                        console.log("This report go to step2");
                    } else {
                        connector.query(
                            'update report set step = 0 where id = ' + target[0]['id'] + ';'
                        );
                        console.log("This report go to step0");
                    }
                }
            }
        } catch(e){
            console.log(e);
        }
        /* TODO : inspector에 inspect count 올려주기 */
    });
}

async function checkCount(_reportId, connector){
    let [target] = await connector.query(
        'select count(*) from inspect where reportId = ' + _reportId + ';');
    let [maxcount] = await connector.query(
        'select inspectCount from defendee where name = ' +
        '(select defendeeName from report where id =' + _reportId + ');');
    console.log(target[0]['count(*)'], "  ",  maxcount[0]['inspectCount']);
    if(target[0]['count(*)'] == maxcount[0]['inspectCount'])
        return true;
    return false;
}

async function resultOfInspect(_reportId, connector){
    let [numTrue] = await connector.query(
        'select count(*) from inspect where reportid = ' + _reportId + " and decision = 1;");
    let [numFalse] = await connector.query(
        'select count(*) from inspect where reportid = ' + _reportId + ' and decision = 0;');
    return numTrue[0]['count(*)'] >= numFalse[0]['count(*)']? true:false;
}


async function watchRegisterInspect(connector){
    ins.getPastEvents(
        "RegisterInspector",
        { fromBlock: "0", toBlock: "latest" },
        async (errors, events) => {
            for(var event of events){
                try{
                    await connector.query(
                        'insert into inspector values ("' + event.returnValues.inspector+ '",21845,0);');
                } catch (e){
                    console.log("Already recover");
                }
            }
            if (!errors) {
            }
        } 
    );

    ins.events.RegisterInspector(async (err,event) => {
        console.log("Register Inspector Detect!");
        try{
            connector.query(
                'insert into inspector values ("' + event.returnValues.inspector+ '",21845,0);');
        } catch(e){
            console.log(e);
        }
    });
}



module.exports = watcher;