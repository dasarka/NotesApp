//export statement
module.exports = {
    COMMAND:{
        ADD_NOTE: 'addNote',
        REMOVE_NOTE: 'removeNote',
        READ_NOTE: 'readNote',
        LIST_NOTE: 'listNote'
    },
    SYNTAX:{
        TRUE: true,
        FALSE: false,
        STRING: 'string',
        NOTE: 'Note'
    },
    BUILDERS:{
        TYPE_1:['title','content','signature'],
        TYPE_2:['title']
    },
    CONFIG:{
        APP_NAME:'notes',
        STORAGE_TYPE:'.json'
    }
};