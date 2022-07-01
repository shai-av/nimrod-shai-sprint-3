import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'
import booksJson from './books-json.js'

export const bookService = {
    query,
    remove,
    save,
    get,
    getPrevNextBookId,
    getBooksFromApi,
    addBook
}

const BOOKS_KEY = 'booksDB'
const BOOKS_SEARCH_KEY = 'booksSearchDB'

if (!utilService.loadFromStorage(BOOKS_KEY)) utilService.saveToStorage(BOOKS_KEY, booksJson)

function query() {
    return storageService.query(BOOKS_KEY)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}
function save(book) {
    return storageService.put(BOOKS_KEY, book)
}
function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function getPrevNextBookId(bookId){
        return storageService.query(BOOKS_KEY)
            .then(books => {
                const idx = books.findIndex(book => book.id === bookId)
                return {
                    next:(idx < books.length-1)? books[idx + 1].id : books[0].id,
                    prev:(idx !== 0)? books[idx - 1].id : books[books.length-1].id}
            })
}

function getBooksFromApi(val){
    let searchCache = utilService.loadFromStorage(BOOKS_SEARCH_KEY) || {}
    if(searchCache[val]){
        console.log('books from cache')
        return Promise.resolve(searchCache[val])
    }


   return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${val}`)
    .then((res)=>res.data.items)
    .then((items)=>{
        const books = _prepareData(items)
        searchCache[val] = books
        utilService.saveToStorage(BOOKS_SEARCH_KEY, searchCache)
        return books
    })
}

function _prepareData(items){
    let books = items.map((book)=> _createBook(book))
    return books
}

function _createBook(item){
    return {
        id:item.id,
        title:item.volumeInfo.title,
        subtitle:'subtitle',
        authors:item.volumeInfo.authors,
        categories:item.volumeInfo.categories,
        pageCount:item.volumeInfo.pageCount,
        thumbnail:item.volumeInfo.imageLinks['thumbnail'],
        publishedDate:item.volumeInfo.publishedDate,
        language:item.volumeInfo.language,
        description:item.volumeInfo.title,
        listPrice:{
            amount:50,
            currencyCode:"EUR",
            isOnSale:false,
        }

    }
}

function addBook(book){
   return storageService.post(BOOKS_KEY,book)
}






