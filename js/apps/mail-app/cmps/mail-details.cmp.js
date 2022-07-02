
import { mailService } from "../services/mail-service.js"
import { eventBus } from "../../../services/eventBus-service.js"

export default {
    props: [
        'selectedMail'
    ],
    template: `
        <section v-if="mail" class="mail-main-container mail-details">
        <div v-if="mail.sentAt" class="details-action-btns">
            <span v-if="!mail.isArchived" @click.stop="isArchivedToggle" title="archive"><img src="./img/archive.png" alt="archive"/></span>
            <span v-else @click.stop="isArchivedToggle" title="un-archive"><img src="./img/un-archive.png" alt="un-archive"/></span>
            <span @click.stop="deleteMail" title="delete"><img src="./img/bin1.png" alt="dlt"/></span>
            <span v-if="mail.isReceived">
                <span v-if="!mail.isRead" @click.stop="isReadToggle" title="As read">
                    <img src="./img/as-read.png" alt="As read"/></span>
                <span v-else @click.stop="isReadToggle" title="Unread">
                    <img src="./img/as-un-read.png" alt="Unread"/></span>
            </span>
            <span @click.stop="starMail">
                <img v-if="mail.isStarred" src="./img/star.png"/>
                <img v-else src="./img/blank-star.png"/>
            </span>
        </div>
        <!-- <router-link :to="'/mail/details/' + prevMailId">Prev</router-link> -->
        <!-- <router-link :to="'/mail/details/' + nextMailId">Next</router-link> -->
        <section class="details-actions">
            <span v-if="mail.sentAt" title="previous" @click="setPrev">
                <img src="./img/pre-arrow.png" alt="previous"></span>
            <span v-if="mail.sentAt" title="next" @click="setNext">
                <img src="./img/next-arrow.png" alt="next"></span>
            <span @click="$emit('back')" title="back">
                <img src="./img/back.png" alt="back" class="md-img"></span>
            <span v-if="mail.isReceived" title="reply" @click="mailReply">
                <img src="./img/reply.png" alt="reply" class="md-img"></span>
        </section>
        <p v-if="mail.sentAt" class="details-subject">{{getSubject}}</p>
        <p class="details-from">
            <span class="details-name">{{getName}}</span>
            <span class="details-mail">&lt; {{mail.from}} ></span>
        </p>
        <span v-if="mail.sentAt" class="details-date">{{getDate}}</span>
        <p class="details-to">
            <span v-if="mail.to!==''" class="details-mail">to: &lt; {{getTo}} ></span>
            <div v-else class="flex flex-column details-inputs">
                <span>to: <input type="text" v-model="newMailTo" placeholder="@"/></span>
                <span>subject: <input type="text" v-model="newMailSubject" placeholder="subject"/></span>
            </div>
        </p>
            <hr>
            <p class="mail-body-txt">{{getBody}}<span v-if="isReadMore" class="read-more" @click="userClkReadMore = true">...</span></p>
            <textarea v-if="!mail.sentAt" ref="mail-body" v-model="newMailBody" class="details-txtarea"></textarea> 
            <button v-if="!mail.sentAt" @click="sendMail" class="send-btn">Send</button>
        </section>
    `,
    data() {
        return {
            userClkReadMore: false,
            nextMailId: null,
            prevMailId: null,
            mail: null,
            newMailTo: '',
            newMailSubject: '',
            newMailBody: '',
        }
    },
    methods: {
        setPrev() {
            mailService.get(this.prevMailId).then((mail) => this.mail = mail).then(() => this.setPrevNext())
        },
        setNext() {
            mailService.get(this.nextMailId).then((mail) => this.mail = mail).then(() => this.setPrevNext())
        },
        setPrevNext() {
            mailService.getPrevNextMailId(this.mail.id)
                .then(mailIds => {
                    this.nextMailId = mailIds.next
                    this.prevMailId = mailIds.prev
                })
        },
        sendMail() {
            if (!this.newMailTo.includes('@') ||
                this.newMailSubject === '' ||
                this.newMailBody === '') {
                eventBus.emit('show-msg', { txt: `missing values`, type: 'error' })
                return
            }
            this.mail.to = this.newMailTo
            this.mail.subject = this.newMailSubject
            this.mail.body = `${this.mail.body} :| ${this.newMailBody}`
            this.mail.sentAt = Date.now()
            this.$emit('add', this.mail)
            this.$emit('back')
            eventBus.emit('show-msg', { txt: `Mail sent`, type: 'success' })
        },
        mailReply() {
            const subject = `Re: ${this.mail.subject}`
            const body = `Re : ${this.mail.body}`
            const to = this.mail.from
            this.$emit('reply', { body, subject, to })
        },
        isArchivedToggle() {
            this.mail.isArchived = !this.mail.isArchived
            mailService.save(this.mail)
            const msg = (this.mail.isArchived) ? 'Mail archived' : 'Mail un-archived'
            eventBus.emit('show-msg', { txt: msg, type: 'update' })
        },
        deleteMail() {
            if (this.mail.isDeleted) {
                mailService.remove(this.mail.id)
                this.$emit('removeMail', this.mail.id)
                eventBus.emit('show-msg', { txt: `mail Deleted`, type: 'error' })
                this.$emit('back')
            } else {
                this.mail.isDeleted = true
                this.mail.removedAt = Date.now()
                mailService.save(this.mail)
                eventBus.emit('show-msg', { txt: `transferred to Bin, tap again to Delete`, type: 'update' })
            }
        },
        isReadToggle() {
            this.mail.isRead = !this.mail.isRead
            mailService.save(this.mail)
            const n = (this.mail.isRead) ? -1 : 1
            eventBus.emit('set-unread', n)
            const msg = (this.mail.isRead) ? 'Mark as read' : 'Mark as un-read'
            eventBus.emit('show-msg', { txt: msg, type: 'update' })
        },
        starMail() {
            this.mail.isStarred = !this.mail.isStarred
            mailService.save(this.mail)
        },
    },
    computed: {
        getBody() {
            if (this.mail.body.length > 100 && !this.userClkReadMore) return this.mail.body.substring(0, 100)
            else return this.mail.body
        },
        isReadMore() {
            return !this.userClkReadMore && this.mail.body.length > 100
        },
        getDate() {
            let date = new Date(this.mail.sentAt) + ''
            return date.substring(0, 21)
        },
        getName() {
            return this.mail.from.split('@')[0]
        },
        getSubject() {
            if (this.newMailSubject !== '') return this.newMailSubject
            else {
                this.newMailSubject = this.mail.subject
                return this.mail.subject
            }
        },
        getTo() {
            if (this.newMailTo !== '') return this.newMailTo
            else {
                this.newMailTo = this.mail.to
                return this.mail.to
            }
        }
    },
    created() {
        this.mail = this.selectedMail

        const id = this.mail.id
        if (id && this.mail.sentAt) {
            mailService.getPrevNextMailId(this.mail.id)
                .then(mailIds => {
                    this.nextMailId = mailIds.next
                    this.prevMailId = mailIds.prev
                })
        }
    },
    mounted() {
        if (!this.mail.sentAt) this.$refs['mail-body'].focus()
    }
    // watch:{
    //     '$route.params.mailId':{
    //         handler() {  
    //             const id = this.$route.params.mailId
    //             if(!id) return 
    //             mailService.get(id).then(mail => {
    //                 this.mail = mail
    //                  mailService.getPrevNextMailId(mail.id)
    //                     .then(mailIds => {
    //                         this.nextMailId = mailIds.next
    //                         this.prevMailId = mailIds.prev
    //                     }).catch(console.log('route param error'))
    //             })
    //         },
    //         immediate: true
    //     }
    // }
}
