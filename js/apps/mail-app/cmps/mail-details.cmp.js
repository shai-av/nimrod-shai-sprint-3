
import { mailService } from "../services/mail-service.js"

export default {
    props: [
        'selectedMail'
    ],
    template: `
        <section v-if="mail" class="main-container mail-details">
        <!-- <router-link :to="'/mail/details/' + prevMailId">Prev</router-link> -->
        <!-- <router-link :to="'/mail/details/' + nextMailId">Next</router-link> -->
        <section class=btns>
            <button v-if="mail.sentAt" @click="setPrev">prev</button>
            <button v-if="mail.sentAt" @click="setNext">next</button>
            <button @click="$emit('back')">Back</button>
        </section>
        <p class="details-from">
            <span class="details-name">{{getName}}</span>
            <span class="details-mail">&lt; {{mail.from}} ></span>
        </p>
        <span v-if="mail.sentAt" class="details-date">{{getDate}}</span>
        <p class="details-to">
            <span v-if="mail.to!==''" class="details-mail">to: &lt; {{mail.to}} ></span>
            <div v-else class="flex flex-column details-inputs">
                <span>to: <input type="text" v-model="newMailTo" placeholder="@"/></span>
                <span>subject: <input type="text" v-model="newMailSubject" placeholder="subject"/></span>
            </div>
        </p>
            <hr>
            <p v-if="mail.body">{{getBody}}<span v-if="isReadMore" class="read-more" @click="userClkReadMore = true">...</span></p>
            <textarea v-else ref="mail-body" v-model="newMailBody" class="details-txtarea"></textarea> 
            <button v-if="!mail.sentAt" @click="sendMail">Send</button>
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
    components: {
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
                console.log('missing values');
                return
            }
            this.mail.to = this.newMailTo
            this.mail.subject = this.newMailSubject
            this.mail.body = this.newMailBody
            this.mail.sentAt = Date.now()
            this.$emit('add',this.mail)
            this.$emit('back')
        }
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
                }).catch(console.log('details error'))
        }
    },
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
