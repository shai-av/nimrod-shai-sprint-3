import { mailService } from "../services/mail-service.js";
import mailPreview from "./mail-preview.cmp.js";

export default {
  props: ["mails"],
  template: `
    <section class="mail-list"  v-if="mails.length>0">
        <table>
            <thead></thead>
            <tbody>
                <tr v-for="mail in mails" @click="Read(mail)">
                    <mail-preview :mail="mail" />
                </tr>
            </tbody>
        </table>
    </section>
    <section v-else class="no-mails-msg">
      No mails to show..
    </section>
`,
  components: {
    mailPreview,
  },

  data() {
    return {};
  },
  methods: {
    Read(mail){
        mail.isRead = true
        mailService.save(mail)
        this.$router.push('/mail-app/details/:mailId')
    }
  },
  computed: {},
  mounted(){
    console.log(this.mails)
  }
};
