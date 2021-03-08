const fs = require('fs');
require('dotenv').config();
/* Use it
   1. Construct object of wather
   2. setContract or setContractByJson or setContractByDirectory
   3. listenEvent : it is promise about resolve event
   4. interface

    let saver = new mysqlSavar(connector);
    saver.saveAction("ASK", action1);
    let tmp = new Watcher(web3);
    tmp.setContractByJson(fs.readFileSync(jsonfile));
    tmp.setSaver(saver);
    tmp.listenEvents("Reporting", "ASK");
    After it, you can get a data or event in solidity

*/
class Watcher {
    constructor(_web3) {
        this.web3 = _web3;
        this.contract;
        this.saver;
        this.result;
    }

    setContract(_abi, _address) {
        this.contract = new this.web3.eth.Contract(_abi, _address);
    }

    setContractByJson(_json) {
        let parsed = JSON.parse(_json);
        let abi = parsed.abi;
        this.contract = new this.web3.eth.Contract(abi, parsed.networks[process.env.ID].address);
    }

    setContractByDirectory(_dir) {
        let parsed = JSON.parse(fs.readFileSync(jsonfile));
        let abi = parsed.abi;
        this.contract = new this.web3.eth.Contract(abi, parsed.networks[process.env.ID].address);
    }

    setSaver(_saver) {
        this.saver = _saver;
    }

    async listenEvents(_eventName, _actionName) {
        let err, event;
        console.log(this.contract.events);
        if(this.saver){
            this.contract.getPastEvents(
                _eventName,
                { fromBlock: "0", toBlock: "latest" },
                (errors, events) => {
                    for(var _event of events){
                        this.saver.saved(_event, _actionName);
                    }
        
                    if (!errors) {
                    }
                }
            );

            this.contract.events[_eventName]((_err, _event) => {
                this.saver.saved(_event, _actionName);
            });
        } else {
            console.log("Please mount saver in watcher");
        }
    }
}


module.exports =Watcher;