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
    validation: {
        duplicateNotes: checkDuplicateNotes,
        findNote: search
    }
};