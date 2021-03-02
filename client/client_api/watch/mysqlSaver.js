let Saver = require('./saver');
require('dotenv').config();

class MysqlSaver extends Saver {
    constructor(_connect) {
        super(_connect);
    }

    saved(_event, _actionName) {
        this.actions[_actionName](_event, this.connector);
    }

    saveAction(_actionName, _action){
        this.actions[_actionName] = _action;
    }

}

module.exports = MysqlSaver; 