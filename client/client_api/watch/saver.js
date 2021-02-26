/* Use it
   1. Construct object of wather
   2. setContract or setContractByJson
   3. listenEvent : it is promise about resolve event
   4. 

*/
class Saver{
    constructor(_connector) {
        this.connector = _connector;
        this.actions = {};
    }

    saved(_event, _actionName) {
        return this.actions[_actionName](_event);
    }

    saveAction(_actionName, _action){
        this.actions[_actionName] = _action;
    }
}



module.exports = Saver;