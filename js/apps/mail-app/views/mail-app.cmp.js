import { mailService } from "../services/mail-service.js"
import mailList from "../cmps/mail-list.cmp.js"
import mailTopFilter from "../cmps/mail-top-filter.cmp.js"
import mailSideFilter from "../cmps/mail-side-filter.cmp.js"
import mailDetails from "../cmps/mail-details.cmp.js"
import usrMsg from "../../../cmps/user-msg.cmp.js"

export default {
    template: `
 <section v-if="mails" class="main-container mail-app">
    <usr-msg />        
    <mail-top-filter @getFilter="setFilterStr"></mail-top-filter>
    <div ref="sort-cont" class="sort-container" @click="toggleSort">
        <img class="sort-img" src="./img/sort-btn.png" alt="sort"/>
        <div class="sort-values-container">
            <p @click="setSort('date')">Date</p>
            <p @click="setSort('title')">Titile</p>
        </div>
    </div>
    <div class="sub-1-mails flex">
        <div class="sub-2-mails">
            <button @click="newMail()" class="compose-btn">compose</button>
        <mail-side-filter @getFilter="setFilterType"/>
        </div>
        <mail-details v-if="selectedMail" :selectedMail="selectedMail" @back="selectedMail = null" @add="sendMail" @reply="replyMail"/>
        <mail-list v-else :mails="mailsToShow" @select="setSelectedMail" @removeMailLocal="removeFromDisplay"/>
   </div>
 </section>
`,
    data() {
        return {
            mails: null,
            selectedMail: null,
            filterBy: {
                str: '',
                type: 'received',
            },
            sortyBy: 'date'
        }
    },
    methods: {
        setFilterStr(str) {
            this.filterBy.str = str
            this.selectedMail = null
        },
        setFilterType(type) {
            this.filterBy.type = type
            this.selectedMail = null
        },
        setSelectedMail(mail) {
            this.selectedMail = mail
        },
        removeFromDisplay(mailId) {
            const idx = this.mails.findIndex((mail) => mail.id === mailId)
            this.mails.splice(idx, 1)
        },
        newMail(body = '',subject='',to='') {
            this.selectedMail = null
            setTimeout(() => {
                const mail = mailService.getEmptyMail(body,subject,to)
                this.selectedMail = mail
            }, 0)
        },
        replyMail({body,subject,to}){
            this.newMail(body,subject,to)
        },
        sendMail(mail) {
            mailService.addMail(mail).then((mail) => this.mails.push(mail))
        },
        sortMails(mails) {
            if (this.sortyBy === 'date') return mails.sort((mail1, mail2) => mail2.sentAt - mail1.sentAt)
            else if (this.sortyBy === 'title') return mails.sort((mail1, mail2) => mail1.subject.localeCompare(mail2.subject))
        },
        toggleSort() {
            this.$refs['sort-cont'].classList.toggle('show-content')
        },
        setSort(val) {
            this.sortyBy = val
        }
    },
    computed: {
        mailsToShow() {
            if (this.filterBy.str === '' && this.filterBy.type === null) {
                return this.sortMails(this.mails.filter((mail) => !mail.isDeleted))
            }

            const filterStr = this.filterBy.str.toLowerCase().trim()

            let filteredMails = this.mails.filter((mail) => {
                if (mail.from.toLowerCase().includes(filterStr)) return mail
                if (mail.to.toLowerCase().includes(filterStr)) return mail
                if (mail.subject.toLowerCase().includes(filterStr)) return mail
                if (mail.body.toLowerCase().includes(filterStr)) return mail
            })
            const { type } = this.filterBy

            if (type === 'received') filteredMails = filteredMails.filter((mail) => mail.isReceived && !mail.isDeleted && !mail.isArchived)
            else if (type === 'unread') filteredMails = filteredMails.filter((mail) => mail.isReceived && !mail.isRead && !mail.isDeleted && !mail.isArchived)
            else if (type === 'sent') filteredMails = filteredMails.filter((mail) => !mail.isReceived && !mail.isDeleted && !mail.isArchived)
            else if (type === 'starred') filteredMails = filteredMails.filter((mail) => mail.isStarred && !mail.isDeleted && !mail.isArchived)
            else if (type === 'archived') filteredMails = filteredMails.filter((mail) => mail.isArchived && !mail.isDeleted)
            else if (type === 'bin') filteredMails = filteredMails.filter((mail) => mail.isDeleted)

            return this.sortMails(filteredMails)
        }
    },
    created() {
        mailService.query().then((mails) => this.mails = mails)

    },
    components: {
        mailList,
        mailTopFilter,
        mailSideFilter,
        mailDetails,
        usrMsg,
    }
}