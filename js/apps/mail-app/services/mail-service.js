import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js';
import mailDemo from './mail-demo-data.js'

export const mailService = {
    query,
    remove,
    save,
    get,
    getPrevNextMail,
    addMail,
};

const MAILS_KEY = 'mailsDB';

if (!utilService.loadFromStorage(MAILS_KEY)) utilService.saveToStorage(MAILS_KEY, mailDemo)

function query() {
    return storageService.query(MAILS_KEY)
}

function remove(mailId) {
    return storageService.remove(MAILS_KEY, mailId)
}
function save(mail) {
    return storageService.put(MAILS_KEY, mail)
}
function get(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function getPrevNextMail(mailId){
        return storageService.query(MAILS_KEY)
            .then(mails => {
                const idx = mails.findIndex(mail => mail.id === mailId)
                return {
                    next:(idx < mails.length-1)? mails[idx + 1].id : mails[0].id,
                    prev:(idx !== 0)? mails[idx - 1].id : mails[mails.length-1].id}
            })
}

// function _prepareData(items){
//     let mails = items.map((mail)=> _createBook(mail))
//     return mails
// }

function _createMail(item){
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

function addMail(mail){
   return storageService.post(MAILS_KEY,mail)
}






