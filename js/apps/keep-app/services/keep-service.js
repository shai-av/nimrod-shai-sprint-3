import { utilService } from '../../../services/util-service.js'
// import booksJson from './books-json.js'
import { storageService } from '../../../services/async-storage-service.js';



const NOTES_KEY = 'notesDB';
// const notes_SEARCH_KEY = 'notesSearchDB'

var notesArray = []
notesArray = getNotes()
_createNotes()

export const keepsService = {
    query,
    remove,
    save,
    get,
    getPrevNextNoteId,
    getEmptyTxtNote,
    getEmptyTodoNote,
    add,
    edit,
    getEmptyImgNote,
    getEmptyVideoNote,
    loadImageFromInput,
    getEmptyTodoRow,
}

function getEmptyVideoNote() {
    return {
        id: utilService.makeId,
        type: "note-video",
        info: {
            url: '',
            title: ''
        }
    }
}

function getEmptyImgNote() {
    return {
        id: utilService.makeId,
        type: "note-img",
        info: {
            url: '',
            title: ''
        },
        style: {
            backgroundColor: "#00d"
        }
    }
}

function getEmptyTxtNote() {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            title: '',
            txt: ''
        }

    }
}

function getEmptyTodoRow() {
    return {
        txt: '', doneAt: null, isDone: false
    }
}



function getEmptyTodoNote() {
    return {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            title: '',
            todos: [
                { txt: '', doneAt: null, isDone: false },
            ]
        }
    }
}

function _createNotes() {
    console.log('_createnotes is on')
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        utilService.saveToStorage(NOTES_KEY, notesArray);
    }
    return notes
}


function edit(note) {
    storageService.put(NOTES_KEY, note)
}

function query() {
    return storageService.query(NOTES_KEY)
}

function add(note) {
    return storageService.post(NOTES_KEY, note)
}

function save(note) {
    const notes = query()
    notes.push(note)
    utilService.saveToStorage(NOTES_KEY, notes);
    return storageService.put(NOTES_KEY, note)
}


function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}


function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}


function getPrevNextNoteId(noteId) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            const idx = notes.findIndex(note => note.id === noteId)
            return {
                next: (idx < notes.length - 1) ? notes[idx + 1].id : notes[0].id,
                prev: (idx !== 0) ? notes[idx - 1].id : notes[notes.length - 1].id
            }
        })
}


function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    //After we read the file
    reader.onload = function (event) {
        var img = new Image()// Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        //Run the callBack func , To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // imgFlag = true
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}


function getNotes() {

    return notesArray = [
        {
            id: "n106",
            type: "note-video",
            info: {
                url: "hVTXu8SgVyE",
                title: "new-yorkk"
            },
            style: {
                backgroundColor: "#ff9190"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                title: "Need to buy",
                todos: [
                    { txt: "eggs", doneAt: null, isDone: false },
                    { txt: "tomato", doneAt: null, isDone: false },
                    { txt: "milk", doneAt: null, isDone: false }
                ]
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                title: 'Dont forget!',
                txt: "go to the grocery store!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://img.freepik.com/free-vector/cute-cow-cartoon-illustration_50699-716.jpg?w=2000",
                // url: "./js/apps/keep-app/img-keep/img-keep.png",
                title: "hallo cow!"
            },
            style: {
                backgroundColor: "#ff9190"
            }
        },
        {
            id: "n104",
            type: "note-video",
            info: {
                url: "dKzrJR2wvTA",
                title: "Buy tickets!"
            },
            style: {
                backgroundColor: "#ff9190"
            }
        },
        {
            id: "n105",
            type: "note-video",
            info: {
                url: "oBu-pQG6sTY",
                title: "relax and make YOGA"
            },
            style: {
                backgroundColor: "#ff9190"
            }
        }

    ]

}




