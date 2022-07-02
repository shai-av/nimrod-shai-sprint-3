import { eventBus } from "../../../services/eventBus-service.js"
import { mailService } from "../services/mail-service.js"

export default {
    template: `
 <span class="unread-count">
    {{unread}}
</span>
`,
    data() {
        return {
            unsubscribe: null,
            unread: 0,
            mails: null
        }
    },
    created() {
        this.unsubscribe = eventBus.on('set-unread', this.setUnread)
        this.countUnread()
    },
    methods: {
        getMails() {
            return mailService.query().then((mails) => this.mails = mails)
        },
        countUnread() {
            this.getMails().then(() => {
                this.unread = this.mails.filter((mail) => mail.isReceived && !mail.isRead && !mail.isDeleted && !mail.isArchived).length
            })
        },
        setUnread(n) {
            this.unread += n
        }
    },
    unmounted() {
        this.unsubscribe()
    },
}