import { mailService } from "../services/mail-service.js"
import mailList from "../cmps/mail-list.cmp.js"
import mailTopFilter from "../cmps/filter.cmp.js"
export default {
    template: `
 <section v-if="mails" class="main-container mail-app">
    <mail-top-filter @getFilter="setFilter"/>
   <mail-list :mails="mailsToShow"/>
 </section>
`,
    data() {
        return {
            mails:null,
            filterBy:null,
        }
    },
    methods: {
        setFilter(filter){
            this.filterBy = filter
        }
    },
    computed: {
        mailsToShow(){
                if (!this.filterBy) return this.mails;
                const filterStr = this.filterBy.str.toLowerCase().trim()

                const filteredMails = this.mails.filter((mail) =>{
                    if(mail.from.toLowerCase().includes(filterStr)) return mail
                    if(mail.to.toLowerCase().includes(filterStr)) return mail
                    if(mail.subject.toLowerCase().includes(filterStr)) return mail
                    if(mail.body.toLowerCase().includes(filterStr)) return mail
                });
                return filteredMails
        }
    },
    created(){
        mailService.query().then((mails)=>this.mails = mails)
        
    },
    unmounted() { },
    components:{
        mailList,
        mailTopFilter,
    }
};