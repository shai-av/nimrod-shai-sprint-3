import { mailService } from "../services/mail-service.js"
import mailList from "../cmps/mail-list.cmp.js"
import mailTopFilter from "../cmps/mail-top-filter.cmp.js"
import mailSideFilter from "../cmps/mail-side-filter.cmp.js";
export default {
    template: `
 <section v-if="mails" class="main-container mail-app">
    <mail-top-filter @getFilter="setFilterStr"/>
    <div class="flex">
    <mail-side-filter @getFilter="setFilterType" />
   <mail-list :mails="mailsToShow"/>
   </div>
 </section>
`,
    data() {
        return {
            mails: null,
            filterBy: {
                str: '',
                type: null,
            },
        }
    },
    methods: {
        setFilterStr(str) {
            this.filterBy.str = str
        },
        setFilterType(type) {
            this.filterBy.type = type
            console.log(type);
        }
    },
    computed: {
        mailsToShow() {
            if (!this.filterBy.str === '' && this.filterBy.type === null) return this.mails;
            const filterStr = this.filterBy.str.toLowerCase().trim()

            const filteredMails = this.mails.filter((mail) => {
                if (mail.from.toLowerCase().includes(filterStr)) return mail
                if (mail.to.toLowerCase().includes(filterStr)) return mail
                if (mail.subject.toLowerCase().includes(filterStr)) return mail
                if (mail.body.toLowerCase().includes(filterStr)) return mail
            });
            const { type } = this.filterBy
            if (!type) return filteredMails
            if (type === 'received') return filteredMails.filter((mail) => mail.isReceived)
            if (type === 'sent') return filteredMails.filter((mail) => !mail.isReceived)

            return filteredMails
        }
    },
    created() {
        mailService.query().then((mails) => this.mails = mails)

    },
    unmounted() { },
    components: {
        mailList,
        mailTopFilter,
        mailSideFilter
    }
};