import { eventBus } from "../../../services/eventBus-service.js"
import { mailService } from "../services/mail-service.js"
import mailPreview from "./mail-preview.cmp.js"

export default {
  props: ["mails"],
  template: `
    <section class="mail-list"  v-if="mails.length>0">
                <div v-for="mail in mails" @click="read(mail)" class="flex mail-container">
                    <mail-preview :mail="mail" @removeMail="removeMail"></mail-preview>
                </div>
    </section>
    <section v-else class="no-mails-msg">
      No mails to show..
    </section>
`,
  components: {
    mailPreview,
  },
  methods: {
    read(mail){
      if(!mail.isRead){
        mail.isRead = true
        eventBus.emit('set-unread',-1)
      }
        mailService.save(mail)
        this.$emit('select',mail)
    },
    removeMail(mailId){
        mailService.remove(mailId)
        this.$emit('removeMailLocal',mailId)
    }
  },
}
