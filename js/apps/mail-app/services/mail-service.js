import { utilService } from '../../../services/util-service.js'
import { storageService } from '../../../services/async-storage-service.js'
import mailDemo from './mail-demo-data.js'

export const mailService = {
    query,
    remove,
    save,
    get,
    getPrevNextMailId,
    addMail,
    getEmptyMail
}

const MAILS_KEY = 'mailsDB'
const loggedinUser = {
    email: 'joe@appsus.com',
    fullname: 'Joe Appsus'
}

if (!utilService.loadFromStorage(MAILS_KEY)) utilService.saveToStorage(MAILS_KEY, _prepareData(mailDemo))

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

function getPrevNextMailId(mailId) {
    return storageService.query(MAILS_KEY)
        .then(mails => {
            const idx = mails.findIndex(mail => mail.id === mailId)
            return {
                next: (idx < mails.length - 1) ? mails[idx + 1].id : mails[0].id,
                prev: (idx !== 0) ? mails[idx - 1].id : mails[mails.length - 1].id
            }
        })
}

function getEmptyMail(body,subject,to) {
    return {
        "id": 'e' + utilService.makeId(3),
        "subject":subject,
        "body": body,
        "sentAt": null,
        "removedAt":null,
        "to": to,
        "from": "joe@appsus.com",
        "isRead": true,
        "isReceived": false,
        "isDeleted": false,
        "isStarred": false,
        "isArchived":false,
    }
}

function _prepareData(items) {
    let mails = items.map((mail) => _createMail(mail))
    return mails
}

function _createMail(item) {
    item['isReceived'] = (item.to === loggedinUser.email)
    item['isDeleted'] = false
    item['isStarred'] = false
    item['isArchived'] = false
    item['removedAt'] = null

    if(!item.isReceived) item.isRead = true
    
    return item
}

function addMail(mail) {
    return storageService.post(MAILS_KEY, mail)
}






