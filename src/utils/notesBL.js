const _constant = require('../constant/constant');

const _syntax = _constant.SYNTAX;
const _builders = _constant.BUILDERS;

const getBuilderConfig = (builders) => {
    let obj = {};
    builders.forEach(item => {
        obj[item] = {
            desc: _syntax.NOTE + builders,
            demandOption: _syntax.TRUE,
            type: _syntax.STRING
        }
    });
    return obj;
}

const getAddNoteConfig = () => {
    return {
        aliases: ['add', 'ADD', 'Add'],
        desc: 'create a new note. note title should be unique',
        builder: getBuilderConfig(_builders.TYPE_1)
    }
}

const getRemoveNoteConfig = () => {
    return {
        aliases: ['remove', 'REMOVE', 'Remove'],
        desc: 'remove existing note',
        builder: getBuilderConfig(_builders.TYPE_2)
    }
}

const getReadNoteConfig = () => {
    return {
        aliases: ['open', 'OPEN', 'Open'],
        desc: 'open note as readonly mode',
    }
}

const getListNoteConfig = () => {
    return {
        aliases: ['search', 'SEARCH', 'Search'],
        desc: 'show list of notes based on title',
    }
}

/****************************** */
const search = (notes, title) => {
    let searchIndex = -1;
    for (let index = 0; index < notes.length; index++) {
        if(notes[index].title === title){
            searchIndex=index;
            break;
        }
    }
    return searchIndex;
};



const checkDuplicateNotes = (notes, title) => {
    const duplicate = search(notes, title) > -1;
    return duplicate;
};
//export statement
module.exports = {
    configurations: {
        addNote: getAddNoteConfig,
        removeNote: getRemoveNoteConfig,
        readNote: getReadNoteConfig,
        listNote: getListNoteConfig
    },
    validation: {
        duplicateNotes: checkDuplicateNotes,
        findNote: search
    }
};