
import { mailService } from "../services/mail-service.js"

export default {
    props:[
        'selectedMail'
    ],
    template: `
        <section v-if="mail" class="main-container mail-details">
        <!-- <router-link :to="'/mail/details/' + prevMailId">Prev</router-link> -->
        <!-- <router-link :to="'/mail/details/' + nextMailId">Next</router-link> -->
        <button @click="setPrev">prev</button>
        <button @click="setNext">next</button>
            <p>{{getBody}}<span v-if="isReadMore" class="read-more" @click="userClkReadMore = true">...</span></p>
        </section>
    `,
    data() {
        return {
            userClkReadMore:false,
            nextMailId:null,
            prevMailId:null,
            mail:null,
        }   
    },
    components:{
    },
    methods: {
        setPrev(){
            mailService.get(this.prevMailId).then((mail)=>this.mail = mail).then(()=> this.setPrevNext())
        },
        setNext(){
            mailService.get(this.nextMailId).then((mail)=>this.mail = mail).then(()=> this.setPrevNext())
        },
        setPrevNext(){
            mailService.getPrevNextMailId(this.mail.id)
            .then(mailIds => {
                this.nextMailId = mailIds.next
                this.prevMailId = mailIds.prev
            })
        }
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
        this.mail = this.selectedMail

        const id = this.mail.id
                    if(id){                                        
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
