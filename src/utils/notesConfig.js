/**
 * import statement
 */
const _constant= require('../constant/constant');
const _notes = require('./notes');
const _notesMsg = require('./notesMsg');
/**
 * commandList
 */
const commandList = () => {
    try {
        let arr = [];
        for (const _f of _constant.FEATURES) {
            arr.push(_f.command);
        }
        return arr;
    } catch (e) {
        _notesMsg.error(e);
    }
};
/**
 * getBuilderConfig
 * @param {*} builders 
 */
const getBuilderConfig = (builders) => {
    let obj = {};
    builders.forEach(item => {
        obj[item.name] = {
            desc: _constant.SYNTAX.NOTE +' '+ item.name,
            demandOption: item.required,
            type: item.type
        }
    });
    return obj;
}
/**
 * configuration
 * @param {*} command 
 */
const configuration = index => {
    try {
        return {
            ..._constant.FEATURES[index].props,
            builder: getBuilderConfig(_constant.BUILDERS[_constant.FEATURES[index].builderId])
        }
    } catch (e) {
        _notesMsg.error(e);
    }
}
/**
 * operations
 * @param {*} command 
 * @param {*} data 
 */
const operations = (func, data) => {
    try {
        return _notes[func](data);
    } catch (e) {
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