import { mailService } from "../services/mail-service.js"
import mailList from "../cmps/mail-list.cmp.js"
import filter from "../cmps/filter.cmp.js"
export default {
    template: `
 <section v-if="mails" class="main-container mail-app">

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

    },
    computed: {
        mailsToShow(){
                if (!this.filterBy) return this.mails;
                // let filteredMails = this.mails.filter((mail) => mail.includes(this.filterBy.name.toLowerCase()));
                // return filteredMails.filter((mail) => mail.listPrice.amount <= this.filterBy.maxPrice);
        }
    },
    created(){
        mailService.query().then((mails)=>this.mails = mails)
        
    },
    unmounted() { },
    components:{
        mailList
    }
};