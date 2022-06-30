import { mailService } from "../services/mail-service.js"

export default {
    props: [
        'mail'
    ],
    template: `
    <div class="mail-preview flex align-center">
        <div :class="{starred:mail.isStarred}" class="t-star" @click.stop="starMail">
        ★
        </div>
        <div class="t-name" :class="{read:mail.isRead}">
            {{getName}}
        </div>
        <div class="t-subject" :class="{read:mail.isRead}">
            {{mail.subject}}
        </div>
        <div class="t-date">
            {{getDate}}
        </div>
        <div class="t-btns">
            <span @click.stop="deleteMail" title="delete"><img src="./img/bin.jpg" alt="dlt"/></span>
        </div>
    </div>
    `,
    data() {
        return {

        }
    },
    emits: ["removeMail"],
    methods: {
        deleteMail() {
            if (this.mail.isDeleted) {
                mailService.remove(this.mail.id)
                this.$emit('removeMail', this.mail.id)
            } else {
                this.mail.isDeleted = true
                mailService.save(this.mail)
            }
        },
        starMail(){
            this.mail.isStarred = !this.mail.isStarred
            mailService.save(this.mail)
        }
    },
    computed: {
        getName() {
            let name = (this.mail.isReceived) ? this.mail.from : this.mail.to
            return name.split('@')[0]
        },
        getDate() {
            const date = new Date(this.mail.sentAt)
            const day = date.getDay()
            const month = date.toLocaleString('default', { month: 'long' })

            return `${day} ${month.substring(3, 0)}`
        }
    }
}