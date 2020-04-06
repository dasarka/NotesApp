/**
 * import statement
 */
const _constant = require('../constant/constant');
const fs = require('fs');
const _notesMsg = require('./notesMsg');
const _noteValidation = require('./notesBL').validation;
/**
 * global variables
 */
const _builders = _constant.BUILDERS;
const _config = _constant.CONFIG;
/**
 * getTimeStamp
 * method type: private
 */
const getTimeStamp = () => {
    _notesMsg.info('Fetching timestamp...');
    return {
        CreatedOn: new Date().toLocaleString()
    }
}
/**
 * getStorageName
 * method type: private
 */
const getStorageName = () =>{
    return _config.APP_NAME+_config.STORAGE_TYPE;
}
/**
 * loadNote
 * method type: private
 */
const loadNote = () => {
    try {
        _notesMsg.info('Loading earlier notes...');
        _notesMsg.info('Processing...');
        const dataBuffer = fs.readFileSync(getStorageName());
        const dataJson = JSON.parse(dataBuffer.toString());
        _notesMsg.success('Earlier notes loaded !!!');
        return dataJson;
    } catch {
        _notesMsg.warn('There is no earlier notes !!!');
        return [];
    }
}
/**
 * saveNote
 * method type: private
 * @param {*} note 
 */
const saveNote = (note) => {
    try {
        _notesMsg.info('Saving all notes...');
        _notesMsg.info('Processing...');
        fs.writeFileSync(getStorageName(), JSON.stringify(note));
        _notesMsg.success('Notes successfully saved !!!')
    } catch (e) {
        _notesMsg.error(e);
    }

}
/**
 * addNote
 * method type: public
 * @param {*} data 
 */
const addNote = (data) => {
    try {
        let noteJson = loadNote();
        let note = {
            ...getTimeStamp()
        };
        _notesMsg.info('Adding new note...');
        _notesMsg.info('Validating new note...');
        let validation = false;
        const duplicateNotes = _noteValidation.duplicateNotes(noteJson, data[_builders.TYPE_1[0]]);
        duplicateNotes && _notesMsg.warn('Oops!!! Note title already exist, please provide some differnt title');

        validation = duplicateNotes;
        if (!validation) {
            _notesMsg.success('New note validated successfully !!!');
            _builders.TYPE_1.forEach(item => {
                note[item] = data[item]
            });
            noteJson.push(note);
            _notesMsg.success('New note added successfully !!!');
            saveNote(noteJson);
        } else {
            _notesMsg.error('Validation failed !!!');
        }
    } catch (e) {
        _notesMsg.error(e);
    }
}
/**
 * removeNote
 * method type: public
 * @param {*} data 
 */
const removeNote = (data) => {
    try {
        let noteJson = loadNote();
        _notesMsg.info('Removing note...');
        _notesMsg.info('Searching...');
        const index = _noteValidation.findNote(noteJson, data[_builders.TYPE_2[0]]);
        if (index > -1) {
            noteJson.splice(index, 1);
            _notesMsg.success('Selected note removed successfully !!!');
            saveNote(noteJson);
        } else {
            _notesMsg.warn('No note found !!!');
        }
    } catch (e) {
        _notesMsg.error(e);
    }
}
/**
 * readNote / open note as readonly mode
 * method type: public
 */
const readNote = () => {
    _notesMsg.whiteboard(`read`)
}
/**
 * listNote / search note based on title
 * method type: public
 */
const listNote = () => {
    _notesMsg.whiteboard(`list`)
}
/**
 * updateNote/ search note based on title and update it's body
 * method type: public
 */

/**
 * export statement
 */
module.exports = {
    add: addNote,
    remove: removeNote,
    read: readNote,
    list: listNote
};