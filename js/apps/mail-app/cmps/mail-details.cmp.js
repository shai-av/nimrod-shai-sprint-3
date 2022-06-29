
import { mailService } from "../services/mail-service.js"

export default {
    template: `
        <section v-if="mail" class="main-container mail-details">
        <router-link :to="'/mail/details/' + prevMailId">Prev</router-link>
        <router-link :to="'/mail/details/' + nextMailId">Next</router-link>
            <p>{{getBody}}<span v-if="isReadMore" class="read-more" @click="userClkReadMore = true">...</span></p>
        </section>
    `,
    data() {
        return {
            userClkReadMore:false,
            mail:null,
            nextMailId:null,
            prevMailId:null,
        }   
    },
    components:{
    },
    methods: {
    },
    computed: {
          getBody(){
            if(this.mail.body.length>100 && !this.userClkReadMore) return this.mail.body.substring(0,100) 
            else return this.mail.body
          },
          isReadMore(){
            return !this.userClkReadMore && this.mail.body.length>100
          },
    },
    created(){
    },
    watch:{
        '$route.params.mailId':{
            handler() {  
                const id = this.$route.params.mailId
                if(!id) return 
                mailService.get(id).then(mail => {
                    this.mail = mail
                     mailService.getPrevNextMailId(mail.id)
                        .then(mailIds => {
                            this.nextMailId = mailIds.next
                            this.prevMailId = mailIds.prev
                        }).catch(console.log('route param error'))
                })
            },
            immediate: true
        }
    }
}
