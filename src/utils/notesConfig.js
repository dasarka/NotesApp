/**
 * import statement
 */
const _command = require('../constant/constant').COMMAND;
const _notesBL = require('./notesBL');
const _notes = require('./notes');
const _notesMsg = require('./notesMsg');
/**
 * commandList
 */
const commandList = () => {
    try{
        let arr=[];
        Object.keys(_command).forEach(key => {
            arr.push(_command[key]);
        });
        return arr;
    }catch(e){
        _notesMsg.error(e);
    }
};
/**
 * configuration
 * @param {*} command 
 */
const configuration = command => {
    try{
        let config = null;
        config = command === _command.ADD_NOTE && _notesBL.configurations.addNote();
        config = command === _command.REMOVE_NOTE && _notesBL.configurations.removeNote();
        config = command === _command.READ_NOTE && _notesBL.configurations.readNote();
        config = command === _command.LIST_NOTE && _notesBL.configurations.listNote();
        return config;
    }catch(e){
        _notesMsg.error(e);
    }
}
/**
 * operations
 * @param {*} command 
 * @param {*} data 
 */
const operations = (command, data) => {
    try{
        let operator = null;
        operator = command === _command.ADD_NOTE && _notes.add(data);
        operator = command === _command.REMOVE_NOTE && _notes.remove(data);
        operator = command === _command.READ_NOTE && _notes.read();
        operator = command === _command.LIST_NOTE && _notes.list();
        return operator;
    }catch(e){
        _notesMsg.error(e);
    }
}
/**
 * export statement
 */
module.exports = {
    config: configuration,
    list: commandList,
    operator: operations
};