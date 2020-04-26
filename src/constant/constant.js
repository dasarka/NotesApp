const _globalSyntaxProps = {
    TRUE: true,
    FALSE: false,
    STRING: 'string',
    NOTES_PROPS: {
        title: 'title',
        keyword: 'keyword',
        content: 'content',
        signature: 'signature'
    }
}
const _globalBuilderProps = {
    title: {
        name: _globalSyntaxProps.NOTES_PROPS.title,
        required: _globalSyntaxProps.TRUE,
        type: _globalSyntaxProps.STRING
    },
    content: {
        name: _globalSyntaxProps.NOTES_PROPS.content,
        required: _globalSyntaxProps.TRUE,
        type: _globalSyntaxProps.STRING
    },
    signature: {
        name: _globalSyntaxProps.NOTES_PROPS.signature,
        required: _globalSyntaxProps.TRUE,
        type: _globalSyntaxProps.STRING
    },
    keyword: {
        name: _globalSyntaxProps.NOTES_PROPS.keyword,
        required: _globalSyntaxProps.FALSE,
        type: _globalSyntaxProps.STRING
    },
    builderIds: {
        TYPE_1: 'Type1',
        TYPE_2: 'Type2',
        TYPE_3: 'Type3'
    }
}

//export statement
module.exports = {
    FEATURES: [{
        command: 'addNote',
        props: {
            aliases: ['add', 'ADD', 'Add'],
            desc: `create a new note. note title should be unique, 
                property: title|required, content|required, signature|required`
        },
        builderId: _globalBuilderProps.builderIds.TYPE_1
    }, {
        command: 'removeNote',
        props: {
            aliases: ['remove', 'REMOVE', 'Remove'],
            desc: `remove existing note, property: title|required|Case-Sensitive`,
        },
        builderId: _globalBuilderProps.builderIds.TYPE_2
    }, {
        command: 'readNote',
        props: {
            aliases: ['open', 'OPEN', 'Open'],
            desc: `open note as readonly mode,property: title|required|Case-Sensitive`,
        },
        builderId: _globalBuilderProps.builderIds.TYPE_2
    }, {
        command: 'listNote',
        props: {
            aliases: ['search', 'SEARCH', 'Search'],
            desc: `show list of notes based on keyword,property: keyword|optional|Case-Sensitive`,
        },
        builderId: _globalBuilderProps.builderIds.TYPE_3
    }],
    SYNTAX: {
        ..._globalSyntaxProps,
        ...{BuilderIds:_globalBuilderProps.builderIds},
        NOTE: 'Note'
    },
    BUILDERS: {
        [_globalBuilderProps.builderIds.TYPE_1]: [
            _globalBuilderProps.title,
            _globalBuilderProps.content,
            _globalBuilderProps.signature
        ],
        [_globalBuilderProps.builderIds.TYPE_2]: [_globalBuilderProps.title],
        [_globalBuilderProps.builderIds.TYPE_3]: [_globalBuilderProps.keyword]
    },
    CONFIG: {
        APP_NAME: 'notes',
        STORAGE_TYPE: '.json'
    }
};