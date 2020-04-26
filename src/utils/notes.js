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
const _notesProps = _constant.SYNTAX.NOTES_PROPS;
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
const getStorageName = () => {
    return _config.APP_NAME + _config.STORAGE_TYPE;
}
/**
 * load
 * method type: private
 */
const load = () => {
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
 * save
 * method type: private
 * @param {*} note 
 */
const save = (note) => {
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
const add = (data) => {
    try {
        let noteJson = load();
        let note = {
            ...getTimeStamp()
        };
        _notesMsg.info('Adding new note...');
        _notesMsg.info('Validating new note...');
        let validation = false;
        const duplicateNotes = _noteValidation.duplicateNotes(noteJson, data[_notesProps.title]);
        duplicateNotes && _notesMsg.warn('Oops!!! Note title already exist, please provide some differnt title');

        validation = duplicateNotes;
        if (!validation) {
            _notesMsg.success('New note validated successfully !!!');
            for (const item of _builders[_constant.SYNTAX.BuilderIds.TYPE_1]) {
                note[item.name] = data[item.name];
            }
            noteJson.push(note);
            _notesMsg.success('New note added successfully !!!');
            save(noteJson);
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
const remove = (data) => {
    try {
        let noteJson = load();
        _notesMsg.info('Removing note...');
        _notesMsg.info('Searching...');
        const index = _noteValidation.findNote(noteJson, data[_notesProps.title]);
        if (index > -1) {
            noteJson.splice(index, 1);
            _notesMsg.success('Selected note removed successfully !!!');
            save(noteJson);
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
const read = (data) => {
    try {
        const noteJson = load();
        _notesMsg.info('Searching...',noteJson);
        const index = _noteValidation.findNote(noteJson, data[_notesProps.title]);
        if (index > -1) {
            _notesMsg.info('Here is your note !!!');
            let note = '\r\n**********************************\r\n';
            Object.keys(noteJson[index]).forEach(key => {
                note += key + ': ';
                note += noteJson[index][key] + '\r\n';
            });
            note += '**********************************\r\n';
            _notesMsg.whiteboard(note);
        } else {
            _notesMsg.warn('No note found !!!');
        }
    } catch (e) {
        _notesMsg.error(e);
    }
}
/**
 * listNote / search note based on title
 * method type: public
 */
const list = (data) => {
    try {
        const noteJson = load();
        _notesMsg.info('Calculating...');
        _notesMsg.info('Here is your search result !!!');
        let index = 0;
        let keyword = (data && data[_notesProps.keyword]) || '';
        let searchRes = '\r\n**********************************\r\n';
        for (const note of noteJson) {
            note.title.indexOf(keyword) > -1 && (++index, searchRes += '~ ' + note.title + '\r\n');
        }
        searchRes += '\r\nTotal Count:- ' + index + '\r\n';
        searchRes += '**********************************\r\n';
        _notesMsg.whiteboard(searchRes);

    } catch (e) {
        _notesMsg.error(e);
    }
}
/**
 * export statement
 */
module.exports = {
    addNote: add,
    removeNote: remove,
    readNote: read,
    listNote: list
};