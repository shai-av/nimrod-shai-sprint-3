import { mailService } from "../services/mail-service.js"

export default {
    props: [
        'mail'
    ],
    template: `
    <div class="mail-preview flex align-center" :class="{'mail-read':mail.isRead}" @mouseover="isHovered = true" @mouseleave="isHovered = false">
        <div class="t-star" @click.stop="starMail">
        <img v-if="mail.isStarred" src="./img/star.png"/>
        <img v-else src="./img/blank-star.png"/>
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
        <div v-if="isHovered" class="t-btns">
        <span v-if="!mail.isArchived" @click.stop="isArchivedToggle" title="archive"><img src="./img/archive.png" alt="archive"/></span>
        <span v-else @click.stop="isArchivedToggle" title="un-archive"><img src="./img/un-archive.png" alt="un-archive"/></span>
            <span @click.stop="deleteMail" title="delete"><img src="./img/bin1.png" alt="dlt"/></span>
            <span v-if="!mail.isRead" @click.stop="isReadToggle" title="As read">
                <img src="./img/as-read.png" alt="As read"/></span>
            <span v-else @click.stop="isReadToggle" title="Unread">
                <img src="./img/as-un-read.png" alt="Unread"/></span>
        </div>
    </div>
    `,
    data() {
        return {
            isHovered:false
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
        isArchivedToggle(){
            this.mail.isArchived = !this.mail.isArchived
            mailService.save(this.mail)
        },
        starMail(){
            this.mail.isStarred = !this.mail.isStarred
            mailService.save(this.mail)
        },
        isReadToggle(){
            this.mail.isRead = !this.mail.isRead
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