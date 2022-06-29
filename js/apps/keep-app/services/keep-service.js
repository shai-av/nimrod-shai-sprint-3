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
    getEmptyNote,
    add
}

function getEmptyNote() {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: ''
        }

    }
}

function _createNotes() {
    console.log('_createnotes is on')
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        utilService.saveToStorage(NOTES_KEY, notesArray);
    }
    console.log('let notes ', notes);
    console.log('notesArray', notesArray);
    return notes
}



// if (!utilService.loadFromStorage(NOTES_KEY)) utilService.saveToStorage(NOTES_KEY, booksJson)

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
    console.log('remove keepservice noteskey ', NOTES_KEY)
    console.log('remove keepservice noteId', noteId)
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
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "https://img.freepik.com/free-vector/cute-cow-cartoon-illustration_50699-716.jpg?w=2000",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }


    ]

}




