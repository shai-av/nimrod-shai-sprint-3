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
    // console.log('let notes ', notes);
    // console.log('notesArray', notesArray);
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
    // console.log('remove keepservice noteskey ', NOTES_KEY)
    // console.log('remove keepservice noteId', noteId)
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

// function getBooksFromApi(val) {
//     let searchCache = utilService.loadFromStorage(BOOKS_SEARCH_KEY) || {}
//     if (searchCache[val]) {
//         console.log('from cache');
//         return Promise.resolve(searchCache[val])
//     }

//     return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${val}`)
//         .then((res) => res.data.items)
//         .then((items) => {
//             const books = _prepareData(items)
//             searchCache[val] = books
//             utilService.saveToStorage(BOOKS_SEARCH_KEY, searchCache)
//             return books
//         })
// }

// function _prepareData(items) {
//     let books = items.map((book) => _createBook(book))
//     return books
// }

// function _createBook(item) {
//     return {
//         id: item.id,
//         title: item.volumeInfo.title,
//         subtitle: 'subtitle',
//         authors: item.volumeInfo.authors,
//         categories: item.volumeInfo.categories,
//         pageCount: item.volumeInfo.pageCount,
//         thumbnail: item.volumeInfo.imageLinks['thumbnail'],
//         publishedDate: item.volumeInfo.publishedDate,
//         language: item.volumeInfo.language,
//         description: item.volumeInfo.title,
//         listPrice: {
//             amount: 50,
//             currencyCode: "EUR",
//             isOnSale: false,
//         }

//     }
// }

// function addBook(book) {
//     return storageService.post(BOOKS_KEY, book)
// }


function getNotes() {

    return notesArray = [
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
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#ff9190"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                title: "Get my stuff done",
                todos: [
                    { txt: "Driving liscence", doneAt: null, isDone: false },
                    { txt: "Coding power", doneAt: 187111111, isDone: false }
                ]
            },
            style: {
                backgroundColor: "#00d"
            }
        }


    ]

}




